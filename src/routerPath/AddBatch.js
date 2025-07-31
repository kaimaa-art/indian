import axios from 'axios'
import './routerCssFiles/addbatch.css'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const AddBatch = () => {

    const location = useLocation()
    const [Loading, setLoading] = useState(false)
    const [BatchName, setBatchName] = useState(location.state ? location.state.batchName : '')
    const [Duration, setDuration] = useState(location.state ? location.state.duration : '')
    const [StartingDate, setStartingDate] = useState(location.state ? location.state.startiongDate : '')
    const [CourseFee, setCourseFee] = useState(location.state ? location.state.courseFee : '')
    const [Description, setDescription] = useState(location.state ? location.state.description : '')
    const [BatchImg, setBatchImg] = useState(null)

    const navigate = useNavigate()

    const submitHandler = async (e) => {

        e.preventDefault()

        const formData = new FormData()
        formData.append('batchName', BatchName)
        formData.append('duration', Duration)
        formData.append('startingDate', StartingDate)
        formData.append('courseFee', CourseFee)
        formData.append('description', Description)
        formData.append('batchImg', BatchImg)

        if (location.state == null) {
            try {
                setLoading(true)
                await axios.post('http://www.localhost:5000/batch/create-batch', formData, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                setLoading(false)
                await navigate('/dashboard/allbatch')
                window.alert('new batch is added')
            }
            catch (err) {
                console.log('error ' + err)
                setLoading(false)
            }
        }
        else {
            try {
                setLoading(true)
                await axios.put('http://www.localhost:5000/batch/update-batch/' + location.state._id, formData, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                setLoading(false)
                await navigate('/dashboard/allbatch')
                window.alert('batch is updated ')
            }
            catch (err) {
                console.log('error ' + err)
                setLoading(false)
            }
        }

    }

    return (
        <div className='batch-wrapper'>
            <div className='batch-form-box'>
                <form className='batch-form'>
                    <h1 className='batch-heading'>{location.state ? 'Edit Batch' : 'New Batch'}</h1>
                    <input required onChange={(e) => { setBatchName(e.target.value) }} type='text' className='batch-input' value={BatchName} placeholder='Batch Name'></input>
                    <input required onChange={(e) => { setDuration(e.target.value) }} type='text' className='batch-input' value={Duration} placeholder='Duration'></input>
                    <input required onChange={(e) => { setStartingDate(e.target.value) }} type='date' className='batch-input' value={StartingDate} placeholder='Starting Date'></input>
                    <input required onChange={(e) => { setCourseFee(e.target.value) }} type='text' className='batch-input' value={CourseFee} placeholder='Course Fee'></input>
                    <input required onChange={(e) => { setDescription(e.target.value) }} type='text' className='batch-input' value={Description} placeholder='Description'></input>
                    <input required onChange={(e) => { setBatchImg(e.target.files[0]) }} type='file' className='batch-input' placeholder='Batch Image'></input>
                    <button onClick={submitHandler} type='submit' className='register-input register-btn'>{Loading ? (<i className="fa-solid fa-spinner"></i>) : (location.state ? 'Update Batch' : 'Create Batch')}</button>
                </form>
            </div>
        </div>
    )
}

export default AddBatch
