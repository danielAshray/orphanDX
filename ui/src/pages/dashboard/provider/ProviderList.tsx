import { fetchPatientsApi } from "@/api/provider";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { PatientDetails, PatientList } from "@/elements";
import type { Patient } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, Calendar, CheckCircle2, Users } from "lucide-react";
import { useState } from "react";
type PatientFilter = "all" | "candidates" | "scheduled" | "completed";

type ProviderListProps = {
  candidateCount: number;
  scheduledCount: number;
  completedCount: number;
};
const ProviderList = ({
  candidateCount = 0,
  completedCount = 0,
  scheduledCount = 0,
}: ProviderListProps) => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patientFilter, setPatientFilter] = useState<PatientFilter>("all");

  const { data: details } = useQuery({
    queryKey: ["fetchPatientsApi"],
    queryFn: fetchPatientsApi,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  return (
    <>
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
            patients={[]}
            selectedPatient={selectedPatient}
            onSelectPatient={setSelectedPatient}
            filter={patientFilter}
          />
        </div>

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
    </>
  );
};

export default ProviderList;
