import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Spinner } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

export default function AudienceDetails() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/campaigns/list`);
        setCampaigns(response.data.campaigns);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
        setError('Failed to fetch campaigns.');
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  const handleSendCampaign = async (campaignId) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/campaigns/send/${campaignId}`);
      alert('Campaign sent successfully!');
      // Refresh the campaigns list to reflect any updates
      const updatedResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/campaigns/list`);
      setCampaigns(updatedResponse.data.campaigns);
    } catch (error) {
      console.error('Error sending campaign:', error);
      setError('Failed to send campaign.');
    }
  };

  const handleViewAudienceSize = async (campaignId) => {
    try {
      setLoading(true);
      console.log('Fetching audience size for campaign:', campaignId);
      
      // Display loading message to user
      alert('Calculating audience size...');
      
      // Make the API call with better error handling
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/campaigns/audience-size/${campaignId}`,
        { timeout: 10000 } // 10 second timeout
      );
      
      console.log('Audience size API response:', response.data);
      const { audienceSize, totalCustomers, campaign } = response.data;
      
      // Update the campaign in the local state with the audience size
      setCampaigns(prevCampaigns => 
        prevCampaigns.map(c => 
          c._id === campaignId ? { ...c, totalAudienceSize: audienceSize } : c
        )
      );
      
      if (audienceSize === 0) {
        alert(`No customers match the criteria for campaign "${campaign}". Try adjusting your audience criteria.\n\nDebug info: Total customers in DB: ${totalCustomers}`);
      } else {
        alert(`Campaign: ${campaign}\nTotal Audience Size: ${audienceSize} customers\n(${((audienceSize/totalCustomers)*100).toFixed(1)}% of your customer base)`);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error getting audience size:', error);
      console.error('Error details:', error.response?.data || error.message);
      setError('Failed to get audience size.');
      setLoading(false);
      alert(`Error calculating audience size: ${error.response?.data?.message || error.message}\n\nPlease check the console for more details.`);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <Spinner size="lg" />
        <p className="mt-2 text-gray-500">Loading campaign data...</p>
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
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Campaign Audience Details</h1>
      
      <div className="grid grid-cols-1 gap-4">
        {campaigns.map((campaign) => (
          <Card key={campaign._id} className="bg-white border border-gray-200 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h5 className="text-xl font-bold text-gray-800 mb-1">
                  {campaign.name}
                </h5>
                <p className="text-sm text-gray-600">
                  Audience Size: <span className="font-medium">{campaign.totalAudienceSize || '0'}</span>
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-0 w-full sm:w-auto">
                <button
                  onClick={() => handleSendCampaign(campaign._id)}
                  className="bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 px-4 rounded-lg w-full sm:w-auto"
                >
                  Send Campaign
                </button>
                <button
                  onClick={() => handleViewAudienceSize(campaign._id)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg border border-gray-300 w-full sm:w-auto"
                >
                  View Audience
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
