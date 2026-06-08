// import { Link, useNavigate } from 'react-router-dom'
// import './componentCssFiles/login.css'
// import { useState } from 'react'
// import axios from 'axios'

// const Login = () => {

//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     var [isLoading, setLoading] = useState(false)

//     const navigate = useNavigate();

//     const submitHandler = async (e) => {
//         e.preventDefault();
//         try {
//             setLoading(true)
//             const loginData = await axios.post('https://batch-students.onrender.com/auth/login', {
//                 email: email,
//                 password: password
//             })
//             setLoading(false)
//             localStorage.setItem('token', loginData.data.token)
//             localStorage.setItem('msg', loginData.data.msg)
//             localStorage.setItem('_id', loginData.data._id)
//             localStorage.setItem('userName', loginData.data.userName)
//             localStorage.setItem('email', loginData.data.email)
//             localStorage.setItem('phNo', loginData.data.phNo)
//             localStorage.setItem('logoUrl', loginData.data.logoUrl)
//             localStorage.setItem('logoId', loginData.data.logoId)
//             localStorage.setItem('isLogin', true)
//             navigate('/dashboard')
//         }
//         catch (err) {
//             console.log(err.data)
//             setLoading(false)
//             window.alert("email or password is wrong")
//         }
//     }

//     return (
//         <div className='login-wrapper'>
//             <div className='login-form-box'>
//                 <form className='login-form'>
//                     <h1 className='login-heading'>LOGIN</h1>
//                     <input onChange={(e) => { setEmail(e.target.value) }} required type='email' className='login-input' placeholder='EMAIL'></input>
//                     <input onChange={(e) => { setPassword(e.target.value) }} required type='password' className='login-input' placeholder='PASSWORD'></input>
//                     <button onClick={submitHandler} type='submit' className='login-input login-btn'>{isLoading ? <i className="fa-solid fa-spinner"></i> : <div>LOGIN</div>}</button>
//                     <p>create account?<Link to='/register'>Sign up</Link></p>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default Login








import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./componentCssFiles/login.css";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        setError("");
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            return setError("Please fill all fields");
        }

        try {
            setLoading(true);

            const { data } = await axios.post(
                "https://batch-students.onrender.com/auth/login",
                formData
            );

            localStorage.setItem("token", data.token);
            localStorage.setItem("userName", data.userName);

            localStorage.setItem("_id", data._id);
            localStorage.setItem("email", data.email);
            localStorage.setItem("number", data.number);
            localStorage.setItem("logoUrl", data.logoUrl);
            localStorage.setItem("logoId", data.logoId);

            localStorage.setItem("isLogin", "true");

            navigate("/dashboard");
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                "Invalid email or password"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-form-box">
                <form className="login-form" onSubmit={submitHandler}>
                    <h1 className="login-heading">
                        Welcome Back 👋
                    </h1>

                    <p className="login-subtitle">
                        Login to continue
                    </p>

                    {error && (
                        <div className="error-box">
                            {error}
                        </div>
                    )}

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="login-input"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <div className="password-box">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter your password"
                            className="login-input"
                            value={formData.password}
                            onChange={handleChange}
                        />

                        <button
                            type="button"
                            className="show-password-btn"
                            onClick={() =>
                                setShowPassword(!showPassword)
                            }
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="login-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <i className="fa-solid fa-spinner fa-spin"></i>
                                &nbsp; Logging In...
                            </>
                        ) : (
                            "Login"
                        )}
                    </button>

                    <p className="register-text">
                        Don't have an account?
                        <Link to="/register"> Sign Up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;