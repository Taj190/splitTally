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
import SettlementTransactionBtn from '@/app/component/TransactionSettlementBtn/settlementsuggestion';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
const getRandomColor = () => {
    return `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`; 
  }
const TransactionDetail = () => {
const params = useParams();
const router = useRouter();
const groupName = params.groupName;  
const { data: session } = useSession();
 const [data, setData] = useState();
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
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/total/expense/${groupId}`, {
        headers,
        withCredentials: true,
      });
     if(response.data.success){
      const colors = {};
      response.data.contributionArray.forEach((user) => {
        colors[user.name] = getRandomColor();
      });
      setUserColors(colors);
      setData(response.data);
      setLoading(false);
     }
  
    } catch (error) {
      console.log(error)
      setLoading(false);
      toast.error("Transaction list is not available ");
    }
  };
  useEffect(() => {
    // Fetch the transaction details for the group
    fetchTransactions();
  }, [groupId]);
  const handleGoBack = () => {
    router.back();
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  const contributionArray = data?.contributionArray || [];
  const totalApproved = data?.totalApproved || 0;
  const totalPending = data?.totalPending || 0;
  
  // Pie Chart Data (User Contributions) - Only if there are contributions
  const pieData = contributionArray.length > 0 ? {
    labels: contributionArray.map((user) => user.name),
    datasets: [
      {
        data: contributionArray.map((user) => user.approved + user.pending),
        backgroundColor: contributionArray.map((user) => userColors[user.name] || getRandomColor()),
        hoverOffset: 4,
      },
    ],
  } : null;
  
  // Prepare options for Bar Chart - Only if there are contributions
  const barData = contributionArray.length > 0 ? {
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
  } : null;
  

  return data && contributionArray.length > 0 ?(
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



        <div className="mt-6 flex justify-between w-full max-w-lg gap-2">
        {/* Go Back Button (Left) */}
        <div className="mt-3 h-10">
        <button 
          onClick={handleGoBack}
          className="flex items-center justify-center px-4 py-2 h-10 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
        >
          <FaArrowLeft className="mr-2" /> Go Back
        </button>
        </div>
        {/* Group Transaction Button (Right) */}
        <div className="flex items-center justify-center h-10">
          <SettlementTransactionBtn />
        </div>
      </div>
    </div>
  ) : (
    <div className="mt-3 h-10">

      <button
        onClick={handleGoBack}
        className="flex items-center justify-center px-4 py-2 h-10 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
      >
        <FaArrowLeft className="mr-2" /> Go Back
      </button>
    </div>
  );
};

export default TransactionDetail;

