import type { ReactNode } from 'react'

type IconButtonProps = {
  icon: ReactNode,
  color?: string,
  buttonColor?: string,
  activeColor?: string,
  onClick: () => void,
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
  labeledBy,
  ariaLabel
}: IconButtonProps) => {

  const colorScheme = color
    ? `btn-color-muted btn-active-color-${color}`
    : `text-${buttonColor} hover:text-${activeColor}`

  return (
    <button
      className={`btn btn-flush ${colorScheme} text-sm ${className}`}
      onClick={() => onClick()}
      aria-labelledby={`${ariaLabel}-label ${labeledBy}`}
    >
      <span id={`${ariaLabel}-label`} aria-label={ariaLabel}>
        {icon}
      </span>
    </button>
  )
}

export default IconButton