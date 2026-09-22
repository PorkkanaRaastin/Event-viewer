import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const LoginForm = () => {
    return(
    <div className="loginForm">
        <h1>Login as user</h1>

        <form>
            <div className="username">
            <label htmlFor="username">Username</label>
            <input id="username" type="text" />
            </div>

            <div className="password">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" />
            </div>

            <button type="submit" className="loginbtn">Login</button>
            <button type="submit" className="loginbtn">Register</button>
        </form>

        <h2>Are you admin? Click below</h2>
        <button className="adminbtn">Admin login</button>
        </div>
    )
}

export default LoginForm;