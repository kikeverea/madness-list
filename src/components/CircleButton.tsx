import type { ReactNode } from 'react'
import Tooltip, { type TooltipType } from './Tooltip'

type CircleButtonProps = {
  icon: ReactNode,
  color?: string,
  hoverColor?: string,
  onClick: (args?: unknown) => void,
  ariaLabel?: string,
  className?: string,
  size?: number
  tooltip?: string | TooltipType
}

const getTooltip = (tooltip: string | TooltipType): TooltipType => {
  return typeof tooltip === 'string'
    ? { title: tooltip, position: 'top' }
    : tooltip
}

const CircleButton = ({
  icon,
  color = 'bg-blue-400',
  hoverColor = 'hover:bg-blue-500',
  onClick,
  ariaLabel,
  size = 32,
  tooltip,
  className,
}: CircleButtonProps) => {

  const tooltipProps = tooltip ? getTooltip(tooltip) : null

  const button = (
    <button
      type='button'
      className={`rounded-full ${color} ${hoverColor} w-[${size}px] h-[${size}px] cursor-pointer`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <span aria-hidden="true">{icon}</span>
    </button>
  )

  return (
    tooltipProps
      ? (
        <Tooltip title={tooltipProps.title} position={tooltipProps.position} className={className}>
          { button }
        </Tooltip>
      )
      : button
  )
}

export default CircleButton