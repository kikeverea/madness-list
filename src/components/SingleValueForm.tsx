import type { FormEvent } from 'react'
import type { FormDataEntries } from '../util/types.ts'

export type SingleValueFormType<T> = {
  value: T,
  submitLabel?: string | ((value: T) => string)
  onSubmit: (value: T) => void,
  onCancel: () => void,
}

type SingleValueFormProps = {
  formKey: string | number
  model: string
  placeholder?: string
  defaultValue: string | undefined
  submitLabel?: string
  onSubmit: (data: FormDataEntries) => void
  onCancel: () => void
  error: string | null
  color?: string
}

const SingleValueForm = ({
  formKey,
  model,
  placeholder,
  defaultValue,
  submitLabel = 'Submit',
  onSubmit,
  onCancel,
  error,
  color = 'primary',
}: SingleValueFormProps) => {

  const onFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    const data = new FormData(e.currentTarget)
    onSubmit(Object.fromEntries(data.entries()))
  }

  return (
    <div className='w-full px-2'>
      <form key={formKey} onSubmit={onFormSubmit}>
        <div className='flex gap-4 items-center w-full'>

          <input
            type='text'
            name={`${model}-value`}
            className='flex-1 border rounded py-1 px-2 w-full'
            defaultValue={defaultValue}
            placeholder={placeholder}
            aria-label={`${model} value`}
          />

          <input
            type='submit'
            className={`btn btn-${color}`}
            value={submitLabel}
            aria-label={`submit ${model}`}
          />
          <button
            type='button'
            className={`btn btn-flush btn-color-muted btn-active-color-${color} py-2 px-0`}
            aria-label={`cancel ${model}`}
            onClick={() => onCancel()}
          >
            Cancel
          </button>
        </div>
        {error && <div className='text-red-500 ps-1 pt-1 text-sm' aria-label='value error'>{error}</div>}
      </form>
    </div>
  )
}

export default SingleValueForm