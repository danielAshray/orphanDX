import { fetchDetailsApi } from "@/api/admin";
import { Card } from "@/components/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { useQuery } from "@tanstack/react-query";
import {
  Activity,
  Building2,
  ClipboardList,
  FlaskConical,
  Users,
} from "lucide-react";
import React, { useState, type ReactNode } from "react";
import { Facilities, Labs, Orders, Overview, Providers } from "./tabs";

interface StatCardProps {
  label: string;
  value: number | string;
  icon: ReactNode;
}

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const { data: details } = useQuery({
    queryKey: ["fetchDetailsApi"],
    queryFn: fetchDetailsApi,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const {
    totalFacilities = 0,
    totalLabs = 0,
    totalProviders = 0,
    totalPatients = 0,
    totalOrders = 0,
    completedOrders = 0,
  } = details?.data || {};

  const statsData = [
    {
      label: "Facilities",
      value: totalFacilities,
      icon: <Building2 className="w-5 h-5 text-blue-600" />,
    },
    {
      label: "Labs",
      value: totalLabs,
      icon: <FlaskConical className="w-5 h-5 text-purple-600" />,
    },
    {
      label: "Providers",
      value: totalProviders,
      icon: <Users className="w-5 h-5 text-green-600" />,
    },
    {
      label: "Patients",
      value: totalPatients,
      icon: <Activity className="w-5 h-5 text-orange-600" />,
    },
    {
      label: "Total Orders",
      value: totalOrders,
      icon: <ClipboardList className="w-5 h-5 text-indigo-600" />,
    },
    {
      label: "Completed",
      value: completedOrders,
      icon: <ClipboardList className="w-5 h-5 text-emerald-600" />,
    },
  ] as StatCardProps[];

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
        {statsData.map((stat, index) => (
          <Card className="p-6" key={index}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">{stat.label}</span>
              {stat.icon}
            </div>
            <p className="text-gray-900">{stat.value}</p>
          </Card>
        ))}
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
          <Overview />
        </TabsContent>

        <TabsContent value="facilities">
          <Facilities />
        </TabsContent>

        <TabsContent value="labs">
          <Labs />
        </TabsContent>

        <TabsContent value="providers">
          <Providers />
        </TabsContent>

        <TabsContent value="orders">
          <Orders />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
