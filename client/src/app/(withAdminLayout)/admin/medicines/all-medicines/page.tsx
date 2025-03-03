import ManageMedicine from "@/components/modules/medicines";
import { allProducts } from "@/services/medicine";

const ManageProductsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  console.log(page);
  

  const data = await allProducts();
  
  return (
    <div>
      <ManageMedicine products={data?.data?.result} meta={data?.data?.meta} />
    </div>
  );
};

export default ManageProductsPage;