'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';
import Pagination from '../Pagination/Pagination';

export default function GroupList() {
  const { data: session } = useSession(); // Google Auth
  const user = useSelector((state) => state.auth.user); // Redux state for email/password auth
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const token = session?.user?.idToken;
        const headers = token
          ? { Authorization: `Bearer ${token}` }
          : { credentials: 'include' };

        const res = await axios.get(
          `http://localhost:8080/group/list?page=${currentPage}`,
          { headers, withCredentials: true }
        );
      
        setGroups(res.data.groups);
      } catch (err) {
        console.error('Error fetching groups:', err);
        setError('Failed to fetch groups.');
      } finally {
        setLoading(false);
      }
    };

    if (session || user) {
      fetchGroups();
    }
  }, [session, user, currentPage]);

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

