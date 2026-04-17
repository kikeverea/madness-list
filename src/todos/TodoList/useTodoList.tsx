import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from '../services/list.service.ts'
import { type TodoList } from '../types.ts'

const useTodoList = (list: TodoList) => {

  const client = useQueryClient()

  const { data: todoList, isPending, isError } = useQuery({
    queryKey: [ list.id ],
    queryFn: () => api.getList(list.id),
    initialData: list,
    staleTime: 30_000
  })

  const updateMutation = useMutation({
    mutationFn: api.updateList,
    onSettled: () => client.invalidateQueries({ queryKey: [ list.id ] }),
  })

  const deleteMutation = useMutation({
    mutationFn: api.deleteList,
    onSettled: () => client.invalidateQueries({ queryKey: [ list.id ] }),
  })

  const saveList = (list: TodoList) => updateMutation.mutate(list)
  const removeList = (list: TodoList) => deleteMutation.mutate(list.id)
  const listPending = isPending || updateMutation.isPending || deleteMutation.isPending
  const listError = isError || updateMutation.isError || deleteMutation.isError

  return { todoList, listPending, listError, saveList, removeList }
}

export default useTodoList