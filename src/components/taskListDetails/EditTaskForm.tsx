import { Task } from '@/redux/features/taskSlice'
import { useState } from 'react'

type EditTaskFormProps = {
  task: Task
  onSave: (task: Task) => void
  onCancel: () => void
}

export default function EditTaskForm({
  task,
  onSave,
  onCancel,
}: EditTaskFormProps) {
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
  const [time, setTime] = useState(task.time)
  const [status, setStatus] = useState<Task['status']>(task.status)

  const handleSave = () => {
    if (!title.trim()) return
    onSave({
      ...task,
      title,
      description,
      time,
      status,
    })
  }

  return (
    <div>
      <input
        type='text'
        value={title}
        onChange={e => setTitle(e.target.value)}
        className='w-full mb-2 p-2 border rounded'
      />
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        className='w-full mb-2 p-2 border rounded'
        rows={3}
      />
      <input
        type='number'
        value={time}
        onChange={e => setTime(Number(e.target.value))}
        className='w-24 mb-2 p-2 border rounded'
        min={1}
      />
      <select
        value={status}
        onChange={e => setStatus(e.target.value as Task['status'])}
        className='mb-2 p-2 border rounded'
      >
        <option value='pending'>В ожидании</option>
        <option value='in-progress'>В процессе</option>
        <option value='done'>Выполнено</option>
      </select>
      <div>
        <button
          onClick={handleSave}
          className='mr-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'
        >
          Сохранить
        </button>
        <button
          onClick={onCancel}
          className='px-4 py-2 bg-gray-300 rounded hover:bg-gray-400'
        >
          Отмена
        </button>
      </div>
    </div>
  )
}
