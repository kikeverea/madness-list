export type Todo = {
  id: string | number,
  title: string,
  completed: boolean,
}

export type TodoList = {
  id: string | number,
  name: string,
  todos: Todo[],
}

export type NewTodo = Partial<Todo>
export type FormTodo = NewTodo | Todo

export type NewTodoList = Partial<TodoList>
export type FormTodoList = NewTodoList | TodoList

export const isPersisted = <T extends { id?: T['id'] }>(item: { id?: T['id'] }): item is T => {
  return item.id !== undefined
}