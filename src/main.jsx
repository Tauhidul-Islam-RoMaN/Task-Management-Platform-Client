import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import myCreatedRoute from './Component/Route/Route.jsx'
import AuthProvider from './Component/AuthProvider/AuthProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider >

      <RouterProvider router={myCreatedRoute}>
      </RouterProvider>
    </AuthProvider>

  </React.StrictMode >,
)
