import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import AdminPage from '../pages/admin_page.jsx'
import Login from '../pages/login.jsx'
import UserPage from '../pages/user_page.jsx'
import AdminLogin from '../pages/admin_login.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <div className="starsContainer">
      <div className="starsLayer starsSmall"></div>
      <div className="starsLayer starsMedium"></div>
      <div className="starsLayer starsLarge"></div>
    </div>
    <Routes>
      <Route path="/" element={<Navigate to="/Login" replace />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/UserPage" element={<UserPage />} />
      <Route path="/AdminPage" element={<AdminPage />} />
    </Routes>
  </BrowserRouter>
  </StrictMode>,
)