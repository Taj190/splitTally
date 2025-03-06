'use client';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../Pagination/Pagination';
import { fetchGroups } from '@/app/store/thunks/groupListThunk';
import { useSession } from 'next-auth/react';
import CreateGroupButton from './GroupCreationBtn';

export default function GroupList() {
  const dispatch = useDispatch();
  const { groups =[], loading, error, totalPages } = useSelector((state) => state.groups);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: session } = useSession(); 
 
  const fetchUpdatedGroups = useCallback(() => {
    let token = session?.user?.idToken || null;
    dispatch(fetchGroups({ page: currentPage, token }));
  }, [dispatch, currentPage, session]); // Dependencies: dispatch, currentPage, session

  
  useEffect(() => {
    fetchUpdatedGroups();
  }, [fetchUpdatedGroups]);
  
  return (
    <div className="w-full md:w-1/1 max-w-sm p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
    <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100 text-center">
      Your Groups List
    </h2>
    <div className="flex justify-start w-full p-2">
  <CreateGroupButton fetchGroups={fetchUpdatedGroups} />
</div>

    {loading ? (
      <p className="text-gray-500 dark:text-gray-300 text-center">Loading...</p>
    ) : error ? (
      <p className="text-red-500 text-center">{error}</p>
    ) : groups.length === 0 ? (
      <p className="text-gray-500 dark:text-gray-300 text-center">No groups found.</p>
    ) : (
      <ul className="space-y-2">
        {groups.map((group) => (
          <li
            key={group._id}
            className="p-3 bg-white dark:bg-gray-700 rounded-lg shadow hover:bg-gray-200 dark:hover:bg-gray-600 transition text-center"
          >
            <a
              href={`/dashboard/${group.name}`}
              className="block w-full h-full text-gray-900 dark:text-white"
            >
              {group.name}
            </a>
          </li>
        ))}
      </ul>
    )}
  
    {/* Pagination Section */}
    {groups.length > 4 && (
      <div className="flex justify-center mt-4 w-full">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    )}
  </div>
  
  );
  
}

