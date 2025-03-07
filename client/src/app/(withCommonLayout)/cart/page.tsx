import Address from "@/components/modules/cart/Address";
import CartProducts from "@/components/modules/cart/CartProducts";
import PaymentDetails from "@/components/modules/cart/PaymentDetails";

const CartPage = () => {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-12 gap-8 py-5">
        <CartProducts />
        <Address />
        <PaymentDetails />
      </div>
    </div>
  );
};

export default CartPage;