import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ViewMyOrders from './views/MyOrders'
import ViewAddOrder from './views/AddOrder'
import { AppRoutes } from './routes/AppRoutes'
import { Navigate, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path='/*' element={<AppRoutes />} />
    </Routes>
  )
}

export default App
