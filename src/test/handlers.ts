import { http, HttpResponse } from 'msw'

let todoCount = 5

export const handlers = [

  http.post('/api/todos', async ({ request }) => {
    const todo = await request.clone().json()

    return HttpResponse.json({
      id: `${++todoCount}`,
      title: todo.title,
      completed: todo.completed,
    })
  }),

  http.put<{ id: string }>('/api/todos/:id', async ({ request, params }) => {

    const todo = await request.clone().json()
    const { id } = params;

    return HttpResponse.json({
      id: id,
      title: todo.title,
      completed: todo.completed,
    })
  }),

  http.delete<{ id: string }>('/api/todos/:id', async () => {
    return new HttpResponse(null, { status: 204 })
  })
]