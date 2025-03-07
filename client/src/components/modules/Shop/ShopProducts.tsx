import { IMedicine } from "@/types/medicine";
import ProductCard from "./ProductCard";

const ShopProducts = ({products}: {products: IMedicine[]}) => {
    
    return (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-5">
            {
                products?.map((product, index) => <ProductCard key={index + 1} product={product}/>)
            }
        </div>
    );
};

export default ShopProducts;