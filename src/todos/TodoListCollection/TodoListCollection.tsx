import type { FormTodo, Todo, TodoList } from '../types.ts'
import useTodos from './useTodos.tsx'
import TodoItem from '../TodoItem/TodoItem.tsx'
import { useState } from 'react'
import TodoForm from '../TodoList/TodoForm.tsx'

type TodoCollectionProps = {
  list: TodoList
  newButtonLabel?: string
  submitLabel?: string | ((todo: FormTodo) => string)
}

const TodoListCollection = ({
  list,
  newButtonLabel = 'Add new',
  submitLabel,
}: TodoCollectionProps) => {

  const [ formTodo, setFormTodo ] = useState<FormTodo | null>(null)
  const { todos, status, save, remove } = useTodos(list)
  const { pending, errors } = status

  const hideTodoForm = () => setFormTodo(null)

  const saveTodo = (todo: FormTodo) => {
    save(todo)
    hideTodoForm()
  }

  return (
    <>
      <div className='py-2' aria-labelledby={`list-${list.id}-name`}>
        <ul>
          { todos?.map((todo: Todo) => {

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
          { pending.creating &&
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
        </ul>
      </div>

      {formTodo !== null
        ? <TodoForm value={formTodo} onSubmit={saveTodo} onCancel={hideTodoForm} submitLabel={submitLabel}/>
        : (
          <button className='btn btn-primary mx-1' aria-label='add new todo' onClick={() => setFormTodo({})}>
            {newButtonLabel}
          </button>
        )
      }
    </>
  )
}

export default TodoListCollection