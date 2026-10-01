import { useState } from 'react'
import { createPortal } from 'react-dom'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const RegisterModel = ({ onClose }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [success, setSucces] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError(null)

        try {
            const response = await fetch('http://localhost:3001/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            })

            if (!response.ok) {
                const data = await response.json()
                setError(data.error || 'Register failed')
                return
            }

            setSucces(true)
        } catch {
            setError('Failed connecting to the server')
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

    return createPortal(
        <div className='modelOverlay' onClick={onClose}>
            <div className='modelContent' onClick={(event) => event.stopPropagation()}>

                {success ? (
                    <>
                        <h2>Account created succesfully!</h2>
                        <button className='closebtn' onClick={onClose}>Close</button>
                    </>
                ) : (
                    <>
                        <div className='RegisterXbutton'>
                            <h1>Register</h1>
                            <button className='closeBtn' onClick={onClose}>×</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className='username'>
                                <TextField
                                    label="Username"
                                    variant="standard"
                                    id="reg-username"
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)}
                                    required
                                    sx={textFieldStyle}
                                />
                            </div>
                            <div className='password'>
                                <TextField
                                    label="Password"
                                    variant="standard"
                                    id="reg-password"
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
                                Register
                            </Button>
                        </form>
                    </>
                )}
            </div>
        </div>,
        document.body
    )
}

export default RegisterModel