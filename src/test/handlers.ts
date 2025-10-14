import { http, HttpResponse } from 'msw'
import type { Todo } from "../todos/types.ts";

export const todoList: Todo[] = [
  { id: 1, title: 'Todo 1', completed: false },
  { id: 2, title: 'Todo 2', completed: true },
  { id: 3, title: 'Todo 3', completed: false },
  { id: 4, title: 'Todo 4', completed: true },
  { id: 5, title: 'Todo 5', completed: true },
]

export const handlers = [

  http.get('/api/:listId/todos', async () => {

    console.log('returning', todoList)

    return HttpResponse.json(todoList)
  }),

  http.post('/api/todos', async ({ request }) => {
    const params = await request.clone().json()

    const todo = {
      id: todoList.length + 1,
      title: params.title,
      completed: params.completed,
    }

    todoList.push(todo)

    return HttpResponse.json(todo)
  }),

  http.put<{ id: string }>('/api/todos/:id', async ({ request }) => {

    const todo = await request.clone().json()

    return HttpResponse.json({
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
    })
  }),

  http.delete<{ id: string }>('/api/todos/:id', async () => {
    return new HttpResponse(null, { status: 204 })
  })
]