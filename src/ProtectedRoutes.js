import { useContext } from "react";
import { Authcontext } from "./shared/Components/Context/Auth-Context";
import { useLocation, Navigate } from "react-router-dom";
export default function ProtectedRoutes({ children }) {
  const { isLogin } = useContext(Authcontext);
  const location = useLocation();
  if (!isLogin) {
    return (
      <Navigate
        to="/authentication"
        state={{ from: location.pathname || "/" }}
        replace
      />
    );
  }
  return <>{children}</>;
}
