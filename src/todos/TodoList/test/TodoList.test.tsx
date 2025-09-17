import { beforeEach, describe, expect, test } from 'vitest'
import { http, HttpResponse } from 'msw'
import '@testing-library/jest-dom'
import { screen, waitFor, within } from '@testing-library/react'
import { server } from '../../../test/server.ts'
import userEvent from '@testing-library/user-event'
import TodoList from '../TodoList.tsx'
import type { Todo } from '../../types.ts'
import { render } from '../../../test/utils.tsx'
import { getForm, getTodo, showForm, list, getTodoSync, showListForm, getListForm } from './utils.ts'

describe('Todo List', () => {

  describe('no data', () => {

    beforeEach(() => {
      server.use(http.get('api/todos', () => HttpResponse.json({ todos: [] })))
    })

    test("renders the list's name", async () => {
      render(<TodoList name='list name'/>)

      const title = screen.getByRole('heading', { level: 6 })
      expect(title.textContent).toBe('list name')
    })

    test('renders a default list name if one is not provided', async () => {
      render(<TodoList/>)

      const title = screen.getByRole('heading', { level: 6 })
      expect(title.textContent).toBe('To-Do List')
    })

    test("clicking on the list edit button shows the list's form", async () => {
      const listName = 'test'

      render(<TodoList name={listName}/>)

      const namePattern = new RegExp(`edit ${listName}`, 'i')
      const editButton = screen.getByRole('button', { name: namePattern })

      await userEvent.click(editButton)

      const { nameInput, submit, cancel } = getListForm()

      expect(nameInput).toBeInTheDocument()
      expect(submit).toBeInTheDocument()
      expect(cancel).toBeInTheDocument()
    })

    test("clicking on the cancel list edit button hides the list's form", async () => {
      const listName = 'test'

      render(<TodoList name={listName}/>)

      const namePattern = new RegExp(`edit ${listName}`, 'i')
      const editButton = screen.getByRole('button', { name: namePattern })

      await userEvent.click(editButton)

      const { cancel } = getListForm()
      await userEvent.click(cancel)

      const { nameInput } = getListForm()

      expect(nameInput).not.toBeInTheDocument()
    })

    // test("updates the list's name", async () => {
    //   const listName = 'test'
    //
    //   render(<TodoList name={listName}/>)
    //
    //   const { nameInput, submit } = await showListForm(listName)
    //
    //   await userEvent.type(nameInput, 'new list name')
    //   await userEvent.click(submit)
    //
    //   const title = screen.getByRole('heading', { level: 6 })
    //
    //   expect(title.textContent).toBe('new list name')
    // })

    test('renders the empty message', async () => {
      render(<TodoList/>)

      const emptyMessage = screen.getByLabelText('empty list message')
      expect(emptyMessage.textContent).toBe('This list is empty')
    })

    test('renders a custom empty message', async () => {
      render(<TodoList noItemsMessage='Custom message'/>)

      const emptyMessage = screen.getByLabelText('empty list message')
      expect(emptyMessage.textContent).toBe('Custom message')
    })

    test('renders an add button', async () => {
      render(<TodoList/>)

      const button = await screen.findByRole('button', { name: /add new todo/i })

      expect(button).toBeInTheDocument()
    })

    test('renders an add button with a custom label', async () => {
      render(<TodoList newButtonLabel='new button label'/>)

      const button = await screen.findByRole('button', { name: /add new todo/i })

      expect(button.textContent).toBe('new button label')
    })

    test('clicking on the add new button, hides it and shows the add new form', async () => {
      render(<TodoList/>)

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

    test('clicking on the cancel button, hides the form', async () => {
      render(<TodoList/>)

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
      render(<TodoList submitLabel='custom label'/>)

      const { submit } = await showForm()

      expect(submit.value).toBe('custom label')
    })

    test('renders a submit button with a custom label function', async () => {
      render(<TodoList submitLabel={() => 'custom label function'}/>)

      const { submit } = await showForm()

      expect(submit.value).toBe('custom label function')
    })
  })

  describe('with data', () => {

    beforeEach(() => {
      server.use(http.get('api/todos', () => HttpResponse.json(list)))
      render(<TodoList/>)
    })

    test('renders a list', async () => {
      render(<TodoList/>)

      const list = await screen.findByRole('list')

      expect(list).toBeInTheDocument()
    })

    test('renders all items', async () => {
      const items = await screen.findAllByRole('listitem')

      expect(items).toHaveLength(list.length)

      list.forEach((item: Todo, index: number) => {
        const checkbox = screen.getByRole('checkbox', { name: item.title }) as HTMLInputElement
        const todo = list[index]

        expect(checkbox.checked).toBe(todo.completed)
      })
    })

    test('add item to the list', async () => {
      const itemsThen = await screen.findAllByRole('listitem')

      const { titleInput, submit } = await showForm()

      await userEvent.type(titleInput, 'new todo')
      await userEvent.click(submit)

      const itemsNow = screen.getAllByRole('listitem')
      const addedItem = itemsNow.find(item => item.textContent === 'new todo')

      const { titleInput: inputNow } = getForm()

      expect(itemsNow).toHaveLength(itemsThen.length + 1)
      expect(addedItem).toBeInTheDocument()
      expect(inputNow).not.toBeInTheDocument()
    })

    test('shows error message if title is blank', async () => {
      const itemsThen = await screen.findAllByRole('listitem')

      const { submit } = await showForm()

      await userEvent.click(submit)

      const itemsNow = screen.getAllByRole('listitem')
      const errorMessage = screen.getByLabelText('title error')

      expect(itemsNow).toHaveLength(itemsThen.length)
      expect(errorMessage).toBeInTheDocument()
    })

    test("clicking an item's edit button shows the form with the todo's title", async () => {
      const [ todoElement, todo ] = await getTodo()

      const titlePattern = new RegExp(`${todo.title} edit`, 'i')
      const editButton = within(todoElement).getByRole('button', { name: titlePattern })

      await userEvent.click(editButton)

      const titleInput = screen.getByRole('textbox') as HTMLInputElement
      expect(titleInput.value).toBe(todo.title)
    })

    test("checks a list item", async () => {
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

    test("update a list item", async () => {
      const [ todoElement, todo, index ] = await getTodo()
      const textThen = todoElement.textContent

      const titlePattern = new RegExp(`${todo.title} edit`, 'i')
      const editButton = within(todoElement).getByRole('button', { name: titlePattern })
      await userEvent.click(editButton)

      const { titleInput, submit } = getForm()
      await userEvent.type(titleInput, " - Edited")
      await userEvent.click(submit)

      await waitFor(async () => {
        const [ updatedElement ] = getTodoSync(index)

        expect(updatedElement.textContent).toBe(`${textThen} - Edited`)
      })
    })

    test("clicking an item's delete button removes the item", async () => {
      const [ todoElement, todo ] = await getTodo()

      const titlePattern = new RegExp(`${todo.title} delete`, 'i')
      const deleteButton = within(todoElement).getByRole('button', { name: titlePattern })

      await userEvent.click(deleteButton)

      expect(todoElement).not.toBeInTheDocument()
    })
  })
})
