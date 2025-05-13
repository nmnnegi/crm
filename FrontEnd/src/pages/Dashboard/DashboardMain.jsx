import { useEffect, useState } from "react";
import CardComponent from "../../components/Signup/Card.jsx";

export default function Dashboard() {
  const [customerCount, setCustomerCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [campaignCount, setCampaignCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch counts for customers, orders, and campaigns
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch customer count
        const customerResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/customer/getCustomerCount`);
        const customerData = await customerResponse.json();
        setCustomerCount(customerData.count);

        // Fetch order count
        const orderResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/order/count`);
        const orderData = await orderResponse.json();
        setOrderCount(orderData.count);

        // Fetch campaign count
        const campaignResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/campaigns/list`);
        const campaignData = await campaignResponse.json();
        setCampaignCount(campaignData.count);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>
      
      {loading ? (
        <div className="text-center py-10">
          <p className="text-gray-500">Loading dashboard data...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CardComponent 
            title="Customers" 
            count={customerCount} 
            description="Total number of registered customers" 
          />
          <CardComponent 
            title="Orders" 
            count={orderCount} 
            description="Total number of orders placed" 
          />
          <CardComponent 
            title="Campaigns" 
            count={campaignCount} 
            description="Total marketing campaigns created" 
          />
        </div>
      )}
      
      <div className="mt-10 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-gray-100 rounded-lg">
            <p className="text-sm text-gray-500">Average Orders</p>
            <p className="text-xl font-medium">{orderCount > 0 && customerCount > 0 ? (orderCount / customerCount).toFixed(2) : '0'} per customer</p>
          </div>
          <div className="p-4 border border-gray-100 rounded-lg">
            <p className="text-sm text-gray-500">Campaign Effectiveness</p>
            <p className="text-xl font-medium">{campaignCount > 0 && orderCount > 0 ? (orderCount / campaignCount).toFixed(2) : '0'} orders per campaign</p>
          </div>
        </div>
      </div>
    </div>
  );
}
