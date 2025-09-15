import type { FormTodo } from './types.ts'
import { type FormEvent, useState } from 'react'

type TodoFormType = {
  todo: FormTodo,
  submitLabel?: string | ((todo: FormTodo) => string)
  onSubmit: (todo: FormTodo) => void,
  onCancel: () => void,
}

const TodoForm = ({ todo, submitLabel = 'Submit', onSubmit: onTodoSubmit, onCancel }: TodoFormType) => {

  const [ error, setError ] = useState<string | null>(null)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = new FormData(e.currentTarget)
    const formTodo = Object.fromEntries(data.entries())

    const title = String(formTodo['todo-title'] ?? "")

    if (!title)
      setError("title can't be blank")
    else
      onTodoSubmit({
        id: todo.id,
        title: title,
        completed: todo.completed ?? false,
      })
  }

  const submitButtonLabel = submitLabel ?? 'Submit'

  return (
    <form key={todo?.id || 'new'} onSubmit={onSubmit}>
      <div className='flex gap-4'>
        <input
          type='text'
          name='todo-title'
          className='flex-1 border rounded py-1 px-2'
          defaultValue={todo.title}
          placeholder='New to-do'
          aria-label='todo title'
        />
        {error &&
          <div className='text-red-500' aria-label='title error'>{error}</div>
        }

        <input
          type='submit'
          className='btn btn-primary'
          value={typeof submitButtonLabel === 'string' ? submitButtonLabel : submitButtonLabel(todo)}
          aria-label='submit todo'
        />
        <button
          type='button'
          className='btn btn-flush btn-color-muted btn-active-color-primary py-2 px-0'
          aria-label='cancel todo'
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default TodoForm