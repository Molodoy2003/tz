import { Task } from '@/redux/features/taskSlice'
import { useState } from 'react'
import EditTaskForm from './EditTaskForm'

type TaskItemProps = {
  task: Task
  onDelete: () => void
  onUpdate: (task: Task) => void
  onOpenModal: () => void
}

export default function TaskItem({
  task,
  onDelete,
  onUpdate,
  onOpenModal,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)

  const startEdit = () => setIsEditing(true)
  const cancelEdit = () => setIsEditing(false)

  const saveEdit = (updatedTask: Task) => {
    onUpdate(updatedTask)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <li className='mb-4 p-4 border rounded'>
        <EditTaskForm task={task} onCancel={cancelEdit} onSave={saveEdit} />
      </li>
    )
  }

  return (
    <li className='mb-4 p-4 border rounded flex justify-between items-center'>
      <div>
        <h3
          className={
            task.status === 'done'
              ? 'line-through text-gray-500 font-semibold'
              : 'font-semibold'
          }
        >
          {task.title}
        </h3>
        <p>{task.description}</p>
        <p>Время: {task.time} мин</p>
        <p>Статус: {task.status}</p>
      </div>
      <div>
        <button
          onClick={startEdit}
          className='mr-2 px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500'
        >
          Редактировать
        </button>
        <button
          onClick={onDelete}
          className='mr-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700'
        >
          Удалить
        </button>
        <button
          onClick={onOpenModal}
          className='px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700'
        >
          Открыть модалку
        </button>
      </div>
    </li>
  )
}
