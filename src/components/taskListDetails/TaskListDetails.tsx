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
import AddTaskForm from './AddTaskForm'
import TaskList from './TaskList'

export default function TaskListDetails() {
  const { id } = useParams()
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const lists = useSelector((state: RootState) => state.tasks.lists)
  const list = lists.find(l => l.id === id)

  const [modalTask, setModalTask] = useState<Task | null>(null)

  useEffect(() => {
    if (!list) {
      router.push('/dashboard')
    }
  }, [list, router])

  if (!list) return null

  // Добавление новой задачи
  const handleAddTask = (title: string, description: string, time: number) => {
    if (!title.trim()) return
    dispatch(
      addTask({
        listId: list.id,
        task: {
          title,
          description,
          time,
          status: 'pending',
        },
      })
    )
  }

  // Удаление задачи
  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTask({ listId: list.id, taskId }))
  }

  // Обновление задачи
  const handleUpdateTask = (task: Task) => {
    dispatch(updateTask({ listId: list.id, task }))
  }

  // Модальное окно
  const openModal = (task: Task) => setModalTask(task)
  const closeModal = () => setModalTask(null)

  return (
    <div className='max-w-3xl mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Список: {list.name}</h1>

      <AddTaskForm onAddTask={handleAddTask} />

      <TaskList
        tasks={list.tasks}
        onDeleteTask={handleDeleteTask}
        onUpdateTask={handleUpdateTask}
        onOpenModal={openModal}
      />

      {modalTask && (
        <TaskModal task={modalTask} listId={list.id} onClose={closeModal} />
      )}
    </div>
  )
}
