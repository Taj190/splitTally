import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

const AddTransaction = ( {fetchTransactions}) => {
  const params = useParams();
  const groupName = params.groupName;  
  const [showForm, setShowForm] = useState(false);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/add/transaction",
        { description, amount, groupId :_id },
        {
          withCredentials: true,
          headers: authHeader,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setDescription("");
        setAmount("");
        setShowForm(false);
        fetchTransactions()
      }
    } catch (error) {
      toast.error("Failed to add transaction. Please try again.");
    }
  };

  return (
  
    <div className="p-4 w-full max-w-md mx-auto">
   <button onClick={() => setShowForm(true)} className="btn-gradient">
  Add Transaction
</button>


      {showForm && (
        <div className="mt-4 p-4 bg-white dark:bg-gray-800 shadow-md rounded-md">
          <label className="block text-black dark:text-white">Item</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
          />
          
          <label className="block text-black dark:text-white">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
          />
          
          <div className="flex justify-between">
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Add
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setDescription("");
                setAmount("");
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTransaction;