import HangleCategory from "@/components/modules/category/HangleCategory";
import { allCategories } from "@/services/Category";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: " MediMart – All Category",
    description: "MediMart offers high-quality medicines and healthcare products with quick and reliable delivery. Shop online for all your health needs.",
};

const page = async () => {
    const data = await allCategories(undefined, '18')
    return (
        <div className="container mx-auto p-4">
            <HangleCategory categories={data?.data?.result}/>
        </div>
    );
};

export default page;