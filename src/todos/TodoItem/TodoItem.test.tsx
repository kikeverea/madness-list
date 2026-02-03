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
  const redoMock = vi.fn()

  describe('simple todo', () => {

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

  describe('with mutating state', () => {
    beforeEach(() => {
      redoMock.mockClear()

      render(
        <TodoItem
          todo={todo}
          onChecked={checkMock}
          onEdit={editMock}
          onDelete={deleteMock}
          pending={true}
          redoAction={redoMock}
        />)
    })

    test("action buttons hidden if it's pending", async () => {
      const checkbox = screen.queryByRole('checkbox')
      const editButton = screen.queryByRole('button', { name: /edit item 1/i })
      const deleteButton = screen.queryByRole('button', { name: /delete item 1/i })

      expect(checkbox).toBeNull()
      expect(editButton).toBeNull()
      expect(deleteButton).toBeNull()
    })

    test("indicator is visible if it's pending", async () => {
      const loadingIndicator = screen.getByRole('status')
      expect(loadingIndicator).toBeInTheDocument()
    })
  })

  describe('with error', () => {
    beforeEach(() => {
      redoMock.mockClear()

      render(
        <TodoItem
          todo={todo}
          onChecked={checkMock}
          onEdit={editMock}
          onDelete={deleteMock}
          redoAction={redoMock}
          error='I have an error'
        />)
    })

    test("shows error", () => {
      const item = screen.getByRole('listitem')
      expect(item.textContent).toBe('I have an error')
    })

    test("shows redo button", () => {
      const redoButton = screen.getByRole('button', { name: /redo action/i })
      expect(redoButton).toBeInTheDocument()
    })

    test("clicking redo button calls redo action", async () => {
      const redoButton = screen.getByRole('button', { name: /redo action/i })

      await userEvent.click(redoButton)

      expect(redoMock).toHaveBeenCalledWith(todo)
    })
  })

})