import type { LabResult } from "@/types";
import { Card } from "@/components/card";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { Separator } from "@/components";
import {
  Download,
  Printer,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { toast } from "sonner";

interface LabResultsViewerProps {
  result: LabResult;
}

const LabResultsViewer = ({ result }: LabResultsViewerProps) => {
  console.log({ view: result });
  const handlePrint = () => {
    window.print();
    toast.success("Print dialog opened");
  };

  const handleDownload = () => {
    toast.success("Lab results downloaded as PDF");
  };

  const hasAbnormalResults = result?.testResult?.result.some(
    (r) => r.status === "high" || r.status === "low" || r.status === "critical"
  );

  return (
    <div className="space-y-4">
      {/* Action Buttons */}
      <div className="flex gap-2 print:hidden">
        <Button onClick={handlePrint} className="gap-2">
          <Printer className="w-4 h-4" />
          Print
        </Button>
        <Button onClick={handleDownload} variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Download PDF
        </Button>
      </div>

      {/* Results Report */}
      <Card className="p-8 bg-white">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">O</span>
            </div>
            <div>
              <h1 className="text-gray-900">OrphanDX</h1>
              <p className="text-sm text-gray-600">Laboratory Test Results</p>
            </div>
          </div>
          <Separator className="my-4" />
        </div>

        {/* Test Information */}
        <div className="mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Test Name</p>
                <p className="text-gray-900">{result?.diagnosis?.name}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Order ID</p>
                <p className="text-gray-900">{result?.id}</p>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-sm text-gray-600">Completed Date</p>
              <p className="text-gray-900">
                {new Date(result?.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Alert if abnormal */}
        {hasAbnormalResults && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-red-900">Abnormal Results Detected</p>
                <p className="text-sm text-red-700 mt-1">
                  One or more test results are outside the normal reference
                  range. Please review carefully.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Results Table */}
        <div className="mb-6">
          <h3 className="text-gray-900 mb-3 pb-2 border-b">Test Results</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm text-gray-700">
                    Test Component
                  </th>
                  <th className="text-left py-3 px-4 text-sm text-gray-700">
                    Result
                  </th>
                  <th className="text-left py-3 px-4 text-sm text-gray-700">
                    Unit
                  </th>
                  <th className="text-left py-3 px-4 text-sm text-gray-700">
                    Reference Range
                  </th>
                  <th className="text-center py-3 px-4 text-sm text-gray-700">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {result.testResult.result.map((item, idx) => (
                  <tr
                    key={idx}
                    className={`border-b border-gray-100 ${
                      item.status === "high" ||
                      item.status === "critical" ||
                      item.status === "low"
                        ? "bg-red-50"
                        : ""
                    }`}
                  >
                    <td className="py-3 px-4 text-sm text-gray-900">
                      {item.component}
                    </td>
                    <td className="py-3 px-4 text-gray-900">{item.value}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {item.unit}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {item.referenceRange?.low} - {item.referenceRange?.high}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {item.status && (
                        <div className="flex items-center justify-center gap-1">
                          {item.status === "high" || item.status === "HIGH" && (
                            <>
                              <TrendingUp className="w-4 h-4 text-red-600" />
                              <Badge className="bg-red-100 text-red-700 border-red-200">
                                High
                              </Badge>
                            </>
                          )}
                          {item.status === "low" ||  item.status === "LOW" && (
                            <>
                              <TrendingDown className="w-4 h-4 text-blue-600" />
                              <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                                Low
                              </Badge>
                            </>
                          )}
                          {item.status === "critical" && (
                            <>
                              <AlertTriangle className="w-4 h-4 text-red-600" />
                              <Badge className="bg-red-200 text-red-900 border-red-300">
                                Critical
                              </Badge>
                            </>
                          )}
                          {(item.status === "NORMAL" ||
                            item.status === "Normal") && (
                            <>
                              <Badge
                                variant="outline"
                                className="bg-green-50 text-green-700 border-green-200"
                              >
                                Normal
                              </Badge>
                            </>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Clinical Interpretation */}
        <div className="mb-6">
          <h3 className="text-gray-900 mb-3 pb-2 border-b">
            Clinical Interpretation
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-900">{result.testResult?.summary}</p>
          </div>
        </div>

        {/* Recommended Follow-up */}
        {result.recommendedFollowUp &&
          result.recommendedFollowUp.length > 0 && (
            <div className="mb-6">
              <h3 className="text-gray-900 mb-3 pb-2 border-b">
                Recommended Follow-up Actions
              </h3>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <ul className="space-y-2">
                  {result.recommendedFollowUp.map((action, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-gray-900"
                    >
                      <span className="text-blue-600 mt-1">•</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-300">
          <p className="text-xs text-gray-600">
            These results have been reviewed and released by OrphanDX Laboratory
            Services. For questions or concerns about these results, please
            contact your healthcare provider.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            OrphanDX Laboratory Services • CLIA Certified • CAP Accredited •
            Medical Director: Jane Smith, MD, PhD
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Report Date: {new Date().toLocaleString()} • This report is
            confidential and intended for use by the ordering provider only.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default LabResultsViewer;
