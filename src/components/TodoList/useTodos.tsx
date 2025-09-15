import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from '../../services/todoService.ts'
import { isPersisted, type FormTodo, type Todo, type TodoListType } from './types.ts'

const useTodos = (onMutationSuccess?: { onSave?: (todo: Todo) => void, onRemove?: (todo: Todo) => void }) => {

  const client = useQueryClient()

  const { data: todoList, isLoading } = useQuery({ queryKey: [ 'todos' ], queryFn: api.getTodos })

  const createMutation = useMutation({
    mutationFn: api.createTodo,
    onSuccess: created => {
      client.setQueryData<TodoListType>([ 'todos' ], (prev = []) => [ ...prev, created ])
      onMutationSuccess?.onSave && onMutationSuccess.onSave(created)
    }
  })

  const updateMutation = useMutation({
    mutationFn: api.updateTodo,
    onSuccess: updated => {
      client.setQueryData<TodoListType>(
        [ 'todos' ],
        (prev = []) => prev.map(todo => todo.id === updated.id ? updated : todo)
      )
      onMutationSuccess?.onSave && onMutationSuccess.onSave(updated)
    }
  })

  const deleteMutation = useMutation({
    mutationFn: api.deleteTodo,
    onSuccess: deleted => {
      client.setQueryData<TodoListType>([ 'todos' ], (prev = []) => prev.filter(todo => todo.id !== deleted.id))
      onMutationSuccess?.onRemove && onMutationSuccess.onRemove(deleted)
    }
  })

  const save = (todo: Todo | FormTodo) => {
    if (isPersisted(todo))
      updateMutation.mutate(todo)
    else
      createMutation.mutate(todo)
  }

  const remove = (todo: Todo) => {
    deleteMutation.mutate(todo)
  }

  return { todoList, isLoading, save, remove }
}

export default useTodos