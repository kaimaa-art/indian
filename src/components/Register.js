// import { Link, useNavigate } from 'react-router-dom'
// import './componentCssFiles/register.css'
// import { useState } from 'react'
// import axios from 'axios'

// const Register = () => {

//     const [userName, setuserName] = useState('')
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [number, setNumber] = useState('')
//     const [logoImg, setLogoImg] = useState(null)
//     const [isLoading, setLoading] = useState(false)

//     const navigate = useNavigate()

//     const logoPhoto = (e) => {
//         setLogoImg(e.target.files[0])
//     }

//     const submitHandler = async (e) => {
//         await e.preventDefault();
//         const formData = new FormData()
//         formData.append('userName', userName)
//         formData.append('email', email)
//         formData.append('password', password)
//         formData.append('number', number)
//         formData.append('logo', logoImg)
//         try {
//             setLoading(true)
//             await axios.post('https://batch-students.onrender.com/auth/signup', formData
//             )
//             setLoading(false)
//             navigate('/Login')

//         }
//         catch (err) {
//             setLoading(false)
//             console.log("error " + err)
//             window.alert('email has already registered')
//         }
//     }

//     return (
//         <div className='register-wrapper'>
//             <div className='register-form-box'>
//                 <form className='register-form'>
//                     <h1 className='register-heading'>register</h1>
//                     <input onChange={(e) => { setuserName(e.target.value) }} required type='text' className='register-input' placeholder='USER NAME'></input>
//                     <input onChange={(e) => { setEmail(e.target.value) }} required type='email' className='register-input' placeholder='EMAIL'></input>
//                     <input onChange={(e) => { setPassword(e.target.value) }} required type='password' className='register-input' placeholder='PASSWORD'></input>
//                     <input onChange={(e) => { setNumber(e.target.value) }} required type='number' className='register-input' placeholder='NUMBER'></input>
//                     <input onChange={(e) => { logoPhoto(e) }} required type='file' className='register-input' placeholder='LOGO/PHOTO'></input>
//                     <button onClick={submitHandler} type='submit' className='register-input register-btn'>{isLoading ? <i className="fa-solid fa-spinner"></i> : <div>SIGNUP</div>}</button>
//                     <p>if you have account?<Link to='/login'>Login</Link></p>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default Register







import { Link, useNavigate } from "react-router-dom";
import "./componentCssFiles/register.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const Register = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
        number: "",
    });

    const [logoImg, setLogoImg] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!logoImg) {
            toast.error("Please upload profile photo");
            return;
        }

        try {
            setLoading(true);

            const data = new FormData();

            data.append("userName", formData.userName);
            data.append("email", formData.email);
            data.append("password", formData.password);
            data.append("number", formData.number);
            data.append("logo", logoImg);

            await axios.post(
                "https://batch-students.onrender.com/auth/signup",
                data
            );

            toast.success("Account created successfully");

            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } catch (err) {
            toast.error(
                err?.response?.data?.message ||
                "Email already registered"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-wrapper">
            <div className="register-form-box">
                <form
                    className="register-form"
                    onSubmit={submitHandler}
                >
                    <h1 className="register-heading">
                        Create Account
                    </h1>

                    <p className="register-subtitle">
                        Join and manage your students easily
                    </p>

                    <input
                        type="text"
                        name="userName"
                        placeholder="User Name"
                        className="register-input"
                        value={formData.userName}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        className="register-input"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <div className="password-box">
                        <input
                            type={
                                showPassword ? "text" : "password"
                            }
                            name="password"
                            placeholder="Password"
                            className="register-input"
                            value={formData.password}
                            onChange={handleChange}
                            required
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

                    <input
                        type="number"
                        name="number"
                        placeholder="Phone Number"
                        className="register-input"
                        value={formData.number}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="file"
                        className="register-input"
                        accept="image/*"
                        onChange={(e) =>
                            setLogoImg(e.target.files[0])
                        }
                        required
                    />

                    <button
                        type="submit"
                        className="register-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <i className="fa-solid fa-spinner fa-spin"></i>
                                &nbsp; Creating...
                            </>
                        ) : (
                            "Create Account"
                        )}
                    </button>

                    <p className="login-text">
                        Already have an account?
                        <Link to="/login"> Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;