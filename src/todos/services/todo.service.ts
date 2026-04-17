import type { FormTodo, Todo, TodoList } from '../types.ts'
import { apiFetch } from '../../api/apiClient.ts'

const getTodos = async (listId: TodoList['id']): Promise<Todo[]> => {
  return await apiFetch<Todo[]>(`/lists/${listId}/todos`)
}

const getTodo = async (id: Todo['id']): Promise<Todo> => {
  return await apiFetch<Todo>(`/todos/${id}`)
}

const createTodo = async (payload: FormTodo): Promise<Todo> => {
  return await apiFetch<Todo>(`/todos`, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

const updateTodo = async (todo: Todo): Promise<Todo> => {
  return await apiFetch<Todo>(`/todos/${todo.id}`, {
    method: 'PUT',
    body: JSON.stringify(todo),
  })
}

const deleteTodo = async (todo: Todo): Promise<Todo> => {
  return await apiFetch<Todo>(`/todos/${todo.id}`, { method: 'DELETE' })
}

export default { getTodos, getTodo, createTodo, updateTodo, deleteTodo }
