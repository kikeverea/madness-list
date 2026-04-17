import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Form from './Form.tsx'

describe('Form test', () => {

  test('renders all inputs', () => {
    render(<Form action="#" inputs={[
      { name: 'name' },
      { name: 'lastname' },
      { label: 'submit', type: 'submit' }
    ]} />)

    expect(screen.getByRole('textbox', { name: /^name/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /lastname/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
  })

  test('disabled form has all its inputs disabled', () => {
    render(<Form action="#" inputs={[ { name: 'name' }, { label: 'submit', type: 'submit' }]} disabled={ true } />)

    expect(screen.getByRole('textbox', { name: /name/i })).toBeDisabled()
    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled()
  })
})