import { useForm, Controller } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";
import { Button } from "@/components/button";
import { Label, Input } from "@/components";
import { Beaker, Check, Signature } from "lucide-react";

import { useAuthContext } from "@/context/auth";
import type { PatientDetailsType } from "@/types";

export interface CollectionData {
  collectedAt: string;
  collectedBy: string;
  signature: string;
}

interface SpecimenCollectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patientDetails: PatientDetailsType | null;
  onCollectionComplete: (
    orderId: string,
    collectionData: CollectionData
  ) => void;
}

interface FormValues {
  collectionDate: string;
  collectionTime: string;
  collectedBy: string;
  signature: string;
}

export function SpecimenCollectionDialog({
  open,
  onOpenChange,
  patientDetails,
  onCollectionComplete,
}: SpecimenCollectionDialogProps) {
  const { user } = useAuthContext();
  const { name } = user;

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      collectionDate: "",
      collectionTime: "",
      collectedBy: name,
      signature: name,
    },
  });

  // Auto-set current date & time
  const setCurrentDateTime = () => {
    const now = new Date();
    const date = now.toISOString().split("T")[0];
    const time = now.toTimeString().slice(0, 5);
    setValue("collectionDate", date);
    setValue("collectionTime", time);
  };

  const onSubmit = (data: FormValues) => {
    if (!patientDetails) return;

    const collectedAt = `${data.collectionDate}T${data.collectionTime}`;
    const collectionData: CollectionData = {
      collectedAt,
      collectedBy: data.collectedBy,
      signature: data.signature,
    };

    onCollectionComplete(patientDetails.labOrder[0].id, collectionData);

    reset();
    onOpenChange(false);
  };

  const handleCancel = () => {
    reset();
    onOpenChange(false);
  };

  const collectionDate = watch("collectionDate");
  const collectionTime = watch("collectionTime");
  const collectedBy = watch("collectedBy");
  const signature = watch("signature");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[95vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Beaker className="w-5 h-5 text-yellow-600" />
            Record Specimen Collection
          </DialogTitle>
          <DialogDescription>
            Record the collection details for order {patientDetails?.id}. This
            will update the status to "Collected".
          </DialogDescription>
        </DialogHeader>

        {patientDetails && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-600">Patient:</p>
                <p className="text-gray-900">
                  {patientDetails.lastName} {patientDetails.firstName}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Test:</p>
                <p className="text-gray-900">
                  {patientDetails.labOrder[0].tests
                    .map((t) => t.testName)
                    .join(",")}
                </p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Collection Date & Time */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Collection Date & Time *</Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={setCurrentDateTime}
                className="text-xs h-7"
              >
                Use Current
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Controller
                name="collectionDate"
                control={control}
                rules={{ required: "Collection date is required" }}
                render={({ field }) => (
                  <Input
                    type="date"
                    {...field}
                    max={new Date().toISOString().split("T")[0]}
                  />
                )}
              />
              <Controller
                name="collectionTime"
                control={control}
                rules={{ required: "Collection time is required" }}
                render={({ field }) => <Input type="time" {...field} />}
              />
            </div>
            {errors.collectionDate && (
              <p className="text-xs text-red-500">
                {errors.collectionDate.message}
              </p>
            )}
            {errors.collectionTime && (
              <p className="text-xs text-red-500">
                {errors.collectionTime.message}
              </p>
            )}
          </div>

          {/* Collected By */}
          <div className="space-y-2">
            <Label htmlFor="collectedBy">Collected By (Full Name) *</Label>
            <Controller
              name="collectedBy"
              control={control}
              rules={{ required: "Collector name is required" }}
              render={({ field }) => (
                <Input
                  id="collectedBy"
                  placeholder="Enter the name of the person who collected the specimen"
                  {...field}
                />
              )}
            />
            {errors.collectedBy && (
              <p className="text-xs text-red-500">
                {errors.collectedBy.message}
              </p>
            )}
          </div>

          {/* Signature */}
          <div className="space-y-2">
            <Label htmlFor="signature">Electronic Signature *</Label>
            <div className="relative">
              <Signature className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Controller
                name="signature"
                control={control}
                rules={{ required: "Signature is required" }}
                render={({ field }) => (
                  <Input
                    id="signature"
                    placeholder="Type your full name to sign electronically"
                    {...field}
                    className="pl-10"
                  />
                )}
              />
            </div>
            {errors.signature && (
              <p className="text-xs text-red-500">{errors.signature.message}</p>
            )}
            <p className="text-xs text-gray-500">
              By typing your name, you certify that the above information is
              accurate
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end pt-4 border-t">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                !collectionDate || !collectionTime || !collectedBy || !signature
              }
              className="gap-2"
            >
              <Check className="w-4 h-4" />
              Confirm Collection
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
