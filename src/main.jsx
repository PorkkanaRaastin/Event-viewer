import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import AdminPage from '../pages/admin_page.jsx'
import Login from '../pages/login.jsx'
import UserPage from '../pages/user_page.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/Login" replace />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/UserPage" element={<UserPage />} />
        <Route path="/AdminPage" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)