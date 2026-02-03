import type { FormTodo, TodoList } from '../types.ts'
import ListForm from './ListForm.tsx'
import { useState } from 'react'
import IconButton from '../../components/IconButton.tsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import useTodoList from './useTodoList.tsx'
import TodoListCollection from '../TodoListCollection/TodoListCollection.tsx'

type TodoListProps = {
  list: TodoList
  newButtonLabel?: string
  submitLabel?: string | ((todo: FormTodo) => string),
  onRemove: (list: TodoList) => void,
}

const TodoListItem = ({
  list,
  newButtonLabel = 'Add new',
  submitLabel,
  onRemove
}: TodoListProps) => {

  const [ editList, setEditList ] = useState<boolean>(false)

  const hideListForm = () => setEditList(false)

  const { todoList, listPending, listError, saveList, removeList } = useTodoList(list)

  const saveTodoList = (name: string) => {
    saveList({ ...list, name})
    hideListForm()
  }

  return (
    <div
      id={`list-${list.id}`}
      className='border border-grey-200 pt-4 px-4 pb-6 rounded w-full sm:w-[450px]'
      aria-labelledby={`list-${list.id}-name`}
    >
      <header className='flex items-center justify-between group px-2'>
        {editList
          ? (
            <ListForm
              value={todoList.name}
              onSubmit={saveTodoList}
              onCancel={hideListForm}
              submitLabel='Save'
            />)
          : (
            <>
              <h6 id={`list-${list.id}-name`} className='mb-2 underline-offset-8 underline'>
                {todoList.name}
              </h6>
              <IconButton
                className='hidden group-hover:block'
                icon={<FontAwesomeIcon icon={faTrash}/>}
                color='danger'
                onClick={() => onRemove(todoList) }
                ariaLabel={`delete ${todoList.name}`}
              />
              <IconButton
                className='hidden group-hover:block'
                icon={<FontAwesomeIcon icon={faPen}/>}
                color='success'
                onClick={() => setEditList(true)}
                ariaLabel={`edit ${todoList.name}`}
              />
            </>)
        }
      </header>

      <TodoListCollection
        list={list}
        submitLabel={submitLabel}
        newButtonLabel={newButtonLabel}
      />
    </div>
  )
}

export default TodoListItem
