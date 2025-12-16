import { useState } from "react";
import { Card } from "@/components/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import {
  mockPatients,
  mockOrders,
  mockFacilities,
  mockLabs,
  mockProviders,
} from "@/data/mockDataNew";
import type { Provider, Order } from "@/types";
import {
  Users,
  ClipboardList,
  FlaskConical,
  Activity,
  Plus,
} from "lucide-react";
import {
  AddProviderDialog,
  ContactLabDialog,
  NewOrderDialog,
  ProviderOrdersDialog,
  ProviderPatientsDialog,
  ViewResultsDialog,
} from "@/elements";

const Facility = () => {
  const user = {
    id: 3,
    name: "Pawan Shahi",
    email: "pawan2@ashray.tech",
    password: "$2b$10$sBDRHqfTpAJNnx8smiHm9e0HU972HwADtMDZi0RptFRETJmu8PYx2",
    role: "LAB",
    status: "ACTIVE",
    createdAt: "2025-12-16T12:40:28.134Z",
    updatedAt: "2025-12-16T12:40:28.134Z",
    organizationId: "FAC-001",
  };

  const [activeTab, setActiveTab] = useState("overview");
  const [showNewOrderDialog, setShowNewOrderDialog] = useState(false);
  const [showAddProviderDialog, setShowAddProviderDialog] = useState(false);
  const [showContactLabDialog, setShowContactLabDialog] = useState(false);
  const [showViewResultsDialog, setShowViewResultsDialog] = useState(false);
  const [showProviderOrdersDialog, setShowProviderOrdersDialog] =
    useState(false);
  const [showProviderPatientsDialog, setShowProviderPatientsDialog] =
    useState(false);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    null
  );
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Get facility data
  const facility = mockFacilities.find((f) => f.id === user.organizationId);
  const facilityProviders = mockProviders.filter(
    (p) => p.facilityId === user.organizationId
  );
  const facilityOrders = mockOrders.filter(
    (o) => o.facilityId === user.organizationId
  );
  const partnerLab = mockLabs.find((l) => l.id === facility?.labPartnerId);

  // Get patients for facility providers
  const facilityPatients = mockPatients.filter((patient) =>
    facilityOrders.some((order) => order.patientId === patient.id)
  );

  const stats = {
    totalProviders: facilityProviders.length,
    totalOrders: facilityOrders.length,
    completedOrders: facilityOrders.filter((o) => o.status === "completed")
      .length,
    pendingOrders: facilityOrders.filter((o) =>
      ["pending", "sent", "scheduled", "collected", "in-progress"].includes(
        o.status
      )
    ).length,
    totalPatients: facilityPatients.length,
  };

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-8">
      <div className="mb-8">
        <h2 className="text-gray-900 mb-2">{facility?.name}</h2>
        <p className="text-gray-600">
          Facility Dashboard - Manage providers and lab orders
        </p>
        <div className="mt-2 flex items-center gap-2">
          <Badge variant="outline">
            <FlaskConical className="w-3 h-3 mr-1" />
            Lab Partner: {partnerLab?.name}
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Providers</span>
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-gray-900">{stats.totalProviders}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Patients</span>
            <Activity className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-gray-900">{stats.totalPatients}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Total Orders</span>
            <ClipboardList className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-gray-900">{stats.totalOrders}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Pending</span>
            <ClipboardList className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-gray-900">{stats.pendingOrders}</p>
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
          <TabsTrigger value="providers">Providers</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="lab">Lab Partner</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900">Recent Orders</h3>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowNewOrderDialog(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Order
                </Button>
              </div>
              <div className="space-y-3">
                {facilityOrders.slice(0, 5).map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="text-gray-900">{order.patientName}</p>
                      <p className="text-sm text-gray-600">{order.testName}</p>
                      <p className="text-xs text-gray-500">
                        {order.providerName}
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
              <h3 className="text-gray-900 mb-4">Our Providers</h3>
              <div className="space-y-3">
                {facilityProviders.map((provider) => {
                  const providerOrders = facilityOrders.filter(
                    (o) => o.providerId === provider.id
                  );
                  return (
                    <div
                      key={provider.id}
                      className="p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-900">{provider.name}</p>
                          <p className="text-sm text-gray-600">
                            {provider.specialty}
                          </p>
                        </div>
                        <Badge variant="outline">
                          {providerOrders.length} orders
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="providers">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">All Providers</h3>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowAddProviderDialog(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Provider
              </Button>
            </div>
            <div className="space-y-4">
              {facilityProviders.map((provider) => {
                const providerOrders = facilityOrders.filter(
                  (o) => o.providerId === provider.id
                );
                const providerPatients = mockPatients.filter((patient) =>
                  providerOrders.some((order) => order.patientId === patient.id)
                );

                return (
                  <div
                    key={provider.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-gray-900 mb-1">{provider.name}</h4>
                        <p className="text-sm text-gray-600">
                          {provider.specialty}
                        </p>
                        <p className="text-sm text-gray-600">
                          NPI: {provider.npi}
                        </p>
                        <p className="text-sm text-gray-500">
                          {provider.email}
                        </p>
                      </div>
                      <div className="text-right space-y-2">
                        <Badge variant="outline">
                          {providerOrders.length} orders
                        </Badge>
                        <p className="text-xs text-gray-600">
                          {providerPatients.length} patients
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedProvider(provider);
                          setShowProviderOrdersDialog(true);
                        }}
                      >
                        View Orders
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedProvider(provider);
                          setShowProviderPatientsDialog(true);
                        }}
                      >
                        View Patients
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">All Orders</h3>
              <Button size="sm" onClick={() => setShowNewOrderDialog(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Order
              </Button>
            </div>
            <div className="space-y-3">
              {facilityOrders.map((order) => (
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
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3">
                    <div>Provider: {order.providerName}</div>
                    <div>Lab: {partnerLab?.name}</div>
                    <div>Order ID: {order.id}</div>
                    <div>
                      Created: {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  {order.status === "completed" && order.labResult && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setSelectedOrder(order);
                        setShowViewResultsDialog(true);
                      }}
                    >
                      View Results
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="lab">
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Lab Partner Information</h3>
            {partnerLab && (
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-gray-900 mb-2">{partnerLab.name}</h4>
                  <p className="text-sm text-gray-600 mb-1">
                    {partnerLab.address}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    {partnerLab.phone}
                  </p>

                  <div className="bg-purple-50 px-4 py-3 rounded-lg">
                    <p className="text-sm text-gray-900 mb-2">
                      <strong>Testing Capabilities:</strong>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {partnerLab.testingCapabilities.map((cap) => (
                        <Badge key={cap} variant="secondary">
                          {cap}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="text-gray-900 mb-2">Order Statistics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Total Orders Sent</p>
                      <p className="text-gray-900">{facilityOrders.length}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Completed Orders</p>
                      <p className="text-gray-900">
                        {
                          facilityOrders.filter((o) => o.status === "completed")
                            .length
                        }
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full"
                  onClick={() => setShowContactLabDialog(true)}
                >
                  Contact Lab Partner
                </Button>
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <NewOrderDialog
        open={showNewOrderDialog}
        onOpenChange={setShowNewOrderDialog}
        facilityId={user.organizationId || ""}
        labPartnerId={facility?.labPartnerId || ""}
      />
      <AddProviderDialog
        open={showAddProviderDialog}
        onOpenChange={setShowAddProviderDialog}
        facilityId={user.organizationId || ""}
      />
      {partnerLab && (
        <ContactLabDialog
          open={showContactLabDialog}
          onOpenChange={setShowContactLabDialog}
          lab={partnerLab}
        />
      )}
      {selectedOrder && (
        <ViewResultsDialog
          open={showViewResultsDialog}
          onOpenChange={setShowViewResultsDialog}
          order={selectedOrder}
        />
      )}
      {selectedProvider && (
        <ProviderOrdersDialog
          open={showProviderOrdersDialog}
          onOpenChange={setShowProviderOrdersDialog}
          provider={selectedProvider}
          orders={facilityOrders.filter(
            (o) => o.providerId === selectedProvider.id
          )}
        />
      )}
      {selectedProvider && (
        <ProviderPatientsDialog
          open={showProviderPatientsDialog}
          onOpenChange={setShowProviderPatientsDialog}
          provider={selectedProvider}
          patients={mockPatients.filter((patient) =>
            facilityOrders.some(
              (order) =>
                order.patientId === patient.id &&
                order.providerId === selectedProvider.id
            )
          )}
        />
      )}
    </div>
  );
};

export default Facility;
