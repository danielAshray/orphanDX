import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";
import { Badge } from "@/components/badge";
import { Card } from "@/components/card";
import type { Order } from "@/types";
import {
  //   Calendar,
  FileText,
  //   AlertCircle,
  TrendingUp,
  Activity,
} from "lucide-react";

interface ViewResultsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order | null;
}

const ViewResultsDialog = ({
  open,
  onOpenChange,
  order,
}: ViewResultsDialogProps) => {
  if (!order || !order.labResult) {
    return null;
  }

  const { labResult } = order;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Lab Results - {order.testName}</DialogTitle>
          <DialogDescription>
            Order ID: {order.id} | Patient: {order.patientName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Order Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-600">Test Code</p>
                <p className="text-gray-900">{order.testCode}</p>
              </div>
              <div>
                <p className="text-gray-600">Status</p>
                <Badge variant="default">Completed</Badge>
              </div>
              <div>
                <p className="text-gray-600">Provider</p>
                <p className="text-gray-900">{order.providerName}</p>
              </div>
              <div>
                <p className="text-gray-600">Completed Date</p>
                <p className="text-gray-900">
                  {new Date(labResult.completedDate).toLocaleDateString()} at{" "}
                  {new Date(labResult.completedDate).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>

          {/* Test Results */}
          <div>
            <h4 className="text-gray-900 mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Test Results
            </h4>
            <div className="space-y-2">
              {labResult.results.map((result, index) => (
                <Card
                  key={index}
                  className={`p-4 ${
                    result.flag === "high" || result.flag === "low"
                      ? "border-orange-200 bg-orange-50"
                      : result.flag === "critical"
                      ? "border-red-200 bg-red-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-gray-900">{result.name}</p>
                        {result.flag && (
                          <Badge
                            variant={
                              result.flag === "critical"
                                ? "destructive"
                                : result.flag === "high" ||
                                  result.flag === "low"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {result.flag.toUpperCase()}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Reference Range: {result.referenceRange}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg text-gray-900">{result.value}</p>
                      <p className="text-sm text-gray-600">{result.unit}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Interpretation */}
          {labResult.interpretation && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="text-gray-900 mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Clinical Interpretation
              </h4>
              <p className="text-gray-700">{labResult.interpretation}</p>
            </div>
          )}

          {/* Recommended Follow-up */}
          {labResult.recommendedFollowUp &&
            labResult.recommendedFollowUp.length > 0 && (
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="text-gray-900 mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Recommended Follow-up
                </h4>
                <ul className="space-y-1">
                  {labResult.recommendedFollowUp.map((item, index) => (
                    <li
                      key={index}
                      className="text-gray-700 flex items-start gap-2"
                    >
                      <span className="text-purple-600 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          {/* Report Download (Placeholder) */}
          {labResult.reportUrl && (
            <div className="flex justify-center pt-4">
              <a
                href={labResult.reportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 underline"
              >
                Download Full PDF Report
              </a>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewResultsDialog;
