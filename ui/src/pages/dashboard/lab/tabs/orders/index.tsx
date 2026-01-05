import { fetchOrderListApi, useTestComplete, useUploadPDF } from "@/api/order";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";
import { ScrollArea } from "@/components/scrollArea";
import { Input, Label, Notification } from "@/components";
import { Card } from "@/components/card";
import { Button } from "@/components/button";
import {
  Building2,
  Calendar,
  CheckCircle,
  Download,
  Eye,
  FileText,
  Filter,
  Search,
  Upload,
  User,
} from "lucide-react";
import { Badge } from "@/components/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/alertDialog";
import { OWLiverRequisition } from "@/elements";
import { config } from "@/config/env";

interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  mrn: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  email: string;
  lastVisit: string;
  scheduledCount: number;
  recomendationCount: number;
  resultCount: number;
  completedCount: number;
  facilityId: string;
  createdAt: string;
  updatedAt: string;
}

interface DiagnosisItem {
  diagnosis: {
    name: string;
    icd10: string;
  };
}

interface FacilityOrLab {
  id: string;
  name: string;
  phone: string;
  city: string;
  state: string;
  zipCode: string;
  suite: string;
  street: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
  organizationId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  testName: string;
  cptCode: string;
  facilityId: string;
  labId: string;
  patientId: string;
  status: "ORDERED" | "COLLECTED" | "COMPLETED";
  orderedAt: string;
  completedAt: string | null;
  collectedAt: string | null;
  createdById: string;
  resultPdfUrl: string | null;
  createdAt: string;
  updatedAt: string;
  testResult: any | null;
  patient: Patient;
  diagnosis: DiagnosisItem[];
  facility: FacilityOrLab;
  lab: FacilityOrLab;
  createdBy: User;
}

const Order = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showRequisition, setShowRequisition] = useState(false);
  const [selectedRequisition, setSelectedRequisition] = useState<Order | null>(
    null
  );

  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isCompleteDialogOpen, setIsCompleteDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [showLabResults, setShowLabResults] = useState(false);
  const [selectedLabResult, setSelectedLabResult] = useState<any>(null);

  const { data: orderList } = useQuery({
    queryKey: ["fetchOrderListApi"],
    queryFn: fetchOrderListApi,
  });

  const orders = (orderList?.data || []) as Order[];

  const uploadMutation = useUploadPDF();
  const testTestMutation = useTestComplete();

  const handleUploadConfirmAlert = (order: Order) => {
    if (order) {
      setIsUploadDialogOpen(true);
      setSelectedOrder(order);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadSubmit = (order: Order) => {
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        Notification({
          toastMessage: "Only pdfs are allowed",
          toastStatus: "error",
        });
        return;
      }

      const maxSize = 5 * 1024 * 1024;
      if (selectedFile.size > maxSize) {
        Notification({
          toastMessage: "File size must be less than 5 MB",
          toastStatus: "error",
        });
        return;
      }

      uploadMutation.mutate({
        orderId: order.id,
        file: selectedFile,
      });
    }

    setIsUploadDialogOpen(false);
    setSelectedFile(null);
    setSelectedOrder(null);
  };

  const handleUploadCancel = () => {
    setIsUploadDialogOpen(false);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleMarkAsCompletedAlert = (order: Order) => {
    if (order) {
      setIsCompleteDialogOpen(true);
      setSelectedOrder(order);
    }
  };

  const handleMarkAsCompleted = (order: Order) => {
    testTestMutation.mutate({
      orderId: order.id,
    });
    setIsCompleteDialogOpen(false);
    setSelectedOrder(null);
  };

  const filteredOrders = orders.filter(
    (order) =>
      `${order.patient.firstName} ${order.patient.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      order.diagnosis[0].diagnosis.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: Order["status"]) => {
    const colors = {
      ORDERED: "bg-purple-100 text-purple-700 border-purple-200",
      COLLECTED: "bg-yellow-100 text-yellow-700 border-yellow-200",
      COMPLETED: "bg-green-100 text-green-700 border-green-200",
    };
    return colors[status] || colors.ORDERED;
  };

  const handleViewRequisition = (order: Order) => {
    if (order) {
      setSelectedRequisition(order);
      setShowRequisition(true);
    }
  };

  const handleViewResults = (order: Order) => {
    if (order.resultPdfUrl) {
      setSelectedLabResult(order.resultPdfUrl);
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
                        <p className="text-gray-900">
                          {order.diagnosis[0].diagnosis.name}
                        </p>
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
                        <p className="text-gray-900">
                          {order.patient?.firstName} {order.patient?.lastName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-gray-500">Provider</p>
                        <p className="text-gray-900">{order.createdBy?.name}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-gray-500">Clinic</p>
                        <p className="text-gray-900">{order.facility?.name}</p>
                      </div>
                    </div>

                    {order.orderedAt && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-gray-500">Ordered</p>
                          <p className="text-gray-900">
                            {new Date(order.orderedAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex gap-2">
                      {["ORDERED", "COLLECTED", "COMPLETED"].includes(
                        order.status
                      ) && (
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
                      {order.status === "COMPLETED" && order.resultPdfUrl && (
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

                    <div className="flex gap-2">
                      {order.status === "ORDERED" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUploadConfirmAlert(order)}
                          className="gap-2"
                        >
                          <Upload className="w-4 h-4" />
                          Upload Result
                        </Button>
                      )}

                      {order.status !== "ORDERED" && (
                        <Button
                          variant="default"
                          size="sm"
                          disabled={order.status === "COMPLETED"}
                          onClick={() => handleMarkAsCompletedAlert(order)}
                          className="gap-2 bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Mark as Completed
                        </Button>
                      )}
                    </div>
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
        <DialogContent className="max-w-6xl sm:max-w-4xl max-h-[95vh]">
          <DialogHeader>
            <DialogTitle>Lab Test Requisition</DialogTitle>
            <DialogDescription />
          </DialogHeader>

          {selectedRequisition && (
            <ScrollArea className="h-[calc(100vh-120px)]">
              <OWLiverRequisition
                values={{
                  name: `${selectedRequisition.patient.firstName} ${selectedRequisition.patient.lastName}`,
                  ssn: "1234567890",
                  dob: selectedRequisition.patient.dateOfBirth,
                  sex: String("Male").toLowerCase(),
                  address: "Boradandi",
                  city: "Dhangadhi",
                  state: "Sudurpashchim",
                  zip: "10900",
                  phone: selectedRequisition.patient.phone,
                  email: selectedRequisition.patient.email,
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

                  icd10Codes: selectedRequisition.diagnosis.map(
                    (item) => item.diagnosis.icd10
                  ),
                  // icd10Codes: ["E78.5", "E11.65", "E13.8", "E13.9", "K75.81"],

                  patientSignature: `${selectedRequisition.patient.firstName} ${selectedRequisition.patient.lastName}`,
                  patientSDate: selectedRequisition.patient.createdAt,

                  providerSignature: selectedRequisition.facility.name,
                  providerSDate: "2025/12/24",
                }}
              />
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>

      {/* Lab Results Dialog */}
      <Dialog open={showLabResults} onOpenChange={setShowLabResults}>
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

      {/* Upload Result Confirmation Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Result</DialogTitle>
            <DialogDescription>
              Select a file to upload for this order
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="file">File</Label>
              <Input
                id="file"
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf"
              />
              {selectedFile && (
                <p className="text-sm text-gray-600">
                  Selected: {selectedFile.name}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleUploadCancel}>
              Cancel
            </Button>
            {selectedOrder && (
              <Button onClick={() => handleUploadSubmit(selectedOrder)}>
                Submit
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Mark as Completed Confirmation Dialog */}
      <AlertDialog
        open={isCompleteDialogOpen}
        onOpenChange={setIsCompleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Mark Order as Completed?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to mark this order as completed? This action
              will update the order status.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No</AlertDialogCancel>
            {selectedOrder && (
              <AlertDialogAction
                onClick={() => handleMarkAsCompleted(selectedOrder)}
                className="bg-green-600 hover:bg-green-700"
              >
                Yes
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Order;
