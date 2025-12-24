import { fetchOverviewApi } from "@/api/admin";
import { Badge } from "@/components/badge";
import { Card } from "@/components/card";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Overview: React.FC = () => {
  const { data: overview } = useQuery({
    queryKey: ["fetchOverviewApi"],
    queryFn: fetchOverviewApi,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const { facilities = [], recentOrders = [] } = overview?.data || {};

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6">
        <h3 className="text-gray-900 mb-4">Recent Orders</h3>
        <div className="space-y-3">
          {recentOrders.slice(0, 5).map((order: any) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="text-gray-900">{order.patientName}</p>
                <p className="text-sm text-gray-600">{order.testName}</p>
                <p className="text-xs text-gray-500">{order.clinicName}</p>
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
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-gray-900 mb-4">Facility Overview</h3>
        <div className="space-y-3">
          {facilities.map((facility: any) => {
            return (
              <div key={facility.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-900">{facility.name}</p>
                  <Badge variant="outline">{facility.ordersCount} orders</Badge>
                </div>
                <p className="text-xs text-gray-600">
                  Lab Partner: {facility.labPartnerName}
                </p>
                <p className="text-xs text-gray-500">{facility.address}</p>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default Overview;
