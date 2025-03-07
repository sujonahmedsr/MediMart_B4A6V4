import ShopProducts from "@/components/modules/Shop/ShopProducts";
import { allCategories } from "@/services/Category";
import { allProducts } from "@/services/medicine";

const page = async ({ searchParams }: {
    searchParams: Promise<{ page: string }>;
}) => {
    const { page, ...query } = await searchParams;
    const products = await allProducts(page, undefined, query)
    const category = await allCategories(undefined, "18")

    return (
        <div className="container mx-auto p-4">
            <ShopProducts category={category?.data?.result} products={products?.data?.result} meta={products?.data?.meta} />
        </div>
    );
};

export default page;