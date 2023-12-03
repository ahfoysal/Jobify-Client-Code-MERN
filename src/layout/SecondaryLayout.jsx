import { Outlet } from "react-router-dom";
import Footer from "./Footer";
const SecondaryLayout = () => {
  return (
    <div>
      <div className="min-h-[600px]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default SecondaryLayout;
