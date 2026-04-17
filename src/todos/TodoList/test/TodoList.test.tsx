import { beforeEach, describe, expect, test, vi } from 'vitest'
import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoListItem from '../TodoListItem'
import { regex, render } from '../../../test/utils'
import { getListForm, } from './utils'
import { db } from '../../../test/db'

describe('Todo List', () => {
  const list = {
    id: 1,
    name: 'List 1',
    todos: db.todoList
  }

  const onRemove = vi.fn()

  beforeEach(() => {
    render(<TodoListItem list={list} onRemove={onRemove}/>)
  })

  test("renders the list's name", async () => {
    const title = screen.getByRole('heading', { level: 6 })
    expect(title.textContent).toBe(list.name)
  })

  test("clicking on the list edit button shows the list's form_components", async () => {
    const editButton = screen.getByRole('button', { name: regex(`edit ${list.name}`) })
    await userEvent.click(editButton)

    const { nameInput, submit, cancel } = getListForm()

    expect(nameInput).toBeInTheDocument()
    expect(submit).toBeInTheDocument()
    expect(cancel).toBeInTheDocument()
  })

  test("clicking on the cancel list edit button hides the list's form_components", async () => {
    const editButton = screen.getByRole('button', { name: regex(`edit ${list.name}`) })
    await userEvent.click(editButton)

    const { cancel } = getListForm()
    await userEvent.click(cancel)

    const { nameInput } = getListForm()
    expect(nameInput).not.toBeInTheDocument()
  })

  test("updates the list's name", async () => {
    const editButton = screen.getByRole('button', { name: regex(`edit ${list.name}`) })
    await userEvent.click(editButton)

    const { nameInput, submit } = getListForm()

    await userEvent.clear(nameInput)
    await userEvent.type(nameInput, 'new list name')
    await userEvent.click(submit)

    const title = await screen.findByText('new list name')

    expect(title).toBeInTheDocument()
  })

  test('calls remove callback when clicking on the delete button', async () => {
    const deleteButton = screen.getByRole('button', { name: regex(`delete ${list.name}`) })
    await userEvent.click(deleteButton)

    expect(onRemove).toHaveBeenCalledOnce()
  })
})
