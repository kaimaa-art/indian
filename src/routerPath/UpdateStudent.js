import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const UpdateStudent = () => {

    const location = useLocation('location.state')

    const navigate = useNavigate()

    useEffect(() => {
        getBatchData()
    }, [])

    const getBatchData = async () => {
        try {
            const batchData = await axios.get('http://localhost:5000/batch/get-all-batch', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            setBatchList(batchData.data.batches)
        }
        catch (err) {
            console.log("error " + err)
        }
    }

    const [Name, setName] = useState(location.state.userName)
    const [Email, setEmail] = useState(location.state.email)
    const [Password, setPassword] = useState(location.state.password)
    const [BatchName, setBatchName] = useState(location.state.batchName)
    const [ContactImg, setContactImg] = useState(location.state.imgUrl)
    const [Loading, setLoading] = useState(false)
    const [BatchList, setBatchList] = useState([])

    const submitHandler = async (e) => {

        e.preventDefault()

        const formData = new FormData()
        formData.append('userName', Name)
        formData.append('email', Email)
        formData.append('password', Password)
        formData.append('batchName', BatchName)
        formData.append('photo', ContactImg)

        try {
            setLoading(true)
            await axios.put('http://www.localhost:5000/contact/update/' + location.state._id, formData, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            setLoading(false)
            window.alert("student data updated")
            navigate('/dashboard/allbatch')
        }
        catch (err) {
            setLoading(false)
            console.log("error " + err)
        }
    }

    return (
        <div className='contact-wrapper'>
            <div className='contact-form-box'>
                <form className='contact-form'>
                    <h1 className='contact-heading'>Update contact</h1>
                    <input value={Name} required onChange={(e) => { setName(e.target.value) }} type='text' className='contact-input' placeholder=' Name'></input>
                    <input value={Email} required onChange={(e) => { setEmail(e.target.value) }} type='text' className='contact-input' placeholder=' Email'></input>
                    <input value={Password} required onChange={(e) => { setPassword(e.target.value) }} type='text' className='contact-input' placeholder=' Password'></input>
                    <select value={BatchName} required onChange={(e) => { setBatchName(e.target.value) }} type='text' className='contact-input'>
                        <option>Select Batch</option>
                        {BatchList.map(data => {
                            return <option key={data._id}>{data.batchName}</option>
                        })}
                    </select>
                    <input required onChange={(e) => { setContactImg(e.target.files[0]) }} type='file' className='contact-input' placeholder=' Contact Img'></input>
                    <button onClick={submitHandler} type='submit' className='contact-input contact-btn'>{Loading ? <i className="fa-solid fa-spinner"></i> : <div>Update Contact</div>}</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateStudent
