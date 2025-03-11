import Manageusers from "@/components/modules/Admin/user/Manageusers";
import { allUsers } from "@/services/Admin";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: " MediMart – Users",
    description: "MediMart offers high-quality medicines and healthcare products with quick and reliable delivery. Shop online for all your health needs.",
  };

const page = async () => {
    const data = await allUsers();
    return (
        <div>
            <Manageusers users={data?.data} />
        </div>
    );
};

export default page;
