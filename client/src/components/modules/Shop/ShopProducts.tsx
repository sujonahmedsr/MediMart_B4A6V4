"use client"
import { IMedicine } from "@/types/medicine";
import ProductCard from "./ProductCard";
import TablePagination from "@/components/ui/core/TablePagination";
import { IMeta } from "@/types/meta";

const ShopProducts = ({ products, meta }: { products: IMedicine[], meta: IMeta }) => {

    return (
        <div>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-5">
                {
                    products?.map((product, index) => <ProductCard key={index + 1} product={product} />)
                }
            </div>
            <TablePagination totalPage={meta?.totalPage}/>
        </div>
    );
};

export default ShopProducts;