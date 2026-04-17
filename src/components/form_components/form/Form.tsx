import Input, { type InputProps } from '../input/Input.tsx'
import type { FormHTMLAttributes } from 'react'

type FormProps =
  FormHTMLAttributes<HTMLFormElement> &
  {
    inputs: InputProps[]
    disabled?: boolean
  }

const Form = ({ inputs, ...props }: FormProps) => {

  return (
    <form {...props}>
      {inputs.map((input: InputProps, i: number) =>
        <div key={`${input.name}-${i}`} className="mb-4">
          <Input {...input} label={input.label ?? input.name} disabled={props.disabled || input.disabled}/>
        </div>
      )}
    </form>
  )
}

export default Form