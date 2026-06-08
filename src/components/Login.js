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