'use client'

import { loginSuccess } from '@/redux/features/authSlice'
import { AppDispatch } from '@/redux/store'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  const handleLogin = async () => {
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      })

      const data = await res.json()

      if (data.success) {
        dispatch(loginSuccess({ email }))
        localStorage.setItem('auth', JSON.stringify({ email }))
        toast.success('Успешный вход! Добро пожаловать.')
        router.push('/dashboard')
      } else {
        toast.error('Неверный email или пароль')
      }
    } catch (error) {
      toast.error('Ошибка сервера, попробуйте позже')
    }
  }

  return (
    <div className='min-h-screen w-full bg-blue-100 flex items-center justify-center px-4'>
      <div className='w-full max-w-md bg-white rounded-2xl shadow-xl p-8'>
        <h2 className='text-3xl font-bold text-center text-gray-800 mb-8'>
          Вход в аккаунт
        </h2>

        <div className='mb-5'>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Email
          </label>
          <input
            id='email'
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder='example@mail.com'
            className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-gray-900'
          />
        </div>
        <div className='mb-6'>
          <label
            htmlFor='password'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Пароль
          </label>
          <input
            id='password'
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder='Введите пароль'
            className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-gray-900'
          />
        </div>
        <button
          onClick={handleLogin}
          className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-md transition duration-300 transform hover:-translate-y-0.5'
        >
          Войти
        </button>
      </div>
    </div>
  )
}
