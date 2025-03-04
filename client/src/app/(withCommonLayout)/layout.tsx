import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";


const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">{children}</main>
      <Footer />
    </>
  );
};

export default CommonLayout;