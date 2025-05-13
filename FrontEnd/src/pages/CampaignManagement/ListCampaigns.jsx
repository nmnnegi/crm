import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner } from 'flowbite-react';

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/campaigns/list`);
        setCampaigns(response.data.campaigns);
        setLoading(false);
      } catch (error) {
        setError('Error fetching campaigns. Please try again.');
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10">
        <Spinner size="lg" />
        <p className="mt-2 text-gray-500">Loading campaigns...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-center py-4 text-red-500">{error}</p>;
  }

  if (campaigns.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No campaigns found. Create your first campaign to get started.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Active Campaigns</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="py-3 px-4 font-medium text-gray-700 border-b">Name</th>
              <th className="py-3 px-4 font-medium text-gray-700 border-b">Created</th>
              <th className="py-3 px-4 font-medium text-gray-700 border-b">Audience Size</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map(campaign => (
              <tr key={campaign._id} className="hover:bg-gray-50 border-b border-gray-100">
                <td className="py-3 px-4 text-gray-800">{campaign.name}</td>
                <td className="py-3 px-4 text-gray-600">{new Date(campaign.createdAt).toLocaleDateString()}</td>
                <td className="py-3 px-4 text-gray-600">{campaign.totalAudienceSize || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
