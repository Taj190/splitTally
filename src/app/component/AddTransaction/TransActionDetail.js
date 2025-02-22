'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';
import Pagination from '../Pagination/Pagination';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import EditTransactionModal from './TransActionModelforUpdation/editModel';
import DeleteTransactionModal from './TransActionModelforUpdation/deleteModel';
import Link from 'next/link';


const TransactionTable = () => {
  const params = useParams();
  const groupName = params.groupName;  
  const { data: session } = useSession();
  const [transactions, setTransactions] = useState([]);
  const [page, setCurrentPage] = useState(1);
  const groups = useSelector((state) => state.groups.groups);
  const groupDetail = groups.find((group) => group.name === groupName);
  const _id = groupDetail?._id;
  const[userId , setUserId] = useState()
  const [totalPages , setTotalPages]= useState()
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  let headers = {};
  if (session?.user?.idToken) {
    headers.Authorization = `Bearer ${session.user.idToken}`;
  }

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/transactions/detail?groupId=${_id}&page=${page}`, {
        headers,
        withCredentials: true,
      });

    setUserId(res.data.userId)
    setTransactions(res.data.transactions);
    setTotalPages(res.data.totalPages)
  
    } catch (error) {
      console.log(error)
      toast.error("Transaction list is not available due to technical issue");
    }
  };
  const updateTransactionStatus = async (transactionId, status) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/verify/verifytransaction', // Same API for both actions
        { transactionId, status }, // Sending transactionId and dynamic status
        {
          headers,
          withCredentials: true,
        }
      );
      if(response.data.success){
        toast.success(response.data.message);
        fetchTransactions() 
      }
     // Refresh the transaction list after action
    } catch (error) {
      console.log(error)
      toast.error(`Failed to ${status} transaction.`);
    }
  };
  
  useEffect(() => {
    fetchTransactions();
  }, [session,  page, groupName , totalPages]);


  return (
    <div className="overflow-x-auto p-4 w-full max-w-4xl mx-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="p-3 text-left">Item</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">By</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => {
            const isInitiator = transaction.initiator._id === userId;
            
            return (
              <tr key={transaction._id} className="border-b">
                <td className=" p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">{transaction.description}</td>
                <td className=" p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">{transaction.amount}</td>
                <td className=" p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">{transaction.initiator.name}</td>
                <td className=" p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">{new Date(transaction.date).toLocaleDateString()}</td>
                <td className="p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
               {transaction.status === "pending" ? (
               <Link
               href={`/dashboard/${groupName}/pendingInfo?transactionId=${transaction._id}`}
               className="text-blue-500 underline hover:text-blue-700"
                >
              {transaction.status}
              </Link>
              ) : (
               transaction.status
               )}
                </td>
                <td className=" p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 flex gap-2">
                  {isInitiator ? (
                    <>
                      <button className="bg-blue-500 text-white px-3 py-1 rounded"
                        onClick={() => setShowEditModal(transaction._id)}
                      >Edit</button>

                      <button className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => setShowDeleteModal(transaction._id)}
                      >Delete</button>
                    </>
                  ) : transaction.status === 'pending' && transaction.transparencyMode &&
                  transaction.pendingApprovals.some((approver) => approver._id === userId)? (
                    <>
                     <button 
                      className="bg-green-500 text-white px-3 py-1 rounded"
                      onClick={() => updateTransactionStatus(transaction._id, 'approved')}
                      >
                      Verify
                      </button>

                     <button 
                       className="bg-gray-500 text-white px-3 py-1 rounded"
                       onClick={() => updateTransactionStatus(transaction._id, 'canceled')}
                     >
                     Cancel
                    </button>

                    </>
                  ) : 'No Action Required'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
                    {/* Render Edit Modal */}
                    {showEditModal && (
        <EditTransactionModal
          transactionId={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSuccess={fetchTransactions}
        />
      )}

      {/* Render Delete Modal */}
      {showDeleteModal && (
        <DeleteTransactionModal
          transactionId={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onSuccess={fetchTransactions}
        />
      )}
      <div className="flex justify-center mt-4 w-full">
      <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default TransactionTable;
