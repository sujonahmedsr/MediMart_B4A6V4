
"use client";

import { Button } from '@/components/ui/button';
import { currencyFormatter } from '@/lib/currencyFormatter';
import { grandTotalSelector, shippingCostSelector, subTotalSelector } from '@/lib/redux/features/cart/cartSlice';
import { useAppSelector } from '@/lib/redux/hooks';
import React from 'react';

const PaymentDetails = () => {
    const subTotal = useAppSelector(subTotalSelector);
    const shippingCost = useAppSelector(shippingCostSelector);
    const grandTotal = useAppSelector(grandTotalSelector);

    return (
        <div className="border rounded col-span-4 h-fit p-5">
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
            <Button
                className="w-full text-xl font-semibold py-5 bg-cyan-950 text-white hover:bg-cyan-800 duration-300 transition-all cursor-pointer rounded"
            >
                Order Now
            </Button>
        </div>
    );
};

export default PaymentDetails;