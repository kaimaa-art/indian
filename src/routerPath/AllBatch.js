import axios from "axios";
import { useEffect, useState } from "react";
import "./routerCssFiles/allbatch.css";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AllBatch = () => {
    const [batchList, setBatchList] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        getBatch();
    }, []);

    const getBatch = async () => {
        try {
            setLoading(true);

            const getBatchData = await axios.get(
                "https://batch-students.onrender.com/batch/get-all-batch",
                {
                    headers: {
                        Authorization:
                            "Bearer " +
                            localStorage.getItem("token"),
                    },
                }
            );

            setBatchList(
                getBatchData.data.batches
            );

        } catch (err) {

            console.log(err);

            toast.error(
                "Failed to load batches"
            );

        } finally {

            setLoading(false);

        }
    };

    if (loading) {
        return (
            <div className="all-no-batch-loader">
                <i className="fa-solid fa-spinner fa-spin"></i>
            </div>
        );
    }

    if (batchList.length === 0) {
        return (
            <div className="all-no-batch-data">

                <h1>No Batch Available</h1>

                <button
                    onClick={() =>
                        navigate(
                            "/dashboard/addbatch"
                        )
                    }
                >
                    + Add Batch
                </button>

            </div>
        );
    }

    return (
        <div className="all-batch-wrapper">

            {batchList.map((data) => (
                <div
                    key={data._id}
                    className="all-batch-box"
                    onClick={() =>
                        navigate(
                            "/dashboard/batchdetail",
                            {
                                state: data,
                            }
                        )
                    }
                >
                    <img
                        src={data.batchImgUrl}
                        alt="batch"
                        className="all-batch-batch-img"
                    />

                    <h2>
                        {data.batchName}
                    </h2>

                    <p>
                        {data.duration}
                    </p>

                </div>
            ))}

        </div>
    );
};

export default AllBatch;