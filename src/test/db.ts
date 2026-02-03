import type { Todo, TodoList } from '../todos/types.ts'

export const todoList: Todo[] = [
  { id: 1, title: 'Todo 1', completed: false },
  { id: 2, title: 'Todo 2', completed: true },
  { id: 3, title: 'Todo 3', completed: false },
  { id: 4, title: 'Todo 4', completed: true },
  { id: 5, title: 'Todo 5', completed: true },
]

export const lists: TodoList[] = [
  {
    id: 1,
    name: "List 1",
    todos: todoList,
  },
  {
    id: 2,
    name: "List 2",
    todos: [],
  }
]

const clone = <T>(obj: T): T => structuredClone(obj)

export const db = {
  todoList: clone(todoList),
  lists: clone(lists),
  reset() {
    this.todoList = clone(todoList)
    this.lists = clone(lists)
  }
}