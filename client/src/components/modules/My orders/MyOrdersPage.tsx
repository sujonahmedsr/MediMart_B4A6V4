"use client"
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type OrderStatus = 'Delivered' | 'Processing' | 'Cancelled';

interface Order {  id: string;
  date: string;
  status: OrderStatus;
  total: string;
}

const orders: Order[] = [
  {
    id: 'ORD12345',
    date: '2025-03-01',
    status: 'Delivered',
    total: '$299.99',
  },
  {
    id: 'ORD12346',
    date: '2025-02-28',
    status: 'Processing',
    total: '$159.49',
  },
  {
    id: 'ORD12347',
    date: '2025-02-25',
    status: 'Cancelled',
    total: '$89.00',
  },
];

const statusColors: Record<OrderStatus, string> = {
  Delivered: 'bg-green-100 text-green-600',
  Processing: 'bg-yellow-100 text-yellow-600',
  Cancelled: 'bg-red-100 text-red-600',
};

export default function MyOrdersPage() {
  const [orderList] = useState<Order[]>(orders);

  return (
    <div className="max-w-4xl w-full mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-8">My Orders</h1>

      {orderList.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orderList.map((order) => (
            <Card key={order.id} className="rounded-2xl shadow-lg hover:shadow-xl transition">
              <CardContent className="flex justify-between items-center p-6">
                <div>
                  <p className="text-lg font-medium">Order ID: {order.id}</p>
                  <p className="text-gray-500">Date: {order.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge className={`${statusColors[order.status]} py-1 px-3 rounded-full`}>
                    {order.status}
                  </Badge>
                  <p className="text-lg font-semibold">{order.total}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
