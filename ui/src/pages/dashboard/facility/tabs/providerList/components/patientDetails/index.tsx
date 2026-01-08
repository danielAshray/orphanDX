import type { PatientDetailsType } from "@/types";
import { Card } from "@/components/card";
import { Badge } from "@/components/badge";
import { ScrollArea } from "@/components/scrollArea";
import { Separator } from "@/components";
import { User, CreditCard, FileText, Phone, Mail, Plus } from "lucide-react";

import DetailBox from "./DetailBox";
import { Button } from "@/components/button";
import ManualOrderDialog from "./ManualOrderDialog";
import { useState } from "react";
import {
  SpecimenCollectionDialog,
  type CollectionData,
} from "./SpecimenCollectionDialog";
import { useTestCollectionByFacility } from "@/api/order";
import { useQueryClient } from "@tanstack/react-query";

const PatientDetails = ({ patient }: { patient: PatientDetailsType }) => {
  const [showManualOrderModal, setShowManualOrderModal] =
    useState<boolean>(false);

  const [showCollectionDialog, setShowCollectionDialog] = useState(false);
  const [selectedOrderForCollection, setSelectedOrderForCollection] =
    useState<PatientDetailsType | null>(null);

  const handleCollectionDialog = (patient: PatientDetailsType) => {
    if (patient) {
      setSelectedOrderForCollection(patient);
      setShowCollectionDialog(true);
    }
  };

  const testCollectionMutation = useTestCollectionByFacility();

  const queryClient = useQueryClient();

  const handleCollectionComplete = (
    orderId: string,
    collectionData: CollectionData
  ) => {
    testCollectionMutation.mutate(
      {
        orderId,
        collectedAt: collectionData.collectedAt,
        collectedBy: collectionData.collectedBy,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["fetchFacilityStatApi"] });
          queryClient.invalidateQueries({ queryKey: ["fetchPatientsApi"] });
        },
      }
    );
  };

  return (
    <>
      {/* Specimen Collection Dialog */}
      {selectedOrderForCollection && (
        <SpecimenCollectionDialog
          open={showCollectionDialog}
          onOpenChange={setShowCollectionDialog}
          patientDetails={selectedOrderForCollection}
          onCollectionComplete={handleCollectionComplete}
        />
      )}

      {showManualOrderModal && (
        <ManualOrderDialog
          open={showManualOrderModal}
          onOpenChange={setShowManualOrderModal}
          preselectedPatient={patient}
        />
      )}

      <Card className="flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div>
            <h2 className="text-gray-900">
              {patient.lastName} {patient.firstName}
            </h2>
            <p className="text-sm text-gray-500">MRN: {patient.mrn}</p>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-320px)]">
          <div className="p-4 space-y-6">
            <div>
              <h3 className="text-sm text-gray-700 mb-3 flex items-center gap-2">
                <User className="w-4 h-4" />
                Demographics
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-500">Date of Birth</p>
                  <p className="text-gray-900">{patient.dateOfBirth}</p>
                </div>

                <div>
                  <p className="text-gray-500">Gender</p>
                  <p className="text-gray-900">{patient.gender}</p>
                </div>
                <div>
                  <p className="text-gray-500">Last Visit</p>
                  <p className="text-gray-900">
                    {new Date(patient.lastVisit).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900">{patient.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900">{patient.email}</span>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm text-gray-700 mb-3 flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Insurance Information
              </h3>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-gray-500">Provider</p>
                  <p className="text-gray-900">{patient.insurance?.provider}</p>
                </div>
                <div>
                  <p className="text-gray-500">Plan</p>
                  <p className="text-gray-900">{patient.insurance?.plan}</p>
                </div>
                <div>
                  <p className="text-gray-500">Member ID</p>
                  <p className="text-gray-900">{patient.insurance?.memberId}</p>
                </div>
                <Badge variant="outline" className="mt-1">
                  {patient.insurance?.plan}
                </Badge>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm text-gray-700 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Active Diagnosis
              </h3>
              <div className="space-y-2">
                {patient.diagnosis?.map((diagnosis, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          {diagnosis.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {`ICD-10: ${diagnosis.icd10} • Onset: ${new Date(
                            diagnosis.onsetDate
                          ).toLocaleDateString()}`}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <DetailBox
              patientId={patient.id}
              handleCollectionDialog={handleCollectionDialog}
            />

            {patient.labOrder && patient.labOrder.length === 0 && (
              <Button
                onClick={() => setShowManualOrderModal(true)}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Manual Order
              </Button>
            )}
          </div>
        </ScrollArea>
      </Card>
    </>
  );
};

export default PatientDetails;
