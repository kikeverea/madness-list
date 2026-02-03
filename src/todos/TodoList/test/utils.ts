import { screen } from '@testing-library/react'

export const getListForm = () => {
  const nameInput = getElement('textbox', /todo-list value/i)
  const submit = getElement('button', /submit todo-list/i)
  const cancel = getElement('button', /cancel todo-list/i)

  return { nameInput, submit, cancel }
}

const getElement = (role: string, name: RegExp): HTMLButtonElement => {
  return screen.queryByRole(role, { name: name }) as HTMLButtonElement
}