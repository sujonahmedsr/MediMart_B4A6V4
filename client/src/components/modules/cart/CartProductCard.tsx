"use client"

import { Button } from "@/components/ui/button";
import { currencyFormatter } from "@/lib/currencyFormatter";
import { CartProduct, decrementOrderQuantity, incrementOrderQuantity, removeProduct } from "@/lib/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import DummyMedicine from "@/assests/dummyMedicine.jpeg"


export default function CartProductCard({ product }: { product: CartProduct }) {
  const dispatch = useAppDispatch();

  const handleIncrementQuantity = (id: string) => {
    dispatch(incrementOrderQuantity(id));
  };

  const handleDecrementQuantity = (id: string) => {
    dispatch(decrementOrderQuantity(id));
  };

  const handleRemoveProduct = (id: string) => {
    dispatch(removeProduct(id));
    toast.success("Remove Product From Cart.")
  };

  return (
    <div className="bg-white rounded-lg flex p-5 gap-5">
      <div className="h-full w-32 rounded-md overflow-hidden">
        <Image
          src={product?.image as string || DummyMedicine}
          height={200}
          width={200}
          alt="product"
          className="aspect-square object-cover"
        />
      </div>
      <div className="flex flex-col justify-between flex-grow">
        <h1 className="text-xl font-semibold">{product?.name}</h1>
        <div className="flex gap-5 my-2">
          <p>
            <span className="text-gray-500">Stock Availability:</span>{" "}
            <span className="font-semibold">{product?.quantity}</span>
          </p>
        </div>
        <hr className="my-1" />
        <div className="flex items-center justify-between">
          <h2>
            Price: {currencyFormatter(product?.price as number)}
          </h2>
          <div className="flex items-center gap-2">
            <p className="text-gray-500 font-semibold">Quantity</p>
            <Button
            disabled={product.quantity === 0}
              onClick={() => handleDecrementQuantity(product?._id)}
              variant="outline"
              className="size-8 rounded-sm"
            >
              <Minus />
            </Button>
            <p className="font-semibold text-xl p-2">
              {product?.orderQuantity}
            </p>
            <Button
              disabled={product.quantity === 0}
              onClick={() => handleIncrementQuantity(product?._id)}
              variant="outline"
              className="size-8 rounded-sm"
            >
              <Plus />
            </Button>
            <Button
              onClick={() => handleRemoveProduct(product?._id)}
              variant="outline"
              className="size-8 rounded-sm"
            >
              <Trash className="text-red-500" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}