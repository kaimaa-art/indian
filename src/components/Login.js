import { Link, useNavigate } from 'react-router-dom'
import './componentCssFiles/login.css'
import { useState } from 'react'
import axios from 'axios'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    var [isLoading, setLoading] = useState(false)

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const loginData = await axios.post('http://www.localhost:5000/auth/login', {
                email: email,
                password: password
            })
            setLoading(false)
            localStorage.setItem('token', loginData.data.token)
            localStorage.setItem('msg', loginData.data.msg)
            localStorage.setItem('_id', loginData.data._id)
            localStorage.setItem('userName', loginData.data.userName)
            localStorage.setItem('email', loginData.data.email)
            localStorage.setItem('phNo', loginData.data.phNo)
            localStorage.setItem('logoUrl', loginData.data.logoUrl)
            localStorage.setItem('logoId', loginData.data.logoId)
            localStorage.setItem('isLogin', true)
            navigate('/dashboard')
        }
        catch (err) {
            console.log(err.data)
            setLoading(false)
            window.alert("email or password is wrong")
        }
    }

    return (
        <div className='login-wrapper'>
            <div className='login-form-box'>
                <form className='login-form'>
                    <h1 className='login-heading'>LOGIN</h1>
                    <input onChange={(e) => { setEmail(e.target.value) }} required type='email' className='login-input' placeholder='EMAIL'></input>
                    <input onChange={(e) => { setPassword(e.target.value) }} required type='password' className='login-input' placeholder='PASSWORD'></input>
                    <button onClick={submitHandler} type='submit' className='login-input login-btn'>{isLoading ? <i className="fa-solid fa-spinner"></i> : <div>LOGIN</div>}</button>
                    <p>create account?<Link to='/register'>Sign up</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Login