import { beforeEach, describe, expect, test } from 'vitest'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SingleValueForm from './SingleValueForm.tsx'

describe('Todo Item', () => {

  const onSubmitMock = vi.fn()
  const onCancelMock = vi.fn()

  const model = 'test'

  const valuePattern = new RegExp(`${model} value`, 'i')
  const submitPattern = new RegExp(`submit ${model}`, 'i')
  const cancelPattern = new RegExp(`cancel ${model}`, 'i')

  beforeEach(() => {
    onSubmitMock.mockClear()
    onCancelMock.mockClear()

    render(
      <SingleValueForm
        model={model}
        formKey={'form'}
        placeholder='add new value'
        defaultValue=''
        submitLabel='submit label'
        onSubmit={onSubmitMock}
        onCancel={onCancelMock}
        error='form error'
      />
    )
  })

  test('renders its value input', () => {
    const input = screen.getByRole('textbox', { name: valuePattern })
    expect(input).toBeInTheDocument()
  })

  test('renders its value input placeholder', () => {
    const input = screen.getByRole('textbox', { name: valuePattern }) as HTMLInputElement
    expect(input.placeholder).toBe('add new value')
  })

  test('renders its submit button', () => {
    const submit = screen.getByRole('button', { name: submitPattern })
    expect(submit).toBeInTheDocument()
  })

  test('renders its submit button label', () => {
    const submit = screen.getByRole('button', { name: submitPattern }) as HTMLInputElement
    expect(submit.value).toBe('submit label')
  })

  test('renders its cancel button', () => {
    const cancel = screen.getByRole('button', { name: cancelPattern })
    expect(cancel).toBeInTheDocument()
  })

  test('renders error if present', () => {
    const error = screen.getByLabelText('value error')
    expect(error.textContent).toBe('form error')
  })

  test('clicking the submit button calls its handler', async () => {
    const input = screen.getByRole('textbox', { name: valuePattern })
    const submit = screen.getByRole('button', { name: submitPattern })

    await userEvent.type(input, 'new value')
    await userEvent.click(submit)

    expect(onSubmitMock).toHaveBeenCalledWith({ "test-value": "new value" })
  })

  test('clicking the cancel button calls its handler', async () => {
    const cancel = screen.getByRole('button', { name: cancelPattern })

    await userEvent.click(cancel)

    expect(onCancelMock).toHaveBeenCalledOnce()
  })
})