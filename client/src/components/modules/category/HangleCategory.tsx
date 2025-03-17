"use client"
import { ICategory } from "@/types/category";
import CardCategory from "./CardCategory";

const HangleCategory = ({categories}: {categories: ICategory[]}) => {
    return (
        <div>
            <div>
                <h1 className="text-3xl font-bold text-center text-cyan-900">Shop By Category</h1>
            </div>
            <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-5 mt-5">
                {
                    categories?.map((item: ICategory, index: number) => <CardCategory item={item} key={index + 1}/>)
                }
            </div>
        </div>
    );
};

export default HangleCategory;