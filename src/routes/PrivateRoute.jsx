import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../hooks/AuthContextProvider";
import { useContext } from "react";

import { Spinner } from "@nextui-org/react";

// eslint-disable-next-line react/prop-types
export default function PrivateRoute({ children }) {
  const { pathname } = useLocation();
  const { user, loginChecking } = useContext(AuthContext);
  if (loginChecking & !user) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }
  if (!user) {
    return <Navigate to={"/login"} replace={true} state={{ path: pathname }} />;
  }
  return children;
}
