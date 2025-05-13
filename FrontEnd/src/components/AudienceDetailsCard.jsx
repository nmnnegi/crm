import { Button, Card } from "flowbite-react";
import { useNavigate } from 'react-router-dom';

export default function AudienceDetailsCard() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/audience');
    }
  return (
    <Card className="max-w-sm bg-white p-6 rounded-lg border border-gray-200 shadow-md">
      <h5 className="text-xl font-bold text-gray-900 mb-2">
        Audience Analytics
      </h5>
      <p className="font-normal text-gray-600 text-sm mb-4">
        View detailed information about your target audience segments and performance metrics.
      </p>
      <button
        onClick={handleClick}
        className="w-full bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 px-4 rounded-lg"
      >
        View Audience
      </button>
    </Card>
  );
}
