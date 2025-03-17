import CreateMedicine from "@/components/modules/medicines/CreateMedicine";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: " MediMart – Create Medicine",
    description: "MediMart offers high-quality medicines and healthcare products with quick and reliable delivery. Shop online for all your health needs.",
  };

const page = () => {
    return (
        <div className="flex items-center justify-center">
            <CreateMedicine />
        </div>
    );
};

export default page;