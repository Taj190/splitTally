"use client";

import { useRouter } from "next/navigation";
import { FaShieldAlt, FaCheckCircle, FaTimesCircle, FaArrowLeft, FaRegClock, FaExclamationTriangle } from "react-icons/fa";

export default function LearnMore({ params }) {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
    <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
      <FaShieldAlt className="text-blue-500 mr-2" /> 
      Privacy Mode in {params.groupname}
    </h1>
  
    <p className="text-gray-600 dark:text-gray-300 mb-4">
      Privacy Mode ensures transparency in shared expenses. It requires group members to <strong>approve</strong> a transaction before it gets added to the expense records.
    </p>
  
    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-2">
        <FaCheckCircle className="text-green-500 mr-2 inline" />
        When Privacy Mode is <strong>ON</strong>:
      </h2>
      <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
        <li>The transaction is set to <strong>pending approval</strong>.</li>
        <li>All group members receive a <strong>notification</strong>.</li>
        <li>Only after all members approve, the expense is <strong>finalized</strong>.</li>
      </ul>
    </div>
  
    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-6">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-2">
        <FaTimesCircle className="text-red-500 mr-2 inline" />
        When Privacy Mode is <strong>OFF</strong>:
      </h2>
      <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
        <li>The expense is <strong>immediately added</strong>.</li>
        <li>Members receive a <strong>notification</strong>, but no approval is required.</li>
      </ul>
    </div>
  
    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-6">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-2">
        <FaRegClock className="text-yellow-500 mr-2 inline" />
        <strong>When Transaction is Pending</strong>:
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        If a transaction is marked as &quot;pending&quot;, you can click on the &quot;pending&quot; label to learn more about the approval process and see who has approved, canceled, or yet to take action on the transaction.
      </p>
  
      <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
        <li><strong>Approved Users</strong>: List of members who have approved the transaction.</li>
        <li><strong>Pending Users</strong>: List of members who still need to approve or cancel the transaction.</li>
        <li><strong>Action History</strong>: See who has taken action (approve/cancel) and why the transaction is still pending.</li>
      </ul>
    </div>
  
    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-6">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-2">
        <FaExclamationTriangle className="text-orange-500 mr-2 inline" />
        <strong>Privacy Mode Toggle Limits</strong>:
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        You can change the Privacy Mode up to <strong>3 times per month</strong>. Once this limit is reached, Privacy Mode toggling will be <strong>blocked for the next 30 days</strong>.
      </p>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        This restriction is in place to <strong>prevent misuse</strong> and <strong>ensure stability</strong> in shared financial management. Frequent changes can cause confusion and disputes among group members regarding expense approvals and settlements.
      </p>
      <p className="text-gray-600 dark:text-gray-300">
        After 30 days, you will be able to <strong>toggle Privacy Mode again</strong>.
      </p>
    </div>
  
    <p className="text-gray-600 dark:text-gray-300">
      Privacy Mode <strong>ensures fair splitting</strong> and prevents unauthorized expenses in shared living situations.
    </p>
  
    <button 
      onClick={handleGoBack}
      className="mt-6 flex items-center px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
    >
      <FaArrowLeft className="mr-2" /> Go Back
    </button>
  </div>
  
  
  
  );
}

