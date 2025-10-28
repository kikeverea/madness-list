import { apiFetch } from '../../../api/apiClient.ts'
import type { TodoList } from '../../types.ts'

const getLists = async (): Promise<TodoList[]> => {
  return await apiFetch<TodoList[]>(`/lists/`)
}

const getList = async (id: TodoList['id']): Promise<TodoList> => {
  return await apiFetch<TodoList>(`/lists/${id}`)
}

const createList = async (payload: { name: string }): Promise<TodoList> => {
  return await apiFetch<TodoList>(`/lists`, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

const updateList = async (list: TodoList): Promise<TodoList> => {
  return await apiFetch<TodoList>(`/lists/${list.id}`, {
    method: 'PUT',
    body: JSON.stringify(list),
  })
}

const deleteList = async (id: TodoList['id']): Promise<TodoList> => {
  return await apiFetch<TodoList>(`/lists/${id}`, { method: 'DELETE' })
}

export default { getLists, getList, createList, updateList, deleteList }
