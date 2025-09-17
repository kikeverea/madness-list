import { beforeEach, describe, expect, test } from 'vitest'
import '@testing-library/jest-dom'
import { render, screen, within } from '@testing-library/react'
import TodoItem from './TodoItem.tsx'
import type { Todo } from '../types.ts'
import userEvent from '@testing-library/user-event'

const todo: Todo = { id: 1, title: 'Item 1', completed: false }

describe('Todo Item', () => {

  const checkMock = vi.fn()
  const editMock = vi.fn()
  const deleteMock = vi.fn()

  beforeEach(() => {
    checkMock.mockClear()
    editMock.mockClear()
    deleteMock.mockClear()

    render(<TodoItem todo={todo} onChecked={checkMock} onEdit={editMock} onDelete={deleteMock}/>)
  })

  test('renders an item', () => {
    const item = screen.getByRole('listitem')
    expect(item.textContent).toBe(todo.title)
  })

  test('clicking the check button calls its handler', async () => {
    const checkbox = screen.getByRole('checkbox')
    await userEvent.click(checkbox)

    expect(checkMock).toHaveBeenCalledWith({ ...todo, completed: !todo.completed })
  })

  test('renders an edit button', async () => {
    const item = screen.getByRole('listitem')
    const editButton = within(item).getByRole('button', { name: /edit item 1/i })

    expect(editButton).toBeInTheDocument()
  })

  test('clicking the edit button calls its handler', async () => {
    const editButton = screen.getByRole('button', { name: /edit item 1/i })

    await userEvent.click(editButton)
    expect(editMock).toHaveBeenCalledWith(todo)
  })

  test('renders a delete button', () => {
    const item = screen.getByRole('listitem')
    const deleteButton = within(item).getByRole('button', { name: /delete item 1/i })

    expect(deleteButton).toBeInTheDocument()
  })

  test('clicking the delete button calls its handler', async () => {
    const deleteButton = screen.getByRole('button', { name: /delete item 1/i })

    await userEvent.click(deleteButton)
    expect(deleteMock).toHaveBeenCalledWith(todo)
  })
})