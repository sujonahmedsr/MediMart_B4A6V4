import { Banner } from "@/components/home/Banner";
import Category from "@/components/home/Category";
import Info from "@/components/home/Info";
import { allCategories } from "@/services/Category";

export default async function Home() {
  const categories = await allCategories()
  return (
    <div className="md:space-y-16 space-y-8">
      <Banner />
      <Info />
      <Category categories={categories?.data} />
    </div>
  );
}
