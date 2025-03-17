import ManageOrders from "@/components/modules/Admin/orders/ManageOrders";
import { adminAllOrders } from "@/services/Order";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: " MediMart – Orders",
    description: "MediMart offers high-quality medicines and healthcare products with quick and reliable delivery. Shop online for all your health needs.",
  };

const page = async () => {
    const data = await adminAllOrders();

    return (
        <div>
            <ManageOrders orders={data?.data?.allOrders} meta={data?.data?.meta} />
        </div>
    );
};

export default page;
