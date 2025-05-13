// models/campaign.model.js
import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true
 },
  audienceCriteria: { 
    type: Object, 
    required: true
 },
 
  createdAt: 
  { 
    type: Date, 
    default: Date.now
 },
  sentAt:
   { 
    type: Date
 },
  totalAudienceSize: 
  {
     type: Number, 
    default: 0 
},
logicalOperators: 
{ 
    type: Object 
},
  sent: 
  { type: Number, 
    default: 0 
},
  failed: 
  { 
    type: Number, 
    default: 0
 },
});

const Campaign = mongoose.model('Campaign', campaignSchema);

export default Campaign;
