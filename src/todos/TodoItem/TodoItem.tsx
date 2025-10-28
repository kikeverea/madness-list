import type { FormTodo, Todo } from '../types.ts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash, faRotateRight } from '@fortawesome/free-solid-svg-icons'
import IconButton from '../../components/IconButton.tsx'
import LoadingIndicator from '../../assets/indicator.svg?react'

type TodoItemProps = {
  todo: Todo,
  onChecked: (todo: Todo) => void,
  onEdit: (todo: Todo) => void,
  onDelete: (todo: Todo) => void,
  pending?: boolean,
  error?: string,
  redoAction?: ((todo: Todo) => void) | ((todo: FormTodo) => void) | null
}

const TodoItem = ({ todo, onChecked, onEdit, onDelete, pending, error, redoAction }: TodoItemProps) => {

  return (
    <li className='p-2 group flex justify-between items-center hover:bg-gray-400 dark:hover:bg-gray-800'
        data-testid={`item-${todo.id}`}
    >

      {error
        ? <span className='flex-1 pe-2 text-red-800 italic'>
            {error}
          </span>
        : <span className='flex-1 pe-2'>
            {todo.title}
          </span>
      }

      <div className='flex items-center justify-end'>

        {/* Action Buttons */}
        {pending
          ?
          <div role='status'>
            <LoadingIndicator/>
          </div>
          :
          <>
            <div className='hidden group-hover:block'>
              <IconButton
                icon={<FontAwesomeIcon icon={faTrash}/>}
                color='danger'
                className='me-2'
                onClick={() => onDelete(todo)}
                ariaLabel={`delete ${todo.title}`}
                data-testid={`item-${todo.id}-delete-btn`}
              />

              <IconButton
                icon={<FontAwesomeIcon icon={faPen}/>}
                color='success'
                onClick={() => onEdit(todo)}
                ariaLabel={`edit ${todo.title}`}
                data-testid={`item-${todo.id}-edit-btn`}
              />
            </div>

            {error && redoAction &&
              <IconButton
                icon={<FontAwesomeIcon icon={faRotateRight}/>}
                color='success'
                onClick={() => redoAction(todo)}
                ariaLabel='redo action'
                data-testid={`item-${todo.id}-edit-btn`}
              />
            }

            <input
              id={String(todo.id)}
              type="checkbox"
              className='checkbox'
              checked={todo.completed}
              onChange={() => onChecked({ ...todo, completed: !todo.completed })}
              aria-label={`mark ${todo.title}`}
              data-testid={`item-${todo.id}-checkbox`}
            />
          </>
        }
      </div>
    </li>
  )
}

export default TodoItem