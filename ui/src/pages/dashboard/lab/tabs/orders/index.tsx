import { useState } from "react";
import type { Order } from "@/types";
import { Card } from "@/components/card";
import { Badge } from "@/components/badge";
import { Input } from "@/components";
import { Button } from "@/components/button";
import { ScrollArea } from "@/components/scrollArea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";
import { LabRequisition, LabResultsViewer } from "@/elements";
import {
  Search,
  Calendar,
  Building2,
  User,
  Download,
  Filter,
  FileText,
  Eye,
} from "lucide-react";
import { mockOrders } from "@/data/mockData";

const Orders: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showRequisition, setShowRequisition] = useState(false);
  const [selectedRequisition, setSelectedRequisition] = useState<any>(null);
  const [showLabResults, setShowLabResults] = useState(false);
  const [selectedLabResult, setSelectedLabResult] = useState<any>(null);

  const filteredOrders = mockOrders.filter(
    (order) =>
      order.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.testName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: Order["status"]) => {
    const colors = {
      pending: "bg-gray-100 text-gray-700 border-gray-200",
      sent: "bg-blue-100 text-blue-700 border-blue-200",
      scheduled: "bg-purple-100 text-purple-700 border-purple-200",
      collected: "bg-yellow-100 text-yellow-700 border-yellow-200",
      "in-progress": "bg-orange-100 text-orange-700 border-orange-200",
      completed: "bg-green-100 text-green-700 border-green-200",
      cancelled: "bg-red-100 text-red-700 border-red-200",
    };
    return colors[status] || colors.pending;
  };

  const handleViewRequisition = (order: Order) => {
    // Generate mock requisition data
    const requisitionData = {
      orderId: order.id,
      patient: {
        name: order.patientName,
        mrn: "MRN-DEMO",
        dob: "1970-01-01",
        demographics: {
          gender: "Unknown",
          phone: "(555) 000-0000",
          email: "patient@email.com",
        },
        insurance: {
          provider: "Insurance Provider",
          planName: "Standard Plan",
          memberId: "INS-12345",
          type: "Commercial" as const,
        },
        diagnoses: [],
      },
      test: {
        name: order.testName,
        code: order.testCode,
        id: order.id,
      },
      provider: {
        name: order.providerName,
        npi: "NPI-123456789",
        phone: "(555) 100-2000",
      },
      clinic: {
        name: order.clinicName,
        address: "123 Medical Plaza, Suite 100",
        city: "Springfield",
        state: "IL",
        zip: "62701",
        phone: "(555) 100-1000",
      },
    };
    setSelectedRequisition(requisitionData);
    setShowRequisition(true);
  };

  const handleViewResults = (order: Order) => {
    if (order.labResult) {
      setSelectedLabResult(order.labResult);
      setShowLabResults(true);
    }
  };

  return (
    <>
      <Card>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-gray-900">Order Tracking</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-400px)]">
          <div className="p-4">
            <div className="space-y-3">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-gray-900">{order.testName}</p>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">
                        Order ID: {order.id}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mb-3">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-gray-500">Patient</p>
                        <p className="text-gray-900">{order.patientName}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-gray-500">Provider</p>
                        <p className="text-gray-900">{order.providerName}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-gray-500">Clinic</p>
                        <p className="text-gray-900">{order.clinicName}</p>
                      </div>
                    </div>

                    {order.scheduledDate && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-gray-500">Scheduled</p>
                          <p className="text-gray-900">
                            {new Date(order.scheduledDate).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-3 border-t border-gray-100">
                    {[
                      "scheduled",
                      "collected",
                      "in-progress",
                      "completed",
                    ].includes(order.status) && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewRequisition(order)}
                        className="gap-2"
                      >
                        <FileText className="w-4 h-4" />
                        View Requisition
                      </Button>
                    )}
                    {order.status === "completed" && order.labResult && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewResults(order)}
                        className="gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View Results
                      </Button>
                    )}
                  </div>

                  {/* Status Timeline */}
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>
                        Created: {new Date(order.createdAt).toLocaleString()}
                      </span>
                      <span>•</span>
                      <span>
                        Updated: {new Date(order.updatedAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {filteredOrders.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <p>No orders found</p>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </Card>

      {/* Lab Requisition Dialog */}
      <Dialog open={showRequisition} onOpenChange={setShowRequisition}>
        <DialogContent className="max-w-6xl max-h-[95vh]">
          <DialogHeader>
            <DialogTitle>Lab Test Requisition</DialogTitle>
          </DialogHeader>

          {selectedRequisition && (
            <ScrollArea className="h-[calc(100vh-120px)]">
              <LabRequisition data={selectedRequisition} />
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

export default Orders;
