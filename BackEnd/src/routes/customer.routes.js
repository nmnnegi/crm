import express from 'express';
import { createCustomer, getCustomerCount } from '../controllers/customer.controller.js';
import Customer from '../model/customer.model.js';

const router = express.Router();

router.post('/create', createCustomer);
router.get('/count', getCustomerCount);

// Test route to get all customers
router.get('/all', async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.status(200).json({ customers, count: customers.length });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customers', error: error.message });
  }
});

export default router; 