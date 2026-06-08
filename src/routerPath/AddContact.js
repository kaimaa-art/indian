// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import './routerCssFiles/addcontact.css'
// import { useNavigate } from 'react-router-dom'

// const AddContact = () => {

//     const [Name, setName] = useState('')
//     const [Email, setEmail] = useState('')
//     const [Password, setPassword] = useState('')
//     const [BatchName, setBatchName] = useState('')
//     const [ContactImg, setContactImg] = useState(null)
//     const [Loading, setLoading] = useState(false)
//     const [BatchList, setBatchList] = useState([])

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

//     const navigate = useNavigate()

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
//             await axios.post('https://batch-students.onrender.com/contact/post', formData, {
//                 headers: {
//                     Authorization: 'Bearer ' + localStorage.getItem('token')
//                 }
//             })
//             setLoading(false)
//             window.alert("new contact is added")
//             navigate('/dashboard/allcontact')
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
//                     <h1 className='contact-heading'>New contact</h1>
//                     <input required onChange={(e) => { setName(e.target.value) }} type='text' className='contact-input' placeholder=' Name'></input>
//                     <input required onChange={(e) => { setEmail(e.target.value) }} type='text' className='contact-input' placeholder=' Email'></input>
//                     <input required onChange={(e) => { setPassword(e.target.value) }} type='text' className='contact-input' placeholder=' Password'></input>
//                     <select required onChange={(e) => { setBatchName(e.target.value) }} type='text' className='contact-input'>
//                         <option>Select Batch</option>
//                         {BatchList.map(data => {
//                             return <option key={data._id} value={data.batchName}>{data.batchName}</option>
//                         })}
//                     </select>
//                     <input required onChange={(e) => { setContactImg(e.target.files[0]) }} type='file' className='contact-input' placeholder=' Contact Img'></input>
//                     <button onClick={submitHandler} type='submit' className='contact-input contact-btn'>{Loading ? <i className="fa-solid fa-spinner"></i> : <div>Add Contact</div>}</button>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default AddContact








import axios from "axios";
import { useEffect, useState } from "react";
import "./routerCssFiles/addcontact.css";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddContact = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [batchName, setBatchName] = useState("");
    const [contactImg, setContactImg] = useState(null);
    const [loading, setLoading] = useState(false);
    const [batchList, setBatchList] = useState([]);

    useEffect(() => {
        getBatchData();
    }, []);

    const getBatchData = async () => {
        try {
            const batchData = await axios.get(
                "https://batch-students.onrender.com/batch/get-all-batch",
                {
                    headers: {
                        Authorization:
                            "Bearer " +
                            localStorage.getItem("token"),
                    },
                }
            );

            setBatchList(batchData.data.batches);
        } catch (err) {
            console.log(err);
            toast.error("Failed to load batches");
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!contactImg) {
            toast.error("Please select a photo");
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();

            formData.append("userName", name);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("batchName", batchName);
            formData.append("photo", contactImg);

            await axios.post(
                "https://batch-students.onrender.com/contact/post",
                formData,
                {
                    headers: {
                        Authorization:
                            "Bearer " +
                            localStorage.getItem("token"),
                    },
                }
            );

            toast.success(
                "New student added successfully"
            );

            setTimeout(() => {
                navigate("/dashboard/allcontact");
            }, 1200);

        } catch (err) {
            console.log(err);

            toast.error(
                "Failed to add contact"
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
                        Add New Student
                    </h1>

                    <p className="contact-subtitle">
                        Create and manage students easily
                    </p>

                    <input
                        required
                        type="text"
                        className="contact-input"
                        placeholder="Student Name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                    />

                    <input
                        required
                        type="email"
                        className="contact-input"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                    <input
                        required
                        type="password"
                        className="contact-input"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                    <select
                        required
                        className="contact-input"
                        value={batchName}
                        onChange={(e) =>
                            setBatchName(e.target.value)
                        }
                    >
                        <option value="">
                            Select Batch
                        </option>

                        {batchList.map((data) => (
                            <option
                                key={data._id}
                                value={data.batchName}
                            >
                                {data.batchName}
                            </option>
                        ))}
                    </select>

                    <input
                        required
                        type="file"
                        className="contact-input"
                        accept="image/*"
                        onChange={(e) =>
                            setContactImg(
                                e.target.files[0]
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
                                &nbsp; Adding...
                            </>
                        ) : (
                            "Add Student"
                        )}
                    </button>

                </form>

            </div>
        </div>
    );
};

export default AddContact;