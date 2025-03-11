import ProductCard from "@/components/modules/Shop/ProductCard";
import { singleCategory } from "@/services/Category";
import { allProducts } from "@/services/medicine";
import { ICategory } from "@/types/category";
import { IMedicine } from "@/types/medicine";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: " MediMart – Category Products",
  description: "MediMart offers high-quality medicines and healthcare products with quick and reliable delivery. Shop online for all your health needs.",
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
const page = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const query = await searchParams
  
  const productData = await allProducts(undefined, undefined, query)
  const products = productData?.data?.result

  const categoryData = await singleCategory(query?.cat_id as string)
  const category = categoryData?.data as ICategory

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-4">
        <Image src={category?.icon} alt={category?.name} width={100} height={100} className="w-8 h-8" />
        <h1 className="text-xl font-semibold">{category?.name}</h1>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-1 grid-cols-1 gap-5 mt-5">
        {
          products?.length > 0 ?
          products?.map((item: IMedicine, index: number) => <ProductCard product={item} key={index + 1}></ProductCard>)
          : <div className="text-base font-semibold text-cyan-900"><h1>No Products Found In This Cateogory</h1></div>
        }
      </div>
    </div>
  );
};

export default page;