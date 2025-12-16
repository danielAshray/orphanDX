import { PublicRoute, RequireAuth, RequireRole } from "@/context/auth";
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
        {/* Public */}
        <Route element={<PublicRoute />}>
          <Route path={PATH_KEYS.LOGIN} element={<Login />} />
        </Route>

        {/* Forbidden */}
        <Route path={PATH_KEYS.FORBIDDEN} element={<Forbidden />} />

        {/* Authenticated Routes */}
        <Route element={<RequireAuth />}>
          <Route element={<Main />}>
            {/* Admin */}
            <Route element={<RequireRole allowed={["admin"]} />}>
              <Route path={PATH_KEYS.ADMIN} element={<Admin />} />
            </Route>

            {/* Lab */}
            <Route element={<RequireRole allowed={["lab"]} />}>
              <Route path={PATH_KEYS.LAB} element={<Lab />} />
            </Route>

            {/* Facility */}
            <Route element={<RequireRole allowed={["facility"]} />}>
              <Route path={PATH_KEYS.FACILITY} element={<Facility />} />
            </Route>

            {/* Provider */}
            <Route element={<RequireRole allowed={["provider"]} />}>
              <Route path={PATH_KEYS.PROVIDER} element={<Facility />} />
            </Route>

            {/* Default Index Route */}
            <Route index element={<Navigate to={PATH_KEYS.LOGIN} replace />} />
          </Route>
        </Route>

        {/* Catch-all 404 */}
        <Route path={PATH_KEYS.NOTFOUND} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
