import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";
import { Badge } from "@/components/badge";
import { Card } from "@/components/card";
import { Button } from "@/components/button";
import type { Provider, Order } from "@/types";
import { Calendar, FileText } from "lucide-react";
import ViewResultsDialog from "../viewResultsDialog";
import { useState } from "react";

interface ProviderOrdersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  provider: Provider | null;
  orders: Order[];
}

const ProviderOrdersDialog = ({
  open,
  onOpenChange,
  provider,
  orders,
}: ProviderOrdersDialogProps) => {
  const [showViewResultsDialog, setShowViewResultsDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  if (!provider) {
    return null;
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{provider.name} - Orders</DialogTitle>
            <DialogDescription>
              {provider.specialty} | NPI: {provider.npi}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 mt-4">
            {orders.length === 0 ? (
              <Card className="p-8 text-center text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p>No orders found for this provider</p>
              </Card>
            ) : (
              orders.map((order) => (
                <Card key={order.id} className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-gray-900">{order.patientName}</p>
                      <p className="text-sm text-gray-600">
                        {order.testName} ({order.testCode})
                      </p>
                    </div>
                    <Badge
                      variant={
                        order.status === "completed"
                          ? "default"
                          : order.status === "in-progress"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Created: {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                    <div>Order ID: {order.id}</div>
                  </div>
                  {order.status === "completed" && order.labResult && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setSelectedOrder(order);
                        setShowViewResultsDialog(true);
                      }}
                    >
                      View Results
                    </Button>
                  )}
                </Card>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Nested Results Dialog */}
      {selectedOrder && (
        <ViewResultsDialog
          open={showViewResultsDialog}
          onOpenChange={setShowViewResultsDialog}
          order={selectedOrder}
        />
      )}
    </>
  );
};

export default ProviderOrdersDialog;
