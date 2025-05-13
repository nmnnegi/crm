import mongoose from 'mongoose';
import Customer from '../model/customer.model.js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

// Get the MongoDB URI from the environment or use a fallback
let MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/xeno';

// Ensure we're using the 'xeno' database
if (MONGODB_URI.includes('mongodb+srv://') && !MONGODB_URI.includes('?')) {
  // For MongoDB Atlas, we need to specify the database name in the URI
  MONGODB_URI += '/xeno';
}

console.log('Using MongoDB URI:', MONGODB_URI);

// Print debug information
fs.writeFileSync('seed-debug.log', `MongoDB URI: ${MONGODB_URI}\n`);

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB for seeding');
    console.log('Database name:', mongoose.connection.db.databaseName);
    fs.appendFileSync('seed-debug.log', `Connected to database: ${mongoose.connection.db.databaseName}\n`);
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    fs.appendFileSync('seed-debug.log', `Error connecting: ${err.message}\n`);
    process.exit(1);
  });

// Sample customer data with varied spending, visits, and last visit dates
const sampleCustomers = [
  // High spenders, frequent visitors, recent visitors
  {
    name: 'Alex Johnson',
    email: 'alex@example.com',
    phone: '1234567890',
    totalSpends: 1500,
    visits: 12,
    lastVisit: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) // 15 days ago
  },
  {
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    phone: '2345678901',
    totalSpends: 2000,
    visits: 8,
    lastVisit: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) // 10 days ago
  },
  
  // High spenders, frequent visitors, not recent visitors
  {
    name: 'Michael Brown',
    email: 'michael@example.com',
    phone: '3456789012',
    totalSpends: 1800,
    visits: 10,
    lastVisit: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) // 3 months ago
  },
  {
    name: 'Emily Davis',
    email: 'emily@example.com',
    phone: '4567890123',
    totalSpends: 1600,
    visits: 7,
    lastVisit: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000) // 4 months ago
  },
  
  // High spenders, infrequent visitors
  {
    name: 'David Miller',
    email: 'david@example.com',
    phone: '5678901234',
    totalSpends: 1200,
    visits: 3,
    lastVisit: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000) // 1.5 months ago
  },
  {
    name: 'Jessica Wilson',
    email: 'jessica@example.com',
    phone: '6789012345',
    totalSpends: 1400,
    visits: 2,
    lastVisit: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000) // 6 months ago
  },
  
  // Low spenders, frequent visitors
  {
    name: 'Daniel Moore',
    email: 'daniel@example.com',
    phone: '7890123456',
    totalSpends: 400,
    visits: 15,
    lastVisit: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
  },
  {
    name: 'Olivia Taylor',
    email: 'olivia@example.com',
    phone: '8901234567',
    totalSpends: 350,
    visits: 12,
    lastVisit: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // 1 month ago
  },
  
  // Low spenders, infrequent visitors
  {
    name: 'James Anderson',
    email: 'james@example.com',
    phone: '9012345678',
    totalSpends: 200,
    visits: 2,
    lastVisit: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) // 2 months ago
  },
  {
    name: 'Sophia Thomas',
    email: 'sophia@example.com',
    phone: '0123456789',
    totalSpends: 150,
    visits: 1,
    lastVisit: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000) // 5 months ago
  }
];

// Seed the database
const seedCustomers = async () => {
  try {
    // Clear existing customers
    await Customer.deleteMany({});
    console.log('Cleared existing customers');
    
    // Insert sample customers
    await Customer.insertMany(sampleCustomers);
    console.log(`Added ${sampleCustomers.length} sample customers to the database`);
    
    mongoose.disconnect();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error seeding customers:', error);
    mongoose.disconnect();
    process.exit(1);
  }
};

// Run the seed function
seedCustomers(); 