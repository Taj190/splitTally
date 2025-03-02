'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { useParams } from "next/navigation";
import AddMemberButton from '@/app/component/Members/addmembers';
import ToggleButton from '@/app/component/ToogleBtnForPrivacy/PrivacyMode';
import AddTransaction from '@/app/component/AddTransaction/AddTransaction';
import TransactionTable from '@/app/component/AddTransaction/TransActionDetail';
import GroupTransactionBtn from '@/app/component/TransactionDetailBtn/GroupTransactionBtn';
import { useRouter } from 'next/navigation';
import {  FaArrowLeft } from "react-icons/fa";
import ReportComponent from '@/app/component/ReportAnalysis/AiReport';
import { toast } from 'react-toastify';
import ResetDetail from '@/app/component/resetTransactiondeatil/resetDetail';
// import AddMember from './AddMember';

export default function GroupDetails() {
  const params = useParams();
  const groupName = params.groupName;
  const { data: session, status } = useSession();
   const router = useRouter();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMembers, setShowMembers] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [page, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const[userId , setUserId] = useState()


  const groups = useSelector((state) => state.groups.groups);
  const groupDetail = groups.find((group) => group.name === groupName);
  const _id = groupDetail?._id;
  let headers = {};
  if (session?.user?.idToken) {
    headers.Authorization = `Bearer ${session.user.idToken}`;
  }

  useEffect(() => {
    if (!groupName || status === 'loading') return;
    const fetchGroup = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/group/detail?_id=${_id}`, {
          headers,
          withCredentials: true,
        });

        setGroup(res.data);
      } catch (err) {
        setError('Failed to fetch group details.');
      } finally {
        setLoading(false);
      }
    };
   
    fetchGroup();
  }, [groupName, session, status]);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/transactions/detail?groupId=${_id}&page=${page}`, {
        headers,
        withCredentials: true,
      });

    setUserId(res.data.userId)
    setTransactions(res.data.transactions);
    setTotalPages(res.data.totalPages)
  
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [session,  page, groupName , totalPages]);




  const handleGoBack = () => {
    router.back();
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!group) return <p>No group found.</p>;

  return (
<div className="relative flex flex-col items-center justify-center  space-y-5 sm:space-y-4 w-full">
  {/* Header Wrapper for Show Members, Group Name, and Toggle */}
  <div className="relative flex  justify-between w-full max-w-lg">
    {/* Show Members Button on the left */}
    <button
  onClick={() => setShowMembers(!showMembers)}
  className="flex flex-col items-center justify-center"
>
  <div className="w-6 h-6 flex items-center justify-center bg-gray-300 text-black text-lg font-bold rounded-full">
    👥
  </div>
  <span className="text-green-500 text-[6px] mt-1">
    {showMembers ? "Hide Members" : "Show Members"}
  </span>
</button>


    {/* Group Name centered */}
    <h1 className="absolute left-1/2 transform -translate-x-1/2 text-3xl font-semibold ml-5">
      {group.name}
    </h1>

    {/* Toggle Button on the top-right */}
    <div className=" absolute top-0 right-0 flex flex-col ">
      <ToggleButton />
    </div>
  </div>

  {/* Show Members List */}
  {showMembers && (
    <ul className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 w-80">
      {group.members.map((member) => (
        <li key={member._id} className="p-2 border-b dark:border-gray-700">
          {member.name}
        </li>
      ))}
    </ul>
  )}

  {/* Wrapper for Add Member and Add Transaction Buttons */}
  <div className="flex justify-between w-full max-w-lg pt-4">
    {/* Add Member Button on the left */}
    <div>
      <AddMemberButton groupId={_id} />
    </div>

    {/* Add Transaction Button on the right */}
    <div>
      <AddTransaction
        fetchTransactions={fetchTransactions}
      />
    </div>
  </div>
  <ResetDetail/>
  <TransactionTable
          transactions={transactions}
          fetchTransactions={fetchTransactions}
          page={page}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          userId={userId } 
  />
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
    <GroupTransactionBtn />
  </div>
</div>
     <ReportComponent/> 
</div>


  );
}


