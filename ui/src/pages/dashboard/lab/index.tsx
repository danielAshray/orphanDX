import type { ReactNode } from "react";
import { Card } from "@/components/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { TrendingUp, Building2, ClipboardList, DollarSign } from "lucide-react";
import { Analytics, Orders } from "./tabs";

interface StatCardProps {
  label: string;
  value: number | string;
  icon: ReactNode;
}

const Lab = () => {
  const {
    totalOrders = 0,
    activeOrders = 0,
    partnerClinics = 0,
    monthlyRevenue = 0,
  } = {};

  const statsData = [
    {
      label: "Total Orders",
      value: totalOrders,
      icon: (
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <ClipboardList className="w-5 h-5 text-blue-600" />
        </div>
      ),
    },
    {
      label: "Active Orders",
      value: activeOrders,
      icon: (
        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-orange-600" />
        </div>
      ),
    },
    {
      label: "Partner Clinics",
      value: partnerClinics,
      icon: (
        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
          <Building2 className="w-5 h-5 text-purple-600" />
        </div>
      ),
    },
    {
      label: "Monthly Revenue",
      value: monthlyRevenue,
      icon: (
        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
          <DollarSign className="w-5 h-5 text-green-600" />
        </div>
      ),
    },
  ] as StatCardProps[];

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {statsData.map((stat, index) => (
          <Card className="p-4" key={index}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-gray-900 mt-1">{stat.value}</p>
              </div>
              {stat.icon}
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList>
          <TabsTrigger value="orders">All Orders</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          <Orders />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Analytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Lab;
