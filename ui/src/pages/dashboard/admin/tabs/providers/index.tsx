import { fetchProvidersApi } from "@/api/admin";
import { Badge } from "@/components/badge";
import { Card } from "@/components/card";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Providers: React.FC = () => {
  const { data: providers } = useQuery({
    queryKey: ["fetchProvidersApi"],
    queryFn: fetchProvidersApi,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const allProviders = providers?.data || [];

  return (
    <Card className="p-6">
      <h3 className="text-gray-900 mb-4">All Providers</h3>
      <div className="space-y-3">
        {allProviders.map((provider: any) => {
          return (
            <div
              key={provider.id}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
            >
              <div>
                <p className="text-gray-900">{provider.name}</p>
                <p className="text-sm text-gray-600">{provider.specialty}</p>
                <p className="text-xs text-gray-500">{provider.facilityName}</p>
              </div>
              <div className="text-right">
                <Badge variant="outline">{provider.ordersCount} orders</Badge>
                <p className="text-xs text-gray-500 mt-1">
                  NPI: {provider.npi}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default Providers;
