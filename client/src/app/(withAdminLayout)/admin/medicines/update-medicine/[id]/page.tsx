import UpdateMedicine from "@/components/modules/medicines/UpdateMedicine";
import { singleProduct } from "@/services/medicine";

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