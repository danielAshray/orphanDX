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

const Order = () => {
  const [selectedLabResult, setSelectedLabResult] = useState<any>(null);
  const { data: ordersResp } = useQuery({
    queryKey: ["fetchOrderTrackingApi"],
    queryFn: fetchOrderTrackingApi,
  });

  const orders = ordersResp?.data || [];

  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  return (
    <div>
      {orders.map((order: any) => (
        <div
          key={order.id}
          className="bg-white shadow-sm rounded-xl p-4 mb-4 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-semibold text-gray-800">
                {order.patient.firstName} {order.patient.lastName}
              </p>
              <p className="text-sm text-gray-500">
                {order.testName} ({order.cptCode})
              </p>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                order.status === "COMPLETED"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {order.status}
            </span>
          </div>

          {order.status === "ORDERED" && (
            <button
              onClick={() => setSelectedOrder(order)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Result
            </button>
          )}

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
