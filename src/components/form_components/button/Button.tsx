import type { ButtonHTMLAttributes } from 'react'

const TYPES = ['primary', 'secondary'] as const
const COLORS = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'] as const

type ButtonStyle = typeof TYPES[number]
type ButtonColor = typeof COLORS[number]
type ButtonProps =
  ButtonHTMLAttributes<HTMLButtonElement> &
  { label: string, color?: ButtonColor, styleType?: ButtonStyle }

const styleClasses = (styleType: ButtonStyle, color: ButtonColor): string => {
  const buttonColor = color && COLORS.includes(color) ?
    colorForStyle(styleType, color) :
    color

  return `btn ${buttonColor}`
}

const colorForStyle = (style: ButtonStyle, color: ButtonColor) => {

  console.log(style === 'primary'
    ? `btn-${color}`
    : `btn-color-muted btn-active-color-${color}`)

  return style === 'primary'
    ? `btn-${color}`
    : `btn-color-muted btn-active-color-${color}`
}

const Button = ({
  label,
  styleType='primary',
  color='primary',
  ...props }: ButtonProps) =>
{
  return (
    <button
      type='button'
      className={ styleClasses(styleType, color)}
      {...props}
    >
      { label }
    </button>
  )
}

export default Button