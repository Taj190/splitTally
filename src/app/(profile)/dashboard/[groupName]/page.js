'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';

export default function GroupDetails() {
  const router = useRouter();
  const { groupname } = router.query; // Extract group name from URL
  const { data: session } = useSession(); // If using Google Auth
  const user = useSelector((state) => state.auth.user); // Redux for email/password users

  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!groupname) return;

    const fetchGroup = async () => {
      try {
        const token = session?.user?.idToken || user?.token;
        const headers = token ? { Authorization: `Bearer ${token}` } : { credentials: 'include' };

        // Request to fetch group details securely
        const res = await axios.get(`http://localhost:8080/group/details?name=${groupname}`, {
          headers,
          withCredentials: true,
        });

        setGroup(res.data); // Backend returns { _id, name, members }
      } catch (err) {
        console.error('Error fetching group details:', err);
        setError('Failed to fetch group details.');
      } finally {
        setLoading(false);
      }
    };

    fetchGroup();
  }, [groupname, session, user]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>{group.name}</h1>
      <p>Group ID: {group._id}</p>
    </div>
  );
}
