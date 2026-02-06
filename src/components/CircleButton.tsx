import type { ReactNode } from 'react'
import Tooltip, { type TooltipType } from './Tooltip'

type CircleButtonProps = {
  icon: ReactNode,
  color?: string,
  hoverColor?: string,
  onClick: (args?: unknown) => void,
  ariaLabel?: string,
  className?: string,
  size?: string
  tooltip?: string | TooltipType
}

const getTooltip = (tooltip: string | TooltipType): TooltipType => {
  return typeof tooltip === 'string'
    ? { title: tooltip, position: 'top' }
    : tooltip
}

const sizes: Record<string, string[]> = {
  sm: [ 'w-[24px] h-[24px]', "text-[12px] mb-0.5" ],
  md: [ 'w-[32px] h-[32px]', "" ],
  lg: [ 'w-[48px] h-[48px]', "text-2xl" ],
}

const CircleButton = ({
  icon,
  color = 'bg-blue-400',
  hoverColor = 'hover:bg-blue-500',
  onClick,
  ariaLabel,
  size = 'md',
  tooltip,
  className,
}: CircleButtonProps) => {

  const tooltipProps = tooltip ? getTooltip(tooltip) : null
  const [ buttonSize, fontSize ] = sizes[size]

  const button = (
    <button
      type='button'
      className={`rounded-full ${color} ${hoverColor} ${buttonSize} cursor-pointer`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <div aria-hidden="true" className={fontSize}>{icon}</div>
    </button>
  )

  return (
    tooltipProps
      ? (
        <Tooltip title={tooltipProps.title} position={tooltipProps.position} className={className}>
          {button}
        </Tooltip>
      )
      : button
  )
}

export default CircleButton