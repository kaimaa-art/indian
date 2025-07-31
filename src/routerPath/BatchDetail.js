import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './routerCssFiles/batchdetail.css'
import axios from 'axios'

const BatchDetail = () => {

    const location = useLocation()

    useEffect(() => {
        studentGetByBatchName()
    }, [])

    const [batchDetail, setBatchDetail] = useState(location.state)
    const [batchStudents, setBatchStudents] = useState([])
    const [Loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const studentGetByBatchName = async () => {
        try {
            setLoading(true)
            const batchStudentData = await axios.get('https://batch-students.onrender.com/contact/get-all-by-batch/' + location.state.batchName, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            setBatchStudents(batchStudentData.data.batch_students)
            setLoading(false)
        }
        catch (err) {
            console.log('error ' + err)
            setLoading(false)
        }
    }

    const deleteStudent = async (id) => {
        try {
            if (window.confirm('are you sure to delete this student')) {
                setLoading(true)
                await axios.delete('https://batch-students.onrender.com/contact/delete/' + id, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                studentGetByBatchName()
                setLoading(false)
                window.alert("student data deleted")
            }
        }
        catch (err) {
            console.log('error ' + err)
            setLoading(false)
        }
    }

    const submitDelete = async () => {
        try {
            if (window.confirm('are you sure to delete this batch')) {
                setLoading(true)
                await axios.delete('https://batch-students.onrender.com/batch/delete-batch/' + location.state._id, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                await axios.delete('https://batch-students.onrender.com/contact/delete-all-contact-by-batchName/' + location.state.batchName, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                window.alert("batch and students of that batch has been deleted")
                navigate('/dashboard/allbatch')
                setLoading(false)
            }
        }
        catch (err) {
            console.log('error ' + err)
        }
    }

    return (
        <div className='batch-detail-wrapper'>
            <div className='batch-detail-text'>
                <h1>{batchDetail.batchName}</h1>
                <p>starting date :- {batchDetail.startingDate}</p>
                <p>Duration :- {batchDetail.duration}</p>
                <p>Course Fee :- {batchDetail.courseFee}</p>
                <p>Description :- {batchDetail.description}</p>
                <button onClick={() => { navigate('/dashboard/addbatch', { state: batchDetail }) }} className='student-btn edit batch'>Edit </button>
                <button onClick={submitDelete} className='student-btn delete batch'>Delete </button>
            </div>
            <br />
            <hr />
            {
                Loading ?
                    (<div className='batch-detail-no-students'><i className="fa-solid fa-spinner"></i></div>) :
                    (<div>
                        {batchStudents.length === 0 ?
                            (<div className='batch-detail-no-students'>
                                <h1 >no students are available in this batch</h1>
                                <button onClick={() => { navigate('/dashboard/addcontact') }}>Add Students</button>
                            </div>) :
                            (<table >
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>password</th>
                                        <th>Photo</th>
                                        <th colSpan={3}>Manage Students</th>
                                    </tr>
                                </thead>
                                {
                                    batchStudents.map((data, index) => {
                                        return (
                                            <tbody className='batch-detail-table' key={data._id}>
                                                <tr >
                                                    <td>{index + 1}</td>
                                                    <td >{data.userName}</td>
                                                    <td >{data.email}</td>
                                                    <td >{data.password}</td>
                                                    <td ><img alt='student-image' className='batch-detail-student-img' src={data.imgUrl} /></td>
                                                    <td><button onClick={() => { navigate('/dashboard/studentDetail', { state: data }) }} className='student-btn detail'>Detail</button></td>
                                                    <td><button onClick={() => { navigate('/dashboard/updatestudent', { state: data }) }} className='student-btn edit'>Edit</button></td>
                                                    <td><button onClick={() => { deleteStudent(data._id) }} className='student-btn delete'>Delete</button></td>
                                                </tr>
                                            </tbody>
                                        )
                                    })
                                }
                            </table>)
                        }
                    </div>)
            }

        </div>
    )
}

export default BatchDetail