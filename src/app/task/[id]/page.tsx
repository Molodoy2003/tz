'use client'

import TaskModal from '@/components/taskModal/TaskModal'
import { RootState } from '@/redux/store'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useSelector } from 'react-redux'

export default function TaskPage() {
  const { id } = useParams()
  const lists = useSelector((state: RootState) => state.tasks.lists)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const list = lists.find(l => l.tasks.some(task => task.id === id))
  const task = list?.tasks.find(task => task.id === id)

  if (!task || !list) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-blue-100 px-4'>
        <div className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center text-gray-700'>
          Задача не найдена
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-blue-100 px-4'>
      <div className='bg-white rounded-lg shadow-lg p-8 max-w-lg w-full'>
        <h1 className='text-3xl font-semibold text-gray-800 mb-4'>
          {task.title}
        </h1>
        <p className='text-gray-600 mb-6'>{task.description}</p>
        <button
          onClick={() => setIsModalOpen(true)}
          className='px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition'
        >
          Подробнее
        </button>
        {isModalOpen && (
          <TaskModal
            task={task}
            listId={list.id}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </div>
  )
}
