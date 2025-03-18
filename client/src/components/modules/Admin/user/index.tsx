/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { adminAllOrders } from '@/services/Order';
import Loading from '@/app/loading';

// Define Order Status Type
type OrderStatus = 'Pending' | 'Delivered';

const recentOrders = [
  { id: 'ORD12345', customer: 'Hasan Ali', medicine: 'Paracetamol', status: 'Pending' as OrderStatus, date: '2025-03-01', payment: 'Unpaid' },
  { id: 'ORD12346', customer: 'Rafiq Islam', medicine: 'Amoxicillin', status: 'Delivered' as OrderStatus, date: '2025-02-28', payment: 'Paid' },
];

const salesData = [
  { month: 'Jan', sales: 80000 },
  { month: 'Feb', sales: 120000 },
  { month: 'Mar', sales: 95000 },
];

const statusColors: Record<OrderStatus, string> = {
  Pending: 'bg-yellow-100 text-yellow-600',
  Delivered: 'bg-green-100 text-green-600',
};

export default function AdminDashboard() {
const [allOrders, setOrders] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userOrders = await adminAllOrders();
        setOrders(userOrders?.data || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <Loading />;


  // Sample Data
  const overviewData = [
    { label: 'Total Revenue', value: `৳ ${allOrders?.revenue?.totalRevenue}` },
    { label: 'Total Sell', value: `${allOrders?.revenue?.totalSell}` },
    { label: 'Total Orders', value: `${allOrders?.totalOrders}` },
    { label: 'Low Stock Items', value: `${allOrders?.lowStockCount}` },
  ];


  return (
    <div className="max-w-7xl w-full mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-8">Admin Dashboard - Medimart</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {overviewData.map((item) => (
          <Card key={item.label} className="rounded-2xl shadow-md p-4">
            <CardContent>
              <p className="text-gray-500">{item.label}</p>
              <p className="text-xl font-bold">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>
        <div className="bg-white shadow-md rounded-2xl overflow-hidden">
          {recentOrders.map((order) => (
            <div key={order.id} className="flex justify-between items-center p-4 border-b last:border-0">
              <div>
                <p className="font-medium">{order.customer}</p>
                <p className="text-sm text-gray-500">{order.medicine}</p>
              </div>
              <div className="flex items-center gap-4">
                <Badge className={`${statusColors[order.status as OrderStatus]} py-1 px-3 rounded-full`}>{order.status}</Badge>
                <p className="text-sm">{order.date}</p>
                <p className="text-sm font-semibold">{order.payment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sales Chart */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Monthly Sales Overview</h2>
        <div className="bg-white shadow-md rounded-2xl p-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#4F46E5" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
