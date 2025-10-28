import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from '../services/todoService.ts'
import { isPersisted, type FormTodo, type Todo, type TodoList, type NewTodo } from '../../types.ts'

type TodoActions<T> = {
  fetching: boolean,
  creating: T | null,
  updating: T | null,
  deleting: T | null,
  any: boolean,
}

type PendingActions = {
  current: (todo: Todo) => Todo | null
}
type ErrorAction = { error: (todo: Todo) => string }

type TodoMutationStatus = {
  pending: TodoActions<Todo | NewTodo> & PendingActions,
  errors: TodoActions<Todo | NewTodo> & ErrorAction,
}

const useTodos = (list: TodoList) => {

  const client = useQueryClient()

  const { data: todoList, isPending, isError } = useQuery({
    queryKey: [ list.id, 'todos' ],
    queryFn: () => api.getTodos(list.id),
    initialData: list.todos,
    staleTime: 30_000
  })

  const createMutation = useMutation({
    mutationFn: (todo: FormTodo) => api.createTodo(list.id, todo),
    onSettled: () => client.invalidateQueries({ queryKey: [ list.id, 'todos' ] }),
  })

  const updateMutation = useMutation({
    mutationFn: (todo: Todo) => api.updateTodo(list.id, todo),
    onSettled: () => client.invalidateQueries({ queryKey: [ list.id, 'todos' ] }),
  })

  const deleteMutation = useMutation({
    mutationFn: (todo: Todo) => api.deleteTodo(list.id, todo),
    onSettled: () => client.invalidateQueries({ queryKey: [ list.id, 'todos' ] }),
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
      current: (todo) => (
        (createMutation.isPending && createMutation.variables.id === todo.id && createMutation.variables as Todo) ||
        (updateMutation.isPending && updateMutation.variables.id === todo.id && updateMutation.variables) ||
        (deleteMutation.isPending && deleteMutation.variables.id === todo.id && deleteMutation.variables) ||
        null
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