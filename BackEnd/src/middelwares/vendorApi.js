import axios from 'axios';
import CommunicationLog from '../model/communicationLogs.model.js';

export const sendBulkMessages = async (req, res) => {
    const { campaignId, customers } = req.body;

    try {
        console.log(`Sending bulk messages for campaignId: ${campaignId}`);
        const logs = [];
        for (const customer of customers) {
            const message = `Hi ${customer.name}, here is 10% off on your next order`;
            console.log(`Sending message to customer: ${customer._id}, message: ${message}`);
            
            const status = Math.random() < 0.9 ? 'SENT' : 'FAILED';
            const log = new CommunicationLog({ campaignId, customerId: customer._id, status });
            await log.save();
            logs.push(log);
            console.log(`Log saved: ${log._id}`);

            // Simulate delivery receipt callback
            await axios.post('https://crm-16b1.onrender.com/api/vendor/delivery-receipt', {
                logId: log._id,
                status
            });
            console.log(`Delivery receipt sent for logId: ${log._id}, status: ${status}`);
        }

        res.status(200).json({ message: 'Bulk messages sent successfully', logs });
    } catch (error) {
        console.error('Error sending bulk messages:', error);
        res.status(500).json({ message: 'Error sending bulk messages', error: error.message });
    }
};

export const deliveryReceipt = async (req, res) => {
    const { logId, status } = req.body;

    try {
        console.log(`Processing delivery receipt for logId: ${logId}, status: ${status}`);
        const log = await CommunicationLog.findById(logId);
        if (!log) {
            console.error(`Log not found: ${logId}`);
            return res.status(404).json({ message: 'Log not found' });
        }

        log.status = status;
        await log.save();
        console.log(`Log status updated: ${log._id}, status: ${status}`);

        res.status(200).json({ message: 'Delivery receipt processed successfully', log });
    } catch (error) {
        console.error('Error processing delivery receipt:', error);
        res.status(500).json({ message: 'Error processing delivery receipt', error: error.message });
    }
};
