import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Campaign from '../model/campain.model.js';
import Customer from '../model/customer.model.js';

dotenv.config();

// Get the MongoDB URI from the environment or use a fallback
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/xeno';
console.log('Using MongoDB URI:', MONGODB_URI);

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB for testing');
    console.log('Database name:', mongoose.connection.db.databaseName);
    runTests();
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });

// Helper function to construct query criteria
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
  // If no criteria, return empty query to match all documents
  if (criteria.length === 0) {
    return {};
  }
  
  // If only one criterion, return it directly
  if (criteria.length === 1) {
    return criteria[0];
  }
  
  // If two criteria, apply the first logical operator
  if (criteria.length === 2) {
    const operator = logicalOperators.spendsVisits === 'AND' ? '$and' : '$or';
    return { [operator]: criteria };
  }
  
  // If three criteria, apply both logical operators
  let query = {};
  
  if (logicalOperators.spendsVisits === 'AND' && logicalOperators.visitsLastVisit === 'AND') {
    // All conditions must be met: A AND B AND C
    query = { $and: criteria };
  } else if (logicalOperators.spendsVisits === 'AND' && logicalOperators.visitsLastVisit === 'OR') {
    // (A AND B) OR C
    query = { $or: [{ $and: [criteria[0], criteria[1]] }, criteria[2]] };
  } else if (logicalOperators.spendsVisits === 'OR' && logicalOperators.visitsLastVisit === 'AND') {
    // A OR (B AND C)
    query = { $or: [criteria[0], { $and: [criteria[1], criteria[2]] }] };
  } else {
    // A OR B OR C
    query = { $or: criteria };
  }
  
  return query;
};

const runTests = async () => {
  try {
    // Get all campaigns
    const campaigns = await Campaign.find();
    console.log(`Found ${campaigns.length} campaigns`);
    
    // Get all customers
    const customers = await Customer.find();
    console.log(`Found ${customers.length} customers`);
    
    if (customers.length === 0) {
      console.error('ERROR: No customers found in the database! Please run the seed script first.');
      process.exit(1);
    }
    
    // Display customer data
    console.log('\n=== CUSTOMER DATA ===');
    customers.forEach(customer => {
      console.log(`${customer.name}: $${customer.totalSpends}, ${customer.visits} visits, last visit: ${customer.lastVisit.toDateString()}`);
    });
    
    // Test each campaign
    for (const campaign of campaigns) {
      console.log('\n============================================');
      console.log(`CAMPAIGN: ${campaign.name}`);
      console.log('============================================');
      
      console.log('Criteria:');
      console.log(JSON.stringify(campaign.audienceCriteria, null, 2));
      console.log('Logical Operators:');
      console.log(JSON.stringify(campaign.logicalOperators, null, 2));
      
      const criteria = constructCriteria(campaign.audienceCriteria, campaign.logicalOperators);
      console.log('\nMongoDB Query:');
      console.log(JSON.stringify(criteria, null, 2));
      
      const matchingCustomers = await Customer.find(criteria);
      console.log(`\nMatching Customers (${matchingCustomers.length}/${customers.length}):`);
      
      if (matchingCustomers.length === 0) {
        console.log('*** NO MATCHING CUSTOMERS ***');
      } else {
        matchingCustomers.forEach(customer => {
          console.log(`- ${customer.name}: $${customer.totalSpends}, ${customer.visits} visits, last visit: ${customer.lastVisit.toDateString()}`);
        });
      }
    }
    
    mongoose.disconnect();
  } catch (error) {
    console.error('Error testing campaigns:', error);
    mongoose.disconnect();
    process.exit(1);
  }
}; 