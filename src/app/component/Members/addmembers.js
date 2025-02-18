import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function AddMemberButton({groupId}) {
  const [isAdding, setIsAdding] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading , setLoading] = useState(false)
  const { data: session, status } = useSession();
  const [authHeader, setAuthHeader] = useState({});
  const user = useSelector((state)=>state.auth.user)
  const name = session?.user?.name || user?.name || "";



  useEffect(() => {
    if (session?.user) {
      setAuthHeader(session.user.idToken ? { Authorization: `Bearer ${session.user.idToken}` } : {});
    }
  }, [session]);

  const handleGetCode = async () => {
    setLoading(true)
    try {
      const response = await axios.post(
        "http://localhost:8080/code/addmember",
        { email , groupId},
        {
          withCredentials: true, // Needed for email/password users
          headers: authHeader, // Needed for Google-authenticated users
        }
      );
    
      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
        console.log(error)
          if (error.response && error.response.data && error.response.data.message) {
              toast.error(error.response.data.message); 
            } else {
              toast.error('Failed to send verification code. Please try again later.');
            }
      }finally{
        setLoading(false)
      }
  };

  const handleAddMember = async() => {
    setLoading(true)
    try {
      const response = await axios.post(
        "http://localhost:8080/send/invitation",
        { email, code , groupId , name },
        {
          withCredentials: true, // Needed for email/password users
          headers: authHeader, // Needed for Google-authenticated users
        }
      );
    
      if (response.data.success) {
        setEmail("");
        setCode("")
        toast.success(response.data.message);
      }
    } catch (error) {
        console.log(error)
          if (error.response && error.response.data && error.response.data.message) {
              toast.error(error.response.data.message); 
            } else {
              toast.error('Failed to send verification code. Please try again later.');
            }
      }finally{
        setLoading(false)
      }
    // Send payload to backend
  };

  return (
    <div className="flex flex-col items-center justify-center mt-4">
      {!isAdding ? (
        <button
          onClick={() => setIsAdding(true)}
          className="btn-unique"
        >
          Add Member
        </button>
      ) : (
        <div className="flex flex-col space-y-2 p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded-md w-64"
          />
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Enter code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="p-2 border rounded-md w-40"
            />
          <button
        onClick={handleGetCode}
        disabled={loading}
       className={`px-4 py-2 rounded-lg shadow-md ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"}`}
       >
     {loading ? "Wait..." : "Get Code"}
      </button>

          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleAddMember}
              disabled={loading}
              className={`px-4 py-2 rounded-lg shadow-md ${loading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
              >
            {loading ? "Wait..." : "Add"}
            </button>
            <button
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg shadow-md hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
