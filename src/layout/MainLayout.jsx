import { Outlet } from "react-router-dom";
import Header from "./Navbar";
import Footer from "./Footer";
const MainLayout = () => {
  return (
    <div>
      <Header />
      <div className="min-h-[600px]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
