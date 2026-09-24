import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, requireAdmin }) => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (!user) {
        return <Navigate to="/Login" replace />
    }

    if (requireAdmin && !user.isAdmin) {
        return <Navigate to="/Login" replace />
    }

    return children
}

export default ProtectedRoute