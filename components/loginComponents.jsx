import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RegisterModal from './RegisterModel.jsx'

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [showRegister, setShowRegister] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError(null)

        try {
            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            })

            if (!response.ok) {
                const data = await response.json()
                setError(data.error || 'Login failed')
                return
            }

            const user = await response.json()
            localStorage.setItem('user', JSON.stringify(user))

            if (user.isAdmin) {
                navigate('/AdminPage')
            } else {
                navigate('/UserPage')
            }
        } catch {
            setError('Error connecting to the server')
        }
    }

    return (
        <div className="loginForm">
            <h1>Login as user</h1>

            <form onSubmit={handleSubmit}>
                <div className="username">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        required
                    />
                </div>

                <div className="password">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" className="loginbtn">Login</button>
            </form>

            <h2>Dont have account? Register now!</h2>
            <button type="button" className="loginbtn" onClick={() => setShowRegister(true)}>
                Register
            </button>

            {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
        </div>
    )
}

export default LoginForm