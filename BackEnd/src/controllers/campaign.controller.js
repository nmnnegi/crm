// controllers/campaign.controller.js
import Campaign from '../model/campain.model.js';
import axios from 'axios';
import Customer from '../model/customer.model.js';
import CommunicationLog from '../model/communicationLogs.model.js';
import mongoose from 'mongoose';

// Create a new campaign
export const createCampaign = async (req, res) => {
    const { name, audienceCriteria, logicalOperators } = req.body;
    
    if (!name || !audienceCriteria || !logicalOperators) {
      return res.status(400).json({ message: 'Name, audience criteria, and logical operators are required' });
    }
  
    try {
      // Parse and structure the audience criteria data
      const parsedCriteria = parseAudienceCriteria(audienceCriteria);
      
      const newCampaign = new Campaign({ 
          name, 
          audienceCriteria: parsedCriteria,
          logicalOperators
        });
      await newCampaign.save();
      res.status(201).json({ message: 'Campaign created successfully', campaign: newCampaign });
      console.log('Campaign created successfully', newCampaign);
    } catch (error) {
      res.status(500).json({ message: 'Error creating campaign', error });
    }
  };

// Helper function to parse audience criteria
const parseAudienceCriteria = (audienceCriteria) => {
  const parsedCriteria = {};

  // Iterate through each criterion
  Object.keys(audienceCriteria).forEach(key => {
    const criterion = audienceCriteria[key];

    // Parse and add the criterion to the parsedCriteria object
    parsedCriteria[key] = {
      operator: criterion.operator,
      value: criterion.value
    };
  });
  console.log('parsedCriteria:', parsedCriteria);

  return parsedCriteria;

};




// Send a campaign
export const sendCampaign = async (req, res) => {
  const { campaignId } = req.params;

  try {
    if (!campaignId || !mongoose.Types.ObjectId.isValid(campaignId)) {
      console.error('Invalid campaign ID:', campaignId);
      return res.status(400).json({ message: 'Invalid campaign ID' });
    }
    
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      console.error('Campaign not found:', campaignId);
      return res.status(404).json({ message: 'Campaign not found' });
    }
    console.log('Campaign found:', campaign.name);

    // Constructing the query for MongoDB based on audience criteria
    const criteria = constructCriteria(campaign.audienceCriteria, campaign.logicalOperators);
    console.log('Query criteria:', JSON.stringify(criteria, null, 2));

    // Find customers matching the constructed query
    const customers = await Customer.find(criteria);
    console.log('Matching customers count:', customers.length);

    if (customers.length === 0) {
      console.log('No customers match the campaign criteria');
      return res.status(200).json({ 
        message: 'No customers match the campaign criteria', 
        campaign,
        audienceSize: 0
      });
    }

    // Simulate sending the campaign
    const logs = [];
    for (const customer of customers) {
      const status = Math.random() < 0.9 ? 'SENT' : 'FAILED';
      const log = new CommunicationLog({ campaignId: campaign._id, customerId: customer._id, status });
      await log.save();
      logs.push(log);
    }
    
    try {
      const response = await axios.post('https://crm-16b1.onrender.com/api/vendor/send-bulk-messages', {
        campaignId,
        customers,
      });
      console.log('Vendor API response:', response.data);
    } catch (apiError) {
      console.error('Error calling vendor API:', apiError.message);
      // Continue execution even if vendor API fails
    }

    // Update campaign attributes based on response
    campaign.totalAudienceSize = customers.length;
    campaign.sent = logs.filter(log => log.status === 'SENT').length;
    campaign.failed = logs.filter(log => log.status === 'FAILED').length;
    campaign.sentAt = new Date();
    console.log('Updated Campaign:', campaign);

    await campaign.save();

    res.status(200).json({ 
      message: 'Campaign sent successfully', 
      campaign,
      audienceSize: customers.length,
      sent: campaign.sent,
      failed: campaign.failed
    });
  } catch (error) {
    console.error('Error sending campaign:', error);
    res.status(500).json({ message: 'Error sending campaign', error: error.message });
  }
};

export const getAudienceSize = async (req, res) => {
    const { campaignId } = req.params;

    // Add CORS headers explicitly
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    try {
        // Check if a valid campaignId was provided
        if (!campaignId || !mongoose.Types.ObjectId.isValid(campaignId)) {
            console.error('Invalid campaign ID:', campaignId);
            return res.status(400).json({ message: 'Invalid campaign ID' });
        }
        
        const campaign = await Campaign.findById(campaignId);
        if (!campaign) {
            console.error('Campaign not found with ID:', campaignId);
            return res.status(404).json({ message: 'Campaign not found' });
        }

        console.log('Found campaign:', campaign.name);
        
        // Get total number of customers in the database for reference
        const totalCustomerCount = await Customer.countDocuments();
        console.log('Total customers in database:', totalCustomerCount);
        
        // Double check customer data exists
        const sampleCustomers = await Customer.find().limit(5);
        console.log('Sample customer data:', sampleCustomers.map(c => ({
            id: c._id,
            name: c.name,
            spends: c.totalSpends,
            visits: c.visits,
            lastVisit: c.lastVisit
        })));
        
        // Construct the criteria
        const criteria = constructCriteria(campaign.audienceCriteria, campaign.logicalOperators);
        console.log('Constructed criteria for audience:', JSON.stringify(criteria, null, 2));

        // Find matching customers
        const customers = await Customer.find(criteria);
        console.log('Number of matching customers:', customers.length);
        
        if (customers.length > 0) {
            console.log('First matching customer:', {
                id: customers[0]._id,
                name: customers[0].name,
                spends: customers[0].totalSpends,
                visits: customers[0].visits,
                lastVisit: customers[0].lastVisit
            });
        }

        // Log summary of the audience criteria and results
        console.log('----- Audience Size Summary -----');
        console.log('Campaign:', campaign.name);
        console.log('Criteria:', JSON.stringify(campaign.audienceCriteria, null, 2));
        console.log('Logical Operators:', JSON.stringify(campaign.logicalOperators, null, 2));
        console.log('Total customers:', totalCustomerCount);
        console.log('Matching customers:', customers.length);
        console.log('---------------------------------');

        // Update the campaign with the latest audience size
        campaign.totalAudienceSize = customers.length;
        await campaign.save();
        console.log('Updated campaign.totalAudienceSize to', customers.length);

        res.status(200).json({ 
            audienceSize: customers.length,
            totalCustomers: totalCustomerCount,
            campaign: campaign.name
        });
    } catch (error) {
        console.error('Error getting audience size:', error);
        res.status(500).json({ message: 'Error getting audience size', error: error.message });
    }
};

const constructCriteria = (audienceCriteria, logicalOperators) => {
  const criteria = [];
  console.log('Input audienceCriteria:', JSON.stringify(audienceCriteria));
  console.log('Input logicalOperators:', JSON.stringify(logicalOperators));

  // Apply totalSpends criterion
  if (audienceCriteria.totalSpends && audienceCriteria.totalSpends.operator && audienceCriteria.totalSpends.value) {
    const { operator, value } = audienceCriteria.totalSpends;
    let mongoOperator;
    
    // Translate operator to MongoDB operator
    if (operator === 'gt') mongoOperator = '$gt';
    else if (operator === 'lt') mongoOperator = '$lt';
    else if (operator === 'equals') mongoOperator = '$eq';
    else mongoOperator = '$eq'; // Default to equals if not specified
    
    // Convert value to number
    const numericValue = Number(value);
    
    criteria.push({ totalSpends: { [mongoOperator]: numericValue } });
    console.log(`Added totalSpends criteria: { totalSpends: { ${mongoOperator}: ${numericValue} } }`);
  }

  // Apply visits criterion
  if (audienceCriteria.visits && audienceCriteria.visits.operator && audienceCriteria.visits.value) {
    const { operator, value } = audienceCriteria.visits;
    let mongoOperator;
    
    // Translate operator to MongoDB operator
    if (operator === 'gt') mongoOperator = '$gt';
    else if (operator === 'lt') mongoOperator = '$lt';
    else if (operator === 'equals') mongoOperator = '$eq';
    else mongoOperator = '$eq'; // Default to equals if not specified
    
    // Convert value to number
    const numericValue = Number(value);
    
    criteria.push({ visits: { [mongoOperator]: numericValue } });
    console.log(`Added visits criteria: { visits: { ${mongoOperator}: ${numericValue} } }`);
  }

  // Apply lastVisit criterion
  if (audienceCriteria.lastVisit && audienceCriteria.lastVisit.operator && audienceCriteria.lastVisit.value) {
    const { operator, value } = audienceCriteria.lastVisit;
    let mongoOperator;
    
    // For lastVisit, logic is inverted: "greater than X months ago" means "less than the calculated date"
    // and "less than X months ago" means "greater than the calculated date"
    if (operator === 'gt') mongoOperator = '$lt';  // Inverted logic for dates
    else if (operator === 'lt') mongoOperator = '$gt';  // Inverted logic for dates
    else if (operator === 'equals') {
      // For equals, we'll use a date range of 1 month
      const startDate = new Date();
      const endDate = new Date();
      startDate.setMonth(startDate.getMonth() - Number(value) - 0.5);
      endDate.setMonth(endDate.getMonth() - Number(value) + 0.5);
      
      criteria.push({ lastVisit: { $gte: startDate, $lt: endDate } });
      console.log(`Added lastVisit equals criteria: { lastVisit: { $gte: ${startDate.toISOString()}, $lt: ${endDate.toISOString()} } }`);
      
      // Skip the rest of this block since we've already added the criteria
      return constructQueryFromCriteria(criteria, logicalOperators);
    }
    else mongoOperator = '$lt'; // Default
    
    // Calculate the date X months ago
    const date = new Date();
    date.setMonth(date.getMonth() - Number(value));
    
    criteria.push({ lastVisit: { [mongoOperator]: date } });
    console.log(`Added lastVisit criteria: { lastVisit: { ${mongoOperator}: ${date.toISOString()} } }`);
  }

  return constructQueryFromCriteria(criteria, logicalOperators);
};

const constructQueryFromCriteria = (criteria, logicalOperators) => {
  console.log('Constructing query from criteria:', JSON.stringify(criteria));
  console.log('Using logical operators:', JSON.stringify(logicalOperators));
  
  // If no criteria, return empty query to match all documents
  if (criteria.length === 0) {
    console.log('No criteria provided, returning empty query');
    return {};
  }
  
  // If only one criterion, return it directly
  if (criteria.length === 1) {
    console.log('Only one criterion, returning it directly');
    return criteria[0];
  }
  
  // If two criteria, apply the first logical operator
  if (criteria.length === 2) {
    const operator = logicalOperators.spendsVisits === 'AND' ? '$and' : '$or';
    console.log(`Two criteria, using ${operator}`);
    return { [operator]: criteria };
  }
  
  // If three criteria, apply both logical operators
  let query = {};
  
  if (logicalOperators.spendsVisits === 'AND' && logicalOperators.visitsLastVisit === 'AND') {
    // All conditions must be met: A AND B AND C
    query = { $and: criteria };
    console.log('Using $and for all criteria');
  } else if (logicalOperators.spendsVisits === 'AND' && logicalOperators.visitsLastVisit === 'OR') {
    // (A AND B) OR C
    query = { $or: [{ $and: [criteria[0], criteria[1]] }, criteria[2]] };
    console.log('Using (A AND B) OR C logic');
  } else if (logicalOperators.spendsVisits === 'OR' && logicalOperators.visitsLastVisit === 'AND') {
    // A OR (B AND C)
    query = { $or: [criteria[0], { $and: [criteria[1], criteria[2]] }] };
    console.log('Using A OR (B AND C) logic');
  } else {
    // A OR B OR C
    query = { $or: criteria };
    console.log('Using $or for all criteria');
  }
  
  console.log('Final query:', JSON.stringify(query));
  return query;
};

  
  

// Get all campaigns
export const getAllCampaigns = async (req, res) => {
    try {
      const campaigns = await Campaign.find().sort({ createdAt: -1 });
  
      // Get the count of total campaigns
      const campaignCount = await Campaign.countDocuments();
  
      res.status(200).json({ campaigns, count : campaignCount });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving campaigns', error });
    }
  };

export const getCampaignById = async (req, res) => {
    const { campaignId } = req.params;
  
    try {
      const campaign = await Campaign.findById(campaignId);
      if (!campaign) {
        return res.status(404).json({ message: 'Campaign not found' });
      }
      res.status(200).json({ campaign });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving campaign', error });
    }
  };
  