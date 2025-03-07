import ProductDetails from "@/components/modules/Shop/ProductDetails";
import { singleProduct } from "@/services/medicine";

const page = async ({params} : {params: Promise<{ id: string }>}) => {
    const {id} = await params
    const {data} = await singleProduct(id)
    
    return (
        <div  className="container mx-auto">
            <ProductDetails product={data} />
        </div>
    );
};

export default page;