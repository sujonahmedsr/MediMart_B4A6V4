import { Banner } from "@/components/home/Banner";
import Category from "@/components/home/Category";
import Info from "@/components/home/Info";
import { allCategories } from "@/services/Category";

export default async function Home() {
  const categories = await allCategories(undefined, '10')
  return (
    <div className="md:space-y-16 space-y-8">
      <Banner />
      <div className="px-2 md:space-y-16 space-y-8">
        <Info />
        <Category categories={categories?.data?.result} />
      </div>
    </div>
  );
}
