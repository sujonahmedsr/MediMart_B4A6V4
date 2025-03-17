"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { addProduct } from "@/lib/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { IMedicine } from "@/types/medicine";
import { CheckCheckIcon, X } from "lucide-react";
import Image from "next/image";
import DummyMedicine from "@/assests/dummyMedicine.jpeg"
import { useRouter } from "next/navigation";

export default function ProductDetails({ product }: { product: IMedicine }) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const addProductCart = (product: IMedicine) => {
    dispatch(addProduct(product))
  }
  const handleBuyNow = (product: IMedicine) => {
    dispatch(addProduct(product))
    router.push('/cart')
  }
  return (
    <div>
      <Card className="rounded border-none shadow-none">
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="border p-4">
              <Image
                src={product?.image as string || DummyMedicine}
                alt={product?.name}
                width={500}
                height={500}
                className="w-full h-80 rounded object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="relative p-4">
              <div className="absolute right-0 top-20">
                {
                  product?.requiredPrescription ? <Button variant={"secondary"} className="bg-cyan-600 text-white pointer-events-none rounded-none">Prescription required. <CheckCheckIcon /> </Button> : <Button variant={"destructive"} className="rounded-none">No prescription needed.<X size={"5"} /></Button>
                }
              </div>
              <h1 className="text-3xl font-bold mb-4">{product?.name}</h1>

              <div className="flex items-center gap-2 mb-4">
                <Image src={product?.category?.icon} width={500}
                  height={500} alt={product?.category?.name} className="w-6 h-6" />
                <span className="text-lg font-semibold">{product?.category?.name}</span>
              </div>

              <p className="text-sm text-gray-500 mb-2">Manufacturer: <span className="text-green-600">{product?.manufacturerDetails}</span></p>
              <p className="text-sm text-yellow-500 mb-2">Expiry Date: {new Date(product?.expireDate).toDateString()}</p>

              {product?.inStock ? (
                <span className="text-green-600">In Stock ({product?.quantity} available)</span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}

              <p className="text-xl font-semibold mt-2">Best Price: ৳{product?.price}</p>

              {/* Buttons */}
              <div className="mt-6 flex gap-4">
                <Button disabled={product?.quantity === 0} onClick={() => addProductCart((product))} 
                variant="outline" className="rounded-none">Add to Cart</Button>
                <Button disabled={product?.quantity === 0} variant="outline" className="rounded-none bg-cyan-950 hover:bg-cyan-800 duration-300 hover:text-white transition-all text-white cursor-pointer" onClick={() => handleBuyNow((product))}>Buy Now</Button>
              </div>

              <div className="border-2 border-cyan-500 text-sm text-cyan-800 rounded p-4 space-y-1 mt-5">
                <p>Delivery service is available all over <span className="text-cyan-950 text-base font-semibold">Bangladesh</span>.</p>
                <p>For <span className="text-cyan-950 text-base font-semibold">urgent delivery</span> service, Please contact us.</p>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <div>
              <p className="p-4 bg-cyan-200 text-xl font-semibold">Medicine Details</p>
            </div>
            {
              product?.description?.split(',').map((p, i) => <p className="mt-2" key={i + 1}>{p}</p>)
            }
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
