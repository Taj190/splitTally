import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";


const DeleteTransactionModal = ({ transactionId, onClose, onSuccess }) => {
     const { data: session } = useSession();
    let headers = {};
    if (session?.user?.idToken) {
      headers.Authorization = `Bearer ${session.user.idToken}`;
    }
     console.log(transactionId , ' here is the id')
  const handleDelete = async () => {
    try {
     const res= await axios.delete(`http://localhost:8080/delete/transaction/${transactionId}`,{headers,withCredentials: true,});
     if(res.data.success){
    toast.success("Transaction deleted successfully!");
    onSuccess(); // Refresh the list
    onClose(); // Close the modal
    }
    } catch (error) {
      toast.error("Failed to delete transaction.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
        <p className="mb-4">Are you sure you want to delete this transaction?</p>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">
            Cancel
          </button>
          <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTransactionModal;
