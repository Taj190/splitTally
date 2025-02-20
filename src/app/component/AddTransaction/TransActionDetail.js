'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';
import Pagination from '../Pagination/Pagination';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';


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
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        let headers = {};
        if (session?.user?.idToken) {
          headers.Authorization = `Bearer ${session.user.idToken}`;
        }

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

    fetchTransactions();
  }, [session,  page, groupName , totalPages]);
  return (
    <div className="overflow-x-auto p-4 w-full max-w-4xl mx-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="p-3 text-left">Item</th>
            <th className="p-3 text-left">Price (€)</th>
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
                <td className=" p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize">{transaction.status}</td>
                <td className=" p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 flex gap-2">
                  {isInitiator ? (
                    <>
                      <button className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
                      <button className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                    </>
                  ) : transaction.status === 'pending' && transaction.transparencyMode ? (
                    <>
                      <button className="bg-green-500 text-white px-3 py-1 rounded">Verify</button>
                      <button className="bg-gray-500 text-white px-3 py-1 rounded">Cancel</button>
                    </>
                  ) : 'No Action Required'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
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
