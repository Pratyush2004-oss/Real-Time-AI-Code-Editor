import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { authStore } from './features/auth/store/user.store.ts'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './app/queryClient.ts'
import { ToastContainer } from "react-toastify";
import AuthBootStrap from './components/auth/AuthBootStrap.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={authStore}>
      <QueryClientProvider client={queryClient}>
        <AuthBootStrap />
        <ToastContainer theme="colored" draggable position="bottom-right" autoClose={1000} />
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
)
