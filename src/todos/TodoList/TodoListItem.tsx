import type { FormTodo, Todo, TodoList } from '../types.ts'
import TodoForm from './TodoForm.tsx'
import ListForm from './ListForm.tsx'
import { useState } from 'react'
import TodoItem from '../TodoItem/TodoItem.tsx'
import useTodos from './hooks/useTodos.tsx'
import IconButton from '../../components/IconButton.tsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import useListMutations from './hooks/useListMutations.tsx'

type TodoListProps = {
  list: TodoList
  newButtonLabel?: string
  noItemsMessage?: string
  submitLabel?: string | ((todo: FormTodo) => string)
}

const TodoListItem = ({
  list,
  newButtonLabel = 'Add new',
  noItemsMessage = 'This list is empty',
  submitLabel,
}: TodoListProps) => {

  const [ formTodo, setFormTodo ] = useState<FormTodo | null>(null)
  const [ editList, setEditList ] = useState<boolean>(false)

  const hideListForm = () => setEditList(false)
  const hideTodoForm = () => setFormTodo(null)

  const { listPending, listError, saveList, removeList } = useListMutations(list)
  const { todoList, status, save, remove } = useTodos(list)
  const { pending, errors } = status

  const saveTodo = (todo: FormTodo) => {
    save(todo)
    hideTodoForm()
  }

  return (
    <div className='border border-grey-200 pt-4 px-4 pb-6 rounded w-full sm:w-[450px]' aria-labelledby='list-name'>
      <header className='flex items-center justify-between group px-2'>
        {editList
          ? (
            <ListForm
              value={list.name}
              onSubmit={(name) => saveList({ ...list, name })}
              onCancel={hideListForm}
              submitLabel='Save'
            />)
          : (
            <>
              <h6 id='list-name' className='mb-2 underline-offset-8 underline'>
                {list.name}
              </h6>
              <IconButton
                className='hidden group-hover:block'
                icon={<FontAwesomeIcon icon={faPen}/>}
                color='success'
                onClick={() => setEditList(true)}
                ariaLabel={`edit ${list.name}`}
              />
            </>)
        }
      </header>

      <div className='py-2'>
        {todoList?.length || pending.creating
          ? (
            <ul>
              {todoList.map((todo: Todo) => {

                const pendingTodo = pending.current(todo)

                return (
                  <TodoItem
                    key={todo.id}
                    todo={pendingTodo || todo}
                    onChecked={saveTodo}
                    onEdit={setFormTodo}
                    onDelete={remove}
                    pending={!!pendingTodo}
                    error={errors.error(todo)}
                    redoAction={pending.updating ? saveTodo : pending.deleting ? remove : undefined}
                  />
                )
              })}
              {pending.creating &&
                <TodoItem
                  key='new-todo'
                  todo={{ ...pending.creating } as Todo}
                  onChecked={saveTodo}
                  onEdit={setFormTodo}
                  onDelete={remove}
                  pending={true}
                  redoAction={saveTodo}
                />
              }
            </ul>)
          : <p className='italic text-sm text-gray-500' aria-label='empty list message'>{noItemsMessage}</p>
        }
      </div>

      {formTodo !== null
        ? <TodoForm value={formTodo} onSubmit={saveTodo} onCancel={hideTodoForm} submitLabel={submitLabel}/>
        : (
          <button className='btn btn-primary mx-1' aria-label='add new todo' onClick={() => setFormTodo({})}>
            {newButtonLabel}
          </button>
        )
      }
    </div>
  )
}

export default TodoListItem
