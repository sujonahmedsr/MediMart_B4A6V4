import AdminDashboard from "@/components/modules/Admin/user";
import { adminAllOrders } from "@/services/Order";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: " MediMart – Admin Dashboard",
  description: "MediMart offers high-quality medicines and healthcare products with quick and reliable delivery. Shop online for all your health needs.",
};

const page = async () => {
  const allOrders = await adminAllOrders()
  
  return (
    <div className="container mx-auto px-4">
      <AdminDashboard allOrders={allOrders?.data} />
    </div>
  );
};

export default page;