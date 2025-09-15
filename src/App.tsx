import './App.css'
import { QueryClientProvider, useQueryClient } from '@tanstack/react-query'

function App() {
  const queryClient = useQueryClient()

  return (
    <>
      <QueryClientProvider client={queryClient}/>
    </>
  )
}

export default App
