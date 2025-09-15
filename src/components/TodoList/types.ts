export type Todo = {
  id: string | number,
  title: string,
  completed: boolean,
}

export type NewTodo = Partial<Todo>
export type FormTodo = NewTodo | Todo

export const isPersisted = (todo: FormTodo): todo is Todo => {
  return todo.id !== undefined
}

export type TodoListType = Todo[]