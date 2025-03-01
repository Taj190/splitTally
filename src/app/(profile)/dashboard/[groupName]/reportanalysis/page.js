"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement } from "chart.js";
import { motion } from "framer-motion";

// Register required components for Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

export default function ReportVisualization() {
    const { data: session } = useSession();
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const groupName = params.groupName;
    const groups = useSelector((state) => state.groups.groups);
    const groupDetail = groups.find((group) => group.name === groupName);
    const groupId = groupDetail?._id;

    let headers = {};
    if (session?.user?.idToken) {
        headers.Authorization = `Bearer ${session.user.idToken}`;
    }

    useEffect(() => {
        if (!groupId) return;
        setLoading(true);
        axios.get(`http://localhost:8080/report/explanation/${groupId}`, { headers, withCredentials: true })
            .then(response => {
                if (response.data?.success && response.data?.content) {
                    setReport(response.data.content);
                }
            })
            .catch(error => console.error("Error fetching report:", error))
            .finally(() => setLoading(false));
    }, [groupId]);

    if (loading) return <p className="text-center text-lg">Loading report...</p>;
    if (!report) return <p className="text-center text-lg">No report available</p>;

    const { months, categories, advice } = report;

    const getRandomColor = () => {
        return `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`;
    };

    const pieData = {
        labels: categories.map((item) => item.name),
        datasets: [{
            data: categories.map((item) => item[months[0]] + item[months[1]]),
            backgroundColor: categories.map(() => getRandomColor()),
        }],
    };
    const totalMonth1 = categories.reduce((sum, item) => sum + item[months[0]], 0);
    const totalMonth2 = categories.reduce((sum, item) => sum + item[months[1]], 0);

    // Bar data for comparing total spending of each month
    const barData = {
        labels: [months[0], months[1]],
        datasets: [{
            label: "Total Spending",
            data: [totalMonth1, totalMonth2],
            backgroundColor: [totalMonth1 > totalMonth2 ? "#FF8042" : "#4F46E5", totalMonth2 > totalMonth1 ? "#FF8042" : "#4F46E5"],
        }],
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-lg rounded-2xl mt-5">
            <h2 className="text-xl font-bold text-center mb-4">Spending Report: {months[0]} vs. {months[1]}</h2>
            <p className="text-gray-600 text-sm text-center mb-6">AI Analysis of Your Group's Expenses</p>

            {/* Pie Chart */}
            <div className="flex justify-center mb-8">
                <div className="w-72 h-72">
                    <Pie data={pieData} />
                </div>
            </div>

            {/* Bar Chart */}
            <div className="w-full h-64 mb-8">
                <Bar data={barData} />
            </div>

            {/* Advice Section */}
            <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">AI Suggestions</h3>
                <motion.ul
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-2"
                >
                    {advice.map((tip, index) => (
                        <motion.li
                            key={index}
                            className="bg-blue-100 dark:bg-blue-600 p-3 rounded-lg text-gray-700 dark:text-white"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.2 }}
                        >
                            {tip}
                        </motion.li>
                    ))}
                </motion.ul>
            </div>
        </div>
    );
}




