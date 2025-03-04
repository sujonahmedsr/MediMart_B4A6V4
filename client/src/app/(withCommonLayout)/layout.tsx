import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { getCurrentUser } from "@/services/AuthService";


const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser()
  return (
    <>
      <Navbar user={user} />
      <main className="bg-gray-50 pb-20">{children}</main>
      <Footer />
    </>
  );
};

export default CommonLayout;