import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";

const ToggleButton = () => {
  const params = useParams();
  const groupName = params.groupName;
  const router = useRouter();
  const groups = useSelector((state) => state.groups.groups);
  const groupDetail = groups.find((group) => group.name === groupName);
  const _id = groupDetail?._id;
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [privacyMode, setIsPrivate] = useState();
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [lastUpdatedBy, setLastUpdatedBy] = useState(null);
  const [daysUntilReset, setDaysUntilReset] = useState(null);
  const { data: session } = useSession();
  let token = session?.user?.idToken || null;
  const headers = token
    ? { Authorization: `Bearer ${token}` }
    : { credentials: "include" };


    const fetchPrivacyMode = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/mode/status?groupId=${_id}`,
          {
            withCredentials: true,
            headers,
          }
        );
        console.log(response.data)
        setIsPrivate(response.data.privacyMode);
        setAttemptsLeft(response.data.attemptsLeft);
        setLastUpdatedBy(response.data.lastUpdatedBy);
        setDaysUntilReset(response.data.daysUntilReset);
      } catch (error) {
        console.error("Failed to fetch privacy mode:", error);
      }
    };
    console.log(lastUpdatedBy)
  useEffect(() => {
    fetchPrivacyMode();
  }, [session, _id]);

  const handleToggle = async () => {
    if (attemptsLeft === 0) return;

    const newValue = !privacyMode;
    setIsPrivate(newValue);

    try {
      const response = await axios.put(
        "http://localhost:8080/privacymode/toggle",
        { groupId: _id, privacyMode: newValue },
        {
          withCredentials: true,
          headers,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setAttemptsLeft(response.data.attemptsLeft);
        setLastUpdatedBy(response.data.lastUpdatedBy);
        setDaysUntilReset(response.data.daysUntilReset);
        fetchPrivacyMode();
      }
    } catch (error) {
      setIsPrivate(!newValue);
      toast.error("Failed to update privacy setting.");
    }
  };

  const handleLearnMoreClick = () => {
    router.push(`/dashboard/${params.groupName}/learnmore`);
  };

  return (
    <div className="flex flex-col items-end w-full">
    {/* Toggle Button */}
    <button
      onClick={handleToggle}
      disabled={attemptsLeft === 0}
      className={`relative w-16 h-8 bg-gray-300 rounded-full p-1 flex items-center transition-all ${
        privacyMode ? "bg-green-500" : "bg-gray-300"
      } ${attemptsLeft === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <div
        className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-all ${
          privacyMode ? "translate-x-8" : "translate-x-0"
        }`}
      />
    </button>

    {/* Privacy Mode Label */}
    <div className="flex items-center justify-end mt-1 gap-1">
      <span className="text-[8px] text-red-500">Privacy Mode</span>
      <div
        className="relative flex items-center justify-center w-3 h-3 bg-gray-400 text-white text-[5px] font-bold rounded-full cursor-pointer"
        onMouseEnter={() => setShowLearnMore(true)}
        onMouseLeave={() => setShowLearnMore(false)}
        onClick={handleLearnMoreClick}
      >
        i
        {showLearnMore && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-[5px] bg-gray-800 text-white p-1 rounded">
            Learn more
          </div>
        )}
      </div>
    </div>

    {/* Last Updated By (always below toggle) */}
    {lastUpdatedBy && lastUpdatedBy !== "No information" && (
      <p className="text-[10px] mt-1 text-gray-500 truncate w-[150px] text-right">
        (Last updated by: {lastUpdatedBy})
      </p>
    )}

    {/* Attempts left warning */}
    {attemptsLeft === 0 && daysUntilReset && (
      <p className="text-[10px] text-blue-800 text-right">
        Blocked for {daysUntilReset} days
      </p>
    )}
  </div>

  );
};

export default ToggleButton;
