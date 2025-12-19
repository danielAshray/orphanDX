import { useState } from "react";
import { OrderTracking, PatientList, PatientDetails } from "@/elements";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { Card } from "@/components/card";
import { Button } from "@/components/button";
import { mockPatients, mockOrders } from "@/data/mockData";
import type { Patient } from "@/types";
import {
  Users,
  //   ClipboardList,
  AlertCircle,
  //   TrendingUp,
  Calendar,
  CheckCircle2,
} from "lucide-react";

type PatientFilter = "all" | "candidates" | "scheduled" | "completed";

const Provider = () => {

  
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patientFilter, setPatientFilter] = useState<PatientFilter>("all");

  // Filter patients based on selected filter
  // const getFilteredPatients = () => {
  //   switch (patientFilter) {
  //     case "candidates":
  //       return mockPatients.filter(
  //         (p) => p.isCandidate && p.recommendedTests.length > 0
  //       );
  //     case "scheduled":
  //       return mockPatients.filter(
  //         (p) => p.scheduledTests && p.scheduledTests.length > 0
  //       );
  //     case "completed":
  //       return mockPatients.filter(
  //         (p) => p.completedTests && p.completedTests.length > 0
  //       );
  //     default:
  //       return mockPatients;
  //   }
  // };

  // const filteredPatients = getFilteredPatients();

  // Calculate stats
  const candidateCount = mockPatients.filter(
    (p) => p.isCandidate && p.recommendedTests.length > 0
  ).length;
  const scheduledCount = mockPatients.filter(
    (p) => p.scheduledTests && p.scheduledTests.length > 0
  ).length;
  const completedCount = mockPatients.filter(
    (p) => p.completedTests && p.completedTests.length > 0
  ).length;
  // const abnormalCount = mockPatients.filter((p) =>
  //   p.completedTests?.some((t) => t.hasAbnormalResults)
  // ).length;

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-6">
      {/* Stats Overview */}
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

        <Card
          className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => setPatientFilter("candidates")}
        >
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

        <Card
          className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => setPatientFilter("scheduled")}
        >
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

        <Card
          className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => setPatientFilter("completed")}
        >
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

      {/* Main Content */}
      <Tabs defaultValue="patients" className="space-y-4">
        <TabsList>
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="patients" className="space-y-4">
          {/* Filter Buttons - Only for Patients */}
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={patientFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setPatientFilter("all")}
            >
              All Patients
            </Button>
            <Button
              variant={patientFilter === "candidates" ? "default" : "outline"}
              size="sm"
              onClick={() => setPatientFilter("candidates")}
              className="gap-2"
            >
              <AlertCircle className="w-4 h-4" />
              Test Candidates ({candidateCount})
            </Button>
            <Button
              variant={patientFilter === "scheduled" ? "default" : "outline"}
              size="sm"
              onClick={() => setPatientFilter("scheduled")}
              className="gap-2"
            >
              <Calendar className="w-4 h-4" />
              Scheduled ({scheduledCount})
            </Button>
            <Button
              variant={patientFilter === "completed" ? "default" : "outline"}
              size="sm"
              onClick={() => setPatientFilter("completed")}
              className="gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              Completed ({completedCount})
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Patient List */}
            <div className="lg:col-span-2">
              <PatientList
                patients={mockPatients}
                selectedPatient={selectedPatient}
                onSelectPatient={setSelectedPatient}
                filter={patientFilter}
              />
            </div>

            {/* Patient Details Panel */}
            <div className="lg:col-span-1">
              {selectedPatient ? (
                <PatientDetails patient={selectedPatient} />
              ) : (
                <Card className="p-8 text-center">
                  <div className="flex flex-col items-center gap-3 text-gray-500">
                    <Users className="w-12 h-12" />
                    <p>Select a patient to view details</p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="orders">
          <OrderTracking orders={mockOrders} viewMode="provider" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Provider;
