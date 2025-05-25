'use client'

import { deleteTask, Task, updateTask } from '@/redux/features/taskSlice'
import { AppDispatch } from '@/redux/store'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import { TaskEditForm } from './TaskEditForm'
import { TaskModalActions } from './TaskModalActions'
import { TaskView } from './TaskView'
import { Timer } from './Timer'

interface TaskModalProps {
  task: Task
  listId: string
  onClose: () => void
}

export default function TaskModal({ task, listId, onClose }: TaskModalProps) {
  const dispatch = useDispatch<AppDispatch>()

  const [secondsLeft, setSecondsLeft] = useState(task.time * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const [editedTitle, setEditedTitle] = useState(task.title)
  const [editedDescription, setEditedDescription] = useState(task.description)
  const [editedTime, setEditedTime] = useState(task.time)
  const [editedStatus, setEditedStatus] = useState<Task['status']>(task.status)

  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!)
            setIsRunning(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      clearInterval(timerRef.current!)
    }
    return () => clearInterval(timerRef.current!)
  }, [isRunning])

  const resetTimer = () => {
    setIsRunning(false)
    setSecondsLeft(editedTime * 60)
  }

  const handleSave = () => {
    dispatch(
      updateTask({
        listId,
        task: {
          ...task,
          title: editedTitle,
          description: editedDescription,
          time: editedTime,
          status: editedStatus,
        },
      })
    )
    setIsEditing(false)
    setSecondsLeft(editedTime * 60)
  }

  const handleDelete = () => {
    dispatch(deleteTask({ listId, taskId: task.id }))
    onClose()
  }

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4'
      onClick={onClose}
    >
      <div
        className='bg-white rounded-xl shadow-lg w-full max-w-lg p-6 space-y-6 relative'
        onClick={e => e.stopPropagation()}
      >
        <div className='flex justify-between items-center'>
          <h2 className='text-2xl font-semibold'>
            {isEditing ? 'Редактирование задачи' : 'Задача'}
          </h2>
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-800 text-2xl leading-none'
          >
            ×
          </button>
        </div>
        {isEditing ? (
          <TaskEditForm
            title={editedTitle}
            description={editedDescription}
            time={editedTime}
            status={editedStatus}
            onChangeTitle={setEditedTitle}
            onChangeDescription={setEditedDescription}
            onChangeTime={setEditedTime}
            onChangeStatus={setEditedStatus}
          />
        ) : (
          <TaskView
            title={task.title}
            description={task.description}
            time={task.time}
          />
        )}
        <Timer
          secondsLeft={secondsLeft}
          isRunning={isRunning}
          onStart={() => setIsRunning(true)}
          onPause={() => setIsRunning(false)}
          onReset={resetTimer}
        />
        <TaskModalActions
          isEditing={isEditing}
          onEdit={() => setIsEditing(true)}
          onSave={handleSave}
          onDelete={handleDelete}
          onClose={onClose}
        />
      </div>
    </div>
  )
}
