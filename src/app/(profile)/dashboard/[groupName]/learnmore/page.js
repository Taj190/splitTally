"use client";

import { useRouter } from "next/navigation";
import { FaShieldAlt, FaCheckCircle, FaTimesCircle, FaArrowLeft } from "react-icons/fa";

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
        Privacy Mode ensures transparency in shared expenses. It requires group members to **approve** a transaction before it gets added to the expense records.
      </p>

      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-2">
          <FaCheckCircle className="text-green-500 mr-2 inline" />
          When Privacy Mode is **ON**:
        </h2>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
          <li>The transaction is set to **pending approval**.</li>
          <li>All group members receive a **notification**.</li>
          <li>Only after all members approve, the expense is **finalized**.</li>
        </ul>
      </div>

      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-2">
          <FaTimesCircle className="text-red-500 mr-2 inline" />
          When Privacy Mode is **OFF**:
        </h2>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
          <li>The expense is **immediately added**.</li>
          <li>Members receive a **notification**, but no approval is required.</li>
        </ul>
      </div>

      <p className="text-gray-600 dark:text-gray-300">
        Privacy Mode **ensures fair splitting** and prevents unauthorized expenses in shared living situations.
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
