// models/order.model.js
import mongoose,{Schema} from 'mongoose';
import Customer from './customer.model.js';

const orderSchema = new mongoose.Schema({
  customerId: 
  {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Customer', 
     required: true 
    },

  orderDate:
   { 
    type: Date,
     default: Date.now
    },

  amount:
   { 
    type: Number, 
    required: true 
   },

  status: 
  {
     type: String,
    enum: ['Pending', 'Completed', 'Cancelled'],
    default: 'Completed' 
  }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
