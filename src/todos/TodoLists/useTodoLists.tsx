import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from '../services/list.service.ts'
import { type NewTodoList, type TodoList } from '../types.ts'

type QueryActions<T> = {
  fetching: boolean,
  creating: T | null,
  deleting: T | null,
  any: boolean,
}

type PendingActions = {
  current: (list: TodoList) => TodoList | null
}

type ErrorAction = { error: (list: TodoList) => string }

type TodoListMutationStatus = {
  pending: QueryActions<TodoList | NewTodoList> & PendingActions,
  errors: QueryActions<TodoList | NewTodoList> & ErrorAction,
}

const useTodoLists = () => {

  const client = useQueryClient()

  const { data: lists, isPending, isError } = useQuery({ queryKey: [ 'lists' ], queryFn: api.getLists })

  const createMutation = useMutation({
    mutationFn: (list: NewTodoList) => api.createList(list),
    onSettled: () => client.invalidateQueries({ queryKey: ['lists'] })
  })

  const deleteMutation = useMutation({
    mutationFn: api.deleteList,
    onSettled: () => client.invalidateQueries({ queryKey: ['lists'] })
  })

  const create = () => {
    console.log('creating..')
    return createMutation.mutate({ name: '', todos: [] })
  }
  const remove = (list: TodoList) => deleteMutation.mutate(list)

  const status: TodoListMutationStatus = {
    pending: {
      fetching: isPending,
      creating: createMutation.isPending ? createMutation.variables : null,
      deleting: deleteMutation.isPending ? deleteMutation.variables : null,
      any: createMutation.isPending || deleteMutation.isPending,
      current: (list) => (
        (createMutation.isPending && createMutation.variables as TodoList) ||
        (deleteMutation.isPending && deleteMutation.variables.id === list.id && deleteMutation.variables) ||
        null
      )
    },
    errors: {
      fetching: isError,
      creating: createMutation.isError ? createMutation.variables : null,
      deleting: deleteMutation.isError ? deleteMutation.variables : null,
      any: createMutation.isError || deleteMutation.isError,
      error: (todo) => (
        (createMutation.isError && 'Could not create') ||
        (deleteMutation.isError && deleteMutation.variables.id === todo.id && 'Could not delete') ||
        ''
      )
    }
  }

  return { lists, create, remove, status }
}

export default useTodoLists