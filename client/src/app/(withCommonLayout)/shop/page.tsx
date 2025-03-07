import ShopProducts from "@/components/modules/Shop/ShopProducts";
import { allProducts } from "@/services/medicine";

const page = async ({searchParams} : {
    searchParams: Promise<{ page: string }>;
  }) => {
    const { page } = await searchParams;
    const products = await allProducts(page)
    
    return (
        <div className="container mx-auto p-4">
            <ShopProducts products={products?.data?.result} meta={products?.data?.meta} />
        </div>
    );
};

export default page;