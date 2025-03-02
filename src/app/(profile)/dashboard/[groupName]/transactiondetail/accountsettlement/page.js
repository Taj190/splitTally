"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import ResetTransactionBtn from "@/app/component/ResetTransaction/resetBtn";

export default function SettlementTable() {
  const params = useParams();
  const groupName = params.groupName;
  const { data: session } = useSession();
  const groups = useSelector((state) => state.groups.groups);
  const groupDetail = groups.find((group) => group.name === groupName);
  const groupId = groupDetail?._id;
  const router = useRouter();
  const [settlements, setSettlements] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [splitAmount, setSplitAmount] = useState(0);

  let headers = {};
  if (session?.user?.idToken) {
    headers.Authorization = `Bearer ${session.user.idToken}`;
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/account/settlement/${groupId}`,
        {
          headers,
          withCredentials: true,
        }
      );

      const { totalApprovedAmount, splitAmount, settlements } = response.data;

      setTotalAmount(totalApprovedAmount);
      setSplitAmount(splitAmount);
      setSettlements(settlements);
    } catch (error) {
      console.error("Error fetching settlement data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [groupId]);
  const handleGoBack = () => {
    router.back();
  };
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Settlement Details for {groupName}</h2>
      <div className="mb-6">
        <p>
          <strong>Total Amount Spent:</strong> ${totalAmount.toFixed(2)}
        </p>
        <p>
          <strong>Amount Split Among All:</strong> ${splitAmount.toFixed(2)}
        </p>
      </div>

      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="bg-orange-100">
          <th className="py-2 px-4 border-b text-left text-orange-500">From</th>
<th className="py-2 px-4 border-b text-left text-orange-500">To</th>
<th className="py-2 px-4 border-b text-left text-orange-500">Amount Owed</th>

          </tr>
        </thead>
        <tbody>
          {settlements.map((settlement, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{settlement.from.name}</td>
              <td className="py-2 px-4 border-b">{settlement.to.name}</td>
              <td className="py-2 px-4 border-b text-red-500">
                ${settlement.amount.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Balance to Settle:</h3>
        {settlements.map((settlement, index) => (
          <div key={index} className="my-2">
            <p>
              <strong>{settlement.from.name}</strong> needs to pay{" "}
              <strong>{settlement.to.name}</strong> ${settlement.amount.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-between items-center w-full max-w-lg">
  {/* Go Back Button (Left) */}
  <div>
    <button 
      onClick={handleGoBack}
      className="flex items-center justify-center px-4 py-2 h-10 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
    >
      <FaArrowLeft className="mr-2" /> Go Back
    </button>
  </div>

  {/* Reset Transaction Button (Right) */}
  <div>
    <ResetTransactionBtn />
  </div>
</div>

    </div>
  );
}

