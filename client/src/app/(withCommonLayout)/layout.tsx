import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { getCurrentUser } from "@/services/AuthService";


const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser()
  return (
    <>
      <Navbar user={user} />
      <main className="min-h-screen bg-gray-50">{children}</main>
      <Footer />
    </>
  );
};

export default CommonLayout;