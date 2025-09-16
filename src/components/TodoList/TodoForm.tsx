import { useState } from 'react'
import SingleValueForm, { type SingleValueFormType } from '../SingleValueForm.tsx'
import type { FormDataEntries } from '../../util/types.ts'
import type { FormTodo } from './types.ts'

const TodoForm = ({ value: todo, onSubmit: onTodoSubmit, submitLabel, onCancel }: SingleValueFormType<FormTodo>) => {

  const [ error, setError ] = useState<string | null>(null)

  const onSubmit = (data: FormDataEntries) => {
    const title = String(data['todo-title'] ?? "")

    if (!title)
      setError("title can't be blank")
    else
      onTodoSubmit({ id: todo.id, title: title, completed: todo.completed ?? false })
  }

  const submitButtonLabel = submitLabel ?? 'Submit'

  return (
    <SingleValueForm
      model='todo'
      formKey={todo?.id || 'new'}
      placeholder='New to-do'
      defaultValue={todo.title}
      submitLabel={typeof submitButtonLabel === 'string' ? submitButtonLabel : submitButtonLabel(todo)}
      onSubmit={onSubmit}
      onCancel={onCancel}
      error={error}
    />
  )
}

export default TodoForm