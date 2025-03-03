"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function LeaveGroupBtn() {
  const router = useRouter();
    const params = useParams();
    const groupName = params.groupName; 
    const { data: session } = useSession();
    const groups = useSelector((state) => state.groups.groups);
    const groupDetail = groups.find((group) => group.name === groupName);
    const groupId= groupDetail?._id;
    let headers = {};
   if (session?.user?.idToken) {
    headers.Authorization = `Bearer ${session.user.idToken}`;
  }


  const handleSubmit = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/group/leave/${groupId}`,
        
        {
          withCredentials: true,
          headers
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        router.push(`/dashboard`);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
      
        toast.error(error.response.data.message);
      } else {
        // Handle other errors
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="ml-0 pl-0">
      <button 
        onClick={handleSubmit}
        className=" btn-warm"
      >
         Leave Group
      </button>
    </div>
  );
}
