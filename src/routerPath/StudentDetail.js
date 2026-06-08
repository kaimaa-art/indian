import { useLocation, useNavigate } from "react-router-dom";
import "./routerCssFiles/studentdetail.css";

const StudentDetail = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const student = location.state;

  return (
    <div className="student-detail-wrapper">

      <div className="student-detail-form-box">

        <div className="student-detail-form">

          <h1>Student Details</h1>

          <img
            src={student.imgUrl}
            alt="student"
            className="student-detail-student-img"
          />

          <h2 className="student-name">
            {student.userName}
          </h2>

          <div className="student-info">

            <p>
              <strong>Email:</strong>{" "}
              {student.email}
            </p>

            <p>
              <strong>Batch:</strong>{" "}
              {student.batchName}
            </p>

            <p>
              <strong>Student ID:</strong>{" "}
              {student._id}
            </p>

          </div>

          <button
            onClick={() => navigate(-1)}
            className="student-btn detail"
          >
            Go Back
          </button>

        </div>

      </div>

    </div>
  );
};

export default StudentDetail;