import { fetchOrderTrackingApi } from "@/api/order";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import AddResultModal from "./AddResultModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";
import { LabResultsViewer } from "@/elements";
import { ScrollArea } from "@/components/scrollArea";
import { CiSearch } from "react-icons/ci";
import { RxPerson } from "react-icons/rx";
import { PiHospitalThin } from "react-icons/pi";
import { FaRegFileLines } from "react-icons/fa6";

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
  status: "ORDERED" | "COMPLETED"; // can extend if more statuses
  orderedAt: string;
  completedAt: string | null;
  collectedAt: string | null;
  createdById: string;
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
  const [selectedLabResult, setSelectedLabResult] = useState<any>(null);
  const { data: ordersResp } = useQuery({
    queryKey: ["fetchOrderTrackingApi"],
    queryFn: fetchOrderTrackingApi,
  });

  const orders: Order[] = ordersResp?.data || [];

  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  console.log("orders: ", orders);
  return (
    <div className="bg-card text-card-foreground flex flex-col rounded-xl py-2 border ">
      <div className="px-4 py-2">Order Tracking</div>

      <div className="px-4 py-2 bg-red-40">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Orders..."
            className=" bg-sidebar-accent py-2  pl-10 rounded-lg w-full focus:ring-0"
          />
          <div className="absolute top-3 left-4">
            <CiSearch />
          </div>
        </div>
      </div>
      {/*  */}
      <div className="h-[calc(100vh-400px)] overflow-y-auto px-4 text-gray-600">
        {orders.map((order: Order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl p-4 mb-4 space-y-3  transition-shadow border border-gray-200"
          >
            {/* first row */}
            <div className="flex justify-between items-center ">
              <div className="flex flex-col">
                <p className="text-gray-700">
                  {order.diagnosis[0].diagnosis.name}
                </p>
                <p className="text-sm text-gray-400 ">{order.cptCode}</p>
              </div>
              <div className="text-sm text-gray-400">
                {order.completedAt
                  ? order.completedAt.toString().split("T")[0]
                  : order.orderedAt.toString().split("T")[0]}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-2">
              <div className="flex items-center gap-2">
                <div className="text-gray-400">
                  <RxPerson />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-gray-400">Patient</p>
                  <p>
                    {order.patient.firstName} {order.patient.lastName}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-gray-400">
                  <RxPerson />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-gray-400">Provider</p>
                  <p>Provider name</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-gray-400">
                  <PiHospitalThin />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-gray-400">Clinic</p>
                  <p>{order.facility.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-gray-400">
                  <PiHospitalThin />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-gray-400">Scheduled</p>
                  <p>
                    {order.orderedAt.toString().split("T")[0]}-{" "}
                    {order.completedAt?.toString().split("T")[0]}
                  </p>
                </div>
              </div>
            </div>
            <hr className="my-3" />
            <div className="border boreder-gray-200 flex items-center w-fit px-2 py-1 text-sm rounded-lg gap-1 font-semibold cursor-pointer hover:bg-accent duration-200 ">
              <span>
                <FaRegFileLines />
              </span>
              <p> View Requisition</p>
            </div>

            <hr className="my-3" />

            <div className="flex items-center text-xs gap-2">
              <p>Created: {order.createdAt.toString().split("T")[0]}</p>
              <p>•</p>
              <p>Updated: {order.createdAt.toString().split("T")[0]}</p>
            </div>

            {order.status === "COMPLETED" && (
              <button
                onClick={() => setSelectedLabResult(order)}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Result
              </button>
            )}
          </div>
        ))}
      </div>

      {selectedOrder && (
        <AddResultModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}

      {!!selectedLabResult && (
        <Dialog open={true} onOpenChange={() => setSelectedLabResult(null)}>
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
      )}
    </div>
  );
};

export default Order;
