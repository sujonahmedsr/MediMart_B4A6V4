"use client";

import { Button } from '@/components/ui/button';
import { currencyFormatter } from '@/lib/currencyFormatter';
import { grandTotalSelector, orderedProductsSelector, shippingCostSelector, subTotalSelector } from '@/lib/redux/features/cart/cartSlice';
import { useAppSelector } from '@/lib/redux/hooks';
import { useUser } from '@/userContextApi/UserProvider';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

const PaymentDetails = () => {
    const subTotal = useAppSelector(subTotalSelector);
    const shippingCost = useAppSelector(shippingCostSelector);
    const grandTotal = useAppSelector(grandTotalSelector);
    const cartProducts = useAppSelector(orderedProductsSelector);
    const user = useUser()
    const router = useRouter()
    const pathname = usePathname()


    const handleOrder = async () => {
        if (!user?.user) {
            toast.error("User must logged in.")
            router.push(`/login?redirectPath=${pathname}`)
        } else {
            router.push('/checkOut')
        }
    }
    return (
        <div className="border rounded h-fit p-5">
            <h1 className="text-2xl font-bold">Payment Details</h1>
            <div className="space-y-2 mt-4">
                <div className="flex justify-between">
                    <p className="text-gray-500 ">Subtotal</p>
                    <p className="font-semibold">{currencyFormatter(subTotal)}</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-gray-500 ">Discount</p>
                    <p className="font-semibold">{currencyFormatter(0)}</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-gray-500 ">Shipment Cost</p>
                    <p className="font-semibold">
                        {currencyFormatter(shippingCost)}
                    </p>
                </div>
            </div>
            <div className="flex justify-between mt-10 mb-5">
                <p className="text-gray-500 ">Grand Total</p>
                <p className="font-semibold">
                    {currencyFormatter(grandTotal)}
                </p>
            </div>
            <Button disabled={cartProducts?.length === 0 && true} onClick={handleOrder}
                className="w-full text-xl font-semibold py-5 bg-cyan-950 text-white hover:bg-cyan-800 duration-300 transition-all cursor-pointer rounded"
            >
                Check Out
            </Button>
        </div>
    );
};

export default PaymentDetails;