import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TodoList from './components/TodoList/TodoList.tsx'

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <div className='m-8 h-full'>
        <TodoList/>
      </div>
    </QueryClientProvider>
  )
}

export default App
