"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale);
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
const getRandomColor = () => {
    return `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`; 
  }
const TransactionDetail = () => {
const params = useParams();
const groupName = params.groupName;  
const { data: session } = useSession();
 const [data, setData] = useState(null);
const [loading, setLoading] = useState(true)
const [userColors, setUserColors] = useState({}); 
const groups = useSelector((state) => state.groups.groups);
const groupDetail = groups.find((group) => group.name === groupName);
const groupId = groupDetail?._id;
let headers = {};
if (session?.user?.idToken) {
    headers.Authorization = `Bearer ${session.user.idToken}`;
  }

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/total/expense/${groupId}`, {
        headers,
        withCredentials: true,
      });
      const colors = {};
      response.data.contributionArray.forEach((user) => {
        colors[user.name] = getRandomColor();
      });
      setUserColors(colors);
      setData(response.data);
      setLoading(false);
  
    } catch (error) {
      console.log(error)
      toast.error("Transaction list is not available due to technical issue");
    }
  };
  useEffect(() => {
    // Fetch the transaction details for the group
    fetchTransactions();
  }, [groupId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const { contributionArray, totalApproved, totalPending } = data;

  // Pie Chart Data (User Contributions)
  const pieData = {
    labels: contributionArray.map((user) => user.name),
    datasets: [
      {
        data: contributionArray.map((user) => user.approved + user.pending),
        backgroundColor: contributionArray.map((user) => userColors[user.name] || getRandomColor()),
        hoverOffset: 4,
      },
    ],
  };

  // Prepare options for Pie chart
  const barData = {
    labels: contributionArray.map((user) => user.name),
    datasets: [
      {
        label: "Approved",
        data: contributionArray.map((user) => user.approved),
        backgroundColor: "green",
      },
      {
        label: "Pending",
        data: contributionArray.map((user) => user.pending),
        backgroundColor: "orange",
      },
    ],
  };

  return (
    <div className="flex flex-col items-center p-4 w-full max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4 text-center">Group Transaction Details</h1>

      {/* Pie Chart for Individual Contributions */}
      <div className="w-full flex justify-center">
        <div className="w-72 h-72 sm:w-96 sm:h-96">
          <Pie data={pieData} />
        </div>
      </div>

      {/* User Contribution Details */}
      <div className="w-full mt-6">
        <h3 className="text-lg font-semibold text-center">Total Contributions</h3>
        {contributionArray.map((user, idx) => (
          <div key={idx} className="flex justify-between items-center py-2 px-4 border-b">
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: userColors[user.name] }}
              ></div>
              <span>{user.name}</span>
            </div>
            <span className="text-green-600">{`$${user.approved.toFixed(2)} (Approved)`}</span>
            <span className="text-orange-600">{`$${user.pending.toFixed(2)} (Pending)`}</span>
          </div>
        ))}
      </div>

      {/* Bar Chart for Approved vs Pending (only if pending transactions exist) */}
      {totalPending > 0 && (
        <div className="w-full mt-8">
          <h3 className="text-lg font-semibold text-center mb-2">Approved vs Pending Overview</h3>
          <div className="w-full sm:w-96">
            <Bar data={barData} />
          </div>
        </div>
      )}

      {/* Summary of Total Approved & Pending */}
      <div className="mt-6 w-full px-4 text-center">
        <h3 className="text-xl font-semibold">Total Summary</h3>
        <div className="flex justify-between py-2 border-t border-b mt-2">
          <span>Total Approved</span>
          <span className="text-green-600 font-semibold">{`$${totalApproved.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between py-2 border-b">
          <span>Total Pending</span>
          <span className="text-orange-600 font-semibold">{`$${totalPending.toFixed(2)}`}</span>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;

