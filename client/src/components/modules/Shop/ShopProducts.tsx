"use client"
import { IMedicine } from "@/types/medicine";
import ProductCard from "./ProductCard";
import TablePagination from "@/components/ui/core/TablePagination";
import { IMeta } from "@/types/meta";
import { ICategory } from "@/types/category";
import SearchByCategory from "./SearchByCategory";

const ShopProducts = ({ category, products, meta }: { category: ICategory[], products: IMedicine[], meta: IMeta }) => {

    return (
        <div className="grid lg:grid-cols-12 md:grid-cols-8 grid-cols-1 gap-10">
            <div className="col-span-3">
                <SearchByCategory category={category} />
            </div>
            <div className="col-span-9">
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
                    {
                        products?.map((product, index) => <ProductCard key={index + 1} product={product} />)
                    }
                </div>
                <div>
                    <h1 className="text-xl font-semibold text-cyan-900">{ products?.length === 0 && 'No Medicine Founds.' }</h1>
                </div>
                <div className="flex items-center justify-end">
                    <TablePagination totalPage={meta?.totalPage} />
                </div>
            </div>
        </div>
    );
};

export default ShopProducts;