import { useState } from 'react'

type AddTaskFormProps = {
  onAddTask: (title: string, description: string, time: number) => void
}

export default function AddTaskForm({ onAddTask }: AddTaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [time, setTime] = useState(30)

  const handleSubmit = () => {
    onAddTask(title, description, time)
    setTitle('')
    setDescription('')
    setTime(30)
  }

  return (
    <div className='mb-6'>
      <h2 className='text-xl font-semibold mb-2'>Добавить новую задачу</h2>
      <input
        type='text'
        placeholder='Название задачи'
        value={title}
        onChange={e => setTitle(e.target.value)}
        className='w-full mb-2 p-2 border rounded'
      />
      <textarea
        placeholder='Описание задачи'
        value={description}
        onChange={e => setDescription(e.target.value)}
        className='w-full mb-2 p-2 border rounded'
        rows={3}
      />
      <input
        type='number'
        placeholder='Время (минуты)'
        value={time}
        onChange={e => setTime(Number(e.target.value))}
        className='w-24 mb-2 p-2 border rounded'
        min={1}
      />
      <button
        onClick={handleSubmit}
        className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
      >
        Добавить
      </button>
    </div>
  )
}
