'use client'

import { useRouter } from 'next/navigation'

export default function WelcomePage() {
  const router = useRouter()

  return (
    <div className='min-h-screen w-full bg-blue-100 flex flex-col items-center justify-center text-center px-4'>
      <h1 className='text-4xl font-bold text-gray-800 mb-6'>
        Добро пожаловать в Task Manager
      </h1>
      <p className='text-lg text-gray-600 mb-8'>
        Управляйте своими задачами эффективно и просто.
      </p>
      <button
        onClick={() => router.push('/login')}
        className='px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition'
      >
        Перейти к входу
      </button>
    </div>
  )
}
