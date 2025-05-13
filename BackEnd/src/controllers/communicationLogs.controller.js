// controllers/communicationLog.controller.js
import CommunicationLog from '../model/communicationLogs.model.js';

// Get all communication logs for a campaign
export const getLogsByCampaign = async (req, res) => {
  const { campaignId } = req.params;

  try {
    const logs = await CommunicationLog.find({ campaignId }).populate('customerId', 'name email').populate('campaignId', 'name');
    res.status(200).json({ logs });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving communication logs', error });
  }
};

// Get all communication logs
export const getAllLogs = async (req, res) => {
  try {
    const logs = await CommunicationLog.find().populate('customerId', 'name email').populate('campaignId', 'name');
    res.status(200).json({ logs });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving all communication logs', error });
  }
};
