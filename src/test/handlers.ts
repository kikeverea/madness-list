import type { Todo, TodoList } from '../todos/types.ts'
import { crudHandlers } from './crudHandler.ts'
import { db } from './db'

export const handlers = [
  ...crudHandlers<TodoList>(() => db.lists, '/api/lists'),
  ...crudHandlers<Todo>(() => db.lists[0].todos, '/api/lists/:list_id/todos')
]