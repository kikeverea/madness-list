import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { Todo } from '../../types.ts'
import { todoList } from '../../../test/handlers.ts'

export const regex = (text: string): RegExp =>
  new RegExp(text, 'i')

export const getForm = () => {
  const showButton = get('button', /add new todo/i)
  const titleInput = get('textbox', /todo value/i)
  const submit = get('button', /submit todo/i)
  const cancel = get('button', /cancel todo/i)

  return { showButton, titleInput, submit, cancel }
}

export const getListForm = () => {
  const nameInput = get('textbox', /todo-list value/i)
  const submit = get('button', /submit todo-list/i)
  const cancel = get('button', /cancel todo-list/i)

  return { nameInput, submit, cancel }
}

export const showForm = async () => {
  const showButton = screen.getByRole('button', { name: /add new todo/i }) as HTMLButtonElement

  await userEvent.click(showButton)

  return getForm()
}

export async function submitNewTodo(text: string) {
  const { titleInput, submit } = await showForm()
  await userEvent.type(titleInput, text)
  await userEvent.click(submit)
}

export async function submitUpdateTodoWithTitle(text: string) {
  const [ todoElement, todo ] = await getTodo(0)
  const newTitle = `${todo.title}${text}`

  const editButton = within(todoElement).getByRole('button', { name: regex(`edit ${todo.title}`) })
  await userEvent.click(editButton)

  const { titleInput, submit } = getForm()
  await userEvent.type(titleInput, text)
  await userEvent.click(submit)

  return newTitle
}

export const showListForm = async (listName: string) => {
  const pattern = new RegExp(`edit ${listName}`, 'i')
  const editButton = screen.getByRole('button', { name: pattern }) as HTMLButtonElement

  await userEvent.click(editButton)

  return getListForm()
}

export const getTodo = async (index?: number): Promise<readonly [ HTMLElement, Todo, number ]> => {
  const items = await screen.findAllByRole('listitem')
  return randomTodo(items, index)
}

export const getTodoSync = (index?: number): readonly [ HTMLElement, Todo, number ] => {
  const items = screen.getAllByRole('listitem')
  return randomTodo(items, index)
}

const get = (role: string, name: RegExp): HTMLButtonElement => {
  return screen.queryByRole(role, { name: name }) as HTMLButtonElement
}

const randomTodo = (items: HTMLElement[], index?: number): readonly [ HTMLElement, Todo, number ] => {
  const randIndex = index ?? Math.floor(Math.random() * items.length)
  return [ items[randIndex], todoList[randIndex], randIndex ]
}