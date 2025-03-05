import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";


const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="bg-gray-50 pb-20">{children}</main>
      <Footer />
    </>
  );
};

export default CommonLayout;