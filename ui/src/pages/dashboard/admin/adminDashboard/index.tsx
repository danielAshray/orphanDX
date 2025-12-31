import {
  ArrowLeft,
  Building2,
  TestTube,
  Users,
  Activity,
  FileText,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";

interface AdminDashboardProps {
  type: "lab" | "facility";
  entityId: string;
  onBack: () => void;
}

// Mock data based on entity
const getEntityName = (_type: string, entityId: string) => {
  const names: Record<string, string> = {
    "lab-1": "Central Diagnostics Lab",
    "lab-2": "Advanced Research Lab",
    "lab-3": "City Medical Lab",
    "lab-4": "HealthTech Laboratory",
    "facility-1": "Memorial Hospital",
    "facility-2": "Community Health Center",
    "facility-3": "St. Mary's Medical Center",
    "facility-4": "Regional Care Facility",
  };
  return names[entityId] || "Unknown";
};

// Mock stats data
const getMockStats = (type: string) => {
  if (type === "lab") {
    return [
      {
        label: "Total Tests",
        value: 1234,
        icon: TestTube,
        color: "text-purple-500",
      },
      { label: "Providers", value: 45, icon: Users, color: "text-green-500" },
      { label: "Patients", value: 892, icon: Activity, color: "text-red-500" },
      {
        label: "Total Orders",
        value: 567,
        icon: FileText,
        color: "text-blue-500",
      },
      {
        label: "Completed",
        value: 512,
        icon: CheckCircle2,
        color: "text-green-500",
      },
    ];
  } else {
    return [
      {
        label: "Total Patients",
        value: 2156,
        icon: Activity,
        color: "text-red-500",
      },
      { label: "Labs", value: 8, icon: TestTube, color: "text-purple-500" },
      { label: "Providers", value: 78, icon: Users, color: "text-green-500" },
      {
        label: "Total Orders",
        value: 1023,
        icon: FileText,
        color: "text-blue-500",
      },
      {
        label: "Completed",
        value: 945,
        icon: CheckCircle2,
        color: "text-green-500",
      },
    ];
  }
};

const mockRecentOrders = [
  {
    id: "ORD-001",
    patient: "John Doe",
    test: "Complete Blood Count",
    status: "Completed",
    date: "2025-12-30",
  },
  {
    id: "ORD-002",
    patient: "Jane Smith",
    test: "Lipid Panel",
    status: "Pending",
    date: "2025-12-30",
  },
  {
    id: "ORD-003",
    patient: "Bob Johnson",
    test: "Thyroid Function",
    status: "In Progress",
    date: "2025-12-29",
  },
  {
    id: "ORD-004",
    patient: "Alice Williams",
    test: "Glucose Test",
    status: "Completed",
    date: "2025-12-29",
  },
];

export function AdminDashboard({
  type,
  entityId,
  onBack,
}: AdminDashboardProps) {
  const entityName = getEntityName(type, entityId);
  const stats = getMockStats(type);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Back Button */}
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="size-4 mr-2" />
        Back to Selection
      </Button>

      {/* Dashboard Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          {type === "lab" ? (
            <TestTube className="size-6 text-purple-500" />
          ) : (
            <Building2 className="size-6 text-blue-500" />
          )}
          <h1 className="text-2xl">{entityName}</h1>
        </div>
        <p className="text-gray-600">
          Complete view of {type === "lab" ? "lab" : "facility"} data,
          providers, and orders
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">{stat.label}</span>
                <Icon className={`size-5 ${stat.color}`} />
              </div>
              <div className="text-2xl">{stat.value}</div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          {type === "facility" && <TabsTrigger value="labs">Labs</TabsTrigger>}
          <TabsTrigger value="providers">Providers</TabsTrigger>
          <TabsTrigger value="orders">All Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Recent Orders */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="mb-4">Recent Orders</h3>
              <div className="space-y-3">
                {mockRecentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between pb-3 border-b border-gray-100 last:border-0"
                  >
                    <div>
                      <div className="text-sm">{order.patient}</div>
                      <div className="text-xs text-gray-500">{order.test}</div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-xs px-2 py-1 rounded ${
                          order.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {order.status}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {order.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Entity Overview */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="mb-4">
                {type === "lab" ? "Lab" : "Facility"} Overview
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="text-green-600">Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span>
                    {type === "lab"
                      ? "Diagnostic Laboratory"
                      : "Medical Facility"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Established:</span>
                  <span>2020</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span>New York, NY</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {type === "facility" && (
          <TabsContent value="labs">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="mb-4">Associated Labs</h3>
              <p className="text-gray-500 text-sm">
                List of labs associated with this facility...
              </p>
            </div>
          </TabsContent>
        )}

        <TabsContent value="providers">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="mb-4">Providers</h3>
            <p className="text-gray-500 text-sm">
              Provider management and details...
            </p>
          </div>
        </TabsContent>

        <TabsContent value="orders">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="mb-4">All Orders</h3>
            <p className="text-gray-500 text-sm">
              Complete order history and management...
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
