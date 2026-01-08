import { useCreateOrder, useSimulateOrder } from "@/api/order";
import { fetchPatientDetailsApi } from "@/api/provider";
import { Separator } from "@/components";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";
import { ScrollArea } from "@/components/scrollArea";
import type { LabRecommendation, PatientDetailsType } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertCircle,
  AlertTriangle,
  Beaker,
  ClipboardList,
  Eye,
  FileText,
  Send,
} from "lucide-react";
import { useState } from "react";
import { OWLiverRequisition } from "@/elements";
import { config } from "@/config/env";

type DetailBoxProps = {
  patientId: string;
  handleCollectionDialog: (patient: PatientDetailsType) => void;
};

const DetailBox = ({ patientId, handleCollectionDialog }: DetailBoxProps) => {
  const [selectedLabResult, setSelectedLabResult] = useState<any>(null);
  const [selectedRequisitionData, setSelectedRequisitionData] =
    useState<any>(null);
  const { data: patientDetailsResp } = useQuery({
    queryKey: ["patientDetails", patientId],
    queryFn: () => fetchPatientDetailsApi(patientId),
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const patientDetails = (patientDetailsResp?.data || {}) as PatientDetailsType;

  const groupedRecomendations = Object.values(
    (patientDetails.labRecommendations || []).reduce((acc: any, rec) => {
      const key = `${rec.status}_${rec.labRule.labId}`;
      if (!acc[key]) {
        acc[key] = {
          status: rec.status,
          labId: rec.labRule.labId,
          labName: rec.labRule.lab.name,
          recommendations: [],
        };
      }
      acc[key].recommendations.push(rec);
      return acc;
    }, {})
  ) as {
    status: string;
    labId: string;
    labName: string;
    recommendations: LabRecommendation[];
  }[];

  const labOrder = patientDetails.labOrder || [];

  const scheduledTest = labOrder.filter((f) => f.status === "ORDERED");
  const completedTest = labOrder.filter((f) => f.status === "COMPLETED");
  const collectedTest = labOrder.filter((f) => f.status === "COLLECTED");
  const handleViewResults = (completedTest: any) => {
    setSelectedLabResult(completedTest.resultPdfUrl);
  };
  const { mutate: mutateSimulateOrder } = useSimulateOrder();
  const { mutate } = useCreateOrder();

  const queryClient = useQueryClient();

  const handleSimulateOrder = async (testIds: string[]) => {
    mutateSimulateOrder(
      { recomendationIds: testIds },
      {
        onSuccess: (res) => {
          setSelectedRequisitionData(res.data);
        },
      }
    );
  };

  const handleCreateOrder = async (testIds: string[]) => {
    mutate(
      { recomendationIds: testIds },
      {
        onSuccess: () => {
          setSelectedRequisitionData(null);
          queryClient.invalidateQueries({ queryKey: ["patientDetails"] });
          queryClient.invalidateQueries({ queryKey: ["fetchPatientsApi"] });
          queryClient.invalidateQueries({ queryKey: ["fetchFacilityStatApi"] });
        },
      }
    );
  };

  return (
    <>
      {!!selectedLabResult && (
        <Dialog open={true} onOpenChange={() => setSelectedLabResult(null)}>
          <DialogContent className="max-w-6xl sm:max-w-4xl max-h-[95vh]">
            <DialogHeader>
              <DialogTitle>Lab Test Results</DialogTitle>
              <DialogDescription />
            </DialogHeader>

            {selectedLabResult && (
              <ScrollArea className="h-[calc(100vh-120px)]">
                <iframe
                  src={`${config.BASE_UPLOAD_PATH}${selectedLabResult}`}
                  className="w-full h-[calc(100vh-140px)]"
                  style={{ border: "none" }}
                />
              </ScrollArea>
            )}
          </DialogContent>
        </Dialog>
      )}

      {!!selectedRequisitionData && (
        <Dialog
          open={!!selectedRequisitionData}
          onOpenChange={() => setSelectedRequisitionData(null)}
        >
          <DialogContent className="max-w-6xl sm:max-w-4xl max-h-[95vh]">
            <DialogHeader>
              <DialogTitle>Lab Test Requisition</DialogTitle>
              <DialogDescription />
            </DialogHeader>

            <ScrollArea className="h-[calc(100vh-180px)]">
              <OWLiverRequisition
                values={{
                  name: `${selectedRequisitionData.patient.firstName} ${selectedRequisitionData.patient.lastName}`,
                  ssn: "1234567890",
                  dob: selectedRequisitionData.patient.dateOfBirth,
                  sex: String("Male").toLowerCase(),
                  address: "Boradandi",
                  city: "Dhangadhi",
                  state: "Sudurpashchim",
                  zip: "10900",
                  phone: selectedRequisitionData.patient.phone,
                  email: selectedRequisitionData.patient.email,
                  race: String("Other").toLowerCase(),
                  ethnicity: String("N/A").toLowerCase(),
                  bmi: "10",
                  height: "6.9",
                  weight: "120",

                  collectorName: "Pawan Shahi",
                  fasting: true,
                  hrSinceLastMeal: "3h",
                  dateCollected: "2025/12/24",
                  timeCollected: "2025/12/24",
                  am: true,

                  icd10Codes: selectedRequisitionData.diagnosis.map(
                    (item: any) => item.diagnosis.icd10
                  ),
                  // icd10Codes: ["E78.5", "E11.65", "E13.8", "E13.9", "K75.81"],

                  patientSignature: `${selectedRequisitionData.patient.firstName} ${selectedRequisitionData.patient.lastName}`,
                  patientSDate: selectedRequisitionData.patient.createdAt,

                  providerSignature: selectedRequisitionData.facility.name,
                  providerSDate: "2025/12/24",
                }}
              />
            </ScrollArea>

            <DialogFooter className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setSelectedRequisitionData(null)}
              >
                Cancel
              </Button>
              <Button
                disabled={!selectedRequisitionData?.recomendationIds?.length}
                onClick={() =>
                  handleCreateOrder(selectedRequisitionData!.recomendationIds)
                }
              >
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {!!completedTest.length && (
        <>
          <Separator />
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ClipboardList className="w-4 h-4 text-green-600" />
              <h3 className="text-sm text-gray-700">Completed Tests</h3>
            </div>
            <div className="space-y-3">
              {completedTest.map((test) => (
                <div
                  key={test.id}
                  className={`p-4 rounded-lg border ${
                    test.results?.isNormal === false
                      ? "bg-red-50 border-red-200"
                      : "bg-green-50 border-green-200"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-gray-900">{test.testName}</p>
                        {test.results?.isNormal === false && (
                          <AlertTriangle className="w-4 h-4 text-red-600" />
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        Completed:{" "}
                        {new Date(test.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                      {test.results?.isNormal === false && (
                        <Badge className="bg-red-100 text-red-700 border-red-200">
                          Abnormal
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Button
                    onClick={() => handleViewResults(test)}
                    variant="outline"
                    size="sm"
                    className="w-full mt-2"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Results
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {!!scheduledTest.length && (
        <>
          <Separator />
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ClipboardList className="w-4 h-4 text-green-600" />
              <h3 className="text-sm text-gray-700">Scheduled Tests</h3>
            </div>
            <div className="space-y-3">
              {scheduledTest.map((test) => (
                <div
                  key={test.id}
                  className={`p-4 rounded-lg border ${
                    test.results?.isNormal === false
                      ? "bg-red-50 border-red-200"
                      : "bg-green-50 border-green-200"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-gray-900">
                          {test.tests.map((test) => test.testName).join(",")}
                        </p>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        Scheduled:{" "}
                        {new Date(test.createdAt).toLocaleDateString()}
                      </p>

                      <div className="mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full mt-2"
                          onClick={() => handleCollectionDialog(patientDetails)}
                        >
                          <Beaker className="w-4 h-4 mr-2" />
                          Record Collection
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {!!collectedTest.length && (
        <>
          <Separator />
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ClipboardList className="w-4 h-4 text-green-600" />
              <h3 className="text-sm text-gray-700">Collected Tests</h3>
            </div>
            <div className="space-y-3">
              {collectedTest.map((test) => (
                <div
                  key={test.id}
                  className={`p-4 rounded-lg border ${
                    test.results?.isNormal === false
                      ? "bg-red-50 border-red-200"
                      : "bg-yellow-50 border-yellow-200"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-gray-900">{test.testName}</p>
                        {test.results?.isNormal === false && (
                          <AlertTriangle className="w-4 h-4 text-red-600" />
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        CollectedAt:{" "}
                        {new Date(test.collectedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1 items-end"></div>
                  </div>

                  <Button variant="outline" size="sm" className="w-full mt-2">
                    <Beaker className="w-4 h-4 mr-2" />
                    Record Collected
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {groupedRecomendations.length > 0 && (
        <>
          <Separator />
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-4 h-4 text-orange-600" />
              <h3 className="text-sm text-gray-700">Recommended Tests</h3>
            </div>

            <div className="space-y-6">
              {groupedRecomendations.map((group, groupIndex) => (
                <div
                  key={groupIndex}
                  className="p-4 bg-orange-50 border border-orange-200 rounded-lg"
                >
                  <p className="text-sm text-gray-500 mb-3">
                    Lab: <span className="font-medium">{group.labName}</span>
                  </p>

                  <div className="space-y-4">
                    {group.recommendations.map((test) => (
                      <div
                        key={test.id}
                        className="p-3 bg-white rounded border border-orange-100"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <p className="text-gray-900">{test.testName}</p>
                            <p className="text-xs text-gray-600 mt-1">
                              CPT: {test.cptCode}
                            </p>
                          </div>
                        </div>

                        <div className="mt-2 p-2 bg-white rounded border border-orange-100">
                          <p className="text-sm text-gray-700 mb-1">Reason</p>
                          <p className="text-sm text-gray-900">{test.reason}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4">
                    {group.status === "PENDING" ? (
                      <Button
                        onClick={() =>
                          handleSimulateOrder(
                            group.recommendations.map((item) => item.id)
                          )
                        }
                        className="w-full"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Create Order & Generate Requisition
                      </Button>
                    ) : (
                      <Button variant="outline" className="w-full">
                        <FileText className="w-4 h-4 mr-2" />
                        View Requisition
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DetailBox;
