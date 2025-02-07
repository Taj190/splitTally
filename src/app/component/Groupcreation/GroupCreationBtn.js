import { useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { toast } from 'react-toastify';

const CreateGroupButton = () => {
  const { data: session } = useSession();
  const [groupName, setGroupName] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [groups, setGroups] = useState([]);

  const handleCreateGroup = async () => {
   
    if (!groupName.trim()) return toast.error('Group name cannot be empty');

    try {
      const token = session?.user?.idToken; 
      console.log(token)
      const headers = token
        ? { Authorization: `Bearer ${token}` }
        : { credentials: 'include' };

      const res = await axios.post(
        'http://localhost:8080/group/creation',
        { groupName },
        { headers, withCredentials: true }
      );

      if (res.data.success) {
        toast.success('Group created successfully!');
        setGroups([...groups, res.data.group]);
        setGroupName('');
        setShowInput(false);
      }
      
    } catch (error) {
      console.log(error)
      toast.error('Failed to create group');
    }
  };

  return (
    <div>
      <button onClick={() => setShowInput(true)} className="p-2 bg-blue-500 text-white rounded">
        Create a Group
      </button>
      {showInput && (
        <div>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter group name"
            className="border p-2 rounded"
          />
          <button onClick={handleCreateGroup} className="p-2 bg-green-500 text-white rounded">
            Create
          </button>
          <button onClick={() => setShowInput(false)} className="p-2 bg-red-500 text-white rounded">
        Cancel
      </button>
        </div>
      )}
      <div>
        {groups.map((group) => (
          <a key={group.id} href={`/group/${group.id}`} className="block p-2 text-blue-600">
            {group.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default CreateGroupButton;
