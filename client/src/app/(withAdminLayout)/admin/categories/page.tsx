import ManageCategories from "@/components/modules/category";
import { allCategories } from "@/services/Category";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: " MediMart – Category Manage",
  description: "MediMart offers high-quality medicines and healthcare products with quick and reliable delivery. Shop online for all your health needs.",
};

const ProductCategoryPage = async ({searchParams} : {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const data = await allCategories(page);

  return (
    <div>
      <ManageCategories categories={data?.data?.result} meta={data?.data?.meta} />
    </div>
  );
};

export default ProductCategoryPage;