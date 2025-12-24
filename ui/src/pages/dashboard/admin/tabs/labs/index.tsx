import { fetchLabsApi } from "@/api/admin";
import { Badge } from "@/components/badge";
import { Card } from "@/components/card";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Labs: React.FC = () => {
  const { data: labs } = useQuery({
    queryKey: ["fetchLabsApi"],
    queryFn: fetchLabsApi,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const allLabs = labs?.data || [];

  return (
    <Card className="p-6">
      <h3 className="text-gray-900 mb-4">All Labs</h3>
      <div className="space-y-4">
        {allLabs.map((lab: any) => {
          return (
            <div key={lab.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-gray-900 mb-1">{lab.name}</h4>
                  <p className="text-sm text-gray-600">{lab.address}</p>
                  <p className="text-sm text-gray-600">{lab.phone}</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="mb-2">
                    {lab.facilitiesCount} facilities
                  </Badge>
                  <p className="text-sm text-gray-600">
                    {lab.ordersCount} orders
                  </p>
                </div>
              </div>
              <div className="bg-purple-50 px-3 py-2 rounded">
                <p className="text-sm text-gray-700 mb-1">
                  <strong>Testing Capabilities:</strong>
                </p>
                <div className="flex flex-wrap gap-1">
                  {lab.testingCapabilities.map((cap: any) => (
                    <Badge key={cap} variant="secondary" className="text-xs">
                      {cap}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default Labs;
