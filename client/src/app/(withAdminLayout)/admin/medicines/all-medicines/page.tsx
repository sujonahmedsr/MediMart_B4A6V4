import ManageMedicine from "@/components/modules/medicines";
import { allProducts } from "@/services/medicine";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: " MediMart – All Medicines",
  description: "MediMart offers high-quality medicines and healthcare products with quick and reliable delivery. Shop online for all your health needs.",
};

const ManageProductsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  

  const data = await allProducts(page);
  
  return (
    <div>
      <ManageMedicine products={data?.data?.result} meta={data?.data?.meta} />
    </div>
  );
};

export default ManageProductsPage;