import * as R from "react";
import { Navigate } from "react-router-dom";
import { UserLogin } from "../../context/AuthProvider";
interface Props {
  children: R.ReactNode;
}
function AuthRoute({ children }: Props) {
  const State = R.useContext(UserLogin);
  if (State?.user?.token) {
    if (State.user.access == 0) {
      return <Navigate to="/firstAccess" replace />;
    }
    return <>{children}</>;
  } else {
    return <Navigate to="/login" replace />;
  }
}
export default AuthRoute;
