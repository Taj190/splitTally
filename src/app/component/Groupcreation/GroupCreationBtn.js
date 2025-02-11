import { useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';


const CreateGroupButton = () => {
  const { data: session } = useSession();
  const [groupName, setGroupName] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [groups, setGroups] = useState([]);
 const router = useRouter();
  const handleCreateGroup = async () => {
   
    if (!groupName.trim()) return toast.error('Group name cannot be empty');

    try {
      const token = session?.user?.idToken; 
      const headers = token
        ? { Authorization: `Bearer ${token}` }
        : { credentials: 'include' };

      const res = await axios.post(
        'http://localhost:8080/group/creation',
        { groupName },
        { headers, withCredentials: true }
      );
       console.log(res.data)
      if (res.data.success) {
        toast.success('Group created successfully!');
        setGroups([...groups, res.data.group]);
        setGroupName('');
        setShowInput(false);
        router.push(`/dashboard/${res.data.group.name}`);
      }
      
    } catch (error) {
      console.log(error)
      toast.error('Failed to create group');
    }
  };

  return (
    <div>
    {/* Create a Group Button */}
    <button
      onClick={() => setShowInput(true)}
      className="py-2 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
    >
      Create a Group
    </button>
  
    {/* Group Name Input and Action Buttons */}
    {showInput && (
      <div className="mt-4 space-y-4">
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Enter group name"
          className="w-full p-3 border border-gray-300 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
  
        <div className="flex space-x-4">
          {/* Create Button */}
          <button
            onClick={handleCreateGroup}
            className="py-2 px-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
          >
            Create
          </button>
  
          {/* Cancel Button */}
          <button
            onClick={() => setShowInput(false)}
            className="py-2 px-4 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    )}
  
    {/* Group List */}
    <div className="mt-4">
      {groups.map((group) => (
        <a
          key={group._id}
          href={`/dashboard/${group.name}`}
          className="block p-2 text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-400 transition-all"
        >
          {group.name}
        </a>
      ))}
    </div>
  </div>
  
  );
};

export default CreateGroupButton;
