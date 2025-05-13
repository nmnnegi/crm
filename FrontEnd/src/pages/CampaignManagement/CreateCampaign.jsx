import React, { useState } from 'react';
import axios from 'axios';
import { Label, TextInput, Select, Card } from "flowbite-react";
import { useNavigate } from 'react-router-dom';

export default function CreateCampaign() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    audienceCriteria: {
      totalSpends: { operator: '', value: '' },
      visits: { operator: '', value: '' },
      lastVisit: { operator: '', value: '' }
    },
    logicalOperators: {
      spendsVisits: 'AND',  // Logical operator between totalSpends and visits
      visitsLastVisit: 'AND'  // Logical operator between visits and lastVisit
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field, operator, value) => {
    setFormData(prevState => ({
      ...prevState,
      audienceCriteria: {
        ...prevState.audienceCriteria,
        [field]: { operator, value }
      }
    }));
  };

  const handleLogicalOperatorChange = (field, value) => {
    setFormData(prevState => ({
      ...prevState,
      logicalOperators: {
        ...prevState.logicalOperators,
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Make sure numeric values are properly handled
    const processedFormData = {
      ...formData,
      audienceCriteria: {
        totalSpends: {
          operator: formData.audienceCriteria.totalSpends.operator,
          value: String(formData.audienceCriteria.totalSpends.value)  // Ensure it's a string for API
        },
        visits: {
          operator: formData.audienceCriteria.visits.operator,
          value: String(formData.audienceCriteria.visits.value)  // Ensure it's a string for API
        },
        lastVisit: {
          operator: formData.audienceCriteria.lastVisit.operator,
          value: String(formData.audienceCriteria.lastVisit.value)  // Ensure it's a string for API
        }
      }
    };
    
    console.log('Submitting campaign with data:', JSON.stringify(processedFormData, null, 2));
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/campaigns/create`, processedFormData);
      console.log('Campaign created:', response.data);
      
      // Check audience size immediately after creation
      if (response.data.campaign && response.data.campaign._id) {
        try {
          console.log('Checking audience size for new campaign...');
          const audienceResponse = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/campaigns/audience-size/${response.data.campaign._id}`
          );
          console.log('Audience size result:', audienceResponse.data);
          alert(`Campaign created successfully!\nAudience size: ${audienceResponse.data.audienceSize} customers`);
        } catch (audienceError) {
          console.error('Error checking audience size:', audienceError);
        }
      }
      
      setFormData({
        name: '',
        audienceCriteria: {
          totalSpends: { operator: '', value: '' },
          visits: { operator: '', value: '' },
          lastVisit: { operator: '', value: '' }
        },
        logicalOperators: {
          spendsVisits: 'AND',
          visitsLastVisit: 'AND'
        }
      });
      setLoading(false);
      navigate('/audience');
      
    } catch (error) {
      console.error('Failed to create campaign:', error);
      console.error('Error details:', error.response?.data || error.message);
      setError('Failed to create campaign. Please try again.');
      setLoading(false);
      alert(`Error creating campaign: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Create Campaign</h1>
      
      <Card className="max-w-xl mx-auto bg-white border border-gray-200 shadow-sm rounded-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <Label htmlFor="name" value="Campaign Name" className="text-gray-700 mb-1 block" />
            <TextInput
              id="name"
              type="text"
              placeholder="Enter a descriptive name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full"
              color="gray"
            />
          </div>

          <div className="border-t border-gray-200 pt-4 mt-2">
            <h3 className="text-md font-medium text-gray-700 mb-3">Audience Criteria</h3>
            
            <div className="mb-4">
              <Label htmlFor="totalSpendsOperator" value="Customer Total Spending" className="text-gray-700 mb-1 block" />
              <div className="grid grid-cols-2 gap-3">
                <Select
                  id="totalSpendsOperator"
                  value={formData.audienceCriteria.totalSpends.operator}
                  onChange={(e) => handleChange('totalSpends', e.target.value, formData.audienceCriteria.totalSpends.value)}
                  required
                  className="w-full"
                >
                  <option value="">Select Operator</option>
                  <option value="equals">Equals</option>
                  <option value="lt">Less than</option>
                  <option value="gt">Greater than</option>
                </Select>
                <TextInput
                  id="valueTotalSpends"
                  type="number"
                  placeholder="Value"
                  value={formData.audienceCriteria.totalSpends.value}
                  onChange={(e) => handleChange('totalSpends', formData.audienceCriteria.totalSpends.operator, e.target.value)}
                  required
                  className="w-full"
                />
              </div>
            </div>

            <div className="mb-4">
              <Label htmlFor="spendsVisitsOperator" value="Logic between Spends and Visits" className="text-gray-700 mb-1 block" />
              <Select
                id="spendsVisitsOperator"
                value={formData.logicalOperators.spendsVisits}
                onChange={(e) => handleLogicalOperatorChange('spendsVisits', e.target.value)}
                required
                className="w-full"
              >
                <option value="AND">AND</option>
                <option value="OR">OR</option>
              </Select>
            </div>

            <div className="mb-4">
              <Label htmlFor="visitsOperator" value="Number of Visits" className="text-gray-700 mb-1 block" />
              <div className="grid grid-cols-2 gap-3">
                <Select
                  id="visitsOperator"
                  value={formData.audienceCriteria.visits.operator}
                  onChange={(e) => handleChange('visits', e.target.value, formData.audienceCriteria.visits.value)}
                  required
                  className="w-full"
                >
                  <option value="">Select Operator</option>
                  <option value="equals">Equals</option>
                  <option value="lt">Less than</option>
                  <option value="gt">Greater than</option>
                </Select>
                <TextInput
                  id="valueVisits"
                  type="number"
                  placeholder="Value"
                  value={formData.audienceCriteria.visits.value}
                  onChange={(e) => handleChange('visits', formData.audienceCriteria.visits.operator, e.target.value)}
                  required
                  className="w-full"
                />
              </div>
            </div>

            <div className="mb-4">
              <Label htmlFor="visitsLastVisitOperator" value="Logic between Visits and Last Visit" className="text-gray-700 mb-1 block" />
              <Select
                id="visitsLastVisitOperator"
                value={formData.logicalOperators.visitsLastVisit}
                onChange={(e) => handleLogicalOperatorChange('visitsLastVisit', e.target.value)}
                required
                className="w-full"
              >
                <option value="AND">AND</option>
                <option value="OR">OR</option>
              </Select>
            </div>

            <div className="mb-4">
              <Label htmlFor="lastVisitOperator" value="Last Visit (Months Ago)" className="text-gray-700 mb-1 block" />
              <div className="grid grid-cols-2 gap-3">
                <Select
                  id="lastVisitOperator"
                  value={formData.audienceCriteria.lastVisit.operator}
                  onChange={(e) => handleChange('lastVisit', e.target.value, formData.audienceCriteria.lastVisit.value)}
                  required
                  className="w-full"
                >
                  <option value="">Select Operator</option>
                  <option value="equals">Equals</option>
                  <option value="lt">Less than</option>
                  <option value="gt">Greater than</option>
                </Select>
                <TextInput
                  id="valueLastVisit"
                  type="number"
                  placeholder="Value"
                  value={formData.audienceCriteria.lastVisit.value}
                  onChange={(e) => handleChange('lastVisit', formData.audienceCriteria.lastVisit.operator, e.target.value)}
                  required
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 px-4 rounded-lg disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Campaign'}
          </button>
          
          {error && <p className="text-center text-red-500 mt-2">{error}</p>}
        </form>
      </Card>
    </div>
  );
}
