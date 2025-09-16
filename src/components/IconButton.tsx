import type {ReactNode} from 'react'

type IconButtonProps = {
  icon: ReactNode,
  color?: string,
  buttonColor?: string,
  activeColor?: string,
  onClick: () => void,
  labeledBy?: string,
  ariaLabel?: string,
}

const IconButton = ({ icon, color, buttonColor, activeColor, onClick, labeledBy, ariaLabel }: IconButtonProps) => {

  const colorScheme = color
    ? `btn-color-muted btn-active-color-${color}`
    : `text-${buttonColor} hover:text-${activeColor}`

  return (
    <button
      className={`btn btn-flush ${colorScheme} me-2 text-sm`}
      onClick={() => onClick()}
      aria-labelledby={labeledBy}
    >
      <span id={`${ariaLabel}-label`} aria-label={ariaLabel}>
        { icon }
      </span>
    </button>
  )
}

export default IconButton