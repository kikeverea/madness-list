import type { Todo } from '../TodoList/types.ts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

type TodoItemProps = {
  todo: Todo,
  onEdit: (todo: Todo) => void,
  onDelete: (todo: Todo) => void,
}

const TodoItem = ({ todo, onEdit, onDelete }: TodoItemProps) => {
  return (
    <li className='py-1'>
      <label htmlFor={String(todo.id)} id={`todo-${todo.id}-title`} className='flex justify-between w-full'>
        {todo.title}
        <input
          id={String(todo.id)}
          className='
            appearance-none
            ms-4
            h-[20px] w-[20px]
            border border-gray-400
            rounded-full
            checked:bg-blue-600
            checked:border-blue-600
            checked:[&:after]:content-["✓"]
            checked:[&:after]:text-white
            checked:[&:after]:text-xs
            checked:[&:after]:flex
            checked:[&:after]:items-center
            checked:[&:after]:justify-center'
          type="checkbox"
          checked={todo.completed}
          onChange={() => {
          }}
        />
      </label>

      {/* Action Buttons */}
      <div className='flex gap-4 py-2'>
        <button onClick={() => onEdit(todo)} aria-labelledby={`todo-${todo.id}-title edit-label`}>
          <span id='edit-label' aria-label='edit'>
            <FontAwesomeIcon icon={faPen}/>
          </span>
        </button>

        <button onClick={() => onDelete(todo)} aria-labelledby={`todo-${todo.id}-title delete-label`}>
          <span id='delete-label' aria-label='delete'></span>
        </button>
      </div>
    </li>
  )
}

export default TodoItem