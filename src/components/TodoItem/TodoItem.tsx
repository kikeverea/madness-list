import type { Todo } from '../TodoList/types.ts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import IconButton from '../IconButton.tsx'

type TodoItemProps = {
  todo: Todo,
  onEdit: (todo: Todo) => void,
  onDelete: (todo: Todo) => void,
}

const TodoItem = ({ todo, onEdit, onDelete }: TodoItemProps) => {
  return (
    <li className='py-2 gap-4 group hover:bg-gray-400 dark:hover:bg-gray-800'>
      <label htmlFor={String(todo.id)} id={`todo-${todo.id}-title`} className='flex justify-between items-center w-full'>
        {todo.title}

        <div className='flex items-center justify-end'>

          {/* Action Buttons */}
          <div className='hidden group-hover:block'>
            <IconButton
              icon={<FontAwesomeIcon icon={faTrash}/>}
              color='danger'
              onClick={() => onDelete(todo)}
              ariaLabel='delete'
              labeledBy={`todo-${todo.id}-title`}
            />

            <IconButton
              icon={<FontAwesomeIcon icon={faPen}/>}
              color='success'
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
            onChange={() => {
            }}
          />
        </div>

      </label>
    </li>
  )
}

export default TodoItem