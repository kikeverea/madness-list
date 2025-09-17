import type { Todo } from '../types.ts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import IconButton from '../../components/IconButton.tsx'

type TodoItemProps = {
  todo: Todo,
  onChecked: (todo: Todo) => void,
  onEdit: (todo: Todo) => void,
  onDelete: (todo: Todo) => void,
}

const TodoItem = ({ todo, onChecked, onEdit, onDelete }: TodoItemProps) => {
  return (
    <li className='p-2 group flex justify-between items-center hover:bg-gray-400 dark:hover:bg-gray-800'>

      <span className='flex-1 pe-2'>
        {todo.title}
      </span>

      <div className='flex items-center justify-end'>

        {/* Action Buttons */}
        <div className='hidden group-hover:block'>
          <IconButton
            icon={<FontAwesomeIcon icon={faTrash}/>}
            color='danger'
            className='me-2'
            onClick={() => onDelete(todo)}
            ariaLabel={`delete ${todo.title}`}
          />

          <IconButton
            icon={<FontAwesomeIcon icon={faPen}/>}
            color='success'
            onClick={() => onEdit(todo)}
            ariaLabel={`edit ${todo.title}`}
          />
        </div>

        <input
          id={String(todo.id)}
          className='checkbox'
          type="checkbox"
          checked={todo.completed}
          onChange={() => onChecked({ ...todo, completed: !todo.completed })}
          aria-label={`mark ${todo.title}`}
        />
      </div>
    </li>
  )
}

export default TodoItem