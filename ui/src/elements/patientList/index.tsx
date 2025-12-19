import type { Patient } from "@/types";
import { Card } from "@/components/card";
import { Input } from "@/components";
import { Badge } from "@/components/badge";
import { ScrollArea } from "@/components/scrollArea";
import {
  Search,
  AlertCircle,
  CheckCircle,
  Calendar,
  AlertTriangle,
} from "lucide-react";
import { useState } from "react";

type PatientFilter = "all" | "candidates" | "scheduled" | "completed";

interface PatientListProps {
  patients: Patient[];
  selectedPatient: Patient | null;
  onSelectPatient: (patient: Patient | null) => void;
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
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.mrn.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    switch (filter) {
      case "candidates":
        return patient.isCandidate;
      case "scheduled":
        return patient.scheduledTests && patient.scheduledTests.length > 0;
      case "completed":
        return patient.completedTests && patient.completedTests.length > 0;
      default:
        return true;
    }
  });

  const handlePatientClick = (patient: Patient) => {
    if (selectedPatient?.id === patient.id) {
      onSelectPatient(null);
    } else {
      onSelectPatient(patient);
    }
  };

  const candidatePatients = filteredPatients.filter((p) => p.isCandidate);
  const scheduledPatients = filteredPatients.filter(
    (p) => p.scheduledTests && p.scheduledTests.length > 0 && !p.isCandidate
  );
  const completedPatients = filteredPatients.filter(
    (p) =>
      p.completedTests &&
      p.completedTests.length > 0 &&
      !p.isCandidate &&
      !(p.scheduledTests && p.scheduledTests.length > 0)
  );
  const otherPatients = filteredPatients.filter(
    (p) =>
      !p.isCandidate &&
      (!p.scheduledTests || p.scheduledTests.length === 0) &&
      (!p.completedTests || p.completedTests.length === 0)
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
  patient: Patient;
  isSelected: boolean;
  onClick: () => void;
}

function PatientCard({ patient, isSelected, onClick }: PatientCardProps) {
  const hasScheduled =
    patient.scheduledTests && patient.scheduledTests.length > 0;
  const hasCompleted =
    patient.completedTests && patient.completedTests.length > 0;
  const hasAbnormalResults = patient.completedTests?.some(
    (t) => t.hasAbnormalResults
  );
  const hasNewRecommendations = patient.completedTests?.some(
    (t) => t.hasNewRecommendations
  );

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3 rounded-lg border transition-colors ${
        isSelected
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200 bg-white hover:bg-gray-50"
      } ${patient.isCandidate ? "border-l-4 border-l-orange-500" : ""}`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-gray-900">{patient.name}</p>
            {hasAbnormalResults && (
              <AlertTriangle className="w-4 h-4 text-red-600" />
            )}
          </div>
          <p className="text-xs text-gray-500">MRN: {patient.mrn}</p>
        </div>
        <div className="flex flex-col gap-1 items-end">
          {patient.isCandidate && (
            <Badge
              variant="secondary"
              className="bg-orange-100 text-orange-700 border-orange-200"
            >
              {patient.recommendedTests.length} Test
              {patient.recommendedTests.length !== 1 ? "s" : ""}
            </Badge>
          )}
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
          {hasNewRecommendations && (
            <Badge
              variant="secondary"
              className="bg-purple-100 text-purple-700 border-purple-200"
            >
              New Tests
            </Badge>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-gray-600">
          {patient.age}yo • {patient.demographics.gender}
        </span>
        <Badge variant="outline" className="text-xs">
          {patient.insurance.type}
        </Badge>
      </div>

      {patient.diagnoses.length > 0 && (
        <div className="mt-2">
          <p className="text-xs text-gray-500 line-clamp-1">
            {patient.diagnoses.map((d) => d.code).join(", ")}
          </p>
        </div>
      )}
    </button>
  );
}

export default PatientList;
