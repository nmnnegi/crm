// routes/communicationLog.routes.js
import express from 'express';
import { getLogsByCampaign, getAllLogs } from '../controllers/communicationLogs.controller.js';

const router = express.Router();

router.get('send/logs/:campaignId', getLogsByCampaign);
router.get('/logs', getAllLogs);

export default router;
