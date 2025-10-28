import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../services/listService.ts'
import { type TodoList } from '../../types.ts'

const useListMutations = (list: TodoList) => {

  const client = useQueryClient()

  const updateMutation = useMutation({
    mutationFn: api.updateList,
    onSettled: () => client.invalidateQueries({ queryKey: [ list.id ] }),
  })

  const deleteMutation = useMutation({
    mutationFn: api.deleteList,
    onSettled: () => client.invalidateQueries({ queryKey: [ list.id ] }),
  })

  const saveList = (list: TodoList) => {
    updateMutation.mutate(list)
  }

  const removeList = (list: TodoList) => deleteMutation.mutate(list.id)
  const listPending = updateMutation.isPending || deleteMutation.isPending
  const listError = updateMutation.isError || deleteMutation.isError

  return { listPending, listError, saveList, removeList }
}

export default useListMutations