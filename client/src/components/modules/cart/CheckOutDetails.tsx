/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { currencyFormatter } from '@/lib/currencyFormatter';
import { citySelector, clearCart, grandTotalSelector, orderedProductsSelector, orderSelector, shippingAddressSelector, shippingCostSelector, subTotalSelector } from '@/lib/redux/features/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { PlaceOrder } from '@/services/Order';
import { IMedicine } from '@/types/medicine';
import { useUser } from '@/userContextApi/UserProvider';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

const CheckOutDetails = () => {

    const dispatch = useAppDispatch();
    const [presCription, setPresCription] = useState<File | null>(null);
    const subTotal = useAppSelector(subTotalSelector);
    const shippingCost = useAppSelector(shippingCostSelector);
    const grandTotal = useAppSelector(grandTotalSelector);
    const cartProducts = useAppSelector(orderedProductsSelector);
    const orderData = useAppSelector(orderSelector);
    const router = useRouter();
    const { user } = useUser();

    const requiredPrescription = cartProducts.some((product: IMedicine) => product.requiredPrescription);


    const handleImageChange = (file: File) => {
        setPresCription(file);
    };

    const handleOrder = async () => {
        try {
            if (cartProducts.length === 0) {
                throw new Error("Cart is empty, what are you trying to order?");
            }

            if (!user?.city) {
                throw new Error("City is missing");
            }
            if (!user?.address) {
                throw new Error("Shipping address is missing");
            }

            let presCriptionImg = null;

            if (requiredPrescription && !presCription) {
                throw new Error("Prescription is required for some of these medicines.");
            }
            if (presCription) {
                const formData = new FormData();
                formData.append("file", presCription);
                formData.append("upload_preset", "cycle_labs"); // Cloudinary preset

                const response = await axios.post(
                    "https://api.cloudinary.com/v1_1/dvjeaplel/image/upload", // Cloudinary URL
                    formData
                );
                presCriptionImg = response.data.secure_url; // Cloudinary URL
            }

            const orderPayload = {
                products: orderData?.products,
                presCription: presCriptionImg,
                city: user?.city,
                shippingAddress: user?.address
            };

            // Sending the order data to the backend
            const res = await PlaceOrder(orderPayload);

            if (res?.status) {
                toast.success(res?.message);
                dispatch(clearCart()); // Clear cart after successful order
                router.push(res?.data); // Redirect to order details page
            } else {
                toast.error(res?.message || "Something went wrong!");
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to place order. Please try again.");
        }
    };

    return (
        <>
            {requiredPrescription && (
                <div className="border rounded h-fit p-5">
                    <h1 className="text-2xl font-bold text-red-600">Required Prescription</h1>
                    <div>
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    handleImageChange(file); // Handle file change
                                }
                            }}
                        />
                    </div>
                </div>
            )}

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
                        <p className="font-semibold">{currencyFormatter(shippingCost)}</p>
                    </div>
                </div>
                <div className="flex justify-between mt-10 mb-5">
                    <p className="text-gray-500 ">Grand Total</p>
                    <p className="font-semibold">{currencyFormatter(grandTotal)}</p>
                </div>
                <Button
                    disabled={cartProducts?.length === 0}
                    onClick={handleOrder}
                    className="w-full text-xl font-semibold py-5 bg-cyan-950 text-white hover:bg-cyan-800 duration-300 transition-all cursor-pointer rounded"
                >
                    Order Now
                </Button>
            </div>
        </>
    );
};

export default CheckOutDetails;
