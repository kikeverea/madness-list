import {beforeEach, describe, expect, test} from 'vitest'
import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoItem from './TodoItem.tsx'
import type {Todo} from '../TodoList/types.ts'

const todo: Todo = { id: 1, title: 'Item 1', completed: false }

describe('Todo Item', () => {

  const editMock = vi.fn()
  const deleteMock = vi.fn()

  beforeEach(() => {
    editMock.mockClear()
    deleteMock.mockClear()

    render(<TodoItem todo={ todo } onEdit={ editMock } onDelete={ deleteMock } />)
  })

  test('renders an item', () => {
    const item = screen.getByRole('listitem')
    expect(item.textContent).toBe(todo.title)
  })

  test('renders an edit button', () => {
    const editButton = screen.getByRole('button', { name: /item 1 edit/i })
    expect(editButton).toBeInTheDocument()
  })

  test('clicking the edit button calls its handler', async () => {
    const editButton = screen.getByRole('button', { name: /item 1 edit/i })

    await userEvent.click(editButton)
    expect(editMock).toHaveBeenCalledWith(todo)
  })

  test('renders a delete button', () => {
    const deleteButton = screen.getByRole('button', { name: /item 1 delete/i })
    expect(deleteButton).toBeInTheDocument()
  })

  test('clicking the delete button calls its handler', async () => {
    const deleteButton = screen.getByRole('button', { name: /item 1 delete/i })

    await userEvent.click(deleteButton)
    expect(deleteMock).toHaveBeenCalledWith(todo)
  })
})