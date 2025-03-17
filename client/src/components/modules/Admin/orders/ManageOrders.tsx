/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { NMTable } from "@/components/ui/core/NMTable";
import { toast } from "sonner";
import TablePagination from "@/components/ui/core/TablePagination";
import { IOrders } from "@/types/order";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ManageOrders = ({ orders, meta }: { orders: IOrders[], meta: any }) => {
    console.log(orders);
    
    // const handleStatusUpdate = async (orderId: string, status: IOrders["status"]) => {
    //     const toastId = toast.loading("Updating order status...");
    //     try {
    //         const res = await updateOrderStatus(orderId, status);
    //         if (res?.status) {
    //             toast.success("Order status updated successfully.");
    //         } else {
    //             toast.error("Failed to update order status.");
    //         }
    //     } catch (error: any) {
    //         toast.error("Something went wrong.");
    //     } finally {
    //         toast.dismiss(toastId);
    //     }
    // };

    const columns: ColumnDef<IOrders>[] = [
        {
            accessorKey: "user",
            header: () => <div>User</div>,
            cell: ({ row }) => (
                <div>
                    <span>{row.original.user?.name}</span>
                </div>
            ),
        },
        {
            accessorKey: "email",
            header: "Email",
            cell: ({ row }) => <span>{row.original.user?.email}</span>,
        },
        {
            accessorKey: "phone",
            header: "Phone",
            cell: ({ row }) => <span>{row.original.user?.phone}</span>,
        },
        {
            accessorKey: "transaction.id",
            header: "Order ID",
            cell: ({ row }) => {
                const handleCopy = () => {
                    const orderId = row.original.transaction?.id;
                    if (orderId) {
                        navigator.clipboard.writeText(orderId).then(() => {
                            toast.success("Order ID copied to clipboard!");
                        }).catch(err => {
                            toast.error("Failed to copy: ", err);
                        });
                    }
                };

                return (
                    <span
                        onClick={handleCopy}
                        style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
                    >
                        {row.original.transaction?.id}
                    </span>
                );
            },
        },
        {
            accessorKey: "totalPrice",
            header: "Total Price",
            cell: ({ row }) => <span>${row.original.totalPrice.toFixed(2)}</span>,
        },
        {
            accessorKey: "presCription",
            header: "Prescription",
            cell: ({ row }) => (
                row.original.presCription ? (
                    <a href={row.original.presCription} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View</a>
                ) : (
                    <span>N/A</span>
                )
            ),
        },
        {
            accessorKey: "payment",
            header: "Check Payment",
            cell: ({ row }) => <Button variant={"outline"} className="rounded">
                Check
            </Button>,
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => (
                <select
                    defaultValue={row.original.status}
                    className="border p-1 rounded-md"
                // onChange={(e) => handleStatusUpdate(row.original._id, e.target.value as IOrders["status"])}
                >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            ),
        },
        {
            accessorKey: "view",
            header: "",
            cell: ({ row }) => (
                // console.log(row.original.products)

                <Dialog>
                    <Button variant={"outline"} className="rounded">
                        <DialogTrigger>Order Details</DialogTrigger>
                    </Button>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Order Details</DialogTitle>
                        </DialogHeader>
                        <div>
                            <h2 className="text-lg font-bold">Products:</h2>
                            <ul className="mt-2 space-y-2">
                                {row.original.products.map((item, index: number) => (
                                    <li key={index} className="border p-2 rounded-md">
                                        <p><strong>Product ID:</strong> {item.product._id}</p>
                                        <p><strong>Product Name:</strong> {item.product.name}</p>
                                        <p><strong>Quantity:</strong> {item.quantity}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </DialogContent>
                </Dialog>
            ),
        },
    ];

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-bold">Manage Orders</h1>
            </div>
            <NMTable data={orders || []} columns={columns} />
            <TablePagination totalPage={meta?.totalPage} />
        </div>
    );
};

export default ManageOrders;
