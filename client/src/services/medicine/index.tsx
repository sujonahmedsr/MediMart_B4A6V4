/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { revalidateTag } from "next/cache"
import { FieldValues } from "react-hook-form"

export const allProducts = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product`, {
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

export const createProduct = async (data: FieldValues) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
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
        //   headers: {
        //     Authorization: (await cookies()).get("accessToken")!.value,
        //   },
        }
      );
      revalidateTag("PRODUCT");
      return res.json();
    } catch (error: any) {
      return Error(error?.message);
    }
  };