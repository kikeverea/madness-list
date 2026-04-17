import type { FormEvent } from 'react'
import type { FormDataEntries } from '../../util/types.ts'
import Input from './input/Input.tsx'
import Button from './button/Button.tsx'

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
  className?: string
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
  className = '',
}: SingleValueFormProps) => {

  const onFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    const data = new FormData(e.currentTarget)
    onSubmit(Object.fromEntries(data.entries()))
  }

  return (
    <div className={`w-full ${className}`}>
      <form key={formKey} onSubmit={onFormSubmit}>
        <div className='flex gap-4 items-center w-full'>

          <Input
            name={`${model}-value`}
            defaultValue={ defaultValue }
            placeholder={ placeholder }
            aria-label={`${model} value`}
          />

          <Input type='submit' value={submitLabel} aria-label={`submit ${model}`}/>
          <Button
            styleType='secondary'
            aria-label={`cancel ${model}`}
            onClick={() => onCancel()}
          >
            Cancel
          </Button>
        </div>
        {error && <div className='text-red-500 ps-1 pt-1 text-sm' aria-label='value error'>{error}</div>}
      </form>
    </div>
  )
}

export default SingleValueForm