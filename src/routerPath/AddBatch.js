import axios from "axios";
import "./routerCssFiles/addbatch.css";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddBatch = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [batchName, setBatchName] = useState(
        location.state?.batchName || ""
    );

    const [duration, setDuration] = useState(
        location.state?.duration || ""
    );

    const [startingDate, setStartingDate] = useState(
        location.state?.startiongDate || ""
    );

    const [courseFee, setCourseFee] = useState(
        location.state?.courseFee || ""
    );

    const [description, setDescription] = useState(
        location.state?.description || ""
    );

    const [batchImg, setBatchImg] = useState(null);

    const submitHandler = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const formData = new FormData();

            formData.append(
                "batchName",
                batchName
            );

            formData.append(
                "duration",
                duration
            );

            formData.append(
                "startingDate",
                startingDate
            );

            formData.append(
                "courseFee",
                courseFee
            );

            formData.append(
                "description",
                description
            );

            if (batchImg) {
                formData.append(
                    "batchImg",
                    batchImg
                );
            }

            if (!location.state) {

                await axios.post(
                    "https://batch-students.onrender.com/batch/create-batch",
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
                    "Batch created successfully"
                );

            } else {

                await axios.put(
                    "https://batch-students.onrender.com/batch/update-batch/" +
                    location.state._id,
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
                    "Batch updated successfully"
                );
            }

            setTimeout(() => {
                navigate(
                    "/dashboard/allbatch"
                );
            }, 1200);

        } catch (err) {

            console.log(err);

            toast.error(
                "Something went wrong"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="batch-wrapper">

            <div className="batch-form-box">

                <form
                    className="batch-form"
                    onSubmit={submitHandler}
                >

                    <h1 className="batch-heading">
                        {
                            location.state
                                ? "Update Batch"
                                : "Create New Batch"
                        }
                    </h1>

                    <p className="batch-subtitle">
                        Manage your batches
                    </p>

                    <input
                        required
                        type="text"
                        className="batch-input"
                        placeholder="Batch Name"
                        value={batchName}
                        onChange={(e) =>
                            setBatchName(
                                e.target.value
                            )
                        }
                    />

                    <input
                        required
                        type="text"
                        className="batch-input"
                        placeholder="Duration"
                        value={duration}
                        onChange={(e) =>
                            setDuration(
                                e.target.value
                            )
                        }
                    />

                    <input
                        required
                        type="date"
                        className="batch-input"
                        value={startingDate}
                        onChange={(e) =>
                            setStartingDate(
                                e.target.value
                            )
                        }
                    />

                    <input
                        required
                        type="text"
                        className="batch-input"
                        placeholder="Course Fee"
                        value={courseFee}
                        onChange={(e) =>
                            setCourseFee(
                                e.target.value
                            )
                        }
                    />

                    <textarea
                        required
                        className="batch-input batch-textarea"
                        placeholder="Description"
                        value={description}
                        onChange={(e) =>
                            setDescription(
                                e.target.value
                            )
                        }
                    />

                    <input
                        type="file"
                        className="batch-input"
                        accept="image/*"
                        onChange={(e) =>
                            setBatchImg(
                                e.target.files[0]
                            )
                        }
                    />

                    <button
                        type="submit"
                        className="batch-btn"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <i className="fa-solid fa-spinner fa-spin"></i>
                                &nbsp; Processing...
                            </>
                        ) : (
                            location.state
                                ? "Update Batch"
                                : "Create Batch"
                        )}
                    </button>

                </form>

            </div>

        </div>
    );
};

export default AddBatch;