"use client";

import Image from "next/image";
import emptyCart from '@/assests/empyt.png'
import { CartProduct, orderedProductsSelector } from "@/lib/redux/features/cart/cartSlice";
import { useAppSelector } from "@/lib/redux/hooks";
import CartProductCard from "./CartProductCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CartProducts() {
  const products = useAppSelector(orderedProductsSelector);

  return (
    <div className="border rounded h-full p-10 space-y-5">
      {products.length === 0 && (
        <div className="text-center text-gray-500">
          <p className="text-lg font-semibold">Your cart is empty</p>
          <p className="mt-2">
            Looks like your cart is on vacation—bring it back to work by adding
            some items!
          </p>
          <div className="flex justify-center items-center ">
            <Image src={emptyCart} alt="empty cart" />
          </div>
          <div className="text-center mt-2">
            <Link href={'/shop'}>
            <Button variant={"outline"} className="text-cyan-950">
              Continue Shopping
            </Button>
            </Link>
          </div>
        </div>
      )}
      {products?.map((product: CartProduct) => (
        <CartProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}