import TodoListItem from '../TodoList/TodoListItem'
import useTodoLists from './useTodoLists'
import LoadingIndicator from '../../components/LoadingIndicator'

const TodoLists = () => {

  const { lists, create, remove, status } = useTodoLists()
  const { pending, errors } = status

  return (
    <div className='flex flex-wrap gap-8 relative'>
      { lists?.map(list =>
        <TodoListItem key={list.id} list={list} onRemove={remove}/>)
      }
      { pending.creating && <LoadingIndicator /> }
      <button
        type='button'
        className='btn absolute'
        aria-label='new list'
        onClick={ create }
      >
        Add new list
      </button>
    </div>
  )

}

export default TodoLists