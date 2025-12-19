import { OrderTracking } from "@/elements";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { Card } from "@/components/card";
import { mockPatients, mockOrders } from "@/data/mockData";
import { Users, AlertCircle, Calendar, CheckCircle2 } from "lucide-react";
import ProviderList from "./ProviderList";

const Provider = () => {
  const candidateCount = mockPatients.filter(
    (p) => p.isCandidate && p.recommendedTests.length > 0
  ).length;
  const scheduledCount = mockPatients.filter(
    (p) => p.scheduledTests && p.scheduledTests.length > 0
  ).length;
  const completedCount = mockPatients.filter(
    (p) => p.completedTests && p.completedTests.length > 0
  ).length;

  return (
    <div className="max-w-[1600px] mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Patients</p>
              <p className="text-gray-900 mt-1">{mockPatients.length}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4 cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Test Candidates</p>
              <p className="text-gray-900 mt-1">{candidateCount}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4 cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Scheduled Tests</p>
              <p className="text-gray-900 mt-1">{scheduledCount}</p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4 cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed Tests</p>
              <p className="text-gray-900 mt-1">{completedCount}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="patients" className="space-y-4">
        <TabsList>
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="patients">
          <ProviderList
            scheduledCount={scheduledCount}
            candidateCount={candidateCount}
            completedCount={completedCount}
          />
        </TabsContent>

        <TabsContent value="orders">
          <OrderTracking orders={mockOrders} viewMode="provider" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Provider;
