'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../Pagination/Pagination';
import { fetchGroups } from '@/app/store/thunks/groupListThunk';
import { useSession } from 'next-auth/react';

export default function GroupList() {
  const dispatch = useDispatch();
  const { groups =[], loading, error, totalPages } = useSelector((state) => state.groups);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: session } = useSession(); 
 

 
  useEffect(() => {
    let token = null;

    if (session) {
      token = session.user.idToken; 
      dispatch(fetchGroups({ page: currentPage, token }));
    } else{
      dispatch(fetchGroups({ page: currentPage }));
    }

   
  }, [dispatch, currentPage, session]);


  
  return (
    <div className="w-full md:w-1/1 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
        Your Groups List
      </h2>
  
      {loading ? (
        <p className="text-gray-500 dark:text-gray-300">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : groups.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">No groups found.</p>
      ) : (
        <ul className="space-y-2">
          {groups.map((group) => (
            <li
              key={group._id}
              className="p-2 bg-white dark:bg-gray-700 rounded-lg shadow hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            >
              <a
                href={`/dashboard/${group.name}`}
                className="block w-full h-full text-gray-900 dark:text-white p-2"
              >
                {group.name}
              </a>
            </li>
          ))}
        </ul>
      )}
  
      {/* Pagination Section */}
      {groups.length > 4 ? (
        <div className="flex justify-center mt-4 w-full">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      ) : (
        <p className="text-lg text-center font-semibold mb-3 text-gray-900 dark:text-gray-100">
          You have {groups.length} groups
        </p>
      )}
    </div>
  );
  
}

