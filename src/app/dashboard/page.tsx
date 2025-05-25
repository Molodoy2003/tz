'use client'

import ProtectedRoute from '@/components/ProtectedRoute'
import {
  addList,
  removeList,
  TaskList,
  updateListName,
} from '@/redux/features/taskSlice'
import { AppDispatch, RootState } from '@/redux/store'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export default function DashboardPage() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { lists } = useSelector((state: RootState) => state.tasks)
  const { user } = useSelector((state: RootState) => state.auth)
  const [newListName, setNewListName] = useState('')
  const [editingListId, setEditingListId] = useState<string | null>(null)
  const [editingListName, setEditingListName] = useState('')

  useEffect(() => {
    if (!user?.email) {
      router.push('/')
    }
  }, [user?.email, router])

  const handleAddList = () => {
    if (!newListName.trim()) {
      toast.error('Введите название списка')
      return
    }
    dispatch(addList(newListName.trim()))
    setNewListName('')
    toast.success('Список добавлен')
  }

  const handleDeleteList = (id: string) => {
    if (confirm('Удалить этот список и все его задачи?')) {
      dispatch(removeList(id))
      toast.info('Список удалён')
    }
  }

  const handleStartEdit = (list: TaskList) => {
    setEditingListId(list.id)
    setEditingListName(list.name)
  }

  const handleSaveEdit = () => {
    if (!editingListName.trim()) {
      toast.error('Название не может быть пустым')
      return
    }
    dispatch(
      updateListName({ id: editingListId!, name: editingListName.trim() })
    )
    setEditingListId(null)
    toast.success('Название списка обновлено')
  }

  const handleCancelEdit = () => {
    setEditingListId(null)
    setEditingListName('')
  }

  const handleOpenList = (id: string) => {
    router.push(`/dashboard/list/${id}`)
  }

  return (
    <ProtectedRoute>
      <div className='min-h-screen bg-blue-50 py-10 px-4'>
        <div className='max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8'>
          <h1 className='text-4xl font-bold mb-8 text-center text-gray-800'>
            Списки задач
          </h1>
          <div className='flex mb-8 max-w-md mx-auto'>
            <input
              type='text'
              value={newListName}
              onChange={e => setNewListName(e.target.value)}
              placeholder='Новый список задач'
              className='flex-grow px-4 py-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition'
            />
            <button
              onClick={handleAddList}
              className='px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-r-md shadow-md transition'
            >
              Добавить
            </button>
          </div>
          {lists.length === 0 && (
            <p className='text-center text-gray-500'>Списков задач пока нет.</p>
          )}
          <ul className='space-y-4'>
            {lists.map(list => (
              <li
                key={list.id}
                className='flex justify-between items-center bg-gray-50 shadow-sm p-5 rounded-lg hover:shadow-md transition cursor-pointer'
                onClick={() => {
                  if (editingListId !== list.id) handleOpenList(list.id)
                }}
              >
                <div className='flex-grow'>
                  {editingListId === list.id ? (
                    <input
                      type='text'
                      value={editingListName}
                      onChange={e => setEditingListName(e.target.value)}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition'
                      onKeyDown={e => {
                        if (e.key === 'Enter') handleSaveEdit()
                        if (e.key === 'Escape') handleCancelEdit()
                      }}
                      autoFocus
                      onClick={e => e.stopPropagation()}
                    />
                  ) : (
                    <div className='text-lg font-semibold text-gray-800 select-none'>
                      {list.name}{' '}
                      <span className='text-sm text-gray-500'>
                        ({list.tasks.length})
                      </span>
                    </div>
                  )}
                </div>
                <div className='flex gap-3 ml-6'>
                  {editingListId === list.id ? (
                    <>
                      <button
                        onClick={e => {
                          e.stopPropagation()
                          handleSaveEdit()
                        }}
                        className='px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition'
                      >
                        Сохранить
                      </button>
                      <button
                        onClick={e => {
                          e.stopPropagation()
                          handleCancelEdit()
                        }}
                        className='px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition'
                      >
                        Отмена
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={e => {
                          e.stopPropagation()
                          handleStartEdit(list)
                        }}
                        className='px-4 py-2 bg-yellow-400 rounded-md hover:bg-yellow-500 transition'
                      >
                        Редактировать
                      </button>
                      <button
                        onClick={e => {
                          e.stopPropagation()
                          handleDeleteList(list.id)
                        }}
                        className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition'
                      >
                        Удалить
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ProtectedRoute>
  )
}
