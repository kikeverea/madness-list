import { useState } from 'react'
import SingleValueForm, { type SingleValueFormType } from '../../components/SingleValueForm.tsx'
import type { FormDataEntries } from '../../util/types.ts'

const ListForm = ({ value: listName, onSubmit: onListSubmit, onCancel }: SingleValueFormType<string>) => {

  const [ error, setError ] = useState<string | null>(null)

  const onSubmit = (data: FormDataEntries) => {
    const name = String(data['list-value'] ?? "")

    if (!name)
      setError("title can't be blank")
    else
      onListSubmit(name)
  }

  return (
    <SingleValueForm
      model='todo-list'
      formKey={listName}
      defaultValue={listName}
      submitLabel='Save'
      onSubmit={onSubmit}
      onCancel={onCancel}
      error={error}
      color='info'
    />
  )
}

export default ListForm