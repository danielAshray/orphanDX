import { useState } from "react";
import type { Patient } from "@/types";
import { Card } from "@/components/card";
import { Button } from "@/components/button";
import { Badge } from "@/components/badge";
import { ScrollArea } from "@/components/scrollArea";
import { Separator } from "@/components";
import { LabRequisition, LabResultsViewer } from "@/elements";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";
import {
  User,
  Calendar,
  CreditCard,
  FileText,
  Send,
  Check,
  AlertCircle,
  Phone,
  Mail,
  ClipboardList,
  AlertTriangle,
  Eye,
} from "lucide-react";

import { useCreateOrder } from "@/api/order";

interface PatientDetailsProps {
  patient: Patient;
}

const PatientDetails = ({ patient }: PatientDetailsProps) => {
  const [selectedRequisitionData, setSelectedRequisitionData] =
    useState<any>(null);
  const [showLabResults, setShowLabResults] = useState(false);
  const [selectedLabResult, setSelectedLabResult] = useState<any>(null);

  const { mutate, isPending } = useCreateOrder();

  const handleCreateOrder = async (testId: string) => {
    mutate(
      { recomendationId: testId },
      {
        onSuccess: (res) => {
          setSelectedRequisitionData(res.data);
        },
      }
    );
  };

  const handleViewResults = (completedTest: any) => {
    setSelectedLabResult(completedTest);
    setShowLabResults(true);
  };

  const allLabRecommendations = patient.labRecommendations;

  return (
    <>
      <Card className="flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-gray-900">
                {patient.firstName} {patient.lastName}
              </h2>
              <p className="text-sm text-gray-500">MRN: {patient.mrn}</p>
            </div>
            {patient.isCandidate && (
              <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                Test Candidate
              </Badge>
            )}
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-320px)]">
          <div className="p-4 space-y-6">
            {/* Demographics */}
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
                Active Diagnoses
              </h3>
              <div className="space-y-2">
                {patient.diagnoses?.map((diagnosis, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          {diagnosis.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          ICD-10: {diagnosis.icd10} • Onset:{" "}
                          {new Date(diagnosis.onsetDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {patient.completedCount && patient.completedCount > 0 && (
              <>
                <Separator />
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <ClipboardList className="w-4 h-4 text-green-600" />
                    <h3 className="text-sm text-gray-700">Completed Tests</h3>
                  </div>
                  <div className="space-y-3">
                    {patient.labOrder.map((test) => (
                      <div
                        key={test.id}
                        className={`p-4 rounded-lg border ${
                          test.testResult?.isNormal === false
                            ? "bg-red-50 border-red-200"
                            : "bg-green-50 border-green-200"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="text-gray-900">
                                {test.diagnosis?.name}
                              </p>
                              {test.testResult?.isNormal === false && (
                                <AlertTriangle className="w-4 h-4 text-red-600" />
                              )}
                            </div>
                            <p className="text-xs text-gray-600 mt-1">
                              Completed:{" "}
                              {new Date(test.updatedAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex flex-col gap-1 items-end">
                            {test.testResult?.isNormal === false && (
                              <Badge className="bg-red-100 text-red-700 border-red-200">
                                Abnormal
                              </Badge>
                            )}
                            {/* {test.hasNewRecommendations && (
                              <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                                New Tests Available
                              </Badge>
                            )} */}
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

            {patient.scheduledCount && patient.scheduledCount > 0 && (
              <>
                <Separator />
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <h3 className="text-sm text-gray-700">Scheduled Tests</h3>
                  </div>
                  <div className="space-y-3">
                    {/* {patient.scheduledTests.map((test) => (
                      <div
                        key={test.id}
                        className="p-4 bg-blue-50 border border-blue-200 rounded-lg"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-gray-900">{test.testName}</p>
                            <p className="text-xs text-gray-600 mt-1">
                              Scheduled:{" "}
                              {new Date(test.scheduledDate).toLocaleString()}
                            </p>
                          </div>
                          <Badge className="bg-blue-100 text-blue-700 border-blue-200 capitalize">
                            {test.status}
                          </Badge>
                        </div>
                      </div>
                    ))} */}
                  </div>
                </div>
              </>
            )}

            {allLabRecommendations.length > 0 && (
              <>
                <Separator />
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle className="w-4 h-4 text-orange-600" />
                    <h3 className="text-sm text-gray-700">Recommended Tests</h3>
                  </div>
                  <div className="space-y-3">
                    {allLabRecommendations.map((test) => (
                      <div
                        key={test.id}
                        className="p-4 bg-orange-50 border border-orange-200 rounded-lg"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <p className="text-gray-900">{test.title}</p>
                            <p className="text-xs text-gray-600 mt-1">
                              CPT: {test.code}
                            </p>
                          </div>
                          <Badge
                            className={
                              test.priority === "HIGH"
                                ? "bg-red-100 text-red-700 border-red-200"
                                : "bg-yellow-100 text-yellow-700 border-yellow-200"
                            }
                          >
                            {test.priority} priority
                          </Badge>
                        </div>

                        <div className="mt-3 p-3 bg-white rounded border border-orange-100">
                          <p className="text-sm text-gray-700 mb-2">Reason</p>
                          <p className="text-sm text-gray-900">{test.reason}</p>
                        </div>

                        <div className="mt-3 p-3 bg-green-50 rounded border border-green-200">
                          <div className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                            <div className="flex-1">
                              <p className="text-sm text-green-900">
                                {patient.insurance.plan}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-3">
                          <Button
                            onClick={() => handleCreateOrder(test.id)}
                            disabled={test.status !== "PENDING"}
                            className="w-full"
                          >
                            {isPending ? (
                              "Creating Order..."
                            ) : (
                              <>
                                <Send className="w-4 h-4 mr-2" />
                                Create Order & Generate Requisition
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </ScrollArea>
      </Card>

      {!!selectedRequisitionData && (
        <Dialog
          open={!!selectedRequisitionData}
          onOpenChange={() => setSelectedRequisitionData(null)}
        >
          <DialogContent className="max-w-6xl max-h-[95vh]">
            <DialogHeader>
              <DialogTitle>Lab Test Requisition</DialogTitle>
            </DialogHeader>

            <ScrollArea className="h-[calc(100vh-120px)]">
              <LabRequisition data={selectedRequisitionData} />
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={showLabResults} onOpenChange={setShowLabResults}>
        <DialogContent className="max-w-6xl max-h-[95vh]">
          <DialogHeader>
            <DialogTitle>Lab Test Results</DialogTitle>
          </DialogHeader>

          {selectedLabResult && (
            <ScrollArea className="h-[calc(100vh-120px)]">
              <LabResultsViewer result={selectedLabResult} />
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PatientDetails;
