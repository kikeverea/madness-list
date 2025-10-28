import type { FormTodo, Todo, TodoList } from '../../types.ts'
import { apiFetch } from '../../../api/apiClient.ts'

const getTodos = async (listId: TodoList['id']): Promise<Todo[]> => {
  return await apiFetch<Todo[]>(`/lists/${listId}/todos`)
}

const getTodo = async (listId: TodoList['id'], id: Todo['id']): Promise<Todo> => {
  return await apiFetch<Todo>(`/lists/${listId}/todos/${id}`)
}

const createTodo = async (listId: TodoList['id'], payload: FormTodo): Promise<Todo> => {
  return await apiFetch<Todo>(`/lists/${listId}/todos`, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

const updateTodo = async (listId: TodoList['id'], todo: Todo): Promise<Todo> => {
  return await apiFetch<Todo>(`/lists/${listId}/todos/${todo.id}`, {
    method: 'PUT',
    body: JSON.stringify(todo),
  })
}

const deleteTodo = async (listId: TodoList['id'], todo: Todo): Promise<Todo> => {
  return await apiFetch<Todo>(`/lists/${listId}/todos/${todo.id}`, { method: 'DELETE' })
}

export default { getTodos, getTodo, createTodo, updateTodo, deleteTodo }
