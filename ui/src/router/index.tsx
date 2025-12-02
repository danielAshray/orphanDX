import { Login } from "@/pages";
import { localStorageUtil } from "@/lib/storage/localStorage";
import Screening from "./Screening";

const Router = () => {
  const token = localStorageUtil.get("token");

  if (!token) return <Login />;
  return <Screening />;
};

export default Router;
