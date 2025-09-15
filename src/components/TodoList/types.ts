export type Todo = {
  id: string | number,
  title: string,
  completed: boolean,
}

export type NewTodo = Omit<Todo, 'id'>

export const isPersisted = (todo: Omit<Todo, 'id'> & { id?: Todo['id'] }): todo is Todo => {
  return todo.id !== undefined
}

export type TodoListType = Todo[]