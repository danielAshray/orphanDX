import { getProfileApi } from "@/api";
import { Main } from "@/layouts";
import { Lab, Provider } from "@/pages";
import type { AuthUserProps, UserRole } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Screening = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["my_profile"],
    queryFn: getProfileApi,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  if (isFetching)
    return (
      <div className="flex items-center justify-center  h-screen">
        <Loader className="animate-spin" size={30} />;
      </div>
    );

  const userData = (data || {}) as AuthUserProps;

  const renderComponent: Record<UserRole, React.ReactNode> = {
    ADMIN: <></>,
    LAB: <Lab />,
    PROVIDER: <Provider />,
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main user={userData} />}>
          <Route index element={renderComponent[userData.role]} />
          <Route path="*" element={<>not found</>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Screening;
