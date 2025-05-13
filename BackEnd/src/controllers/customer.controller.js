import Customer from '../model/customer.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const createCustomer = async (req, res, next) => {
  const { name, email, phone } = req.body;
  
  if (!name || !email || !phone) {
        throw new Error('All fields are required!');    

  }

  try {
    const newCustomer = new Customer({ 
        name,
        email,
        phone 
     });
    await newCustomer.save();
    res.status(201).json(new ApiResponse(201, newCustomer, 'Customer created successfully!'));
  }
   catch (error) {
    next(new ApiError(500, error.message));
  }
};

export const getCustomerCount = async (req, res, next) => {
    try {
      // Fetch the count of customers from the database
      const customerCount = await Customer.countDocuments();
      
      // Send the count as a response
      res.status(200).json({ count: customerCount });
    } catch (error) {
      // Handle any errors
      next(new ApiError(500, error.message));
    }
  };
