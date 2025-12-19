import { Badge } from "@/components/badge";
import { Card } from "@/components/card";
import React from "react";
import {
  mockOrders,
  mockFacilities,
  mockLabs,
  mockProviders,
} from "@/data/mockDataNew";

const Facilities: React.FC = () => {
  return (
    <Card className="p-6">
      <h3 className="text-gray-900 mb-4">All Facilities</h3>
      <div className="space-y-4">
        {mockFacilities.map((facility: any) => {
          const facilityProviders = mockProviders.filter(
            (p: any) => p.facilityId === facility.id
          );
          const facilityOrders = mockOrders.filter(
            (o: any) => o.facilityId === facility.id
          );
          const lab = mockLabs.find((l: any) => l.id === facility.labPartnerId);

          return (
            <div
              key={facility.id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-gray-900 mb-1">{facility.name}</h4>
                  <p className="text-sm text-gray-600">{facility.address}</p>
                  <p className="text-sm text-gray-600">{facility.phone}</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="mb-2">
                    {facilityProviders.length} providers
                  </Badge>
                  <p className="text-sm text-gray-600">
                    {facilityOrders.length} orders
                  </p>
                </div>
              </div>
              <div className="bg-blue-50 px-3 py-2 rounded">
                <p className="text-sm text-gray-700">
                  Lab Partner: <strong>{lab?.name}</strong>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default Facilities;
