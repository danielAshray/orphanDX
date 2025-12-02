// import { useState } from "react";
import { OrderTracking } from "@/elements";
import { Card } from "@/components/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { mockOrders } from "@/data/mockData";
import {
  TrendingUp,
  Building2,
  ClipboardList,
  DollarSign,
  BarChart3,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Lab = () => {
  const totalOrders = mockOrders.length;
  const activeOrders = mockOrders.filter((o) =>
    ["pending", "sent", "scheduled", "collected", "in-progress"].includes(
      o.status
    )
  ).length;
  //   const completedOrders = mockOrders.filter(
  //     (o) => o.status === "completed"
  //   ).length;

  // Group orders by clinic
  const clinicGroups = mockOrders.reduce((acc, order) => {
    acc[order.clinicName] = (acc[order.clinicName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const uniqueClinics = Object.keys(clinicGroups).length;

  // Chart data
  const clinicData = Object.entries(clinicGroups).map(([name, count]) => ({
    name,
    orders: count,
  }));

  const statusData = [
    {
      name: "Completed",
      value: mockOrders.filter((o) => o.status === "completed").length,
    },
    {
      name: "In Progress",
      value: mockOrders.filter((o) => o.status === "in-progress").length,
    },
    {
      name: "Scheduled",
      value: mockOrders.filter((o) => o.status === "scheduled").length,
    },
    {
      name: "Pending",
      value: mockOrders.filter((o) => ["pending", "sent"].includes(o.status))
        .length,
    },
  ];

  const COLORS = ["#10b981", "#f59e0b", "#8b5cf6", "#6b7280"];

  const weeklyData = [
    { week: "Week 1", orders: 12, revenue: 3600 },
    { week: "Week 2", orders: 15, revenue: 4500 },
    { week: "Week 3", orders: 8, revenue: 2400 },
    { week: "Week 4", orders: 18, revenue: 5400 },
  ];

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-gray-900 mt-1">{totalOrders}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Orders</p>
              <p className="text-gray-900 mt-1">{activeOrders}</p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Partner Clinics</p>
              <p className="text-gray-900 mt-1">{uniqueClinics}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Monthly Revenue</p>
              <p className="text-gray-900 mt-1">$16,900</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList>
          <TabsTrigger value="orders">All Orders</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          <OrderTracking orders={mockOrders} viewMode="lab" />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-gray-600" />
                <h3 className="text-gray-900">Orders by Clinic</h3>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={clinicData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="orders" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-gray-600" />
                <h3 className="text-gray-900">Order Status Distribution</h3>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent! * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((_entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Charts Row 2 */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-gray-600" />
              <h3 className="text-gray-900">Weekly Performance</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="orders"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Orders"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Revenue ($)"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4">
              <p className="text-sm text-gray-600">Average Order Value</p>
              <p className="text-gray-900 mt-1">$318</p>
              <p className="text-xs text-green-600 mt-1">
                ↑ 12% from last month
              </p>
            </Card>

            <Card className="p-4">
              <p className="text-sm text-gray-600">Completion Rate</p>
              <p className="text-gray-900 mt-1">94%</p>
              <p className="text-xs text-green-600 mt-1">
                ↑ 3% from last month
              </p>
            </Card>

            <Card className="p-4">
              <p className="text-sm text-gray-600">Avg. Time to Complete</p>
              <p className="text-gray-900 mt-1">4.2 days</p>
              <p className="text-xs text-green-600 mt-1">
                ↓ 0.5 days from last month
              </p>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Lab;
