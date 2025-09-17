import type { FormTodo, Todo } from '../types.ts'
import TodoForm from './TodoForm.tsx'
import ListForm from './ListForm.tsx'
import { useState } from 'react'
import TodoItem from '../TodoItem/TodoItem.tsx'
import useTodos from './hooks/useTodos.tsx'
import IconButton from '../../components/IconButton.tsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

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
  const [ editList, setEditList ] = useState<boolean>(false)

  const hideListForm = () => setEditList(false)
  const hideTodoForm = () => setFormTodo(null)

  const { todoList, save, remove } = useTodos({ onSave: hideTodoForm })

  return (
    <div className='border border-grey-200 pt-4 px-4 pb-6 rounded w-full sm:w-[450px]' aria-labelledby='list-name'>
      <header className='flex items-center justify-between group px-2'>
        {editList
          ? <ListForm value={name} onSubmit={() => ({})} onCancel={hideListForm} submitLabel='Save'/>
          : (
            <>
              <h6 id='list-name' className='mb-2 underline-offset-8 underline'>
                {name}
              </h6>
              <IconButton
                className='hidden group-hover:block'
                icon={<FontAwesomeIcon icon={faPen}/>}
                color='success'
                onClick={() => setEditList(true)}
                ariaLabel={`edit ${name}`}
              />
            </>)
        }

      </header>

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
        ? <TodoForm value={formTodo} onSubmit={save} onCancel={hideTodoForm} submitLabel={submitLabel}/>
        : (
          <button className='btn btn-primary mx-1' aria-label='add new todo' onClick={() => setFormTodo({})}>
            {newButtonLabel}
          </button>
        )
      }
    </div>
  )
}

export default TodoList
