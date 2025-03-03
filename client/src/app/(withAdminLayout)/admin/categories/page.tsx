import { allCategories } from "@/services/Category";

const ProductCategoryPage = async () => {
  const { data } = await allCategories();
  return (
    <div>
      <ManageCategories categories={data} />
    </div>
  );
};

export default ProductCategoryPage;