import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import "./routerCssFiles/addcontact.css";

const UpdateStudent = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const student = location.state;

    const [name, setName] = useState(
        student.userName
    );

    const [email, setEmail] = useState(
        student.email
    );

    const [password, setPassword] = useState(
        student.password
    );

    const [batchName, setBatchName] = useState(
        student.batchName
    );

    const [contactImg, setContactImg] = useState(
        null
    );

    const [loading, setLoading] = useState(
        false
    );

    const [batchList, setBatchList] = useState(
        []
    );

    useEffect(() => {
        getBatchData();
    }, []);

    const getBatchData = async () => {
        try {

            const batchData =
                await axios.get(
                    "https://batch-students.onrender.com/batch/get-all-batch",
                    {
                        headers: {
                            Authorization:
                                "Bearer " +
                                localStorage.getItem(
                                    "token"
                                ),
                        },
                    }
                );

            setBatchList(
                batchData.data.batches
            );

        } catch (err) {

            console.log(err);

            toast.error(
                "Failed to load batches"
            );
        }
    };

    const submitHandler = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const formData =
                new FormData();

            formData.append(
                "userName",
                name
            );

            formData.append(
                "email",
                email
            );

            formData.append(
                "password",
                password
            );

            formData.append(
                "batchName",
                batchName
            );

            if (contactImg) {
                formData.append(
                    "photo",
                    contactImg
                );
            }

            await axios.put(
                "https://batch-students.onrender.com/contact/update/" +
                student._id,
                formData,
                {
                    headers: {
                        Authorization:
                            "Bearer " +
                            localStorage.getItem(
                                "token"
                            ),
                    },
                }
            );

            toast.success(
                "Student updated successfully"
            );

            setTimeout(() => {
                navigate(
                    "/dashboard/allcontact"
                );
            }, 1200);

        } catch (err) {

            console.log(err);

            toast.error(
                "Failed to update student"
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
                        Update Student
                    </h1>

                    <p className="contact-subtitle">
                        Update student information
                    </p>

                    <input
                        type="text"
                        className="contact-input"
                        placeholder="Student Name"
                        value={name}
                        onChange={(e) =>
                            setName(
                                e.target.value
                            )
                        }
                        required
                    />

                    <input
                        type="email"
                        className="contact-input"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(
                                e.target.value
                            )
                        }
                        required
                    />

                    <input
                        type="password"
                        className="contact-input"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                        required
                    />

                    <select
                        className="contact-input"
                        value={batchName}
                        onChange={(e) =>
                            setBatchName(
                                e.target.value
                            )
                        }
                        required
                    >

                        <option value="">
                            Select Batch
                        </option>

                        {batchList.map(
                            (data) => (
                                <option
                                    key={
                                        data._id
                                    }
                                    value={
                                        data.batchName
                                    }
                                >
                                    {
                                        data.batchName
                                    }
                                </option>
                            )
                        )}

                    </select>

                    <input
                        type="file"
                        accept="image/*"
                        className="contact-input"
                        onChange={(e) =>
                            setContactImg(
                                e.target
                                    .files[0]
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
                                &nbsp;
                                Updating...
                            </>
                        ) : (
                            "Update Student"
                        )}
                    </button>

                </form>

            </div>

        </div>
    );
};

export default UpdateStudent;