import ShopProducts from "@/components/modules/Shop/ShopProducts";
import { allProducts } from "@/services/medicine";

const page = async () => {
    const products = await allProducts()
    return (
        <div className="container mx-auto p-4">
            <ShopProducts products={products?.data?.result} />
        </div>
    );
};

export default page;