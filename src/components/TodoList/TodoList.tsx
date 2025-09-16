import type { FormTodo, Todo } from './types.ts'
import TodoForm from './TodoForm.tsx'
import { useState } from 'react'
import TodoItem from '../TodoItem/TodoItem.tsx'
import useTodos from './useTodos.tsx'

type TodoListProps = {
  name?: string
  newButtonLabel?: string
  noItemsMessage?: string
  submitLabel?: string | ((todo: FormTodo) => string)
}

const TodoList = ({
  name = 'To-Do List',
  newButtonLabel = 'Add new',
  noItemsMessage = 'This list is empty',
  submitLabel,
}: TodoListProps) => {

  const [ formTodo, setFormTodo ] = useState<FormTodo | null>(null)
  const hideForm = () => setFormTodo(null)

  const { todoList, save, remove } = useTodos({ onSave: hideForm })

  return (
    <div className='border border-grey-200 pt-4 px-6 pb-6 rounded w-full sm:w-[450px]'>
      <h6 className='mb-2 underline-offset-8 underline'>
        {name}
      </h6>

      <div className='py-2'>
        {todoList?.length
          ? (
            <ul>
              {todoList.map((todo: Todo) =>
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onChecked={save}
                  onEdit={setFormTodo}
                  onDelete={remove}
                />)
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
