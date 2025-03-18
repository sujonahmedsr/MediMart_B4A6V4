/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { NMTable } from "@/components/ui/core/NMTable";
import { Button } from "@/components/ui/button";
import { IUser } from "@/types/user";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";
import { allUsers, deactiveUser } from "@/services/Admin";
import UserDetailsModal from "./UserDetailsModal";
import { useEffect, useState } from "react";

const Manageusers = () => {
    const [users, setOrders] = useState<IUser[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const userOrders = await allUsers();
                setOrders(userOrders?.data || []);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <p className="text-center text-gray-500">Loading orders...</p>;
    const handleDeactive = async (id: string, booleans: boolean) => {
        const toastId = toast.loading("Loading...");
        try {
            const res = await deactiveUser({ id, booleans });

            if (res?.status) {
                toast.success(res?.message);
            } else {
                toast.error(res?.message);
            }
        } catch (error: any) {
            toast.error("Failed to update user status.", { id: toastId });
        }
    };

    const columns: ColumnDef<IUser>[] = [
        {
            accessorKey: "image",
            header: () => <div>User Image</div>,
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <h1 className="text-lg font-semibold">{row.index + 1}.</h1>
                    <Image
                        src={row?.original?.image as string || "https://github.com/shadcn.png"}
                        alt={row?.original?.name}
                        width={40}
                        height={40}
                        className="w-8 h-8 rounded-full"
                    />
                </div>
            ),
        },
        {
            accessorKey: "name",
            header: () => <div>Name</div>,
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <span className="truncate">{row?.original?.name}</span>
                </div>
            ),
        },
        {
            accessorKey: "role",
            header: () => <div>Role</div>,
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <Button variant={"outline"} className={`truncate pointer-events-none ${row?.original?.role === "admin" && "bg-cyan-500"}`}>{row?.original?.role}</Button>
                </div>
            ),
        },
        {
            accessorKey: "email",
            header: () => <div>Email</div>,
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <span className="truncate">{row?.original?.email}</span>
                </div>
            ),
        },
        {
            accessorKey: "phone",
            header: () => <div>Phone</div>,
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <span className="truncate">{row?.original?.phone}</span>
                </div>
            ),
        },
        {
            accessorKey: "action",
            header: () => <div>Action</div>,
            cell: ({ row }) => {
                const user = row.original;
                return (
                    <div className="flex items-center gap-2">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    {user.isBlocked ? (
                                        <Button
                                            variant="destructive"
                                            onClick={() => handleDeactive(user._id, false)}

                                        >
                                            Deactive
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="outline"
                                            onClick={() => handleDeactive(user._id, true)}

                                        >
                                            Active
                                        </Button>
                                    )}
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{user.isBlocked ? "Click to activate this user" : "Click to deactivate this user"}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <UserDetailsModal user={row.original} />
                    </div>
                );
            },
        },
    ];

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-bold">Manage Users</h1>
            </div>
            <NMTable data={users || []} columns={columns} />
        </div>
    );
};

export default Manageusers;