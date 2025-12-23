import type { PatientDetailsType } from "@/types";
import { Card } from "@/components/card";
import { Input } from "@/components";
import { Badge } from "@/components/badge";
import { ScrollArea } from "@/components/scrollArea";
import { Search, AlertCircle, CheckCircle, Calendar } from "lucide-react";
import { useState } from "react";

type PatientFilter = "all" | "candidates" | "scheduled" | "completed";

interface PatientListProps {
  patients: PatientDetailsType[];
  selectedPatient: PatientDetailsType | null;
  onSelectPatient: (patient: PatientDetailsType | null) => void;
  filter: PatientFilter;
}

const PatientList = ({
  patients,
  selectedPatient,
  onSelectPatient,
  filter,
}: PatientListProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.mrn.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    switch (filter) {
      case "candidates":
        return patient.recomendationCount;
      case "scheduled":
        return patient.scheduledCount > 0;
      case "completed":
        return patient.completedCount > 0;
      default:
        return true;
    }
  });

  const handlePatientClick = (patient: PatientDetailsType) => {
    if (selectedPatient?.id === patient.id) {
      onSelectPatient(null);
    } else {
      onSelectPatient(patient);
    }
  };

  const candidatePatients = filteredPatients.filter(
    (p) => p.recomendationCount > 0
  );
  const scheduledPatients = filteredPatients.filter(
    (p) => p.scheduledCount > 0
  );
  const completedPatients = filteredPatients.filter(
    (p) => p.completedCount > 0
  );
  const otherPatients = filteredPatients.filter(
    (p) => !p.recomendationCount && !p.scheduledCount && !p.completedCount
  );

  return (
    <Card className="flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-gray-900 mb-3">Patient List</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search by name or MRN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-320px)]">
        <div className="p-4 space-y-4">
          {(filter === "all" || filter === "candidates") &&
            candidatePatients.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-orange-600" />
                  <h3 className="text-sm text-gray-700">
                    Test Candidates ({candidatePatients.length})
                  </h3>
                </div>
                <div className="space-y-2">
                  {candidatePatients.map((patient) => (
                    <PatientCard
                      key={patient.id}
                      patient={patient}
                      isSelected={selectedPatient?.id === patient.id}
                      onClick={() => handlePatientClick(patient)}
                    />
                  ))}
                </div>
              </div>
            )}

          {(filter === "all" || filter === "scheduled") &&
            scheduledPatients.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <h3 className="text-sm text-gray-700">
                    Scheduled Tests ({scheduledPatients.length})
                  </h3>
                </div>
                <div className="space-y-2">
                  {scheduledPatients.map((patient) => (
                    <PatientCard
                      key={patient.id}
                      patient={patient}
                      isSelected={selectedPatient?.id === patient.id}
                      onClick={() => handlePatientClick(patient)}
                    />
                  ))}
                </div>
              </div>
            )}

          {(filter === "all" || filter === "completed") &&
            completedPatients.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <h3 className="text-sm text-gray-700">
                    Completed Tests ({completedPatients.length})
                  </h3>
                </div>
                <div className="space-y-2">
                  {completedPatients.map((patient) => (
                    <PatientCard
                      key={patient.id}
                      patient={patient}
                      isSelected={selectedPatient?.id === patient.id}
                      onClick={() => handlePatientClick(patient)}
                    />
                  ))}
                </div>
              </div>
            )}

          {filter === "all" && otherPatients.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-gray-400" />
                <h3 className="text-sm text-gray-700">
                  Other Patients ({otherPatients.length})
                </h3>
              </div>
              <div className="space-y-2">
                {otherPatients.map((patient) => (
                  <PatientCard
                    key={patient.id}
                    patient={patient}
                    isSelected={selectedPatient?.id === patient.id}
                    onClick={() => handlePatientClick(patient)}
                  />
                ))}
              </div>
            </div>
          )}

          {filteredPatients.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No patients found</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </Card>
  );
};

interface PatientCardProps {
  patient: PatientDetailsType;
  isSelected: boolean;
  onClick: () => void;
}

function PatientCard({ patient, isSelected, onClick }: PatientCardProps) {
  const hasScheduled = patient.scheduledCount > 0;
  const hasCompleted = patient.completedCount > 0;
  const hasRecommendation = patient.recomendationCount > 0;

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3 rounded-lg border transition-colors ${
        isSelected
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200 bg-white hover:bg-gray-50"
      } ${
        patient.recomendationCount > 0 ? "border-l-4 border-l-orange-500" : ""
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-gray-900">
              {patient.firstName} {patient.lastName}
            </p>
          </div>
          <p className="text-xs text-gray-500">MRN: {patient.mrn}</p>
        </div>
        <div className="flex flex-col gap-1 items-end">
          {hasScheduled && (
            <Badge
              variant="secondary"
              className="bg-blue-100 text-blue-700 border-blue-200"
            >
              Scheduled
            </Badge>
          )}
          {hasCompleted && (
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-700 border-green-200"
            >
              Results
            </Badge>
          )}
          {hasRecommendation && (
            <Badge
              variant="secondary"
              className="bg-purple-100 text-purple-700 border-purple-200"
            >
              {patient.recomendationCount} Test
              {patient.recomendationCount !== 1 ? "s" : ""}
            </Badge>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Badge variant="outline" className="text-xs">
          {patient.insurance?.type}
        </Badge>
      </div>

      {patient.diagnosis?.length > 0 && (
        <div className="mt-2">
          <p className="text-xs text-gray-500 line-clamp-1">
            {patient.diagnosis.map((d) => d.icd10).join(", ")}
          </p>
        </div>
      )}
    </button>
  );
}

export default PatientList;
