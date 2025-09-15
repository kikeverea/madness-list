import type { NewTodo, Todo } from '../components/TodoList/types.ts'
import { apiFetch } from './apiClient.ts'

const getTodos = async (): Promise<Todo[]> => {
  const res = await apiFetch<{ todos: Todo[] }>('/todos')
  return res.todos
}

const getTodo = async (id: Todo['id']): Promise<Todo> => {
  return await apiFetch<Todo>(`/todos/${id}`)
}

const createTodo = async (payload: NewTodo): Promise<Todo> => {
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
  await apiFetch<boolean>(`/todos/${todo.id}`, { method: 'DELETE' })
  return todo
}

export default { getTodos, getTodo, createTodo, updateTodo, deleteTodo }
