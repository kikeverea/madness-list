import type { ReactNode } from 'react'

export type TooltipType = {
  title: string,
  position?: 'top' | 'right' | 'bottom' | 'left',
}

type TooltipProps = TooltipType & {
  children: ReactNode,
  className?: string
}

const positionClasses: Record<string, string> = {
  top: 'bottom-full mb-1 left-1/2 -translate-x-1/2',
  right: 'left-full ms-2 top-1/2 -translate-y-1/2',
  bottom: 'top-full mt-1 left-1/2 -translate-x-1/2 mb-1',
  left: 'right-full me-2 top-1/2 -translate-y-1/2',
}

const Tooltip = ({ title, position = 'top', children, className }: TooltipProps) => {

  return (
    <div className={`relative group overflow-visible ${className}`}>
      {children}
      <div className={`
        absolute ${positionClasses[position]}
        bg-white text-black px-2 py-0.5 rounded-md text-sm w-max
        hidden group-hover:block
        pointer-events-none`}
      >
        {title}
      </div>
    </div>
  )
}

export default Tooltip