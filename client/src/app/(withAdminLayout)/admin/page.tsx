import AdminDashboard from "@/components/modules/Admin/user";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: " MediMart – Admin Dashboard",
  description: "MediMart offers high-quality medicines and healthcare products with quick and reliable delivery. Shop online for all your health needs.",
};

const page = () => {
  
  return (
    <div className="container mx-auto px-4">
      <AdminDashboard />
    </div>
  );
};

export default page;