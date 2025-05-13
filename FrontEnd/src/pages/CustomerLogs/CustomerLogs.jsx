import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner } from 'flowbite-react';

const CommunicationLogs = () => {
  const [communicationLogs, setCommunicationLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    successful: 0,
    failed: 0,
    pending: 0
  });

  useEffect(() => {
    // Fetch communication logs from the backend API
    const fetchCommunicationLogs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/communications/logs`);
        const logs = response.data.logs || [];
        setCommunicationLogs(logs);
        
        // Calculate statistics
        const successful = logs.filter(log => log.status === 'sent' || log.status === 'delivered').length;
        const failed = logs.filter(log => log.status === 'failed').length;
        const pending = logs.filter(log => log.status === 'pending').length;
        
        setStats({
          total: logs.length,
          successful,
          failed,
          pending
        });
        
      } catch (error) {
        console.error('Error fetching communication logs:', error);
        setError('Failed to load communication logs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCommunicationLogs();
  }, []);

  // Helper function to format dates
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Helper function to determine status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'sent':
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <Spinner size="lg" />
        <p className="mt-2 text-gray-500">Loading communication logs...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-center py-4 text-red-500">{error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Communication Logs</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-4">
          <div className="text-center">
            <p className="text-sm text-gray-500">Total Communications</p>
            <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-4">
          <div className="text-center">
            <p className="text-sm text-gray-500">Successful</p>
            <p className="text-2xl font-bold text-green-600">{stats.successful}</p>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-4">
          <div className="text-center">
            <p className="text-sm text-gray-500">Failed</p>
            <p className="text-2xl font-bold text-red-600">{stats.failed}</p>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-4">
          <div className="text-center">
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
          </div>
        </div>
      </div>

      {communicationLogs.length === 0 ? (
        <div className="text-center py-8 bg-white border border-gray-200 rounded-lg shadow-sm">
          <p className="text-gray-500">No communication logs found. Send a campaign to generate logs.</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="py-3 px-4 font-medium text-gray-700 border-b">Campaign</th>
                  <th className="py-3 px-4 font-medium text-gray-700 border-b">Customer</th>
                  <th className="py-3 px-4 font-medium text-gray-700 border-b">Status</th>
                  <th className="py-3 px-4 font-medium text-gray-700 border-b">Time</th>
                </tr>
              </thead>
              <tbody>
                {communicationLogs.map((log) => (
                  <tr key={log._id} className="hover:bg-gray-50 border-b border-gray-100">
                    <td className="py-3 px-4 text-gray-800">
                      {log.campaignId ? log.campaignId.name : 'Direct Communication'}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {log.customerId ? log.customerId.name : 'N/A'}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                        {log.status || 'Unknown'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {formatDate(log.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunicationLogs;
