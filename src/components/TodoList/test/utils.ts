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

export const getForm = (options?: { optional: boolean }) => {
  const { optional = false } = options || {}

  const showButton = (
    optional
      ? screen.queryByRole('button', { name: /add new todo/i })
      : screen.getByRole('button', { name: /add new todo/i })
  ) as HTMLButtonElement

  const titleInput = (
    optional
      ? screen.queryByRole('textbox', { name: /todo title/i })
      : screen.getByRole('textbox', { name: /todo title/i })
  ) as HTMLInputElement

  const submit = (
    optional
      ? screen.queryByRole('button', { name: /submit todo/i })
      : screen.getByRole('button', { name: /submit todo/i })
  ) as HTMLButtonElement

  return { showButton, titleInput, submit }
}

export const showForm = async () => {
  const showButton = screen.getByRole('button', { name: /add new todo/i }) as HTMLButtonElement

  await userEvent.click(showButton)

  return getForm({ optional: true })
}

export const getTodo = async (index?: number): Promise<readonly [ HTMLElement, Todo ]> => {
  const items = await screen.findAllByRole('listitem')
  const randIndex = index ?? Math.floor(Math.random() * items.length)

  return [ items[randIndex], list[randIndex] ]
}