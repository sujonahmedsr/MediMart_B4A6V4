import RegisterForm from "@/components/modules/auth/register/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: " MediMart – Registration Now",
  description: "MediMart offers high-quality medicines and healthcare products with quick and reliable delivery. Shop online for all your health needs.",
};

const RegisterPage = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center ">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;