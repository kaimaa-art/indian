import { useLocation } from 'react-router-dom'
import './routerCssFiles/studentdetail.css'

const StudentDetail = () => {

  const location = useLocation()

  return (
    <div className='student-detail-wrapper'>
      <div className='student-detail-form-box'>
        <div className='student-detail-form'>
          <h1>Student Detail</h1>
          <img alt='student-img' className='student-detail-student-img' src={location.state.imgUrl} />
          <h2>Name :- {location.state.userName}</h2>
          <p> Email :- {location.state.email}</p>
          <p> Password :- {location.state.password}</p>
          <p> Batch :- {location.state.batchName}</p>
          <p> Id :- {location.state._id}</p>
        </div>
      </div>
    </div>
  )
}

export default StudentDetail
