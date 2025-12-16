import { useState } from "react";
import { Card } from "@/components/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { Badge } from "@/components/badge";
import {
  mockPatients,
  mockOrders,
  mockFacilities,
  mockLabs,
  mockProviders,
} from "@/data/mockDataNew";
import {
  Building2,
  FlaskConical,
  Users,
  ClipboardList,
  Activity,
} from "lucide-react";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = {
    totalOrders: mockOrders.length,
    completedOrders: mockOrders.filter((o: any) => o.status === "completed")
      .length,
    totalFacilities: mockFacilities.length,
    totalLabs: mockLabs.length,
    totalProviders: mockProviders.length,
    totalPatients: mockPatients.length,
  };

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-8">
      <div className="mb-8">
        <h2 className="text-gray-900 mb-2">Admin Dashboard</h2>
        <p className="text-gray-600">
          Complete view of all facilities, labs, providers, and orders
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Facilities</span>
            <Building2 className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-gray-900">{stats.totalFacilities}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Labs</span>
            <FlaskConical className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-gray-900">{stats.totalLabs}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Providers</span>
            <Users className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-gray-900">{stats.totalProviders}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Patients</span>
            <Activity className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-gray-900">{stats.totalPatients}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Total Orders</span>
            <ClipboardList className="w-5 h-5 text-indigo-600" />
          </div>
          <p className="text-gray-900">{stats.totalOrders}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Completed</span>
            <ClipboardList className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-gray-900">{stats.completedOrders}</p>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="facilities">Facilities</TabsTrigger>
          <TabsTrigger value="labs">Labs</TabsTrigger>
          <TabsTrigger value="providers">Providers</TabsTrigger>
          <TabsTrigger value="orders">All Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-gray-900 mb-4">Recent Orders</h3>
              <div className="space-y-3">
                {mockOrders.slice(0, 5).map((order: any) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="text-gray-900">{order.patientName}</p>
                      <p className="text-sm text-gray-600">{order.testName}</p>
                      <p className="text-xs text-gray-500">
                        {order.clinicName}
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
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-gray-900 mb-4">Facility Overview</h3>
              <div className="space-y-3">
                {mockFacilities.map((facility: any) => {
                  const facilityOrders = mockOrders.filter(
                    (o: any) => o.facilityId === facility.id
                  );
                  const lab = mockLabs.find(
                    (l: any) => l.id === facility.labPartnerId
                  );
                  return (
                    <div
                      key={facility.id}
                      className="p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-gray-900">{facility.name}</p>
                        <Badge variant="outline">
                          {facilityOrders.length} orders
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600">
                        Lab Partner: {lab?.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {facility.address}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="facilities">
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
                const lab = mockLabs.find(
                  (l: any) => l.id === facility.labPartnerId
                );

                return (
                  <div
                    key={facility.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-gray-900 mb-1">{facility.name}</h4>
                        <p className="text-sm text-gray-600">
                          {facility.address}
                        </p>
                        <p className="text-sm text-gray-600">
                          {facility.phone}
                        </p>
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
        </TabsContent>

        <TabsContent value="labs">
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">All Labs</h3>
            <div className="space-y-4">
              {mockLabs.map((lab: any) => {
                const labOrders = mockOrders.filter(
                  (o: any) => o.labId === lab.id
                );
                const facilities = mockFacilities.filter(
                  (f: any) => f.labPartnerId === lab.id
                );

                return (
                  <div
                    key={lab.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-gray-900 mb-1">{lab.name}</h4>
                        <p className="text-sm text-gray-600">{lab.address}</p>
                        <p className="text-sm text-gray-600">{lab.phone}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="mb-2">
                          {facilities.length} facilities
                        </Badge>
                        <p className="text-sm text-gray-600">
                          {labOrders.length} orders
                        </p>
                      </div>
                    </div>
                    <div className="bg-purple-50 px-3 py-2 rounded">
                      <p className="text-sm text-gray-700 mb-1">
                        <strong>Testing Capabilities:</strong>
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {lab.testingCapabilities.map((cap: any) => (
                          <Badge
                            key={cap}
                            variant="secondary"
                            className="text-xs"
                          >
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
        </TabsContent>

        <TabsContent value="providers">
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">All Providers</h3>
            <div className="space-y-3">
              {mockProviders.map((provider: any) => {
                const facility = mockFacilities.find(
                  (f: any) => f.id === provider.facilityId
                );
                const providerOrders = mockOrders.filter(
                  (o: any) => o.providerId === provider.id
                );

                return (
                  <div
                    key={provider.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                  >
                    <div>
                      <p className="text-gray-900">{provider.name}</p>
                      <p className="text-sm text-gray-600">
                        {provider.specialty}
                      </p>
                      <p className="text-xs text-gray-500">{facility?.name}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">
                        {providerOrders.length} orders
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">
                        NPI: {provider.npi}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">All Orders</h3>
            <div className="space-y-3">
              {mockOrders.map((order: any) => {
                const lab = mockLabs.find((l: any) => l.id === order.labId);
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
                      <div>Lab: {lab?.name}</div>
                      <div>Order ID: {order.id}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
