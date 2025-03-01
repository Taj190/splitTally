"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import {  FaArrowLeft } from "react-icons/fa";
export default function PendingInfoPage() {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("transactionId");
  const { data: session } = useSession();
  const router = useRouter();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  let headers = {};
  if (session?.user?.idToken) {
    headers.Authorization = `Bearer ${session.user.idToken}`;
  }

  const handleGoBack = () => {
    router.back();
  };

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/transaction/status/${transactionId}`,
         { headers, withCredentials: true, });
        setTransaction(res.data);
      
      } catch (err) {
        setError("Failed to fetch transaction details.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [transactionId, session]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // Categorizing Users Based on Verifications
  const approvedUsers = [];
  const pendingUsers = [];
  if (transaction?.verifications && Object.keys(transaction.verifications).length > 0) {
    Object.entries(transaction.verifications).forEach(([userId, status]) => {
      if (status === "approved") approvedUsers.push(userId);
      else if (status === "pending") pendingUsers.push(userId);
    });
  }
  

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg mt-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Transaction Details</h2>
      
      <div className="space-y-2">
        <p><strong>Description:</strong> {transaction.description}</p>
        <p><strong>Amount:</strong> ${transaction.amount}</p>
        <p><strong>Status:</strong> {transaction.status}</p>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-green-600">Approved By:</h3>
        <ul className="list-disc list-inside">
          {transaction.approvedUsers.length > 0 ? (
            transaction.approvedUsers.map(user => <li key={user._id} className="text-green-500">{user.name}</li>)
          ) : (
            <p className="text-gray-500">No approvals yet.</p>
          )}
        </ul>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-yellow-600">Pending Verification:</h3>
        <ul className="list-disc list-inside">
          {transaction.pendingUsers.length > 0 ? (
            transaction.pendingUsers.map(user => <li key={user._id} className="text-yellow-500">{user.name}</li>)
          ) : (
            <p className="text-gray-500">No pending approvals.</p>
          )}
        </ul>
      </div>
      
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-red-600">Canceled By:</h3>
        <ul className="list-disc list-inside">
          {transaction.cancelUsers.length > 0 ? (
            transaction.cancelUsers.map(user => <li key={user._id} className="text-yellow-500">{user.name}</li>)
          ) : (
            <p className="text-gray-500">No One Canceled this Transaction.</p>
          )}
        </ul>
      </div>
      <button 
        onClick={handleGoBack}
        className="mt-6 flex items-center px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
      >
        <FaArrowLeft className="mr-2" /> Go Back
      </button>
    </div>
  );
}
