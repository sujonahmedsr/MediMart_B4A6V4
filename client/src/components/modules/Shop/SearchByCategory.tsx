"use client"
import { Button } from "@/components/ui/button";
import { ICategory } from "@/types/category";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const SearchByCategory = ({ category }: { category: ICategory[] }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const handleCategory = (id: string) => {
        router.push(`${pathname}?cat_id=${id}`);
        setIsOpen(false);
    };
    const handleAllMedicine = () => {
        router.push(`${pathname}`);
        setIsOpen(false);
    };

    return (
        <div>
            {/* For large screens, keep sidebar visible */}
            <div className="hidden lg:flex flex-col gap-4 h-[80vh] overflow-scroll overflow-x-hidden sticky top-22">
                <Button className="bg-cyan-900 text-white px-4 py-2 rounded pointer-events-none">Shop By Category</Button>
                <Button onClick={handleAllMedicine} variant="outline" className="rounded">All Medicines</Button>
                {category?.map((Item, index) => (
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleCategory(Item?._id)} key={index + 1}>
                        <Image src={Item?.icon} width={100} height={100} className="w-8 h-8" alt={Item?.name} />
                        <h1>{Item?.name}</h1>
                    </div>
                ))}
            </div>

            {/* For medium and smaller screens, use modal */}
            <div className="lg:hidden">
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-cyan-900 text-white px-4 py-2 rounded">Shop By Category</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <div className="flex flex-col gap-4">
                            <Button onClick={handleAllMedicine} variant="outline" className="rounded">All Medicines</Button>
                            {category?.map((Item, index) => (
                                <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleCategory(Item?._id)} key={index + 1}>
                                    <Image src={Item?.icon} width={100} height={100} className="w-8 h-8" alt={Item?.name} />
                                    <h1>{Item?.name}</h1>
                                </div>
                            ))}
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default SearchByCategory;