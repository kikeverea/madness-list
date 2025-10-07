import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from '../todoService.ts'
import { isPersisted, type FormTodo, type Todo, type TodoList, type NewTodo } from '../../types.ts'

type TodoActions<T> = {
  fetching: boolean,
  creating: T | null,
  updating: T | null,
  deleting: T | null,
  any: boolean,
}

type PendingAction = { isPending: (todo: Todo | NewTodo) => boolean }
type ErrorAction = { error: (todo: Todo) => string }

type TodoMutationStatus = {
  pending: TodoActions<Todo | NewTodo> & PendingAction,
  errors: TodoActions<Todo | NewTodo> & ErrorAction,
}

const useTodos = (list: TodoList) => {

  const client = useQueryClient()

  const { data: todoList, isPending, isError } = useQuery({
    queryKey: [ list.id, 'todos' ],
    queryFn: api.getTodos,
    initialData: list.todos,
    staleTime: 30_000
  })

  const createMutation = useMutation({
    mutationFn: api.createTodo,
    onSettled: () => client.invalidateQueries({ queryKey: [ list.id, list.todos ] }),
  })

  const updateMutation = useMutation({
    mutationFn: api.updateTodo,
    onSettled: () => client.invalidateQueries({ queryKey: [ list.id, list.todos ] }),
  })

  const deleteMutation = useMutation({
    mutationFn: api.deleteTodo,
    onSettled: () => client.invalidateQueries({ queryKey: [ list.id, list.todos ] }),
  })

  const save = (todo: Todo | FormTodo) => {
    if (isPersisted<Todo>(todo))
      updateMutation.mutate(todo)
    else
      createMutation.mutate(todo)
  }

  const remove = (todo: Todo) => deleteMutation.mutate(todo)

  const status: TodoMutationStatus = {
    pending: {
      fetching: isPending,
      creating: createMutation.isPending ? createMutation.variables : null,
      updating: updateMutation.isPending ? updateMutation.variables : null,
      deleting: deleteMutation.isPending ? deleteMutation.variables : null,
      any: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending,
      isPending: (todo) => (
        (createMutation.isPending && createMutation.variables.id === todo.id) ||
        (updateMutation.isPending && updateMutation.variables.id === todo.id) ||
        (deleteMutation.isPending && deleteMutation.variables.id === todo.id)
      )
    },
    errors: {
      fetching: isError,
      creating: createMutation.isError ? createMutation.variables : null,
      updating: updateMutation.isError ? updateMutation.variables : null,
      deleting: deleteMutation.isError ? deleteMutation.variables : null,
      any: createMutation.isError || updateMutation.isError || deleteMutation.isError,
      error: (todo) => (
        (createMutation.isError && createMutation.variables.id === todo.id && 'Could not create') ||
        (updateMutation.isError && updateMutation.variables.id === todo.id && 'Could not update') ||
        (deleteMutation.isError && deleteMutation.variables.id === todo.id && 'Could not delete') ||
        ''
      )
    }
  }

  return { todoList, status, save, remove }
}

export default useTodos