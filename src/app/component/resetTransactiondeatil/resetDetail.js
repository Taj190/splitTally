"use client"
import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";

const ResetDetail = () => {
  const [resetInfo, setResetInfo] = useState(null);
  const params = useParams();
  const groupName = params.groupName; 
  const { data: session } = useSession();
  const groups = useSelector((state) => state.groups.groups);
  const groupDetail = groups.find((group) => group.name === groupName);
  const groupId = groupDetail?._id;
  
  const headers = useMemo(() => {
    const headers = {};
    if (session?.user?.idToken) {
      headers.Authorization = `Bearer ${session.user.idToken}`;
    }
    return headers;
  }, [session?.user?.idToken]);
  const fetchResetDetail = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/account/reset-detail/${groupId}`,
        {
          withCredentials: true,
          headers,
        }
      );

      if (response.data.length > 0) {
        setResetInfo(response.data);
      }
    } catch (error) {
      console.error('Error fetching reset details:', error);
    }
  }, [groupId, headers]);

  useEffect(() => {
    fetchResetDetail();
  }, [fetchResetDetail]);

  return (
    <>
      {resetInfo && resetInfo.length > 0 ? (
        <p   className="  border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
          Account was reset by <span className="font-semibold">{resetInfo.resetBy} on {resetInfo.dateTime}</span>
        </p>
      ):
      <p   className=" border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
      <span className="font-semibold"> All Transaction detail is available</span>
    </p>
      }
    </>
  );
};

export default ResetDetail;
