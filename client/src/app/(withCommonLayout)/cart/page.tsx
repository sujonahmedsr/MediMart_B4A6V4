import Address from "@/components/modules/cart/Address";
import CartProducts from "@/components/modules/cart/CartProducts";
import PaymentDetails from "@/components/modules/cart/PaymentDetails";

const CartPage = () => {
  return (
    <div className="container mx-auto">
      <div className="grid lg:grid-cols-12 md:grid-cols-8 grid-cols-1 gap-8 py-5">
        <div className="lg:col-span-8 md:col-span-5 col-span-1">
          <CartProducts />
        </div>
        <div className="lg:col-span-4 md:col-span-3 col-span-1 space-y-5">
          <Address />
          <PaymentDetails />
        </div>
      </div>
    </div>
  );
};

export default CartPage;