import "./routerCssFiles/home.css";
import axios from "axios";
import { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    PieChart,
    Pie,
    Cell,
    Legend,
    LineChart,
    Line
} from "recharts";

const Home = () => {

    const COLORS = [
        "#3B82F6",
        "#10B981",
        "#F59E0B",
        "#EF4444",
        "#8B5CF6",
        "#06B6D4"
    ];

    const userName =
        localStorage.getItem("userName") || "User";

    const [students, setStudents] = useState(0);
    const [batches, setBatches] = useState(0);
    const [newStudents, setNewStudents] = useState(0);
    const [recentStudents, setRecentStudents] = useState([]);
    const [batchChart, setBatchChart] = useState([]);
    const [monthlyData, setMonthlyData] = useState([]);

    useEffect(() => {
        getDashboardData();
    }, []);

    const getDashboardData = async () => {

        try {

            const studentData = await axios.get(
                "https://batch-students.onrender.com/contact/count",
                {
                    headers: {
                        Authorization:
                            "Bearer " +
                            localStorage.getItem("token"),
                    },
                }
            );

            const batchData = await axios.get(
                "https://batch-students.onrender.com/batch/count",
                {
                    headers: {
                        Authorization:
                            "Bearer " +
                            localStorage.getItem("token"),
                    },
                }
            );

            const dashboardData = await axios.get(
                "https://batch-students.onrender.com/contact/dashboard-stats",
                {
                    headers: {
                        Authorization:
                            "Bearer " +
                            localStorage.getItem("token"),
                    },
                }
            );

            const chartData = await axios.get(
                "https://batch-students.onrender.com/contact/students-per-batch",
                {
                    headers: {
                        Authorization:
                            "Bearer " +
                            localStorage.getItem("token"),
                    },
                }
            );

            const monthlyChart = await axios.get(
                "https://batch-students.onrender.com/contact/monthly-admissions",
                {
                    headers: {
                        Authorization:
                            "Bearer " +
                            localStorage.getItem("token"),
                    },
                }
            );

            const allMonths = [
                { month: "Jan", students: 0 },
                { month: "Feb", students: 0 },
                { month: "Mar", students: 0 },
                { month: "Apr", students: 0 },
                { month: "May", students: 0 },
                { month: "Jun", students: 0 },
                { month: "Jul", students: 0 },
                { month: "Aug", students: 0 },
                { month: "Sep", students: 0 },
                { month: "Oct", students: 0 },
                { month: "Nov", students: 0 },
                { month: "Dec", students: 0 }
            ];

            monthlyChart.data.chartData.forEach(item => {

                if (item._id.month) {

                    allMonths[item._id.month - 1].students =
                        item.students;

                }

            });

            setMonthlyData(allMonths);

            const formattedData =
                chartData.data.chartData.map(item => ({
                    batch: item._id,
                    students: item.students
                }));

            setBatchChart(formattedData);

            setNewStudents(
                dashboardData.data.newStudentsThisMonth
            );

            setRecentStudents(
                dashboardData.data.recentStudents
            );

            setStudents(
                studentData.data.totalStudents
            );

            setBatches(
                batchData.data.totalBatches
            );

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="home-container">

            <div className="welcome-card">
                <h1>
                    Welcome Back, {userName} 👋
                </h1>

                <p>
                    Manage your students, batches and contacts
                    from one dashboard.
                </p>
            </div>

            <div className="stats-grid">

                <div className="stat-card">
                    <h3>Total Students</h3>
                    <h2>{students}</h2>
                </div>

                <div className="stat-card">
                    <h3>Total Batches</h3>
                    <h2>{batches}</h2>
                </div>

                <div className="stat-card">
                    <h3>New This Month</h3>
                    <h2>{newStudents}</h2>
                </div>

                <div className="stat-card">
                    <h3>Dashboard Status</h3>
                    <h2>Active</h2>
                </div>

            </div>

            <div className="activity-card">
                <h2>Dashboard Overview</h2>

                <p>
                    Welcome to your Student Management
                    System. You can manage batches,
                    students and contacts from the sidebar.
                </p>
            </div>

            <div className="recent-students-card">

                <h2>Recent Students</h2>

                {
                    recentStudents.length === 0 ?

                        (
                            <p>No recent students found</p>
                        )

                        :

                        (
                            <div className="recent-list">

                                {
                                    recentStudents.map(student => (
                                        <div
                                            key={student._id}
                                            className="recent-item"
                                        >
                                            <img
                                                src={student.imgUrl}
                                                alt="student"
                                            />

                                            <div>
                                                <h4>
                                                    {student.userName}
                                                </h4>

                                                <p>
                                                    {student.batchName}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                }

                            </div>
                        )
                }

            </div>

            <div className="chart-card">

                <div className="chart-header">
                    <h2>Students Per Batch</h2>
                    <span>Live Analytics</span>
                </div>

                <ResponsiveContainer
                    width="100%"
                    height={350}
                >
                    <BarChart
                        data={batchChart}
                        margin={{
                            top: 20,
                            right: 20,
                            left: 0,
                            bottom: 5
                        }}
                    >

                        <CartesianGrid
                            strokeDasharray="4 4"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="batch"
                            tickLine={false}
                            axisLine={false}
                        />

                        <YAxis
                            tickLine={false}
                            axisLine={false}
                        />

                        <Tooltip
                            cursor={{
                                fill: "rgba(0,0,0,0.05)"
                            }}
                        />

                        <Bar
                            dataKey="students"
                            radius={[12, 12, 0, 0]}
                            animationDuration={1200}
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>
            <div className="pie-chart-card">

                <div className="chart-header">
                    <h2>Batch Distribution</h2>
                    <span>Live Analytics</span>
                </div>

                <ResponsiveContainer
                    width="100%"
                    height={350}
                >
                    <PieChart>

                        <Pie
                            data={batchChart}
                            dataKey="students"
                            nameKey="batch"
                            outerRadius={120}
                            innerRadius={60}
                            paddingAngle={5}
                        >
                            {
                                batchChart.map(
                                    (entry, index) => (
                                        <Cell
                                            key={index}
                                            fill={
                                                COLORS[
                                                index %
                                                COLORS.length
                                                ]
                                            }
                                        />
                                    )
                                )
                            }
                        </Pie>

                        <Tooltip />

                        <Legend />

                    </PieChart>
                </ResponsiveContainer>

            </div>

            <div className="line-chart-card">

                <div className="chart-header">
                    <h2>Monthly Admissions</h2>
                    <span>Growth Trend</span>
                </div>

                <ResponsiveContainer
                    width="100%"
                    height={350}
                >
                    <LineChart data={monthlyData}>

                        <CartesianGrid
                            strokeDasharray="4 4"
                        />

                        <XAxis dataKey="month" />

                        <YAxis />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="students"
                            strokeWidth={4}
                            dot={{ r: 6 }}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
};

export default Home;