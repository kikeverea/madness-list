import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TodoList from './todos/TodoList/TodoList.tsx'
import { isPersisted } from './todos/types.ts'

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <div className='m-8 h-full'>
        <TodoList submitLabel={todo => isPersisted(todo) ? "Save" : "Add"}/>
      </div>
    </QueryClientProvider>
  )
}

export default App
