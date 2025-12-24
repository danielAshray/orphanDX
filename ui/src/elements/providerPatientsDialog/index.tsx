import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";
import { Badge } from "@/components/badge";
import { Card } from "@/components/card";
import type { Provider, Patient } from "@/types";
import { Users, Calendar, Activity } from "lucide-react";

interface ProviderPatientsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  provider: Provider | null;
  patients: Patient[];
}

const ProviderPatientsDialog = ({
  open,
  onOpenChange,
  provider,
  patients,
}: ProviderPatientsDialogProps) => {
  if (!provider) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{provider.name} - Patients</DialogTitle>
          <DialogDescription>
            {provider.specialty} | NPI: {provider.npi}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-4">
          {patients.length === 0 ? (
            <Card className="p-8 text-center text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-2 text-gray-400" />
              <p>No patients found for this provider</p>
            </Card>
          ) : (
            patients.map((patient) => (
              <Card key={patient.id} className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-gray-900">{patient.name}</p>
                    <p className="text-sm text-gray-600">MRN: {patient.mrn}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Age: {patient.age}</p>
                    <p className="text-sm text-gray-600">
                      {patient.demographics.gender}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="text-xs">
                    <p className="text-gray-600">Insurance</p>
                    <p className="text-gray-900">
                      {patient.insurance.provider}
                    </p>
                  </div>
                  <div className="text-xs">
                    <p className="text-gray-600">Last Visit</p>
                    <p className="text-gray-900 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(patient.lastVisit).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {patient.diagnoses.length > 0 && (
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <p className="text-xs text-gray-600 mb-1">Diagnoses:</p>
                    <div className="flex flex-wrap gap-1">
                      {patient.diagnoses.map((diagnosis, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {diagnosis.code}: {diagnosis.description}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 mt-3 text-xs">
                  {patient.isCandidate && (
                    <Badge variant="outline" className="gap-1">
                      <Activity className="w-3 h-3" />
                      Test Candidate
                    </Badge>
                  )}
                  {patient.completedTests &&
                    patient.completedTests.length > 0 && (
                      <Badge variant="outline">
                        {patient.completedTests.length} Completed Tests
                      </Badge>
                    )}
                  {patient.scheduledTests &&
                    patient.scheduledTests.length > 0 && (
                      <Badge variant="outline">
                        {patient.scheduledTests.length} Scheduled
                      </Badge>
                    )}
                </div>
              </Card>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProviderPatientsDialog;
