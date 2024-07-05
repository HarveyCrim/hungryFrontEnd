import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './AppRoutes.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { MyAuth } from './auth/auth0.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FaBullseye } from 'react-icons/fa'
import PhoneNav from './components/PhoneNav.tsx'

const client = new QueryClient({
  defaultOptions: {
    queries : {
      refetchOnWindowFocus : false
    }
  }
})
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <QueryClientProvider client={client}>
      <BrowserRouter>
          <MyAuth>
          <PhoneNav />
          <AppRoutes />
          </MyAuth>
      </BrowserRouter>
      </QueryClientProvider>
  </Provider>
)
