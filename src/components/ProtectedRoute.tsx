'use client'

import { RootState } from '@/redux/store'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux'

interface ProtectedRouteProps {
  children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter()
  const isAuth = useSelector((state: RootState) => !!state.auth.user?.email)

  useEffect(() => {
    if (!isAuth) {
      router.replace('/login')
    }
  }, [isAuth, router])

  if (!isAuth) {
    return null
  }

  return <>{children}</>
}
