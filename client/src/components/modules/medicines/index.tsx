"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, Plus, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { NMTable } from "@/components/ui/core/NMTable";
import { IMedicine } from "@/types/medicine";
import { IMeta } from "@/types/meta";

const ManageMedicine = ({
  products,
  meta,
}: {
  products: IMedicine[];
  meta: IMeta;
}) => {

    console.log(products, "from table");
    

  const router = useRouter();

  const handleView = (product: IMedicine) => {
    console.log("Viewing product:", product);
  };

  const handleDelete = (productId: string) => {
    console.log("Deleting product with ID:", productId);
  };

  const columns: ColumnDef<IMedicine>[] = [
    {
      accessorKey: "name",
      header: "Product Name",
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <Image
            src={row?.original?.image as string}
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
      cell: ({ row }) => <span>$ {row?.original?.price.toFixed(2)}</span>,
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <button
            className="text-gray-500 hover:text-blue-500"
            title="View"
            onClick={() => handleView(row.original)}
          >
            <Eye className="w-5 h-5" />
          </button>

          <button
            className="text-gray-500 hover:text-green-500"
            title="Edit"
            onClick={() =>
              router.push(
                `/user/shop/products/update-product/${row?.original?._id}`
              )
            }
          >
            <Edit className="w-5 h-5" />
          </button>

          <button
            className="text-gray-500 hover:text-red-500"
            title="Delete"
            onClick={() => handleDelete(row?.original?._id)}
          >
            <Trash className="w-5 h-5" />
          </button>
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
      {/* <TablePagination totalPage={meta?.totalPage} /> */}
    </div>
  );
};

export default ManageMedicine;