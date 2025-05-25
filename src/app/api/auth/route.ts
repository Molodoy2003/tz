import { NextResponse } from 'next/server'

const mockUser = {
  email: 'test@gmail.com',
  password: '12345',
}

export async function POST(req: Request) {
  const { email, password } = await req.json()

  if (email === mockUser.email && password === mockUser.password) {
    return NextResponse.json({ success: true, user: { email } })
  }

  return NextResponse.json(
    { success: false, message: 'Invalid credentials' },
    { status: 401 }
  )
}
