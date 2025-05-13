// routes/campaign.routes.js
import express from 'express';
import { createCampaign, sendCampaign, getAllCampaigns ,getCampaignById,getAudienceSize} from '../controllers/campaign.controller.js';

const router = express.Router();

router.post('/create', createCampaign);
router.post('/send/:campaignId', sendCampaign);
router.get('/get/:campaignId', getCampaignById);
router.get('/audience-size/:campaignId', getAudienceSize);
router.get('/list', getAllCampaigns);

export default router;
