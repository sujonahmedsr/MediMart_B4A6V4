import MyOrdersPage from "@/components/modules/My orders/MyOrdersPage";
import { userAllOrders } from "@/services/Order";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: " MediMart – My Orders",
    description: "MediMart offers high-quality medicines and healthcare products with quick and reliable delivery. Shop online for all your health needs.",
};
const page = async () => {
    const userOrders = await userAllOrders()
    
    return (
        <div className="container mx-auto grid place-items-center px-4">
            <MyOrdersPage myOrders={userOrders?.data}/>
        </div>
    );
};

export default page;