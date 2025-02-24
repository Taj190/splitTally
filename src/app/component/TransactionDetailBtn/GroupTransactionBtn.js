"use client";

import { useParams, useRouter } from "next/navigation";

export default function GroupTransactionBtn() {
  const router = useRouter();
    const params = useParams();
    const groupName = params.groupName; 
  // Redirect to the Group Transaction Detail page
  const handleTransactionDetailClick = () => {
    router.push(`/dashboard/${groupName}/transactiondetail`);
  };

  return (
    <div className="mt-6">
      <button 
        onClick={handleTransactionDetailClick}
        className="px-5 py-2  btn-warm"
      >
         Transaction Detail
      </button>
    </div>
  );
}

