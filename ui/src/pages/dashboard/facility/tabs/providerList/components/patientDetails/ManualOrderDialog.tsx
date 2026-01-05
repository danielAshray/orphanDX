import {
  useForm,
  Controller,
  type SubmitHandler,
  useFieldArray,
  useWatch,
} from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";
import { Button } from "@/components/button";
import { Input, Label } from "@/components";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { ClipboardList, Send, Plus, X } from "lucide-react";
import type { ManualOrderType, PatientDetailsType } from "@/types";
import { ScrollArea } from "@/components/scrollArea";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchLabsApi } from "@/api/organization";
import { MultiSelect } from "@/components";
import type { Option } from "@/components/multiSelect";
import { useEffect } from "react";
import { useCreateOrderManually } from "@/api/order";

interface ManualOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preselectedPatient: PatientDetailsType;
}

const ManualOrderDialog: React.FC<ManualOrderDialogProps> = ({
  open,
  onOpenChange,
  preselectedPatient,
}) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ManualOrderType>({
    defaultValues: {
      patientId: preselectedPatient?.id,
      labId: "",
      diagnosis: [],
      tests: [{ testName: "", cptCode: "" }],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "tests",
  });

  const { data: labs } = useQuery({
    queryKey: ["fetchLabsApi"],
    queryFn: fetchLabsApi,
  });

  const labOptions = (labs?.data as { id: string; name: string }[]) ?? [];

  const diagnosisOptions: Option[] =
    preselectedPatient?.diagnosis?.map((d) => ({
      label: `${d.icd10} - ${d.name}`,
      value: d.id,
    })) ?? [];

  const selectedDiagnoses = useWatch({
    control,
    name: "diagnosis",
  });

  const { mutate } = useCreateOrderManually();

  useEffect(() => {
    const count = selectedDiagnoses?.length || 1;

    if (count > fields.length) {
      replace(
        Array.from({ length: count }, (_, i) => ({
          testName: fields[i]?.testName ?? "",
          cptCode: fields[i]?.cptCode ?? "",
        }))
      );
    } else if (count < fields.length) {
      replace(fields.slice(0, count));
    }
  }, [selectedDiagnoses]);

  const clientQuery = useQueryClient();
  const onSubmit: SubmitHandler<ManualOrderType> = (values) => {
    mutate(values, {
      onSuccess: (res) => {
        clientQuery.setQueryData<{
          data: PatientDetailsType[];
        }>(["fetchPatientsApi"], (oldData) => {
          if (!oldData) return { data: [] };

          const index = oldData.data.findIndex(
            (f) => f.id === preselectedPatient.id
          );
          if (index === -1) return oldData;

          const prevLabOrders = oldData.data[index].labOrder ?? [];
          const newLabOrdersArray = Array.isArray(res.data)
            ? res.data
            : [res.data];
          const updatedLabOrders = [...prevLabOrders, ...newLabOrdersArray];

          const updatedData = [...oldData.data];
          updatedData[index] = {
            ...updatedData[index],
            labOrder: updatedLabOrders,
            scheduledCount: updatedData[index].scheduledCount + 1,
          };

          return {
            ...oldData,
            data: updatedData,
          };
        });

        clientQuery.setQueryData<{ data: PatientDetailsType }>(
          ["patientDetails", preselectedPatient.id],
          (oldData) => {
            if (!oldData) return { data: {} as PatientDetailsType };

            const updatedLabOrders = [
              ...(oldData.data.labOrder ?? []),
              ...(Array.isArray(res.data) ? res.data : [res.data]),
            ];

            return {
              data: {
                ...oldData.data,
                labOrder: updatedLabOrders,
              },
            };
          }
        );

        clientQuery.setQueryData<{
          data: {
            patientCount: number;
            recomendedTestCount: number;
            scheduledTestCount: number;
            completedTestCount: number;
          };
        }>(["fetchFacilityStatApi"], (oldData) => {
          if (!oldData)
            return {
              data: {
                patientCount: 0,
                recomendedTestCount: 0,
                scheduledTestCount: 1,
                completedTestCount: 0,
              },
            };
          return {
            data: {
              ...oldData.data,
              scheduledTestCount: oldData.data.scheduledTestCount + 1,
            },
          };
        });

        reset();
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl sm:max-w-xl max-h-[95vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5" />
            Place New Lab Order
          </DialogTitle>
          <DialogDescription>
            Create a new lab order for a patient.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[calc(100vh-140px)] pr-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Patient *</Label>
              <Input
                disabled
                value={`${preselectedPatient.firstName} ${preselectedPatient.lastName} - MRN: ${preselectedPatient.mrn}`}
              />
            </div>

            <div className="space-y-2">
              <Label>Select Lab *</Label>

              <Controller
                name="labId"
                control={control}
                rules={{ required: "Lab is required" }}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a lab" />
                    </SelectTrigger>
                    <SelectContent>
                      {labOptions.map((lab) => (
                        <SelectItem key={lab.id} value={lab.id}>
                          {lab.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.labId && (
                <p className="text-sm text-red-500">{errors.labId.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Diagnosis *</Label>

              <Controller
                name="diagnosis"
                control={control}
                rules={{
                  validate: (value) =>
                    value?.length ? true : "At least one diagnosis is required",
                }}
                render={({ field }) => (
                  <MultiSelect
                    options={diagnosisOptions}
                    selected={field.value}
                    onChange={field.onChange}
                    placeholder="Select Diagnosis"
                  />
                )}
              />

              {errors.diagnosis && (
                <p className="text-sm text-red-500">
                  {errors.diagnosis.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Tests *</Label>

              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <Input
                    placeholder="Test name"
                    {...register(`tests.${index}.testName`, {
                      required: "Test name is required",
                    })}
                  />

                  <Input
                    placeholder="CPT code"
                    {...register(`tests.${index}.cptCode`, {
                      required: "CPT code is required",
                    })}
                  />

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => remove(index)}
                    disabled={fields.length === 1}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={() => append({ testName: "", cptCode: "" })}
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Test
              </Button>

              {(errors.tests as any)?.message && (
                <p className="text-sm text-red-500">
                  {(errors.tests as any)?.message}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  reset();
                  onOpenChange(false);
                }}
              >
                Cancel
              </Button>

              <Button type="submit">
                <Send className="w-4 h-4 mr-2" />
                Create Order
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ManualOrderDialog;
