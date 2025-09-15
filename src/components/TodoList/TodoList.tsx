import type { FormTodo, Todo } from './types.ts'
import TodoForm from './TodoForm.tsx'
import { useState } from 'react'
import TodoItem from '../TodoItem/TodoItem.tsx'
import useTodos from './useTodos.tsx'

type TodoListProps = {
  newButtonLabel?: string
  noItemsMessage?: string
  submitLabel?: string | ((todo: FormTodo) => string)
}

const TodoList = ({
  newButtonLabel = 'Add new',
  noItemsMessage = 'This list is empty',
  submitLabel,
}: TodoListProps) => {

  const [ formTodo, setFormTodo ] = useState<FormTodo | null>(null)
  const editTodo = (todo: Todo) => setFormTodo(todo)
  const hideForm = () => setFormTodo(null)

  const { todoList, save, remove } = useTodos({ onSave: hideForm })

  return (
    <div className='border border-grey-200 p-4 rounded w-full sm:w-[450px]'>
      <h6>To-Do List</h6>
      <div className='py-2'>
        {todoList?.length
          ? (
            <ul>
              {todoList.map((todo: Todo) =>
                <TodoItem key={todo.id} todo={todo} onEdit={editTodo} onDelete={() => remove(todo)}/>)
              }
            </ul>)
          : <p className='italic text-sm text-gray-500' aria-label='empty list message'>{noItemsMessage}</p>
        }
      </div>
      {formTodo !== null
        ? <TodoForm todo={formTodo} onSubmit={save} onCancel={hideForm} submitLabel={submitLabel}/>
        : (
          <button className='btn btn-primary' aria-label='add new todo' onClick={() => setFormTodo({})}>
            {newButtonLabel}
          </button>
        )
      }
    </div>
  )
}

export default TodoList
