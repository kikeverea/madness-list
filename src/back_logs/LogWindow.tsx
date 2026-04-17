import { useEffect, useRef } from 'react'

const LogWindow = () => {

  const terminalRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // plug to ws
  }, [])

  useEffect(() => {
    if (terminalRef.current)
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
  }, [])

  return (
    <div
      ref={terminalRef}
      className='scrollbar-modern border border-gray-400 rounded-md w-full h-[350px] font-mono overflow-y-scroll text-sm'
    >
      { Array.from({ length: 50 }).map((_, i) => {
        return (
          <div key={i}>
            {`Line ${i + 1}`}
          </div>
        )
      })}
    </div>
  )
}

export default LogWindow