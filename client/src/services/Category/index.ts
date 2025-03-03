/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { revalidateTag } from "next/cache"
import { FieldValues } from "react-hook-form"

export const allCategories = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/category`, {
            next: {
                tags: ["CATEGORY"],
            }
        })
        const result = res.json()
        return result
    } catch (error: any) {
        throw new Error(error?.message)
    }
}

export const createCategory = async (data: FieldValues) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/category/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        const result = res.json()
        revalidateTag("CATEGORY");
        return result
    } catch (error: any) {
        throw new Error(error?.message)
    }
}

// delete category
export const deleteCategory = async (categoryId: string): Promise<any> => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/category/${categoryId}`,
        {
          method: "DELETE",
        //   headers: {
        //     Authorization: (await cookies()).get("accessToken")!.value,
        //   },
        }
      );
      revalidateTag("CATEGORY");
      return res.json();
    } catch (error: any) {
      return Error(error?.message);
    }
  };