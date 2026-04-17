import type { InputHTMLAttributes } from 'react'
import { capitalize, humanize } from '../../../util/text.ts'

export type InputProps =
  InputHTMLAttributes<HTMLInputElement> &
  { error?: string, color?: string, label?: string }

const Input = ({
  className='',
  type='text',
  name='field',
  color,
  label,
  error,
...props }: InputProps) => {

  const defaultClassName = type === 'submit'
    ? `btn btn-${color || 'primary'}`
    : 'flex-1 border rounded py-1 px-2 w-full'

  const disabledClassName = `${type !== 'submit' ? 'disabled:border-gray-600' : ''} disabled:opacity-40`

  const id = props.id || `${name}-input`
  const humanizedName = humanize(name, { capitalize: true })

  return (
    (
      <>
        { label &&
          <label htmlFor={id} className={`text-sm font-label ${props.disabled ? 'text-gray-600' : ''}`}>
            {capitalize(label)}
          </label>
        }
        <input
          {...props}
          id={ id }
          name={ name }
          type={ type }
          className={`${defaultClassName} ${className} ${disabledClassName} ${label ? 'mt-1' : ''}`}
          aria-label={ label ? undefined : humanizedName }
        />
        {error &&
          <div
            className='text-red-500 ps-1 pt-1 text-sm'
            aria-label={`${humanizedName} error`}
          >
            {error}
          </div>
        }
      </>
    )
  )
}

export default Input