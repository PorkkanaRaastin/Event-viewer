import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RegisterModel from './RegisterModel.jsx'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [showRegister, setShowRegister] = useState(false)
    const [isOpening, setIsOpening] = useState(false)
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
        sessionStorage.setItem('playDoorAnimation', 'true')

        if (user.isAdmin) {
            navigate('/AdminPage')
        } else {
            navigate('/UserPage')
        }
    } catch {
        setError('Error connecting to the server')
    }
}

    const textFieldStyle = {
        '& .MuiInputLabel-root': { color: 'white' },
        '& .MuiInputLabel-root.Mui-focused': { color: '#a78bfa' },
        '& .MuiInput-underline:before': { borderBottomColor: 'white' },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottomColor: '#a78bfa' },
        '& .MuiInput-underline:after': { borderBottomColor: '#a78bfa' },
        '& .MuiInputBase-input': { color: 'white' }
    }

    return (
        <div className="loginForm">
            <h1>Login as user</h1>

            <form onSubmit={handleSubmit}>
                <div className="username">
                    <TextField
                        label="Username"
                        variant="standard"
                        id="username"
                        type="text"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        required
                        sx={textFieldStyle}
                    />
                </div>

                <div className="password">
                    <TextField
                        label="Password"
                        variant="standard"
                        id="password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                        sx={textFieldStyle}
                    />
                </div><br />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        backgroundColor: '#6d28d9',
                        boxShadow: '0 0 12px rgba(167, 139, 250, 0.6)',
                        '&:hover': {
                            backgroundColor: '#7c3aed',
                            boxShadow: '0 0 18px rgba(167, 139, 250, 0.9)'
                        },
                        borderRadius: '20px',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        px: 4
                    }}
                >
                    Login
                </Button>
            </form>

            <h2>
                Dont have account? <br />
                <Button
                    onClick={() => setShowRegister(true)}
                    variant="text"
                    disableRipple
                    sx={{
                        color: 'white',
                        fontFamily: 'inherit',
                        fontSize: 'inherit',
                        fontWeight: 'inherit',
                        fontStyle: 'inherit',
                        textTransform: 'none',
                        textDecoration: 'underline',
                        padding: 0,
                        minWidth: 'auto',
                        verticalAlign: 'baseline',
                        '&:hover': {
                            color: '#a78bfa',
                            backgroundColor: 'transparent'
                        }
                    }}
                >
                    Register now!
                </Button>
            </h2>

            {showRegister && <RegisterModel onClose={() => setShowRegister(false)} />}

            {isOpening && (
                <div className='doorOverlay'>
                    <div className='doorLeft doorOpening'></div>
                    <div className='doorRight doorOpening'></div>
                </div>
            )}
        </div>
    )
}

export default LoginForm