import TodoListItem from '../TodoList/TodoListItem'
import useTodoLists from './useTodoLists'
import LoadingIndicator from '../../components/LoadingIndicator'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../../components/CircleButton.tsx'
import LogWindow from '../../back_logs/LogWindow.tsx'

const TodoLists = () => {

  const { lists, create, remove, status } = useTodoLists()
  const { pending } = status

  return (
    <div className="flex gap-4">
      <div className="flex items-start gap-4 flex-1">
        <div className='flex flex-wrap gap-8 relative flex-1'>
          {lists?.map(list =>
            <TodoListItem key={list.id} list={list} onRemove={remove}/>)
          }
          {pending.creating && <LoadingIndicator/>}
        </div>
        <CircleButton
          tooltip={{ title: 'Nueva lista', position: 'left' }}
          icon={<FontAwesomeIcon icon={faPlus}/>}
          onClick={create}
          ariaLabel='new list'
        />
      </div>
      <div className="flex-1">
        <LogWindow />
      </div>
    </div>
  )
}

export default TodoLists