// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'

// const UpdateStudent = () => {

//     const location = useLocation('location.state')

//     const navigate = useNavigate()

//     useEffect(() => {
//         getBatchData()
//     }, [])

//     const getBatchData = async () => {
//         try {
//             const batchData = await axios.get('https://batch-students.onrender.com/batch/get-all-batch', {
//                 headers: {
//                     Authorization: 'Bearer ' + localStorage.getItem('token')
//                 }
//             })
//             setBatchList(batchData.data.batches)
//         }
//         catch (err) {
//             console.log("error " + err)
//         }
//     }

//     const [Name, setName] = useState(location.state.userName)
//     const [Email, setEmail] = useState(location.state.email)
//     const [Password, setPassword] = useState(location.state.password)
//     const [BatchName, setBatchName] = useState(location.state.batchName)
//     const [ContactImg, setContactImg] = useState(location.state.imgUrl)
//     const [Loading, setLoading] = useState(false)
//     const [BatchList, setBatchList] = useState([])

//     const submitHandler = async (e) => {

//         e.preventDefault()

//         const formData = new FormData()
//         formData.append('userName', Name)
//         formData.append('email', Email)
//         formData.append('password', Password)
//         formData.append('batchName', BatchName)
//         formData.append('photo', ContactImg)

//         try {
//             setLoading(true)
//             await axios.put('https://batch-students.onrender.com/contact/update/' + location.state._id, formData, {
//                 headers: {
//                     Authorization: 'Bearer ' + localStorage.getItem('token')
//                 }
//             })
//             setLoading(false)
//             window.alert("student data updated")
//             navigate('/dashboard/allbatch')
//         }
//         catch (err) {
//             setLoading(false)
//             console.log("error " + err)
//         }
//     }

//     return (
//         <div className='contact-wrapper'>
//             <div className='contact-form-box'>
//                 <form className='contact-form'>
//                     <h1 className='contact-heading'>Update contact</h1>
//                     <input value={Name} required onChange={(e) => { setName(e.target.value) }} type='text' className='contact-input' placeholder=' Name'></input>
//                     <input value={Email} required onChange={(e) => { setEmail(e.target.value) }} type='text' className='contact-input' placeholder=' Email'></input>
//                     <input value={Password} required onChange={(e) => { setPassword(e.target.value) }} type='text' className='contact-input' placeholder=' Password'></input>
//                     <select value={BatchName} required onChange={(e) => { setBatchName(e.target.value) }} type='text' className='contact-input'>
//                         <option>Select Batch</option>
//                         {BatchList.map(data => {
//                             return <option key={data._id}>{data.batchName}</option>
//                         })}
//                     </select>
//                     <input required onChange={(e) => { setContactImg(e.target.files[0]) }} type='file' className='contact-input' placeholder=' Contact Img'></input>
//                     <button onClick={submitHandler} type='submit' className='contact-input contact-btn'>{Loading ? <i className="fa-solid fa-spinner"></i> : <div>Update Contact</div>}</button>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default UpdateStudent







import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import "./routerCssFiles/addcontact.css";

const UpdateStudent = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const student = location.state;

    const [name, setName] = useState(
        student.userName
    );

    const [email, setEmail] = useState(
        student.email
    );

    const [password, setPassword] = useState(
        student.password
    );

    const [batchName, setBatchName] = useState(
        student.batchName
    );

    const [contactImg, setContactImg] = useState(
        null
    );

    const [loading, setLoading] = useState(
        false
    );

    const [batchList, setBatchList] = useState(
        []
    );

    useEffect(() => {
        getBatchData();
    }, []);

    const getBatchData = async () => {
        try {

            const batchData =
                await axios.get(
                    "https://batch-students.onrender.com/batch/get-all-batch",
                    {
                        headers: {
                            Authorization:
                                "Bearer " +
                                localStorage.getItem(
                                    "token"
                                ),
                        },
                    }
                );

            setBatchList(
                batchData.data.batches
            );

        } catch (err) {

            console.log(err);

            toast.error(
                "Failed to load batches"
            );
        }
    };

    const submitHandler = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const formData =
                new FormData();

            formData.append(
                "userName",
                name
            );

            formData.append(
                "email",
                email
            );

            formData.append(
                "password",
                password
            );

            formData.append(
                "batchName",
                batchName
            );

            if (contactImg) {
                formData.append(
                    "photo",
                    contactImg
                );
            }

            await axios.put(
                "https://batch-students.onrender.com/contact/update/" +
                student._id,
                formData,
                {
                    headers: {
                        Authorization:
                            "Bearer " +
                            localStorage.getItem(
                                "token"
                            ),
                    },
                }
            );

            toast.success(
                "Student updated successfully"
            );

            setTimeout(() => {
                navigate(
                    "/dashboard/allcontact"
                );
            }, 1200);

        } catch (err) {

            console.log(err);

            toast.error(
                "Failed to update student"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="contact-wrapper">

            <div className="contact-form-box">

                <form
                    className="contact-form"
                    onSubmit={submitHandler}
                >

                    <h1 className="contact-heading">
                        Update Student
                    </h1>

                    <p className="contact-subtitle">
                        Update student information
                    </p>

                    <input
                        type="text"
                        className="contact-input"
                        placeholder="Student Name"
                        value={name}
                        onChange={(e) =>
                            setName(
                                e.target.value
                            )
                        }
                        required
                    />

                    <input
                        type="email"
                        className="contact-input"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(
                                e.target.value
                            )
                        }
                        required
                    />

                    <input
                        type="password"
                        className="contact-input"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                        required
                    />

                    <select
                        className="contact-input"
                        value={batchName}
                        onChange={(e) =>
                            setBatchName(
                                e.target.value
                            )
                        }
                        required
                    >

                        <option value="">
                            Select Batch
                        </option>

                        {batchList.map(
                            (data) => (
                                <option
                                    key={
                                        data._id
                                    }
                                    value={
                                        data.batchName
                                    }
                                >
                                    {
                                        data.batchName
                                    }
                                </option>
                            )
                        )}

                    </select>

                    <input
                        type="file"
                        accept="image/*"
                        className="contact-input"
                        onChange={(e) =>
                            setContactImg(
                                e.target
                                    .files[0]
                            )
                        }
                    />

                    <button
                        type="submit"
                        className="contact-btn"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <i className="fa-solid fa-spinner fa-spin"></i>
                                &nbsp;
                                Updating...
                            </>
                        ) : (
                            "Update Student"
                        )}
                    </button>

                </form>

            </div>

        </div>
    );
};

export default UpdateStudent;