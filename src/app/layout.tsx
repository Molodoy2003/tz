'use client'

import { store } from '@/redux/store'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './globals.css'

const theme = createTheme({
  palette: {
    mode: 'light',
  },
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='ru'>
      <body>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
            <ToastContainer position='top-right' autoClose={2000} />
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  )
}
