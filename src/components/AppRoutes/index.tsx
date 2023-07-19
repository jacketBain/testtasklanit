import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router";
import RequireAuth from "../../lib/hoc/RequireAuth";
import { CircularProgress } from "@mui/material";

const Login = lazy(() => import("../LoginLayout"));
const RepoList = lazy(() => import("../RepoLestLayout"));
const RepoLayout = lazy(() => import("../RepositoryLayout"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Routes>
        <Route path={"/login"} element={<Login />} />
        <Route
          path={"/"}
          element={
            <RequireAuth>
              <RepoList />
            </RequireAuth>
          }
        />
        <Route
          path={"/:id"}
          element={
            <RequireAuth>
              <RepoLayout />
            </RequireAuth>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
