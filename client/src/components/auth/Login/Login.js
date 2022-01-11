import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import './Login.css'

const Login = () => {
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setUser({
            ...user,
            [name]: value
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.post('http://localhost:5000/user/login', user)
            console.log(res)
        } catch (error) {
            alert(error.response.data.msg)
        }
    }

    return (
        <div className='login'>
            <div className='login_container container'>
                <h2 className='login_title'>Login</h2>
                <form className='login_form' onSubmit={handleSubmit}>
                    <input 
                        type="email" name="email" 
                        value={user.email}
                        onChange={handleChange}
                        placeholder='Email'
                        required
                    />
                    <input 
                        type="password" name="password"
                        value={user.password}
                        onChange={handleChange}
                        placeholder='Password'
                        required
                    />

                    <div className='form_buttons'>
                        <button className='btn'>Login</button>
                        <Link to="/register">Register</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
