import HangleCategory from "@/components/modules/category/HangleCategory";
import { allCategories } from "@/services/Category";

const page = async () => {
    const data = await allCategories(undefined, '18')
    return (
        <div className="container mx-auto p-4">
            <HangleCategory categories={data?.data?.result}/>
        </div>
    );
};

export default page;