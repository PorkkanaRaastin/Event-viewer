import { useState} from 'react'

const RegisterModel = ({onClose}) => {
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

    return (
        <div className='modelOverlay' onClick={onClose}>
            <div className='modelContent' onClick={(event) => event.stopPropagation()}>
                <button className='clodeBtn' onClick={onClose}>x</button>

                {success ? (
                    <>
                        <h2>Account created succesfully!</h2>
                        <h2>djaskldjsajsakjs</h2>
                        <button className='loginBtn' onClick={onclose}>Close</button>
                    </>
                ) : (
                    <>
                        <h1>Register</h1>
                        <form onSubmit={handleSubmit}>
                            <div className='username'>
                                <label htmlFor="reg-username">Username</label>
                                <input 
                                    id='reg-username'
                                    type='text'
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)}
                                    required
                                />
                            </div>
                            <div className='password'>
                                <label htmlFor="req-password">Password</label>
                                <input 
                                    id='reg-password'
                                    type='password'
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </div>

                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <button type='submit' className='loginbtn'>Register</button>
                        </form>
                    </>
                )}
            </div>
        </div>
    )
}

export default RegisterModel