import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./routerCssFiles/batchdetail.css";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "sonner";

const BatchDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [batchDetail] = useState(location.state);
    const [batchStudents, setBatchStudents] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        studentGetByBatchName();
    }, []);

    const studentGetByBatchName = async () => {
        try {
            setLoading(true);

            const batchStudentData = await axios.get(
                "https://batch-students.onrender.com/contact/get-all-by-batch/" +
                location.state.batchName,
                {
                    headers: {
                        Authorization:
                            "Bearer " +
                            localStorage.getItem("token"),
                    },
                }
            );

            setBatchStudents(
                batchStudentData.data.batch_students
            );

        } catch (err) {

            console.log(err);

            toast.error(
                "Failed to load students"
            );

        } finally {

            setLoading(false);

        }
    };

    const deleteStudent = async (id) => {

        const result = await Swal.fire({
            title: "Delete Student?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#64748b",
            confirmButtonText: "Delete",
        });

        if (!result.isConfirmed) return;

        try {

            setLoading(true);

            await axios.delete(
                "https://batch-students.onrender.com/contact/delete/" + id,
                {
                    headers: {
                        Authorization:
                            "Bearer " +
                            localStorage.getItem("token"),
                    },
                }
            );

            toast.success(
                "Student deleted successfully"
            );

            await studentGetByBatchName();

        } catch (err) {

            console.log(err);

            toast.error(
                "Failed to delete student"
            );

        } finally {

            setLoading(false);

        }
    };

    const submitDelete = async () => {

        const result = await Swal.fire({
            title: "Delete Batch?",
            text:
                "All students inside this batch will also be deleted.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#64748b",
            confirmButtonText: "Delete Batch",
        });

        if (!result.isConfirmed) return;

        try {

            setLoading(true);

            await axios.delete(
                "https://batch-students.onrender.com/batch/delete-batch/" +
                location.state._id,
                {
                    headers: {
                        Authorization:
                            "Bearer " +
                            localStorage.getItem("token"),
                    },
                }
            );

            await axios.delete(
                "https://batch-students.onrender.com/contact/delete-all-contact-by-batchName/" +
                location.state.batchName,
                {
                    headers: {
                        Authorization:
                            "Bearer " +
                            localStorage.getItem("token"),
                    },
                }
            );

            toast.success(
                "Batch deleted successfully"
            );

            setTimeout(() => {
                navigate("/dashboard/allbatch");
            }, 1200);

        } catch (err) {

            console.log(err);

            toast.error(
                "Failed to delete batch"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="batch-detail-wrapper">

            <div className="batch-detail-text">

                <h1>
                    {batchDetail.batchName}
                </h1>

                <p>
                    <strong>
                        Starting Date:
                    </strong>{" "}
                    {batchDetail.startingDate}
                </p>

                <p>
                    <strong>
                        Duration:
                    </strong>{" "}
                    {batchDetail.duration}
                </p>

                <p>
                    <strong>
                        Course Fee:
                    </strong>{" "}
                    {batchDetail.courseFee}
                </p>

                <p>
                    <strong>
                        Description:
                    </strong>{" "}
                    {batchDetail.description}
                </p>

                <br />

                <button
                    onClick={() =>
                        navigate(
                            "/dashboard/addbatch",
                            {
                                state:
                                    batchDetail,
                            }
                        )
                    }
                    className="student-btn edit batch"
                >
                    Edit Batch
                </button>

                <button
                    onClick={submitDelete}
                    className="student-btn delete batch"
                >
                    Delete Batch
                </button>

            </div>

            {loading ? (
                <div className="batch-detail-no-students">
                    <i className="fa-solid fa-spinner fa-spin"></i>
                </div>
            ) : batchStudents.length === 0 ? (
                <div className="batch-detail-no-students">

                    <h1>
                        No Students Available
                    </h1>

                    <button
                        onClick={() =>
                            navigate(
                                "/dashboard/addcontact"
                            )
                        }
                    >
                        + Add Student
                    </button>

                </div>
            ) : (

                <div className="table-wrapper">

                    <table>

                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Photo</th>
                                <th colSpan={3}>
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>

                            {batchStudents.map(
                                (
                                    data,
                                    index
                                ) => (
                                    <tr
                                        key={
                                            data._id
                                        }
                                    >

                                        <td>
                                            {index + 1}
                                        </td>

                                        <td>
                                            {
                                                data.userName
                                            }
                                        </td>

                                        <td>
                                            {
                                                data.email
                                            }
                                        </td>

                                        <td>
                                            <img
                                                src={
                                                    data.imgUrl
                                                }
                                                alt="student"
                                                className="batch-detail-student-img"
                                            />
                                        </td>

                                        <td>
                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        "/dashboard/studentDetail",
                                                        {
                                                            state:
                                                                data,
                                                        }
                                                    )
                                                }
                                                className="student-btn detail"
                                            >
                                                Detail
                                            </button>
                                        </td>

                                        <td>
                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        "/dashboard/updatestudent",
                                                        {
                                                            state:
                                                                data,
                                                        }
                                                    )
                                                }
                                                className="student-btn edit"
                                            >
                                                Edit
                                            </button>
                                        </td>

                                        <td>
                                            <button
                                                onClick={() =>
                                                    deleteStudent(
                                                        data._id
                                                    )
                                                }
                                                className="student-btn delete"
                                            >
                                                Delete
                                            </button>
                                        </td>

                                    </tr>
                                )
                            )}

                        </tbody>

                    </table>

                </div>
            )}
        </div>
    );
};

export default BatchDetail;