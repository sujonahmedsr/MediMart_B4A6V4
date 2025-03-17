/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, Plus, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { NMTable } from "@/components/ui/core/NMTable";
import { IMedicine } from "@/types/medicine";
import { IMeta } from "@/types/meta";
import DeleteConfirmationModal from "@/components/ui/core/DeleteConfirmationModal";
import { toast } from "sonner";
import { deleteProduct } from "@/services/medicine";
import { useState } from "react";
import TablePagination from "@/components/ui/core/TablePagination";
import { Button } from "@/components/ui/button";
import DummyMedicine from "@/assests/dummyMedicine.jpeg"

const ManageMedicine = ({
  products,
  meta,
}: {
  products: IMedicine[];
  meta: IMeta;
}) => {
  console.log(meta);
  
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const handleDelete = (data: IMedicine) => {
    console.log(data);
    setSelectedId(data?._id);
    setSelectedItem(data?.name);
    setModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (selectedId) {
        const res = await deleteProduct(selectedId);
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
      toast.error("Something went wrong please try again.");
    }
  };


  const router = useRouter();

  const handleView = (product: IMedicine) => {
    router.push(
      `/shop/${product?._id}`
    )
  };

  const columns: ColumnDef<IMedicine>[] = [
    {
      accessorKey: "name",
      header: "Product Name",
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <Image
            src={row?.original?.image as string || DummyMedicine}
            alt={row?.original?.name}
            width={40}
            height={40}
            className="w-8 h-8 rounded-full"
          />
          <span className="truncate">{row?.original?.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => <span>{row?.original?.category?.name}</span>,
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: ({ row }) => <span>{row?.original?.quantity}</span>,
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => <span>$ {Number(row?.original?.price).toFixed(2)}</span>,
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <Button variant={"outline"}
            className="text-gray-500 hover:text-blue-500 rounded"
            title="View"
            onClick={() => handleView(row.original)}
          >
            <Eye className="w-5 h-5" />
          </Button>

          <Button variant={"outline"}
            className="text-gray-500 hover:text-green-500"
            title="Edit"
            onClick={() =>
              router.push(
                `/admin/medicines/update-medicine/${row?.original?._id}`
              )
            }
          >
            <Edit className="w-5 h-5" />
          </Button>

          <Button variant={"outline"}
            className="text-gray-500 hover:text-red-500"
            title="Delete"
            onClick={() => handleDelete(row?.original)}
          >
            <Trash className="w-5 h-5" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Manage Medicines</h1>
        <div className="flex items-center gap-2">
          <Button
            className="rounded-none"
            onClick={() => router.push("/admin/medicines/create-medicines")}
            size="sm"
          >
            Add Medicine <Plus />
          </Button>
        </div>
      </div>
      <NMTable columns={columns} data={products || []} />
      <TablePagination totalPage={meta?.totalPage} />
      <DeleteConfirmationModal
        name={selectedItem}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default ManageMedicine;