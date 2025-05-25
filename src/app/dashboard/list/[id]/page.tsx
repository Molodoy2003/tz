'use client'

import TaskModal from '@/components/taskModal/TaskModal'
import {
  addTask,
  deleteTask,
  Task,
  updateTask,
} from '@/redux/features/taskSlice'
import { AppDispatch, RootState } from '@/redux/store'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function TaskListDetails() {
  const { id } = useParams()
  const router = useRouter()
  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newTime, setNewTime] = useState<number>(30)
  const [editTaskId, setEditTaskId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [editTime, setEditTime] = useState<number>(30)
  const [editStatus, setEditStatus] = useState<Task['status']>('pending')
  const [modalTask, setModalTask] = useState<Task | null>(null)
  const dispatch = useDispatch<AppDispatch>()
  const lists = useSelector((state: RootState) => state.tasks.lists)
  const list = lists.find(l => l.id === id)

  useEffect(() => {
    if (!list) {
      router.push('/dashboard')
    }
  }, [list, router])

  if (!list) return null

  const handleAddTask = () => {
    if (!newTitle.trim()) return
    dispatch(
      addTask({
        listId: list.id,
        task: {
          title: newTitle,
          description: newDescription,
          time: newTime,
          status: 'pending',
        },
      })
    )
    setNewTitle('')
    setNewDescription('')
    setNewTime(30)
  }

  const startEditTask = (task: Task) => {
    setEditTaskId(task.id)
    setEditTitle(task.title)
    setEditDescription(task.description)
    setEditTime(task.time)
    setEditStatus(task.status)
  }

  const cancelEdit = () => {
    setEditTaskId(null)
  }

  const saveEdit = () => {
    if (!editTaskId) return
    dispatch(
      updateTask({
        listId: list.id,
        task: {
          id: editTaskId,
          title: editTitle,
          description: editDescription,
          time: editTime,
          status: editStatus,
        },
      })
    )
    setEditTaskId(null)
  }

  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTask({ listId: list.id, taskId }))
  }

  const openModal = (task: Task) => {
    setModalTask(task)
  }

  const closeModal = () => {
    setModalTask(null)
  }

  return (
    <div className='min-h-screen bg-blue-100 py-8 px-4'>
      <div className='max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6'>
        <h1 className='text-3xl font-bold mb-6 text-blue-900'>
          Список: {list.name}
        </h1>
        <section className='mb-8'>
          <h2 className='text-2xl font-semibold mb-3 text-blue-800'>
            Добавить новую задачу
          </h2>
          <input
            type='text'
            placeholder='Название задачи'
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            className='w-full mb-3 p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <textarea
            placeholder='Описание задачи'
            value={newDescription}
            onChange={e => setNewDescription(e.target.value)}
            className='w-full mb-3 p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            rows={3}
          />
          <input
            type='number'
            placeholder='Время (минуты)'
            value={newTime}
            onChange={e => setNewTime(Number(e.target.value))}
            className='w-28 mb-3 p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            min={1}
          />
          <button
            onClick={handleAddTask}
            className='px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition'
          >
            Добавить
          </button>
        </section>
        <section>
          <h2 className='text-2xl font-semibold mb-4 text-blue-800'>Задачи</h2>
          {list.tasks.length === 0 && (
            <p className='text-blue-700 font-medium'>Задачи отсутствуют.</p>
          )}
          <ul>
            {list.tasks.map(task => (
              <li
                key={task.id}
                className='mb-5 p-5 border border-blue-300 rounded-lg bg-blue-50 shadow-sm'
              >
                {editTaskId === task.id ? (
                  <div>
                    <input
                      type='text'
                      value={editTitle}
                      onChange={e => setEditTitle(e.target.value)}
                      className='w-full mb-3 p-3 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <textarea
                      value={editDescription}
                      onChange={e => setEditDescription(e.target.value)}
                      className='w-full mb-3 p-3 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                      rows={3}
                    />
                    <input
                      type='number'
                      value={editTime}
                      onChange={e => setEditTime(Number(e.target.value))}
                      className='w-28 mb-3 p-3 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                      min={1}
                    />
                    <select
                      value={editStatus}
                      onChange={e =>
                        setEditStatus(e.target.value as Task['status'])
                      }
                      className='mb-3 p-3 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                      <option value='pending'>В ожидании</option>
                      <option value='in_progress'>В процессе</option>
                      <option value='done'>Выполнено</option>
                    </select>
                    <div>
                      <button
                        onClick={saveEdit}
                        className='mr-3 px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition'
                      >
                        Сохранить
                      </button>
                      <button
                        onClick={cancelEdit}
                        className='px-5 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition'
                      >
                        Отмена
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className='flex justify-between items-start'>
                    <div>
                      <h3
                        className={`font-semibold text-lg mb-1 ${
                          task.status === 'done'
                            ? 'line-through text-gray-500'
                            : 'text-blue-900'
                        }`}
                      >
                        {task.title}
                      </h3>
                      <p className='text-blue-800 mb-1'>{task.description}</p>
                      <p className='text-blue-700 mb-1'>
                        Время: {task.time} мин
                      </p>
                      <p className='text-blue-700'>Статус: {task.status}</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <button
                        onClick={() => startEditTask(task)}
                        className='px-4 py-1 bg-yellow-400 rounded hover:bg-yellow-500 transition'
                      >
                        Редактировать
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className='px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition'
                      >
                        Удалить
                      </button>
                      <button
                        onClick={() => openModal(task)}
                        className='px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition'
                      >
                        Открыть модалку
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>
        {modalTask && (
          <TaskModal task={modalTask} listId={list.id} onClose={closeModal} />
        )}
      </div>
    </div>
  )
}
