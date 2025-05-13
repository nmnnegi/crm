// routes/vendorApi.route.js
import express from 'express';
import { sendBulkMessages, deliveryReceipt } from '../middelwares/vendorApi.js';

const router = express.Router();

router.post('/send-bulk-messages', sendBulkMessages);
router.post('/delivery-receipt', deliveryReceipt);

export default router;
