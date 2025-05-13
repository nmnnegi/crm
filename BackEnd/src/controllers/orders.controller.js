import mongoose from 'mongoose';
import Order from '../model/order.model.js';
import Customer from '../model/customer.model.js';
import { ApiError } from '../utils/ApiError.js';
 import { ApiResponse } from '../utils/ApiResponse.js';

export const createOrder = async (req, res, next) => {
  const { customerId, amount } = req.body;

  if (!customerId || !amount) {
   throw new Error('All fields are required!');
  }

  

  try {
    const customer = await Customer.findById(customerId);
    if (!customer) {
    throw new ApiError(404, 'Customer not found!');}

    const newOrder = new Order({ 
         customerId,
         amount
         });
    await newOrder.save();


    customer.totalSpends += amount;
    customer.visits += 1;
    customer.lastVisit = new Date();
    await customer.save();

    res.status(201).json(new ApiResponse(201, newOrder, 'Order created successfully!'));
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

export const getOrderCount = async (req, res, next) => {
    try {
      const orderCount = await Order.countDocuments();
      res.status(200).json({ count: orderCount });
    } catch (error) {
      next(new ApiError(500, error.message));
    }
  };
