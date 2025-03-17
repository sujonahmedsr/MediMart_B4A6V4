/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const userAllOrders = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/order/userAllOrders`, {
            method: "GET",
            headers: {
                Authorization: (await cookies()).get("accessToken")!.value,
            },
            next: {
                tags: ["ORDERS"]
            }
        })
        const result = await res.json()
        return result
    } catch (error: any) {
        throw new Error(error?.message)
    }
}

export const adminAllOrders = async (page?: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/order/adminAllOrders?page=${page}`, {
            method: "GET",
            headers: {
                Authorization: (await cookies()).get("accessToken")!.value,
            },
            next: {
                tags: ["ORDERS"]
            }
        })
        const result = await res.json()
        return result
    } catch (error: any) {
        throw new Error(error?.message)
    }
}

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

export const verifiedPayment = async (order_id: any) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/order/verify?order_id=${order_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: (await cookies()).get("accessToken")!.value,
            }
        })
        const result = res.json()
        revalidateTag("ORDERS")
        return result
    } catch (error: any) {
        throw new Error(error?.message)
    }
}

export const orderUpdatedStatus = async (payload: any) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/order/updateStatus`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: (await cookies()).get("accessToken")!.value,
            },
            body: JSON.stringify(payload)
        })
        const result = res.json()
        revalidateTag("ORDERS")
        return result
    } catch (error: any) {
        throw new Error(error?.message)
    }
}