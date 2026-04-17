import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TodoLists from './todos/TodoLists/TodoLists'
import tokenStorage from './user/tokenStorage'
import AuthPage from './user/AuthPage'

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <UserApp />
    </QueryClientProvider>
  )
}

function UserApp () {
  const sessionToken = tokenStorage.getToken()

  return sessionToken
    ? <div className='my-8 mx-4 md:mx-8 h-full'>
        <TodoLists />
      </div>
    : <AuthPage />
}

export default App
