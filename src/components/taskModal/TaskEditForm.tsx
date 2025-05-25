import { Task } from '@/redux/features/taskSlice'

interface TaskEditFormProps {
  title: string
  description: string
  time: number
  status: Task['status']
  disabled?: boolean
  onChangeTitle: (val: string) => void
  onChangeDescription: (val: string) => void
  onChangeTime: (val: number) => void
  onChangeStatus: (val: Task['status']) => void
}

export function TaskEditForm({
  title,
  description,
  time,
  status,
  disabled = false,
  onChangeTitle,
  onChangeDescription,
  onChangeTime,
  onChangeStatus,
}: TaskEditFormProps) {
  return (
    <div className='space-y-4'>
      <input
        type='text'
        value={title}
        onChange={e => onChangeTitle(e.target.value)}
        placeholder='Название'
        disabled={disabled}
        className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-lg'
      />
      <textarea
        value={description}
        onChange={e => onChangeDescription(e.target.value)}
        placeholder='Описание'
        rows={3}
        disabled={disabled}
        className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
      <input
        type='number'
        value={time}
        onChange={e => onChangeTime(Number(e.target.value))}
        min={1}
        disabled={disabled}
        className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
      <label className='block mb-1 font-medium'>Статус:</label>
      <select
        disabled={disabled}
        value={status}
        onChange={e => onChangeStatus(e.target.value as Task['status'])}
        className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
      >
        <option value='pending'>В ожидании</option>
        <option value='in_progress'>В процессе</option>
        <option value='done'>Выполнено</option>
      </select>
    </div>
  )
}
