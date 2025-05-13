import { Button, Card } from "flowbite-react";
import { useNavigate } from 'react-router-dom';

export default function CampaignCreationCard() {
    const navigate = useNavigate();

    const handleClick = () => {
      navigate('/campaigns/create');
    };
  
  return (
    <Card className="max-w-sm bg-white p-6 rounded-lg border border-gray-200 shadow-md">
      <h5 className="text-xl font-bold text-gray-900 mb-2">
        Create New Campaign
      </h5>
      <p className="font-normal text-gray-600 text-sm mb-4">
        Set up a new marketing campaign with custom audience targeting criteria.
      </p>
      <button 
        onClick={handleClick}
        className="w-full bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 px-4 rounded-lg"
      >
        Create Campaign
      </button>
    </Card>
  );
}
