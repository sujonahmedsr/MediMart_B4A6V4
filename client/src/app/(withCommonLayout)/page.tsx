import { Banner } from "@/components/modules/home/Banner";
import Category from "@/components/modules/home/Category";
import Info from "@/components/modules/home/Info";
import Testimonial from "@/components/modules/home/Testimonial";
import { allCategories } from "@/services/Category";

export default async function Home() {
  const categories = await allCategories(undefined, '10')
  return (
    <div className="md:space-y-16 space-y-8">
      <Banner />
      <div className="px-4 md:space-y-16 space-y-8">
        <Info />
        <Category categories={categories?.data?.result} />
        <Testimonial />
      </div>
    </div>
  );
}
