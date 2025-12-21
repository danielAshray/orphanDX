import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { Card } from "@/components/card";
import { Users, Calendar, CheckCircle2 } from "lucide-react";
import { useState, type ReactNode } from "react";
import { OrderTracking, ProviderList } from "./tabs";
import { fetchFacilityStatApi } from "@/api/stat";
import { useQuery } from "@tanstack/react-query";

interface StatCardProps {
  label: string;
  value: number | string;
  icon: ReactNode;
}

const Provider = () => {
  const [activeTab, setActiveTab] = useState("patients");

  const { data: statusRes } = useQuery({
    queryKey: ["fetchFacilityStatApi"],
    queryFn: fetchFacilityStatApi,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const {
    patientCount = 0,
    scheduledTestCount = 0,
    completedTestCount = 0,
  } = statusRes?.data || {};

  const statsData = [
    {
      label: "Total Patients",
      value: patientCount,
      icon: (
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <Users className="w-5 h-5 text-blue-600" />
        </div>
      ),
    },

    {
      label: "Scheduled Tests",
      value: scheduledTestCount,
      icon: (
        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
          <Calendar className="w-5 h-5 text-orange-600" />
        </div>
      ),
    },
    {
      label: "Completed Tests",
      value: completedTestCount,
      icon: (
        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
        </div>
      ),
    },
  ] as StatCardProps[];

  return (
    <div className="max-w-[1600px] mx-auto px-6">
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

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="patients" className="space-y-4">
          <ProviderList
            scheduledTestCount={scheduledTestCount}
            completedTestCount={completedTestCount}
          />
        </TabsContent>

        <TabsContent value="orders">
          <OrderTracking />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Provider;
