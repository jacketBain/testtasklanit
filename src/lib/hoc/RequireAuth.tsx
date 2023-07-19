import { Navigate } from "react-router-dom";
import AuthService from "../../service/AuthService";

interface IProps {
  children: any;
}

const RequireAuth = ({ children }: IProps) => {
  const isAuthorised = AuthService.getToken() !== "";

  if (!isAuthorised) return <Navigate to={"/login"} />;

  return children;
};

export default RequireAuth;
