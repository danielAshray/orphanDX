import { useState } from "react";
import type { Patient } from "@/types";
import { Card } from "@/components/card";
import { Button } from "@/components/button";
import { Badge } from "@/components/badge";
import { ScrollArea } from "@/components/scrollArea";
import { Separator } from "@/components";
import LabRequisition from "../labRequisition";
import LabResultsViewer from "../labResultsViewer";
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
import { toast } from "sonner";

interface PatientDetailsProps {
  patient: Patient;
}

const PatientDetails = ({ patient }: PatientDetailsProps) => {
  const [processingTestId, setProcessingTestId] = useState<string | null>(null);
  const [showRequisition, setShowRequisition] = useState(false);
  const [selectedRequisitionData, setSelectedRequisitionData] =
    useState<any>(null);
  const [showLabResults, setShowLabResults] = useState(false);
  const [selectedLabResult, setSelectedLabResult] = useState<any>(null);

  const handleCreateOrder = async (
    testId: string,
    testName: string,
    testCode: string
  ) => {
    setProcessingTestId(testId);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Generate order data for requisition
    const orderData = {
      orderId: `ORD-${Date.now().toString().slice(-6)}`,
      patient: patient,
      test: {
        name: testName,
        code: testCode,
        id: testId,
      },
      provider: {
        name: "Dr. James Smith",
        npi: "NPI-123456789",
        phone: "(555) 100-2000",
      },
      clinic: {
        name: "Riverside Medical Center",
        address: "123 Medical Plaza, Suite 100",
        city: "Springfield",
        state: "IL",
        zip: "62701",
        phone: "(555) 100-1000",
      },
    };

    setSelectedRequisitionData(orderData);
    setShowRequisition(true);

    toast.success(`Order created for ${testName}`, {
      description: "Requisition generated and sent to EHR",
    });

    setProcessingTestId(null);
  };

  const handleViewResults = (completedTest: any) => {
    setSelectedLabResult(completedTest.result);
    setShowLabResults(true);
  };

  return (
    <>
      <Card className="flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-gray-900">{patient.name}</h2>
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
                  <p className="text-gray-900">{patient.dob}</p>
                </div>
                <div>
                  <p className="text-gray-500">Age</p>
                  <p className="text-gray-900">{patient.age} years</p>
                </div>
                <div>
                  <p className="text-gray-500">Gender</p>
                  <p className="text-gray-900">{patient.demographics.gender}</p>
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
                  <span className="text-gray-900">
                    {patient.demographics.phone}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900">
                    {patient.demographics.email}
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Insurance */}
            <div>
              <h3 className="text-sm text-gray-700 mb-3 flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Insurance Information
              </h3>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-gray-500">Provider</p>
                  <p className="text-gray-900">{patient.insurance.provider}</p>
                </div>
                <div>
                  <p className="text-gray-500">Plan</p>
                  <p className="text-gray-900">{patient.insurance.planName}</p>
                </div>
                <div>
                  <p className="text-gray-500">Member ID</p>
                  <p className="text-gray-900">{patient.insurance.memberId}</p>
                </div>
                <Badge variant="outline" className="mt-1">
                  {patient.insurance.type}
                </Badge>
              </div>
            </div>

            <Separator />

            {/* Diagnoses */}
            <div>
              <h3 className="text-sm text-gray-700 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Active Diagnoses
              </h3>
              <div className="space-y-2">
                {patient.diagnoses.map((diagnosis, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          {diagnosis.description}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          ICD-10: {diagnosis.code} • Onset:{" "}
                          {new Date(diagnosis.onsetDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Completed Tests */}
            {patient.completedTests && patient.completedTests.length > 0 && (
              <>
                <Separator />
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <ClipboardList className="w-4 h-4 text-green-600" />
                    <h3 className="text-sm text-gray-700">Completed Tests</h3>
                  </div>
                  <div className="space-y-3">
                    {patient.completedTests.map((test) => (
                      <div
                        key={test.id}
                        className={`p-4 rounded-lg border ${
                          test.hasAbnormalResults
                            ? "bg-red-50 border-red-200"
                            : "bg-green-50 border-green-200"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="text-gray-900">{test.testName}</p>
                              {test.hasAbnormalResults && (
                                <AlertTriangle className="w-4 h-4 text-red-600" />
                              )}
                            </div>
                            <p className="text-xs text-gray-600 mt-1">
                              Completed:{" "}
                              {new Date(
                                test.completedDate
                              ).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex flex-col gap-1 items-end">
                            {test.hasAbnormalResults && (
                              <Badge className="bg-red-100 text-red-700 border-red-200">
                                Abnormal
                              </Badge>
                            )}
                            {test.hasNewRecommendations && (
                              <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                                New Tests Available
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

            {/* Scheduled Tests */}
            {patient.scheduledTests && patient.scheduledTests.length > 0 && (
              <>
                <Separator />
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <h3 className="text-sm text-gray-700">Scheduled Tests</h3>
                  </div>
                  <div className="space-y-3">
                    {patient.scheduledTests.map((test) => (
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
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Recommended Tests */}
            {patient.recommendedTests.length > 0 && (
              <>
                <Separator />
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle className="w-4 h-4 text-orange-600" />
                    <h3 className="text-sm text-gray-700">Recommended Tests</h3>
                  </div>
                  <div className="space-y-3">
                    {patient.recommendedTests.map((test) => (
                      <div
                        key={test.id}
                        className="p-4 bg-orange-50 border border-orange-200 rounded-lg"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <p className="text-gray-900">{test.testName}</p>
                            <p className="text-xs text-gray-600 mt-1">
                              CPT: {test.cptCode}
                            </p>
                          </div>
                          <Badge
                            className={
                              test.priority === "high"
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
                                {test.payerCoverage.notes}
                              </p>
                              {test.payerCoverage.requiresAuth && (
                                <p className="text-xs text-green-700 mt-1">
                                  ⚠ Prior authorization required
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="mt-3">
                          <Button
                            onClick={() =>
                              handleCreateOrder(
                                test.id,
                                test.testName,
                                test.testCode
                              )
                            }
                            disabled={processingTestId === test.id}
                            className="w-full"
                          >
                            {processingTestId === test.id ? (
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

      {/* Lab Requisition Dialog */}
      <Dialog open={showRequisition} onOpenChange={setShowRequisition}>
        <DialogContent className="max-w-6xl max-h-[95vh]">
          <DialogHeader>
            <DialogTitle>Lab Test Requisition</DialogTitle>
          </DialogHeader>

          {selectedRequisitionData && (
            <ScrollArea className="h-[calc(100vh-120px)]">
              <LabRequisition data={selectedRequisitionData} />
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>

      {/* Lab Results Dialog */}
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
