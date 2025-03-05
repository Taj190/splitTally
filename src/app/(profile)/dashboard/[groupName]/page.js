'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import AddMemberButton from '@/app/component/Members/addmembers';
import ToggleButton from '@/app/component/ToogleBtnForPrivacy/PrivacyMode';
import AddTransaction from '@/app/component/AddTransaction/AddTransaction';
import TransactionTable from '@/app/component/AddTransaction/TransActionDetail';
import GroupTransactionBtn from '@/app/component/TransactionDetailBtn/GroupTransactionBtn';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import ReportComponent from '@/app/component/ReportAnalysis/AiReport';
import { toast } from 'react-toastify';
import ResetDetail from '@/app/component/resetTransactiondeatil/resetDetail';
import LeaveGroupBtn from '@/app/component/leaveGroup/leaveGroup';
import { Drawer, IconButton } from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import SplittallyHeading from '@/app/component/logoletter/logoLetter';

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
  const [userId, setUserId] = useState();
  const [drawerOpen, setDrawerOpen] = useState(false);

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
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/group/detail?_id=${_id}`, {
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
  }, [groupName, session, status , headers]);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/transactions/detail?groupId=${_id}&page=${page}`, {
        headers,
        withCredentials: true,
      });
      setUserId(res.data.userId);
      setTransactions(res.data.transactions);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [session, page, groupName, totalPages]);

  const handleGoBack = () => {
    router.back();
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!group) return <p>No group found.</p>;

  return (
    <div className="relative flex flex-col items-center justify-center space-y-5 sm:space-y-4 w-full">
      {/* Drawer Toggle Icon - Top-left corner */}
    

      {/* Group Name and Back Button */}
      <div className="relative flex justify-between w-full max-w-lg">
      <IconButton onClick={handleDrawerToggle} >
        <MenuIcon />
      </IconButton>
        {/* Show Members Button on the left */}
      

        {/* Group Name centered */}
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-3xl font-semibold ml-5">
          {group.name}
        </h1>

        {/* Toggle Button on the top-right */}
        <div className="absolute top-0 right-0 flex flex-col">
          <ToggleButton />
        </div>
      </div>

      <div  className=" w-full max-w-md mx-auto" >
        <button
          onClick={() => setShowMembers(!showMembers)}
         
        >
          <div className="w-10 h-10 flex items-center justify-center bg-purple-100 rounded-full text-purple-600 text-xl font-bold hover:bg-purple-200 transition-colors">
            👥
          </div>
          <span className="text-[10px] text-purple-600 mt-1 font-medium">
            {showMembers ? 'Hide ' : ' Members'}
          </span>
        </button>


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
        </div>
      <TransactionTable
        transactions={transactions}
        fetchTransactions={fetchTransactions}
        page={page}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        userId={userId}
      />
 {/* Reset Transaction Details */}
 <ResetDetail />
      {/* Drawer Component */}
      <Drawer anchor="top" open={drawerOpen} onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            width: { xs: "65%", sm: "auto" }, // Takes 50% width on mobile, auto on larger screens
            height:{ xs: "75%", sm: "auto" },
            backgroundColor: "rgba(112, 216, 152, 0.9)", // Transparent background
            backdropFilter: "blur(40px)", // Strong blur effect for glassmorphism
            boxShadow: "none", // Remove default shadow for a cleaner look
            borderLeft: "1px solid rgba(255, 255, 255, 0.1)"
          },
        }}
      >
        <SplittallyHeading/>
        <div className="flex flex-col items-start space-y-4 ">
       
      
          {/* Add Member Button */}
          <AddMemberButton groupId={_id} />

          {/* Add Transaction Button */}
          <AddTransaction fetchTransactions={fetchTransactions} />

  
          {/* Group Transaction Button */}
          <GroupTransactionBtn />

          {/* Leave Group Button */}
          <LeaveGroupBtn />


    
           {/* Report Component */}
           <ReportComponent />
        </div>

        {/* Close Drawer Icon */}
        <IconButton onClick={handleDrawerToggle} className="absolute top-4 right-4">
          <CloseIcon />Close
        </IconButton>
      </Drawer>

      {/* Go Back Button (Left) */}
      <div className="mt-3 h-10">
        <button
          onClick={handleGoBack}
          className="flex items-center justify-center px-4 py-2 h-10 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
        >
          <FaArrowLeft className="mr-2" /> Go Back
        </button>
      </div>
    </div>
  );
}




