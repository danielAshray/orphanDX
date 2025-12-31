import {
  PublicRoute,
  RequireAuth,
  RequireOrgRole,
  RequireRole,
} from "@/context/auth";
import { Main } from "@/layouts";
import { PATH_KEYS } from "@/lib/constants/pathKeys";
import { Forbidden, NotFound } from "@/pages";
import { Login } from "@/pages/auth";
import { Admin, Facility, Lab, Provider } from "@/pages/dashboard";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path={PATH_KEYS.LOGIN} element={<Login />} />
        </Route>

        <Route path={PATH_KEYS.FORBIDDEN} element={<Forbidden />} />

        <Route element={<RequireAuth />}>
          <Route element={<Main />}>
            <Route element={<RequireOrgRole allowed={["service_account"]} />}>
              <Route path={PATH_KEYS.ADMIN} element={<Admin />} />
            </Route>

            <Route element={<RequireOrgRole allowed={["lab"]} />}>
              <Route path={PATH_KEYS.LAB} element={<Lab />} />
            </Route>

            <Route element={<RequireOrgRole allowed={["facility"]} />}>
              <Route element={<RequireRole allowed={["admin"]} />}>
                <Route path={PATH_KEYS.FACILITY} element={<Facility />} />
              </Route>

              <Route element={<RequireRole allowed={["user"]} />}>
                <Route path={PATH_KEYS.PROVIDER} element={<Provider />} />
              </Route>
            </Route>

            <Route index element={<Navigate to={PATH_KEYS.LOGIN} replace />} />
          </Route>
        </Route>

        <Route path={PATH_KEYS.NOTFOUND} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
