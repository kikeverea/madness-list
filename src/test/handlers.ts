import { http, delay, HttpResponse } from 'msw'
import type { Todo, TodoList } from '../todos/types.ts'

export let todoList: Todo[] = [
  { id: 1, title: 'Todo 1', completed: false },
  { id: 2, title: 'Todo 2', completed: true },
  { id: 3, title: 'Todo 3', completed: false },
  { id: 4, title: 'Todo 4', completed: true },
  { id: 5, title: 'Todo 5', completed: true },
]

export let lists: TodoList[] = [
  {
    id: 1,
    name: "List 1",
    todos: todoList,
  }
]


export const handlers = [

  http.get<{ id: string }>('/api/lists/:list_id/todos', async () => {

    console.log('returning', todoList)

    return HttpResponse.json(todoList)
  }),

  http.post('/api/lists/:list_id/todos', async ({ request }) => {
    await delay(300)

    console.log('pushing')

    const params = await request.clone().json()

    const todo = {
      id: todoList.length + 1,
      title: params.title,
      completed: params.completed,
    }

    todoList = [ ...todoList, todo ]

    return HttpResponse.json(todo)
  }),

  http.put<{ id: string }>('/api/lists/:list_id/todos/:id', async ({ request }) => {
    await delay(300)

    console.log('putting')

    const params = await request.clone().json()

    const todo = {
      id: params.id,
      title: params.title,
      completed: params.completed,
    }

    todoList = todoList.map(inList => inList.id === todo.id ? todo : inList)

    return HttpResponse.json(todo)
  }),

  http.delete<{ id: string }>('/api/lists/:list_id/todos/:id', async ({ params }) => {
    await delay()

    const index = todoList.findIndex(todo => todo.id === parseInt((params.id)))
    todoList.splice(index, 1)

    return new HttpResponse(null, { status: 204 })
  }),

  http.get('/api/lists', async () => {
    console.log('returning', lists)

    return HttpResponse.json(lists)
  }),

  http.post('/api/lists', async ({ request }) => {

    const params = await request.clone().json()

    const list = {
      id: lists.length + 1,
      ...params
    }

    lists = [ ...lists, list ]

    return HttpResponse.json(lists)
  }),

  http.put<{ id: string }>('/api/lists/:id', async ({ request }) => {

    const params = await request.clone().json()
    lists[0] = { ...lists[0], ...params }

    return HttpResponse.json(lists)
  }),

  http.delete('/api/lists/:id', async () => {

    lists = []

    return HttpResponse.json(lists)
  }),
]