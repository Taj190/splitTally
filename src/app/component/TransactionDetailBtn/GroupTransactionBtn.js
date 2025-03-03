"use client";

import { useParams, useRouter } from "next/navigation";
import ReceiptIcon from '@mui/icons-material/Receipt';
export default function GroupTransactionBtn() {
  const router = useRouter();
    const params = useParams();
    const groupName = params.groupName; 
  // Redirect to the Group Transaction Detail page
  const handleTransactionDetailClick = () => {
    router.push(`/dashboard/${groupName}/transactiondetail`);
  };

  return (
    <div className=" w-full max-w-md  ">
    <button
      onClick={handleTransactionDetailClick}
      className="flex flex-col items-center justify-center bg-transparent border-none outline-none focus:outline-none"
    >
      {/* Icon Container */}
      <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full text-blue-600 text-xl hover:bg-blue-200 transition-colors">
        <ReceiptIcon /> {/* Material-UI Receipt Icon */}
      </div>
      {/* Text Below Icon */}
      <span className="text-[10px] text-blue-600 mt-1.5 font-medium">
        Transaction Detail
      </span>
    </button>
  </div>
  );
}

