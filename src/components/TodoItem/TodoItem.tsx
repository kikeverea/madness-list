import type { Todo } from '../TodoList/types.ts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import IconButton from '../IconButton.tsx'

type TodoItemProps = {
  todo: Todo,
  onChecked: (todo: Todo) => void,
  onEdit: (todo: Todo) => void,
  onDelete: (todo: Todo) => void,
}

const TodoItem = ({ todo, onChecked, onEdit, onDelete }: TodoItemProps) => {
  return (
    <li className='py-2 gap-4 group hover:bg-gray-400 dark:hover:bg-gray-800'>
      <label htmlFor={String(todo.id)} id={`todo-${todo.id}-title`}
        className='flex justify-between items-center w-full'
      >
        {todo.title}

        <div className='flex items-center justify-end'>

          {/* Action Buttons */}
          <div className='hidden group-hover:block'>
            <IconButton
              icon={<FontAwesomeIcon icon={faTrash}/>}
              color='danger'
              className='me-2'
              onClick={() => onDelete(todo)}
              ariaLabel='delete'
              labeledBy={`todo-${todo.id}-title`}
            />

            <IconButton
              icon={<FontAwesomeIcon icon={faPen}/>}
              color='success'
              className='me-2'
              onClick={() => onEdit(todo)}
              ariaLabel='edit'
              labeledBy={`todo-${todo.id}-title`}
            />
          </div>

          <input
            id={String(todo.id)}
            className='checkbox'
            type="checkbox"
            checked={todo.completed}
            onChange={() => onChecked({ ...todo, completed: !todo.completed })}
          />
        </div>

      </label>
    </li>
  )
}

export default TodoItem