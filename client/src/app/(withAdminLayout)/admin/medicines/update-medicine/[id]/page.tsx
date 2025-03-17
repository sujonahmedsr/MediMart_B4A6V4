import UpdateMedicine from "@/components/modules/medicines/UpdateMedicine";
import { singleProduct } from "@/services/medicine";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: " MediMart – Update Medicine",
  description: "MediMart offers high-quality medicines and healthcare products with quick and reliable delivery. Shop online for all your health needs.",
};

const UpdateProductPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const { data: product } = await singleProduct(id);

  return (
    <div className="flex justify-center items-center">
        <UpdateMedicine product={product}/>
    </div>
  );
};

export default UpdateProductPage;