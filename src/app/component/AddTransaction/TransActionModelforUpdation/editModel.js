import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const EditTransactionModal = ({ transactionId, onClose, onSuccess }) => {
 const { data: session } = useSession();
  const [updatedData, setFormData] = useState({
    description: "",
    amount: "",
  });
const headers = useMemo(() => {
  const headers = {};
  if (session?.user?.idToken) {
    headers.Authorization = `Bearer ${session.user.idToken}`;
  }
  return headers;
}, [session?.user?.idToken]); // Only recreate headers when session.user.idToken changes

  // Fetch transaction details when modal opens
  useEffect(() => {
    const fetchTransactionDetails = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/single/transaction/${transactionId}`,
     {headers,withCredentials: true,});
      
     if (response.data.success){
        setFormData({
            description: response.data.description || "",
            amount: response.data.amount || "",
          },);
     }

      } catch (error) {
        toast.error("Failed to get transaction details.");
      }
    };

    if (transactionId) {
      fetchTransactionDetails();
    }
  }, [transactionId, headers]);

  const handleChange = (e) => {
    setFormData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const res =  await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/edit/transaction/${transactionId}`, {updatedData} , 
        {headers,withCredentials: true, }
      );
     if(res.data.success){
        toast.success("Transaction updated successfully!");
        onSuccess(); // Refresh the list
        onClose(); // Close the modal
     }

    } catch (error) {
      toast.error("Failed to update transaction.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Transaction</h2>
        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium">Item Name</label>
          <input
            type="text"
            name="description"
            value={updatedData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
          />
          <label className="block text-sm font-medium">Price</label>
          <input
            type="number"
            name="amount"
            value={updatedData.amount}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTransactionModal;
