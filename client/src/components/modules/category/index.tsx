/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Trash } from "lucide-react";
import { NMTable } from "@/components/ui/core/NMTable";
import { ICategory } from "@/types/category";
import CreateCategoryModal from "./CreateCategoryModal";
import DeleteConfirmationModal from "@/components/ui/core/DeleteConfirmationModal";
import { useState } from "react";
import { deleteCategory } from "@/services/Category";
import { toast } from "sonner";
import TablePagination from "@/components/ui/core/TablePagination";
import { IMeta } from "@/types/meta";
import { Button } from "@/components/ui/button";

type TCategoriesProps = {
    categories: ICategory[];
    meta: IMeta
};

const ManageCategories = ({ categories, meta }: TCategoriesProps) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const handleDelete = (data: ICategory) => {
        setSelectedId(data?._id);
        setSelectedItem(data?.name);
        setModalOpen(true);
    };
    

    const handleDeleteConfirm = async () => {
        try {
            if (selectedId) {
                const res = await deleteCategory(selectedId);
                console.log(res);
                if (res?.status === true) {
                    toast.success(res.message);
                    setModalOpen(false);
                } else {
                    toast.error(res.message);
                }
            }
        } catch (err: any) {
            console.error(err?.message);
        }
    };

    const columns: ColumnDef<ICategory>[] = [
        {
            accessorKey: "image",
            header: () => <div>Category Image</div>,
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <h1 className="text-lg font-semibold">{row.index + 1}.</h1>
                    <Image
                        src={row.original.icon}
                        alt={row.original.name}
                        width={40}
                        height={40}
                        className="w-8 h-8 rounded-full"
                    />
                </div>
            ),
        },
        {
            accessorKey: "name",
            header: () => <div>Category Name</div>,
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <span className="truncate">{row.original.name}</span>
                </div>
            ),
        },
        {
            accessorKey: "action",
            header: () => <div>Action</div>,
            cell: ({row}) => (
                <Button variant={"outline"}
                    className="text-gray-600 hover:text-red-500"
                    title="Delete"
                    onClick={() => handleDelete(row.original)}
                >
                    <Trash className="w-5 h-5" />
                </Button>
            ),
        },
    ];

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-bold">Manage Categories</h1>
                <CreateCategoryModal />
            </div>
            <NMTable data={categories || []} columns={columns} />
            <DeleteConfirmationModal
                name={selectedItem}
                isOpen={isModalOpen}
                onOpenChange={setModalOpen}
                onConfirm={handleDeleteConfirm}
            />
            <TablePagination totalPage={meta?.totalPage}/>
        </div>
    );
};

export default ManageCategories;