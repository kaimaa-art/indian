import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './routerCssFiles/allbatch.css'
import { useNavigate } from 'react-router-dom'

const AllBatch = () => {

    const [batchList, setBatchList] = useState([])
    const [Loading, setLoading] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        getBatch()
    }, [])

    const getBatch = async () => {
        try {
            setLoading(true)
            const getBatchData = await axios.get('http://www.localhost:5000/batch/get-all-batch', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            setBatchList(getBatchData.data.batches)
            setLoading(false)
        }
        catch (err) {
            console.log("error " + err)
            setLoading(false)
        }
    }

    return (
        Loading ?
            (
                <div className='all-no-batch-loader'>
                    <i className="fa-solid fa-spinner"></i>
                </div>
            ) :
            (
                batchList.length === 0 ?
                    (
                        <div className='all-no-batch-data'>
                            <h1> No batch is available</h1>
                            <button onClick={() => { navigate('/dashboard/addbatch') }}> Add Batch</button>
                        </div>
                    ) :
                    (
                        <div className='all-batch-wrapper'>
                            {batchList.map(data => {
                                return (
                                    <div key={data._id} onClick={() => { navigate('/dashboard/batchdetail', { state: data }) }} className='all-batch-box'>
                                        <img alt='batch image' className='all-batch-batch-img' src={data.batchImgUrl} />
                                        <h1>{data.batchName}</h1>
                                        <p>{data.duration}</p>
                                    </div>
                                )
                            })}
                        </div>
                    )
            )
    )
}

export default AllBatch
