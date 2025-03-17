"use client"
import { Button } from "@/components/ui/button";
import { ICategory } from "@/types/category";
import Link from "next/link";
import CardCategory from "../category/CardCategory";

const Category = ({ categories }: { categories: ICategory[] | [] }) => {

    return (
        <div className="container mx-auto">
            <Link href={'/category'}>
                <h1 className="text-3xl font-bold text-center text-cyan-900">Shop By Category</h1>
            </Link>
            <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-5">
                {
                    categories?.map((item: ICategory, index: number) => <CardCategory item={item} key={index + 1} />)
                }
            </div>
            <div className="mx-auto mt-10 text-center">
                <Link href={'/category'} >
                    <Button variant={'outline'} className="rounded-none cursor-pointer ">
                        View All Category
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Category;