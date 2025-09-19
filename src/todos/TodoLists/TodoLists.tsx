import type {TodoList} from '../types.ts'
import {useQuery} from '@tanstack/react-query'
import api from './listsService.ts'
import TodoListItem from '../TodoList/TodoListItem.tsx'

type TodoListsProps = {
  lists: TodoList[]
}

const TodoLists = () => {

  const { data: todoLists, isLoading } = useQuery({ queryKey: [ 'lists' ], queryFn: api.getLists })

  return (
    <div className='flex flex-wrap gap-8'>
      {todoLists.map(todoList =>
        <TodoListItem todos={todoList.todos} />
      )}
    </div>
  )

}

export default TodoLists