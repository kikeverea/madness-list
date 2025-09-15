import type { Todo } from './types.ts'
import TodoForm from './TodoForm.tsx'
import { useState } from 'react'
import TodoItem from '../TodoItem/TodoItem.tsx'
import useTodos from './useTodos.tsx'

type TodoListProps = {
  newButtonLabel?: string
  noItemsMessage?: string
  submitLabel?: string
}

const TodoList = ({
  newButtonLabel = 'Add new +',
  noItemsMessage = 'This list is empty',
  submitLabel = 'Submit',
}: TodoListProps) => {

  const { todoList, save, remove } = useTodos()

  const [ formTodo, setFormTodo ] = useState<Partial<Todo> | null>(null)
  const editTodo = (todo: Todo) => setFormTodo(todo)

  return (
    <div className='border border-grey-200 p-4 rounded'>
      <h6>To-Do List</h6>
      {todoList?.length
        ? (
          <ul>
            {todoList.map((todo: Todo) =>
              <TodoItem key={todo.id} todo={todo} onEdit={editTodo} onDelete={() => remove(todo)}/>)
            }
          </ul>)
        : <p aria-label='empty list message'>{noItemsMessage}</p>
      }

      {formTodo !== null
        ? <TodoForm todo={formTodo} onSubmit={save} submitLabel={submitLabel}/>
        : (
          <button aria-label='add new todo' onClick={() => setFormTodo({})}>
            {newButtonLabel}
          </button>
        )
      }
    </div>
  )
}

export default TodoList
