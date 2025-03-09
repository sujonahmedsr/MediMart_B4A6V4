/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { jwtDecode } from "jwt-decode";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const registerUser = async (userData: FieldValues) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        const result = await res.json();

        if (result?.status) {
            (await cookies()).set("accessToken", result?.data?.token);
        }

        return result;
    } catch (error: any) {
        return Error(error);
    }
};

export const loginUser = async (userData: FieldValues) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
        const result = await res.json();

        if (result?.status) {
            (await cookies()).set("accessToken", result?.data?.token);
        }
        return result
    } catch (error: any) {
        return Error(error);
    }
}

export const getCurrentUser = async () => {
    const accessToken = (await cookies()).get("accessToken")?.value;
    let decodedData = null;

    if (accessToken) {
        decodedData = await jwtDecode(accessToken);
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/${decodedData?.id}`,
            {
                next: {
                    tags: ["USER"]
                },
                method: "GET",
                headers: {
                    Authorization: (await cookies()).get("accessToken")!.value,
                },
            }
        )
        const data = await res.json()
        return data?.data;
    } else {
        return null;
    }
};

export const logout = async () => {
    (await cookies()).delete("accessToken");
};

export const updateProfile = async (userData: FieldValues) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/update-profile`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: (await cookies()).get("accessToken")!.value,
            },
            body: JSON.stringify(userData),
        })
        const result = await res.json();
        revalidateTag("USER")
        return result
    } catch (error: any) {
        return Error(error);
    }
}