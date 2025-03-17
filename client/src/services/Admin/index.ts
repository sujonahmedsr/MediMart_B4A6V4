"use server";
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

/* eslint-disable @typescript-eslint/no-explicit-any */
export const allUsers = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/admin/users`, {
            method: "GET",
            headers: {
                Authorization: (await cookies()).get("accessToken")!.value,
            },
            next: {
                tags: ["USERS"]
            },
        })
        const result = res.json()
        return result
    } catch (error: any) {
        throw new Error(error?.message)
    }
}

export const deactiveUser = async ({ id, booleans }: { id: string, booleans: boolean }) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/admin/users/${id}/block`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: (await cookies()).get("accessToken")!.value,
            },
            body: JSON.stringify({ isBlocked: booleans }),
        })
        const result = res.json()
        revalidateTag("USERS")
        return result
    } catch (error: any) {
        throw new Error(error?.message)
    }
}