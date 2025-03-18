"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { userAllOrders } from "@/services/Order";
import { IOrders } from "@/types/order";
import Loading from "@/app/loading";

type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Paid";

const statusColors: Record<OrderStatus, string> = {
  Pending: "bg-yellow-100 text-yellow-600",
  Processing: "bg-orange-100 text-orange-600",
  Shipped: "bg-blue-100 text-blue-600",
  Delivered: "bg-green-100 text-green-600",
  Paid: "bg-white-100 text-blue-600",
};

export default function MyOrdersPage() {
  const [myOrders, setOrders] = useState<IOrders[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userOrders = await userAllOrders();
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

  return (
    <div className="max-w-4xl w-full mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-8">My Orders</h1>

      {myOrders.length === 0 ? (
        <p className="text-gray-500 text-center">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {myOrders.map((order) => (
            <Card key={order._id} className="rounded-2xl shadow-lg hover:shadow-xl transition">
              <CardContent className="flex flex-col md:flex-row justify-between items-center p-6 gap-4">
                <div>
                  <p className="text-lg font-medium">Order ID: {order?.transaction?.id}</p>
                  <p className="text-gray-500">Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge className={`${statusColors[order.status]} py-1 px-3 rounded-full`}>
                    {order.status}
                  </Badge>
                  <p className="text-lg font-semibold">৳ {order.totalPrice}</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="rounded">Order Details</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Order Details</DialogTitle>
                    </DialogHeader>
                    <div>
                      <h2 className="text-lg font-bold">Products:</h2>
                      <ul className="mt-2 space-y-2">
                        {order.products.map((item, index) => (
                          <li key={index} className="border p-2 rounded-md">
                            <p><strong>Product ID:</strong> {item.product._id}</p>
                            <p><strong>Product Name:</strong> {item.product.name}</p>
                            <p><strong>Quantity:</strong> {item.quantity}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
