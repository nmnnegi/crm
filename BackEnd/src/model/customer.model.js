// models/customer.model.js
import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: 
  { 
    type: String, 
    required: true 
  },
  email:
   {
     type: String,
      required: true, 
      unique: true
     },
  phone:
   { 
    type: String,
    required: true 
    },
  totalSpends:
   { 
    type: Number,
    default: 0 
    },
  visits: 
  {
    type: Number,
    default: 0
 },
 lastVisit:
  { 
  type: Date, 
  default: Date.now 
}
  
});

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
