import { useState } from "react";

export default function AddMemberButton() {
  const [isAdding, setIsAdding] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const handleGetCode = () => {
    try {
        const response = axios.post('http://localhost:8080/code/addmember', { email });
        if (response.data.success) {
          toast.success(response.data.message);
          setCodeSent(true);
        }
       
      } catch (error) {
          if (error.response && error.response.data && error.response.data.message) {
              toast.error(error.response.data.message); 
            } else {
              toast.error('Failed to send verification code. Please try again later.');
            }
      }
  };

  const handleAddMember = () => {
    console.log("Adding member with email and code:", { email, code });
    // Send payload to backend
  };

  return (
    <div className="flex flex-col items-center justify-center mt-4">
      {!isAdding ? (
        <button
          onClick={() => setIsAdding(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
        >
          Add Member
        </button>
      ) : (
        <div className="flex flex-col space-y-2 p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded-md w-64"
          />
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Enter code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="p-2 border rounded-md w-40"
            />
            <button
              onClick={handleGetCode}
              className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700"
            >
              Get Code
            </button>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleAddMember}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
            >
              Add
            </button>
            <button
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg shadow-md hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
