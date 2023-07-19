import { useEffect } from "react";
import "./App.scss";
import Template from "./components/Template";
import AppRoutes from "./components/AppRoutes";
import { setUser } from "./store/reducers/AuthSlice";
import { useGetUserQuery } from "./api/user/userApi";
import { useDispatch } from "react-redux";

function App() {
  const { data: user, isSuccess: userSuccess } = useGetUserQuery("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    }
  }, [userSuccess]);

  return (
    <div className="wrapper">
      <Template>
        <AppRoutes />
      </Template>
    </div>
  );
}

export default App;
