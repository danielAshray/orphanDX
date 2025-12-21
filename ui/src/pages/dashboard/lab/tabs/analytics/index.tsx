import React from "react";
import { Card } from "@/components/card";
import { BarChart3, TrendingUp } from "lucide-react";
import { mockOrders } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { CustomBarChar, CustomLineChart, CustomPieChar } from "./components";

interface StatCardProps {
  label: string;
  value: number | string;
  isIncrease: boolean;
  comparison: string;
}

const Analytics: React.FC = () => {
  const clinicGroups = mockOrders.reduce((acc, order) => {
    acc[order.clinicName] = (acc[order.clinicName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

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

  const weeklyData = [
    { week: "Week 1", orders: 12, revenue: 3600 },
    { week: "Week 2", orders: 15, revenue: 4500 },
    { week: "Week 3", orders: 8, revenue: 2400 },
    { week: "Week 4", orders: 18, revenue: 5400 },
  ];

  const statsData = [
    {
      label: "Average Order Value",
      value: "$318",
      isIncrease: true,
      comparison: "12%",
    },
    {
      label: "Completion Rate",
      value: "94%",
      isIncrease: true,
      comparison: "3%",
    },
    {
      label: "Avg. Time to Complete",
      value: "4.2 days",
      isIncrease: false,
      comparison: "0.5 days",
    },
  ] as StatCardProps[];

  return (
    <>
      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CustomBarChar
          icon={<BarChart3 className="w-5 h-5 text-gray-600" />}
          title="Orders by Clinic"
          data={clinicData}
          barProps={{ dataKey: "orders", color: "#3b82f6" }}
        />

        <CustomPieChar
          icon={<BarChart3 className="w-5 h-5 text-gray-600" />}
          title="Order Status Distribution"
          data={statusData}
        />
      </div>

      {/* Charts Row 2 */}
      <CustomLineChart
        icon={<TrendingUp className="w-5 h-5 text-gray-600" />}
        title="Weekly Performance"
        data={weeklyData}
        lineProps={[
          {
            yAxisId: "left",
            dataKey: "orders",
            color: "blue",
            name: "Orders",
          },
          {
            yAxisId: "right",
            dataKey: "revenue",
            color: "green",
            name: "Revenue ($)",
          },
        ]}
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statsData.map((stat, index) => (
          <Card className="p-4" key={index}>
            <p className="text-sm text-gray-600">{stat.label}</p>
            <p className="text-gray-900 mt-1">{stat.value}</p>
            <p
              className={cn(
                "text-xs mt-1",
                stat.isIncrease ? "text-green-600" : "text-red-600"
              )}
            >
              {stat.isIncrease ? "↑" : "↓"} {stat.comparison} from last month
            </p>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Analytics;
