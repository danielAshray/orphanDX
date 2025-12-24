import { fetchOrdersApi } from "@/api/admin";
import { Badge } from "@/components/badge";
import { Card } from "@/components/card";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Orders: React.FC = () => {
  const { data: orders } = useQuery({
    queryKey: ["fetchOrdersApi"],
    queryFn: fetchOrdersApi,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const allOrders = orders?.data || [];
  
  return (
    <Card className="p-6">
      <h3 className="text-gray-900 mb-4">All Orders</h3>
      <div className="space-y-3">
        {allOrders.map((order: any) => {
          return (
            <div
              key={order.id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-gray-900">{order.patientName}</p>
                  <p className="text-sm text-gray-600">
                    {order.testName} ({order.testCode})
                  </p>
                </div>
                <Badge
                  variant={
                    order.status === "completed"
                      ? "default"
                      : order.status === "in-progress"
                      ? "secondary"
                      : "outline"
                  }
                >
                  {order.status}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                <div>Provider: {order.providerName}</div>
                <div>Facility: {order.clinicName}</div>
                <div>Lab: {order.labName}</div>
                <div>Order ID: {order.id}</div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default Orders;
