import { Banner } from "@/components/home/Banner";
import Info from "@/components/home/Info";

export default function Home() {
  return (
    <div className="md:space-y-16 space-y-8">
      <Banner />
      <Info />
    </div>
  );
}
