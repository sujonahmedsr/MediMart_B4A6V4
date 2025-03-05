import ManageCategories from "@/components/modules/category";
import { allCategories } from "@/services/Category";

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