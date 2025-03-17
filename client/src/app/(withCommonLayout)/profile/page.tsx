import Profile from "@/components/modules/user/Profile";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: " MediMart – Profile",
    description: "MediMart offers high-quality medicines and healthcare products with quick and reliable delivery. Shop online for all your health needs.",
};
const page = () => {
    return (
        <div className="container mx-auto grid place-items-center px-4">
            <Profile />
        </div>
    );
};

export default page;