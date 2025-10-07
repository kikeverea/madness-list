import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from './listsService.ts'
import {type FormTodoList, isPersisted, type TodoList} from '../types.ts'

const useTodoLists = (onMutationSuccess?: { onSave?: (list: TodoList) => void, onRemove?: (list: TodoList) => void }) => {

  const client = useQueryClient()

  const { data: todoList, isLoading } = useQuery({ queryKey: [ 'lists' ], queryFn: api.getLists })

  const createMutation = useMutation({
    mutationFn: api.createList,
    onSuccess: created => {
      client.setQueryData<TodoList[]>([ 'lists' ], (prev = []) => [ ...prev, created ])
      if (onMutationSuccess?.onSave) onMutationSuccess.onSave(created)
    }
  })

  const updateMutation = useMutation({
    mutationFn: api.updateList,
    onSuccess: updated => {
      client.setQueryData<TodoList[]>(
        [ 'lists' ],
        (prev = []) => prev.map(todo => todo.id === updated.id ? updated : todo)
      )
      if (onMutationSuccess?.onSave) onMutationSuccess.onSave(updated)
    }
  })

  const deleteMutation = useMutation({
    mutationFn: api.deleteList,
    onSuccess: deleted => {
      client.setQueryData<TodoList[]>([ 'todos' ], (prev = []) => prev.filter(todo => todo.id !== deleted.id))
      if (onMutationSuccess?.onRemove) onMutationSuccess.onRemove(deleted)
    }
  })

  const save = (list: TodoList | FormTodoList) => {
    if (isPersisted<TodoList>(list))
      updateMutation.mutate(list)
    else
      createMutation.mutate(list)
  }

  const remove = (list: TodoList) => {
    deleteMutation.mutate(list)
  }

  return { todoList, isLoading, save, remove }
}

export default useTodoLists()