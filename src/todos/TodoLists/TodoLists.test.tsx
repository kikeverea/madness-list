import { beforeEach, describe, expect, test } from 'vitest'
import '@testing-library/jest-dom'
import { render, screen, within } from '@testing-library/react'
import TodoItem from './TodoItem.tsx'
import type { Todo } from '../types.ts'
import userEvent from '@testing-library/user-event'
import TodoLists from './TodoLists.tsx'
import {list} from '../TodoList/test/utils.ts'

const todo: Todo = { id: 1, title: 'Item 1', completed: false }

const lists = [ list ]

describe('Todo Item', () => {

  beforeEach(() => {
    render(<TodoLists />)
  })

  test('renders an item', () => {
    const item = screen.getByRole('listitem')
    expect(item.textContent).toBe(todo.title)
  })

})