import { RouterProvider } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import routes from "./routes/routes";

const Index = () => {
  return (
    <AnimatePresence>
      <RouterProvider
        location={window.location}
        key={window.location.pathname}
        router={routes}
      />
    </AnimatePresence>
  );
};
export default Index;
