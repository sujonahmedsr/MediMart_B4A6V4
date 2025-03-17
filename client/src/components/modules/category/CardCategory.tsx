"use client"
import { Card, CardContent } from "@/components/ui/card";
import { singleCategory } from "@/services/Category";
import { ICategory } from "@/types/category";
import Image from "next/image";
import { useRouter } from "next/navigation";
const CardCategory = ({ item }: { item: ICategory }) => {
    const router = useRouter()
    const handleCategoryproduct = async (id: string) => {
        const { data: category } = await singleCategory(id)
        const pageName = category?.name?.split(' ').join('-')
        router?.push(`category/${pageName}?cat_id=${id}`)
    }
    return (
        <div>
            <div onClick={() => handleCategoryproduct(item?._id)} className="mt-4 bg-white cursor-pointer">
                <Card className="hover:shadow-2xs rounded">
                    <CardContent>
                        <Image src={item?.icon} alt={item.name} className="w-12 h-12 mx-auto" width={100} height={100} />
                        <h1 className="text-center mt-2 font-semibold">{item?.name}</h1>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default CardCategory;