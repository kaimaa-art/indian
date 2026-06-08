import axios from "axios";
import { useEffect, useState } from "react";
import "./routerCssFiles/allcontact.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "sonner";

const AllContact = () => {
    const [allStudent, setAllStudent] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        getAllStudent();
    }, []);

    const getAllStudent = async () => {
        try {
            setLoading(true);

            const allStudentsData = await axios.get(
                "https://batch-students.onrender.com/contact/get-all",
                {
                    headers: {
                        Authorization:
                            "Bearer " +
                            localStorage.getItem("token"),
                    },
                }
            );

            setAllStudent(allStudentsData.data.students)

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

            await getAllStudent();

            toast.success(
                "Student deleted successfully"
            );

        } catch (err) {

            console.log(err);

            toast.error(
                "Failed to delete student"
            );

        } finally {

            setLoading(false);

        }
    };

    const filteredStudents = allStudent.filter((student) =>
        student.userName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="all-contact-detail-no-students">
                <i className="fa-solid fa-spinner fa-spin"></i>
            </div>
        );
    }

    if (allStudent.length === 0) {
        return
        (
            <div className="all-no-students">

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
        )
    }

    return (

        <div className="all-contact-container">

            <div className="search-container">

                <div className="search-box">

                    <i className="fa-solid fa-magnifying-glass"></i>

                    <input
                        type="text"
                        placeholder="Search student..."
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(e.target.value)
                        }
                    />

                </div>

            </div>

            <div className="table-wrapper">

                <table>

                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Photo</th>
                            <th>Batch</th>
                            <th colSpan={3}>
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>

                        {filteredStudents.map(
                            (data, index) => (
                                <tr key={data._id}>

                                    <td>
                                        {index + 1}
                                    </td>

                                    <td>
                                        {data.userName}
                                    </td>

                                    <td>
                                        {data.email}
                                    </td>

                                    <td>
                                        <img
                                            src={data.imgUrl}
                                            alt="student"
                                            className="student-image"
                                        />
                                    </td>

                                    <td>
                                        {data.batchName}
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
            {/* )} */}

        </div>
    );
};

export default AllContact;