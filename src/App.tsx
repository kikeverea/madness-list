import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TodoListItem from './todos/TodoList/TodoListItem.tsx'
import { isPersisted } from './todos/types.ts'

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <div className='m-8 h-full'>
        <TodoListItem submitLabel={todo => isPersisted(todo) ? "Save" : "Add"}/>
      </div>
    </QueryClientProvider>
  )
}

export default App
