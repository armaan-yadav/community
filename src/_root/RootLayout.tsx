import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <main>{<Outlet />}</main>
      <Footer />
    </div>
  );
};

export default RootLayout;
