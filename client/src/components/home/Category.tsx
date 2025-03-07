"use client"
import { ICategory } from "@/types/category";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const Category = ({ categories }: { categories: ICategory[] | [] }) => {

    return (
        <div className="container mx-auto">
            <Link href={'/category'}>
                <h1 className="text-3xl font-bold text-center text-cyan-950">Shop By Category</h1>
            </Link>
            <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-5">
                {
                    categories?.map((item: ICategory, index: number) => <div className="mt-4" key={index}>
                        <Card className="hover:shadow-2xs rounded">
                            <CardContent>
                                <Image src={item?.icon} alt={item.name} className="w-12 h-12 mx-auto" width={100} height={100} />
                                <h1 className="text-center mt-2 font-semibold">{item?.name}</h1>
                            </CardContent>
                        </Card>
                    </div>)
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