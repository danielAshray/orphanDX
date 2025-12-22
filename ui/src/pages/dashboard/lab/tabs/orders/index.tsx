import { fetchOrderTrackingApi } from "@/api/order";
import { useQuery } from "@tanstack/react-query";

const Order = () => {
  const { data: ordersResp } = useQuery({
    queryKey: ["fetchOrderTrackingApi"],
    queryFn: fetchOrderTrackingApi,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const orders = ordersResp?.data || [];
  return <>order</>;
};

export default Order;
