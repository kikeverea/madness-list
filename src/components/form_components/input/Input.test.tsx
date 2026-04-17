import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Input from './Input.tsx'
import userEvent from '@testing-library/user-event'

describe('Input test', () => {
  test('renders a text box by default', () => {
    render(<Input />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  test('renders an form_components input', () => {
    render(<Input type='submit'/>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  test('renders an input with a given value', () => {
    render(<Input defaultValue='Initial value'/>)
    expect(screen.getByDisplayValue('Initial value')).toBeInTheDocument()
  })

  test('renders an input with a given placeholder', () => {
    render(<Input placeholder='test placeholder'/>)
    expect(screen.getByPlaceholderText('test placeholder')).toBeInTheDocument()
  })

  test('renders label', () => {
    render(<Input label='test label'/>)
    expect(screen.getByText('test label')).toBeInTheDocument()
    expect(screen.getByLabelText('test label')).toBeInTheDocument()
  })

  test('renders error', () => {
    const errorMessage = 'test error'
    render(<Input name='test-input' error={errorMessage} />)

    const error = screen.getByLabelText('test input error')

    expect(error).toBeInTheDocument()
    expect(error.textContent).toEqual('test error')
  })

  test('writing after error hides the error', async () => {
    render(<Input name='test-input' error='test error' />)

    const input = screen.getByRole('textbox')
    const error = screen.getByLabelText('test input error')

    expect(error).toBeInTheDocument()

    await userEvent.type(input, 'typing..')

    const errorNow = screen.queryByLabelText('test input error')
    expect(errorNow).not.toBeInTheDocument()
  })
})