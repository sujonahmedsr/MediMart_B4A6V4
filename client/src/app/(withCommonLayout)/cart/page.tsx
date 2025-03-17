import CartProducts from "@/components/modules/cart/CartProducts";
import PaymentDetails from "@/components/modules/cart/PaymentDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: " MediMart – Cart",
  description: "MediMart offers high-quality medicines and healthcare products with quick and reliable delivery. Shop online for all your health needs.",
};

const CartPage = () => {
  return (
    <div className="container mx-auto">
      <div className="grid lg:grid-cols-12 md:grid-cols-8 grid-cols-1 gap-8 py-5">
        <div className="lg:col-span-8 md:col-span-5 col-span-1">
          <CartProducts />
        </div>
        <div className="lg:col-span-4 md:col-span-3 col-span-1 space-y-5">
          <PaymentDetails />
        </div>
      </div>
    </div>
  );
};

export default CartPage;