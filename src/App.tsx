import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TodoListItem from './todos/TodoList/TodoListItem.tsx'
import { isPersisted } from './todos/types.ts'
import TodoLists from './todos/TodoLists/TodoLists.tsx'

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <div className='my-8 mx-4 md:mx-8 h-full'>
        <TodoLists list={{ id: 1, name: 'list', todos: []}} submitLabel={todo => isPersisted(todo) ? "Save" : "Add"}/>
      </div>
    </QueryClientProvider>
  )
}

export default App
