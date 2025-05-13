import express from "express";
import { createCustomer, getCustomerCount } from "../controllers/customer.controller.js";
import Customer from '../model/customer.model.js';
import mongoose from 'mongoose';

const router = express.Router();

router.post("/create", createCustomer);
router.get("/getCustomerCount", getCustomerCount);

// Test route to get all customers
router.get("/all", async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.status(200).json({ customers, count: customers.length });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customers', error: error.message });
  }
});

// Debug route to check database connection
router.get("/debug", async (req, res) => {
  try {
    const dbInfo = {
      connected: mongoose.connection.readyState === 1,
      dbName: mongoose.connection.db?.databaseName || 'Not connected',
      uri: process.env.MONGODB_URI ? process.env.MONGODB_URI.split('@')[1] : 'Not set in env',
      models: Object.keys(mongoose.models),
      customerModel: mongoose.models.Customer ? true : false,
      collectionNames: mongoose.connection.readyState === 1 ? 
        await mongoose.connection.db.listCollections().toArray().then(cols => cols.map(c => c.name)) : [],
    };
    res.status(200).json(dbInfo);
  } catch (error) {
    res.status(500).json({ message: 'Error getting debug info', error: error.message });
  }
});

export default router;