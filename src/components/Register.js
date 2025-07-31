import { Link, useNavigate } from 'react-router-dom'
import './componentCssFiles/register.css'
import { useState } from 'react'
import axios from 'axios'

const Register = () => {

    const [userName, setuserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [number, setNumber] = useState('')
    const [logoImg, setLogoImg] = useState(null)
    const [isLoading, setLoading] = useState(false)

    const navigate = useNavigate()

    const logoPhoto = (e) => {
        setLogoImg(e.target.files[0])
    }

    const submitHandler = async (e) => {
        await e.preventDefault();
        const formData = new FormData()
        formData.append('userName', userName)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('number', number)
        formData.append('logo', logoImg)
        try {
            setLoading(true)
            await axios.post('https://batch-students.onrender.com/auth/signup', formData
            )
            setLoading(false)
            navigate('/Login')

        }
        catch (err) {
            setLoading(false)
            console.log("error " + err)
            window.alert('email has already registered')
        }
    }

    return (
        <div className='register-wrapper'>
            <div className='register-form-box'>
                <form className='register-form'>
                    <h1 className='register-heading'>register</h1>
                    <input onChange={(e) => { setuserName(e.target.value) }} required type='text' className='register-input' placeholder='USER NAME'></input>
                    <input onChange={(e) => { setEmail(e.target.value) }} required type='email' className='register-input' placeholder='EMAIL'></input>
                    <input onChange={(e) => { setPassword(e.target.value) }} required type='password' className='register-input' placeholder='PASSWORD'></input>
                    <input onChange={(e) => { setNumber(e.target.value) }} required type='number' className='register-input' placeholder='NUMBER'></input>
                    <input onChange={(e) => { logoPhoto(e) }} required type='file' className='register-input' placeholder='LOGO/PHOTO'></input>
                    <button onClick={submitHandler} type='submit' className='register-input register-btn'>{isLoading ? <i className="fa-solid fa-spinner"></i> : <div>SIGNUP</div>}</button>
                    <p>if you have account?<Link to='/login'>Login</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Register