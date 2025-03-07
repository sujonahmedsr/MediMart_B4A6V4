import CartProducts from "@/components/modules/cart/CartProducts";

const CartPage = () => {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-12 gap-8 my-5">
        <CartProducts />
        {/* <Address />
        <PaymentDetails /> */}
      </div>
    </div>
  );
};

export default CartPage;