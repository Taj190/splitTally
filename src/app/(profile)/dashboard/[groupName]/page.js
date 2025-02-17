'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { useParams } from "next/navigation";
import AddMemberButton from '@/app/component/Members/addmembers';
import ToggleButton from '@/app/component/ToogleBtnForPrivacy/PrivacyMode';
// import AddMember from './AddMember';

export default function GroupDetails() {
  const params = useParams();
  const groupName = params.groupName;
  const { data: session, status } = useSession();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMembers, setShowMembers] = useState(false);
  const groups = useSelector((state) => state.groups.groups);
  const groupDetail = groups.find((group) => group.name === groupName);
  const _id = groupDetail?._id;

  useEffect(() => {
    if (!groupName || status === 'loading') return;
    const fetchGroup = async () => {
      try {
        let headers = {};
        if (session?.user?.idToken) {
          headers.Authorization = `Bearer ${session.user.idToken}`;
        }

        const res = await axios.get(`http://localhost:8080/group/detail?_id=${_id}`, {
          headers,
          withCredentials: true,
        });

        setGroup(res.data);
      } catch (err) {
        setError('Failed to fetch group details.');
      } finally {
        setLoading(false);
      }
    };

    fetchGroup();
  }, [groupName, session, status]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!group) return <p>No group found.</p>;

  return (
<div className="flex flex-col items-center justify-center  p-6">
      <h1 className="text-3xl font-semibold mb-4">{group.name}</h1>

      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md mb-4"
        onClick={() => setShowMembers(!showMembers)}
      >
        {showMembers ? 'Hide Members' : 'Show Members'}
      </button>
      
      {showMembers && (
        <ul className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 w-80">
          {group.members.map((member) => (
            <li key={member._id} className="p-2 border-b dark:border-gray-700">
              {member.name}
            </li>
          ))}
        </ul>
      )}

      <AddMemberButton groupId={_id} />
      <ToggleButton/>
    </div>
  );
}


