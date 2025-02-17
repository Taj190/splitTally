import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";

const ToggleButton = () => {
const params = useParams();
const groupName = params.groupName;
  const [privacyMode , setIsPrivate] = useState(false);
  const { data: session } = useSession();
  const [authHeader, setAuthHeader] = useState({});
  const groups = useSelector((state) => state.groups.groups);
  const groupDetail = groups.find((group) => group.name === groupName);
  const _id = groupDetail?._id;

  useEffect(() => {
    if (session?.user) {
      setAuthHeader(session.user.idToken ? { Authorization: `Bearer ${session.user.idToken}` } : {});
    }
  }, [session]);

  const handleToggle = async () => {
    const newValue = !privacyMode ;
    setIsPrivate(newValue);
    
   

    try {
      const response = await axios.put(
        "http://localhost:8080/privacymode/toggle",
        { groupId :_id, privacyMode : newValue },
        {
          withCredentials: true,
          headers: authHeader,
        }
      );
      
      if (response.data.success) {
        toast.success("Privacy setting updated!");
      }
    } catch (error) {
      setIsPrivate(!newValue);
      toast.error("Failed to update privacy setting.");
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`relative w-16 h-8 bg-gray-300 rounded-full p-1 flex items-center transition-all ${
        privacyMode ? "bg-green-500" : "bg-gray-300"
      }`}
    >
      <div
        className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-all ${
            privacyMode  ? "translate-x-8" : "translate-x-0"
        }`}
      />
    </button>
  );
};

export default ToggleButton;
