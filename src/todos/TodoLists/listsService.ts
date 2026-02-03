import { apiFetch } from '../../api/apiClient.ts'
import type {FormTodoList, TodoList} from '../types.ts'

const getLists = async (): Promise<TodoList[]> => {
  return await apiFetch<TodoList[]>('/lists')
}

const getList = async (id: TodoList['id']): Promise<TodoList> => {
  return await apiFetch<TodoList>(`/lists/${id}`)
}

const createList = async (payload: FormTodoList): Promise<TodoList> => {
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

const deleteList = async (list: TodoList): Promise<TodoList> => {
  await apiFetch<boolean>(`/lists/${list.id}`, { method: 'DELETE' })
  return list
}

export default { getLists, getList, createList, updateList, deleteList }
