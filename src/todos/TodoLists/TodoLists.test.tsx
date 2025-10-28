import { beforeEach, describe, expect, test } from 'vitest'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import type { Todo } from '../types.ts'
import TodoLists from './TodoLists.tsx'

const todo: Todo = { id: 1, title: 'Item 1', completed: false }

const lists = [ list ]

describe('Todo Item', () => {

  beforeEach(() => {
    render(<TodoLists/>)
  })

  test('renders an item', () => {
    const item = screen.getByRole('listitem')
    expect(item.textContent).toBe(todo.title)
  })

})