import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TodoLists from './todos/TodoLists/TodoLists'

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <div className='my-8 mx-4 md:mx-8 h-full'>
        <TodoLists />
      </div>
    </QueryClientProvider>
  )
}

export default App
