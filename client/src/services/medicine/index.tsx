/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { FieldValues } from "react-hook-form"

export const allProducts = async (page?: string, limit?: string, query?: { [key: string]: string | string[] | undefined }) => {
    try {

        const params = new URLSearchParams()

        if (query?.cat_id) {
            params.append("category", query?.cat_id.toString())
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product?limit=${limit}&page=${page}&${params}`, {
            next: {
                tags: ["PRODUCT"],
            }
        })
        const result = res.json()
        return result
    } catch (error: any) {
        throw new Error(error?.message)
    }
}

export const productsByCategory = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product/productByCategory`, {
            next: {
                tags: ["PRODUCT"],
            }
        })
        const result = await res.json()
        return result
    } catch (error: any) {
        throw new Error(error?.message)
    }
}

export const createProduct = async (data: FieldValues) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: (await cookies()).get("accessToken")!.value,
            },
            body: JSON.stringify(data)
        })
        const result = res.json()
        revalidateTag("PRODUCT");
        return result
    } catch (error: any) {
        throw new Error(error?.message)
    }
}

export const singleProduct = async (id: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product/${id}`, {
            next: {
                tags: ["PRODUCT"],
            }
        })
        const result = res.json()
        return result
    } catch (error: any) {
        throw new Error(error?.message)
    }
}

export const updateProduct = async (id: string, data: FieldValues) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: (await cookies()).get("accessToken")!.value,
            },
            body: JSON.stringify(data)
        })
        const result = res.json()
        revalidateTag("PRODUCT");
        return result
    } catch (error: any) {
        throw new Error(error?.message)
    }
}

// delete Product
export const deleteProduct = async (productId: string): Promise<any> => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/product/${productId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: (await cookies()).get("accessToken")!.value,
                },
            }
        );
        revalidateTag("PRODUCT");
        return res.json();
    } catch (error: any) {
        return Error(error?.message);
    }
};