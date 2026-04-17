import { beforeEach, describe, expect, test } from 'vitest'
import { http, HttpResponse } from 'msw'
import '@testing-library/jest-dom'
import { screen, waitFor, waitForElementToBeRemoved, within } from '@testing-library/react'
import { server } from '../../../test/server'
import userEvent from '@testing-library/user-event'
import { render } from '../../../test/utils'
import {
  getForm,
  getTodo,
  showForm,
  getTodoSync,
  regex,
  submitNewTodo,
  submitUpdateTodoWithTitle
} from './utils'
import type { Todo, TodoList } from '../../types'
import { db } from '../../../test/db'
import TodoListCollection from '../TodoListCollection.tsx'

describe('Todo List', () => {

  describe('no data', () => {

    const list = {
      id: 1,
      name: 'List 1',
      todos: []
    }

    beforeEach(() => {
      server.use(http.get('api/todos', () => HttpResponse.json({ todos: [] })))
    })

    test('renders an add button', async () => {
      render(<TodoListCollection list={list}/>)

      const button = await screen.findByRole('button', { name: /add new todo/i })

      expect(button).toBeInTheDocument()
    })

    test('renders an add button with a custom label', async () => {
      render(<TodoListCollection list={list} newButtonLabel='new button label'/>)

      const button = await screen.findByRole('button', { name: /add new todo/i })

      expect(button.textContent).toBe('new button label')
    })

    test('clicking on the add new button, hides it and shows the add new form_components', async () => {
      render(<TodoListCollection list={list}/>)

      const { showButton, titleInput, submit, cancel } = getForm()

      expect(showButton).toBeInTheDocument()
      expect(titleInput).not.toBeInTheDocument()
      expect(submit).not.toBeInTheDocument()
      expect(cancel).not.toBeInTheDocument()

      await userEvent.click(showButton)

      const { showButton: buttonNow, titleInput: inputNow, submit: submitNow, cancel: cancelNow } =
        getForm()

      expect(buttonNow).not.toBeInTheDocument()
      expect(inputNow).toBeInTheDocument()
      expect(submitNow).toBeInTheDocument()
      expect(cancelNow).toBeInTheDocument()
    })

    test('clicking on the cancel button, hides the form_components', async () => {
      render(<TodoListCollection list={list}/>)

      const { showButton: showButton } = getForm()
      await userEvent.click(showButton)

      const { cancel } = getForm()
      await userEvent.click(cancel)

      const { showButton: buttonNow, titleInput: inputNow, submit: submitNow, cancel: cancelNow } =
        getForm()

      expect(buttonNow).toBeInTheDocument()
      expect(inputNow).not.toBeInTheDocument()
      expect(submitNow).not.toBeInTheDocument()
      expect(cancelNow).not.toBeInTheDocument()
    })

    test('renders a submit button with a custom label', async () => {
      render(<TodoListCollection list={list} submitLabel='custom label'/>)

      const { submit } = await showForm()

      expect(submit.value).toBe('custom label')
    })

    test('renders a submit button with a custom label function', async () => {
      render(<TodoListCollection list={list} submitLabel={() => 'custom label function'}/>)

      const { submit } = await showForm()

      expect(submit.value).toBe('custom label function')
    })
  })

  describe('with data', () => {

    let list: TodoList
    let todoList: Todo[]

    beforeEach(() => {
      list = db.lists[0]
      todoList = list.todos

      server.use(http.get('api/todos', () => HttpResponse.json(list.todos)))
      render(<TodoListCollection list={list}/>)
    })

    test('renders a list', async () => {
      const list = await screen.findByRole('list')

      expect(list).toBeInTheDocument()
    })

    test('renders all items', async () => {
      const items = await screen.findAllByRole('listitem')
      expect(items).toHaveLength(todoList.length)

      for (let i = 0; i < todoList.length; i++) {
        const todo = todoList[i]
        const checkbox = await screen.findByRole('checkbox', { name: `mark ${todo.title}` }) as HTMLInputElement

        expect(checkbox.checked).toBe(todo.completed)
      }
    })

    test('add item to the list', async () => {
      const initial = screen.getAllByRole('listitem')

      await submitNewTodo('new todo')

      const statusIndicator = await screen.findByRole('status')
      const { titleInput } = getForm()
      const itemsNow = screen.getAllByRole('listitem')

      // optimistic update assertions
      expect(statusIndicator).toBeInTheDocument()
      expect(titleInput).not.toBeInTheDocument()
      expect(itemsNow).toHaveLength(initial.length + 1)

      // wait for mutation settling
      await waitForElementToBeRemoved(() => screen.queryByRole('status'))

      const settledItems = screen.getAllByRole('listitem')
      const createdItem = screen.getByText(/new todo/i)

      // settled assertions
      expect(settledItems).toHaveLength(initial.length + 1)
      expect(createdItem).toBeInTheDocument()
    })

    test('shows error message if title is blank', async () => {
      const itemsThen = screen.getAllByRole('listitem')

      const { submit } = await showForm()

      await userEvent.click(submit)

      const itemsNow = screen.getAllByRole('listitem')
      const errorMessage = screen.getByLabelText('value error')

      expect(errorMessage).toBeInTheDocument()
      expect(itemsNow).toHaveLength(itemsThen.length)
    })

    test("clicking an item's edit button shows the form_components with the todo's title", async () => {
      const [ todoElement, todo ] = await getTodo()

      const editButton = within(todoElement).getByRole('button', { name: regex(`edit ${todo.title}`) })

      await userEvent.click(editButton)

      const titleInput = screen.getByRole('textbox') as HTMLInputElement
      expect(titleInput.value).toBe(todo.title)
    })

    test("marks a list item completed", async () => {
      const [ todoElement, _todo, index ] = await getTodo()

      const checkButton = within(todoElement).getByRole('checkbox') as HTMLInputElement
      const checkedThen = checkButton.checked

      await userEvent.click(checkButton)

      await waitFor(async () => {
        const [ updatedElement ] = getTodoSync(index)
        const checkButtonNow = within(updatedElement).getByRole('checkbox') as HTMLInputElement

        expect(checkButtonNow.checked).toBe(!checkedThen)
      })
    })

    test("updates a list item", async () => {
      const updatedTitle = await submitUpdateTodoWithTitle(" - Edited")

      const statusIndicator = await screen.findByRole('status')
      const updatedTodo = screen.getByText(updatedTitle)
      const { titleInput } = getForm()

      // optimistic update assertions
      expect(statusIndicator).toBeInTheDocument()
      expect(updatedTodo).toBeInTheDocument()
      expect(titleInput).not.toBeInTheDocument()

      // wait for mutation settling
      await waitForElementToBeRemoved(() => screen.queryByRole('status'))

      expect(screen.getByText(updatedTitle)).toBeInTheDocument()
    })

    test("clicking an item's delete button removes the item", async () => {
      const [ todoElement, todo ] = await getTodo()

      const deleteButton = within(todoElement).getByRole('button', { name: regex(`delete ${todo.title}`) })

      await userEvent.click(deleteButton)
      await waitForElementToBeRemoved(() => screen.queryByText(todo.title))
    })
  })
})
