import { Card, CardContent } from "@/components/ui/card";
import { allCategories } from "@/services/Category";
import { ICategory } from "@/types/category";
import Image from "next/image";

const page = async () => {
    const data = await allCategories(undefined, '18')
    const categories = data?.data?.result
    return (
        <div className="container mx-auto p-4">
            <div>
                <h1 className="text-3xl font-semibold text-center">Shop By Category</h1>
            </div>
            <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-5 mt-5">
                {
                    categories?.map((item: ICategory, index: number) => <div className="mt-4 bg-white" key={index}>
                        <Card className="hover:shadow-2xs rounded">
                            <CardContent>
                                <Image src={item?.icon} alt={item.name} className="w-12 h-12 mx-auto" width={100} height={100} />
                                <h1 className="text-center mt-2 font-semibold">{item?.name}</h1>
                            </CardContent>
                        </Card>
                    </div>)
                }
            </div>
        </div>
    );
};

export default page;