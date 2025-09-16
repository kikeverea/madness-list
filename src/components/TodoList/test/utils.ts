import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { Todo, TodoListType } from '../types.ts'

export const list: TodoListType = [
  { id: 1, title: 'Item 1', completed: false },
  { id: 2, title: 'Item 2', completed: false },
  { id: 3, title: 'Item 3', completed: true },
  { id: 4, title: 'Item 4', completed: false },
  { id: 5, title: 'Item 5', completed: true },
]

export const getForm = () => {
  const showButton = get('button', /add new todo/i)
  const titleInput = get('textbox', /todo title/i)
  const submit = get('button', /submit todo/i)
  const cancel = get('button', /cancel todo/i)

  return { showButton, titleInput, submit, cancel }
}

const get = (role: string, name: RegExp): HTMLButtonElement => {
  return screen.queryByRole(role, { name: name }) as HTMLButtonElement
}

export const showForm = async () => {
  const showButton = screen.getByRole('button', { name: /add new todo/i }) as HTMLButtonElement

  await userEvent.click(showButton)

  return getForm()
}

export const getTodo = async (index?: number): Promise<readonly [ HTMLElement, Todo, number ]> => {
  const items = await screen.findAllByRole('listitem')
  return randomTodo(items, index)
}

export const getTodoSync = (index?: number): readonly [ HTMLElement, Todo, number ] => {
  const items = screen.getAllByRole('listitem')
  return randomTodo(items, index)
}

const randomTodo = (items: HTMLElement[], index?: number): readonly [ HTMLElement, Todo, number ] => {
  const randIndex = index ?? Math.floor(Math.random() * items.length)
  return [ items[randIndex], list[randIndex], randIndex ]
}