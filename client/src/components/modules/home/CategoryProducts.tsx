"use client"
import { ICategoryMedicine } from "@/types/medicine";
import Link from "next/link";
import ProductCard from "../Shop/ProductCard";

const CategoryProducts = ({ medicine }: { medicine: ICategoryMedicine }) => {

    return (
        <div className="container mx-auto">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-cyan-900">{medicine?._id?.categoryName}</h1>
                <Link className="text-cyan-900 hover:underline" href={`/shop?cat_id=${medicine?._id?.categoryId}`}>See More</Link>
            </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 mt-3">
                {
                    medicine?.products?.map((item, index) => <ProductCard key={index} product={item} />)
                }
            </div>
        </div>
    );
};

export default CategoryProducts;