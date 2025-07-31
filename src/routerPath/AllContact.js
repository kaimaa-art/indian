import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './routerCssFiles/allcontact.css'
import { useNavigate } from 'react-router-dom'

const AllContact = () => {

    const [AllStudent, setAllStudent] = useState([])
    const [Loading, setLoading] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        getAllStudent()
    }, [])

    const getAllStudent = async () => {
        try {
            setLoading(true)
            const allStudentsData = await axios.get('https://batch-students.onrender.com/contact/get-all', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            setAllStudent(allStudentsData.data.msg)
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
                getAllStudent()
                window.alert("student data deleted")
                setLoading(false)
            }
        }
        catch (err) {
            console.log('error ' + err)
            setLoading(false)
        }
    }

    return (
        Loading ?
            (<div className='all-contact-detail-no-students'><i className="fa-solid fa-spinner"></i></div>) :
            (<div>
                {
                    AllStudent.length === 0 ?
                        (<div className='all-no-students'>
                            <h1>no students are available</h1>
                            <button onClick={() => { navigate('/dashboard/addcontact') }}>Add Students</button>
                        </div>) :
                        (<div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Uid</th>
                                        <th>Batch</th>
                                        <th colSpan={3}>Manage Students</th>
                                    </tr>
                                </thead>
                                <tbody className='all-contact-table'>
                                    {
                                        AllStudent.map((data, index) => {
                                            return (
                                                <tr key={data._id}>
                                                    <td>{index + 1}</td>
                                                    <td>{data.userName}</td>
                                                    <td>{data.email}</td>
                                                    <td>{data._id}</td>
                                                    <td>{data.batchName}</td>
                                                    <td><button onClick={() => { navigate('/dashboard/studentDetail', { state: data }) }} className='student-btn detail'>Detail</button></td>
                                                    <td><button onClick={() => { navigate('/dashboard/updatestudent', { state: data }) }} className='student-btn edit'>Edit</button></td>
                                                    <td><button onClick={() => { deleteStudent(data._id) }} className='student-btn delete'>Delete</button></td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>)
                }
            </div>)
    )
}

export default AllContact