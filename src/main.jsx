import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import myCreatedRoute from './Component/Route/Route.jsx'
import AuthProvider from './Component/AuthProvider/AuthProvider.jsx'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider >
        <RouterProvider router={myCreatedRoute}>
        </RouterProvider>
      </AuthProvider>
    </QueryClientProvider>

  </React.StrictMode >,
)
