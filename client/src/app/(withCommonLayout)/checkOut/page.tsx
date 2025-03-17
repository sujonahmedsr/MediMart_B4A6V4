import CheckOutDetails from "@/components/modules/cart/CheckOutDetails";
import DeliveryDetails from "@/components/modules/cart/DeliveryDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: " MediMart – Check Out",
  description: "MediMart offers high-quality medicines and healthcare products with quick and reliable delivery. Shop online for all your health needs.",
};

const CheckOut = () => {
  return (
    <div className="container mx-auto">
      <div className="grid lg:grid-cols-12 md:grid-cols-8 grid-cols-1 gap-8 py-5">
        <div className="lg:col-span-8 md:col-span-5 col-span-1">
          <DeliveryDetails />
        </div>
        <div className="lg:col-span-4 md:col-span-3 col-span-1 space-y-5">
          <CheckOutDetails />
        </div>
      </div>
    </div>
  );
};

export default CheckOut;