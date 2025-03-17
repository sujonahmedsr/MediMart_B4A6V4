import ProductDetails from "@/components/modules/Shop/ProductDetails";
import { singleProduct } from "@/services/medicine";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: " MediMart – Medicine Deta",
    description: "MediMart offers high-quality medicines and healthcare products with quick and reliable delivery. Shop online for all your health needs.",
};

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    const { data } = await singleProduct(id)

    return (
        <div className="container mx-auto">
            <ProductDetails product={data} />
        </div>
    );
};

export default page;