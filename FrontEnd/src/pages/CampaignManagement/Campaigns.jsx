import React from 'react';
import AudienceDetailsCard from '../../components/AudienceDetailsCard';
import CampaignCreationCard from '../../components/CampainCreationCard';
import CampaignList from './ListCampaigns';

function Campaigns() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Campaign Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <CampaignCreationCard />
        <AudienceDetailsCard />
      </div>
      
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <CampaignList />
      </div>
    </div>
  );
}

export default Campaigns;
