import type { ReactNode } from 'react'

type IconButtonProps = {
  icon: ReactNode,
  color?: string,
  buttonColor?: string,
  activeColor?: string,
  onClick: (args?: unknown) => void,
  labeledBy?: string,
  ariaLabel?: string,
  className?: string,
}

const IconButton = ({
  icon,
  color,
  buttonColor,
  activeColor,
  onClick,
  className,
  ariaLabel
}: IconButtonProps) => {

  const colorScheme = color
    ? `btn-color-muted btn-active-color-${color}`
    : `text-${buttonColor} hover:text-${activeColor}`

  return (
    <button
      className={`btn btn-flush ${colorScheme} text-sm ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <span aria-hidden="true">{icon}</span>
    </button>
  )
}

export default IconButton