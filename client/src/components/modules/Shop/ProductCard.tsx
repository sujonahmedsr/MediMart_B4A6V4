"use client"
import { Card, CardContent } from "@/components/ui/card";
import { IMedicine } from "@/types/medicine";
import Image from "next/image";
import Link from "next/link";
import DummyMedicine from "@/assests/dummyMedicine.jpeg"

export default function ProductCard({ product }: { product: IMedicine }) {

    return (
        <Card className="rounded shadow-md">
            <Link href={`/shop/${product?._id}`}>
                <CardContent>
                    <Image
                        src={product?.image as string || DummyMedicine}
                        alt={product?.name}
                        width={500}
                        height={500}
                        className="w-full h-48 object-cover rounded"
                    />
                    <h2 className="text-xl font-semibold mt-4">{product?.name}</h2>
                    <div className="flex items-center gap-2 mt-2">
                        <Image src={product?.category?.icon} width={500}
                            height={500} alt={product?.category?.name} className="w-5 h-5" />
                        <span className="text-sm text-gray-600">{product?.category?.name}</span>
                    </div>
                    <p className="text-base font-semibold mt-2">Best Price: ৳{product?.price}</p>
                </CardContent>
            </Link>
        </Card>
    );
}
