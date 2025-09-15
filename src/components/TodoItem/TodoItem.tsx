import type { Todo } from '../TodoList/types.ts'
import styles from './TodoItem.module.css'

type TodoItemProps = {
  todo: Todo,
  onEdit: (todo: Todo) => void,
  onDelete: (todo: Todo) => void,
}

const TodoItem = ({ todo, onEdit, onDelete }: TodoItemProps) => {
  return (
    <li className={ styles.todo }>
      <label htmlFor={ String(todo.id) } id={ `todo-${todo.id}-title`}>
        { todo.title }
        <input id={ String(todo.id) } type="checkbox" checked={ todo.completed } onChange={() => {}}/>
      </label>

      {/* Action Buttons*/}
      <div className={ styles.buttonsContainer }>
        <button onClick={ () => onEdit(todo) } aria-labelledby={`todo-${todo.id}-title edit-label`}>
          <span id='edit-label' aria-label='edit'></span>
        </button>

        <button onClick={ () => onDelete(todo) } aria-labelledby={`todo-${todo.id}-title delete-label`}>
          <span id='delete-label' aria-label='delete'></span>
        </button>
      </div>
    </li>
  )
}

export default TodoItem