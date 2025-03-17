import LoginForm from "@/components/modules/auth/login/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: " MediMart – Login Now",
  description: "MediMart offers high-quality medicines and healthcare products with quick and reliable delivery. Shop online for all your health needs.",
};

const LoginPage = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <LoginForm />
    </div>
  );
};

export default LoginPage;