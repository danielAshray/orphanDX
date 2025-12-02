import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Error, Home, Lab, Login, Provider } from "@/pages";
import { Main } from "@/layouts";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Main />}>
          <Route index element={<Navigate to="/" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/lab" element={<Lab />} />
          <Route path="/provider" element={<Provider />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
