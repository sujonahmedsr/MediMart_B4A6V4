import { Banner } from "@/components/modules/home/Banner";
import Category from "@/components/modules/home/Category";
import CategoryProducts from "@/components/modules/home/CategoryProducts";
import Info from "@/components/modules/home/Info";
import Testimonial from "@/components/modules/home/Testimonial";
import { allCategories } from "@/services/Category";
import { productsByCategory } from "@/services/medicine";
import { ICategoryMedicine } from "@/types/medicine";

export default async function Home() {
  const categories = await allCategories(undefined, '10')
  const productsByCategories = await productsByCategory()

  return (
    <div className="md:space-y-16 space-y-8">
      <Banner />
      <div className="px-4 md:space-y-16 space-y-8">
        <Info />
        <Category categories={categories?.data?.result} />
        <div className="flex flex-col gap-12">
          {
            productsByCategories?.data?.map((medicine: ICategoryMedicine, index: number) => <CategoryProducts key={index + 1} medicine={medicine}/>)
          }
        </div>
        <Testimonial />
      </div>
    </div>
  );
}
