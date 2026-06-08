// import './componentCssFiles/dashboard.css'
// import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
// import { useEffect } from 'react'

// const Dashboard = () => {

//     const location = useLocation()

//     useEffect(() => {
//         const isLogin = localStorage.getItem('isLogin')
//         if (isLogin === 'false') {
//             navigate('/login')
//         }
//     }, [])

//     const navigate = useNavigate()

//     const logoutHandler = async () => {
//         try {
//             localStorage.clear()
//             localStorage.setItem('isLogin', false)
//             navigate('/login')
//         }
//         catch (err) {
//             console.log("error " + err)
//         }
//     }

//     return (
//         <div className='wrapper'>
//             <div className='fix-nav-bar'>
//                 <div className='nav-headder'>
//                     <div className='nav-logo'>
//                         <img alt='logo' className='nav-logo-img' src={localStorage.logoUrl}></img>
//                     </div>
//                     <div className='nav-text'>
//                         < p >{localStorage.userName}</p >
//                         <button onClick={logoutHandler}>LOG OUT</button>
//                     </div>
//                 </div>
//                 <hr />
//                 <div className='dashboard-links-parent'>
//                     <Link to='/dashboard/home' className={location.pathname === '/dashboard/home' ? 'dashboard-links active' : 'dashboard-links'} ><i className="fa-solid fa-house-chimney"></i>Home</Link>
//                     <Link to='/dashboard/allcontact' className={location.pathname === '/dashboard/allcontact' ? 'dashboard-links active' : 'dashboard-links'} ><i className="fa-solid fa-users"></i>All Contact</Link>
//                     <Link to='/dashboard/addcontact' className={location.pathname === '/dashboard/addcontact' ? 'dashboard-links active' : 'dashboard-links'} ><i className="fa-solid fa-plus" ></i><i className="fa-solid fa-user"></i>Add Contact</Link>
//                     <Link to='/dashboard/allbatch' className={location.pathname === '/dashboard/allbatch' ? 'dashboard-links active' : 'dashboard-links'} ><i className="fas fa-layer-group"></i>All Batch</Link>
//                     <Link to='/dashboard/addbatch' className={location.pathname === '/dashboard/addbatch' ? 'dashboard-links active' : 'dashboard-links'} ><i className="fa-solid fa-plus" ></i><i className="fas fa-layer-group"></i>Add Batch</Link>
//                 </div>
//             </div>
//             <div className='mid-line'></div>
//             <div className='dashboard-router-area'>
//                 <Outlet />
//             </div>
//         </div>
//     )
// }

// export default Dashboard






import "./componentCssFiles/dashboard.css";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";

const Dashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("isLogin") !== "true") {
            navigate("/login");
        }
    }, [navigate]);

    const logoutHandler = () => {
        localStorage.clear();
        localStorage.setItem("isLogin", "false");

        toast.success("Logged out successfully");

        setTimeout(() => {
            navigate("/login");
        }, 1000);
    };

    return (
        <div className="wrapper">
            <div className="fix-nav-bar">
                <div className="nav-headder">
                    <div className="nav-logo">
                        <img
                            alt="logo"
                            className="nav-logo-img"
                            src={
                                localStorage.getItem("logoUrl") ||
                                "https://via.placeholder.com/150"
                            }
                        />
                    </div>

                    <div className="nav-text">
                        <p>{localStorage.getItem("userName") || "User"}</p>

                        <button onClick={logoutHandler}>
                            LOG OUT
                        </button>
                    </div>
                </div>

                <div className="dashboard-links-parent">
                    <Link
                        to="/dashboard/home"
                        className={
                            location.pathname === "/dashboard/home"
                                ? "dashboard-links active"
                                : "dashboard-links"
                        }
                    >
                        <i className="fa-solid fa-house-chimney"></i>
                        Home
                    </Link>

                    <Link
                        to="/dashboard/allcontact"
                        className={
                            location.pathname === "/dashboard/allcontact"
                                ? "dashboard-links active"
                                : "dashboard-links"
                        }
                    >
                        <i className="fa-solid fa-users"></i>
                        All Contact
                    </Link>

                    <Link
                        to="/dashboard/addcontact"
                        className={
                            location.pathname === "/dashboard/addcontact"
                                ? "dashboard-links active"
                                : "dashboard-links"
                        }
                    >
                        <i className="fa-solid fa-user-plus"></i>
                        Add Contact
                    </Link>

                    <Link
                        to="/dashboard/allbatch"
                        className={
                            location.pathname === "/dashboard/allbatch"
                                ? "dashboard-links active"
                                : "dashboard-links"
                        }
                    >
                        <i className="fas fa-layer-group"></i>
                        All Batch
                    </Link>

                    <Link
                        to="/dashboard/addbatch"
                        className={
                            location.pathname === "/dashboard/addbatch"
                                ? "dashboard-links active"
                                : "dashboard-links"
                        }
                    >
                        <i className="fas fa-folder-plus"></i>
                        Add Batch
                    </Link>
                </div>
            </div>

            <div className="dashboard-router-area">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;