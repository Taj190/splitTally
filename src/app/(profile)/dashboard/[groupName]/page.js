'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { useParams } from "next/navigation";
import AddMemberButton from '@/app/component/Members/addmembers';
import ToggleButton from '@/app/component/ToogleBtnForPrivacy/PrivacyMode';
import AddTransaction from '@/app/component/AddTransaction/AddTransaction';
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
<div className="relative flex flex-col items-center justify-center p-1 space-y-5 sm:space-y-4 w-full">
  {/* Header Wrapper for Show Members, Group Name, and Toggle */}
  <div className="relative flex  justify-between w-full max-w-lg">
    {/* Show Members Button on the left */}
    <button className="btn-warm mr-4" onClick={() => setShowMembers(!showMembers)}>
      {showMembers ? "Hide Members" : "Show Members"}
    </button>

    {/* Group Name centered */}
    <h1 className="absolute left-1/2 transform -translate-x-1/2 text-3xl font-semibold ml-5">
      {group.name}
    </h1>

    {/* Toggle Button on the top-right */}
    <div className="absolute top-0 right-0 p-0">
      <ToggleButton />
    </div>
  </div>

  {/* Show Members List */}
  {showMembers && (
    <ul className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 w-80">
      {group.members.map((member) => (
        <li key={member._id} className="p-2 border-b dark:border-gray-700">
          {member.name}
        </li>
      ))}
    </ul>
  )}

  {/* Wrapper for Add Member and Add Transaction Buttons */}
  <div className="flex justify-between w-full max-w-lg">
    {/* Add Member Button on the left */}
    <div>
      <AddMemberButton groupId={_id} />
    </div>

    {/* Add Transaction Button on the right */}
    <div>
      <AddTransaction />
    </div>
  </div>
</div>


  );
}


