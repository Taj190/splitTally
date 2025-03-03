"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';


const ReportComponent = () => {
    const { data: session } = useSession();
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const router = useRouter();
    const groupName = params.groupName; 
    const groups = useSelector((state) => state.groups.groups);
    const groupDetail = groups.find((group) => group.name === groupName);
    const groupId = groupDetail?._id;
    let headers = {};
if (session?.user?.idToken) {
    headers.Authorization = `Bearer ${session.user.idToken}`;
  }
    useEffect(() => {
        // Fetch the status when the component mounts
        const fetchStatus = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/report/eligibility/${groupId}`, 
                    { headers,
                    withCredentials: true,});
                setStatus(response.data.status);
            } catch (error) {
                console.error('Error fetching status:', error);
            }
        };

        fetchStatus();
    }, [groupId]);

    const handleGetReport = async () => {
        setLoading(true);
        router.push(`/dashboard/${groupName}/reportanalysis`);
    };

    const handleGenerateReport = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/spending/analize', { groupId },
                { headers, withCredentials: true }
            );
            if (response.data.success) {
                setStatus('Report Pending');
                alert('Report is  generated...');
            }
        } catch (error) {
            console.error('Error generating report:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {status === 'Not eligible' && (
                <p className="text-white text-xs text-center">
                Upon two months completion of your group registration, we will analyze your expense history and provide you a brief detail here.
              </p>
            )}

            {status === 'Report Pending' && (
                <div>
                    <button onClick={handleGetReport} disabled={loading} className="px-5 py-2  btn-unique">
                        {loading ? 'Loading...' : 'Get Report'}
                    </button>
                  
                </div>
            )}

            {status === 'Generate Report' && (
                <button onClick={handleGenerateReport} disabled={loading} className="px-5 py-2  btn-unique">
                    {loading ? 'Please Wait...' : 'Generate Report'}
                </button>
            )}
        </div>
    );
};

export default ReportComponent;
