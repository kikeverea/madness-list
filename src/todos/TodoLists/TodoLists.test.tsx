import { beforeEach, describe, expect, test } from 'vitest'
import '@testing-library/jest-dom'
import { fireEvent, screen, waitForElementToBeRemoved } from '@testing-library/react'
import type { TodoList } from '../types'
import TodoLists from './TodoLists'
import { db } from '../../test/db'
import { regex, render, waitForMutationSettle } from '../../test/utils'
import userEvent from '@testing-library/user-event'

describe('Todo Lists', () => {

  let allLists: TodoList[]
  let startingLists: number

  beforeEach(() => {
    allLists = db.lists
    startingLists = allLists.length
    render(<TodoLists/>)
  })

  test('renders lists', async () => {
    const lists = await screen.findAllByRole('list')
    expect(lists.length).toBe(allLists.length)
  })

  test('renders new list button', async () => {
    expect(screen.getByRole('button', { name: /new list/ })).toBeInTheDocument()
  })

  test('clicking the new list button adds a new list', async () => {
    const createButton = screen.getByRole('button', { name: /new list/ })
    await userEvent.click(createButton)

    await waitForMutationSettle()

    const lists = await screen.findAllByRole('list')
    expect(lists.length).toBe(startingLists + 1)
  })

  test("clicking on the list's delete button removes the list", async () => {
    const listElement = (await screen.findAllByRole('list'))[0]

    // We need to hover the list to make the delete button visible
    fireEvent(listElement, new MouseEvent('mouseover', { bubbles: true }))

    const deleteButton = screen.getByRole('button', { name: regex(`delete ${allLists[0].name}`) })
    await userEvent.click(deleteButton)

    await waitForElementToBeRemoved(listElement)

    const lists = screen.getAllByRole('list')
    expect(lists.length).toBe(startingLists - 1)
  })
})