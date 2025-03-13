/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { cookies } from "next/headers";

export const PlaceOrder = async (orderData: any) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/order/create-order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: (await cookies()).get("accessToken")!.value,
            },
            body: JSON.stringify(orderData)
        })
        const result = res.json()
        return result
    } catch (error: any) {
        throw new Error(error?.message)
    }
}