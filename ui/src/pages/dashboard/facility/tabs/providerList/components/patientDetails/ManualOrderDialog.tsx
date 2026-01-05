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
import {
  Input,
  Label,
  // , Textarea
} from "@/components";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { ClipboardList, Send, Plus, X } from "lucide-react";
import type { PatientDetailsType } from "@/types";
import { ScrollArea } from "@/components/scrollArea";
import { useQuery } from "@tanstack/react-query";
import { fetchLabsApi } from "@/api/organization";
import { MultiSelect } from "@/components";
import type { Option } from "@/components/multiSelect";
import { useEffect } from "react";

interface ManualOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preselectedPatient: PatientDetailsType;
}

interface ManualOrderFormValues {
  patientId: string;
  labId: string;
  diagnosis: string[];
  tests: { value: string }[];
  cptCodes: { value: string }[];
  // reason: string;
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
  } = useForm<ManualOrderFormValues>({
    defaultValues: {
      patientId: preselectedPatient?.id,
      labId: "",
      diagnosis: [],
      tests: [{ value: "" }],
      cptCodes: [{ value: "" }],
    },
  });

  const {
    fields: testFields,
    append: addTest,
    remove: removeTest,
    replace: replaceTests,
  } = useFieldArray({ control, name: "tests" });

  const {
    fields: cptFields,
    append: addCpt,
    remove: removeCpt,
    replace: replaceCpt,
  } = useFieldArray({ control, name: "cptCodes" });

  const { data: labs } = useQuery({
    queryKey: ["fetchLabsApi"],
    queryFn: fetchLabsApi,
  });

  const labOptions = (labs?.data || []) as {
    id: string;
    name: string;
  }[];

  const diagnosisOptions: Option[] = preselectedPatient.diagnosis.map(
    (diagnosis) => ({
      label: `${diagnosis.icd10} - ${diagnosis.name}`,
      value: diagnosis.id,
    })
  );

  const selectedDiagnoses = useWatch({
    control,
    name: "diagnosis",
  });

  useEffect(() => {
    const count = selectedDiagnoses?.length || 0;

    if (count > testFields.length) {
      replaceTests([...Array(count).fill({ value: "" })]);
    } else if (count < testFields.length) {
      replaceTests(testFields.slice(0, count));
    }

    if (count > cptFields.length) {
      replaceCpt([...Array(count).fill({ value: "" })]);
    } else if (count < cptFields.length) {
      replaceCpt(cptFields.slice(0, count));
    }
  }, [selectedDiagnoses, replaceTests, replaceCpt, testFields, cptFields]);

  const onSubmit: SubmitHandler<ManualOrderFormValues> = (values) => {
    const payload = {
      ...values,
      tests: values.tests.map((t) => t.value),
      cptCodes: values.cptCodes.map((c) => c.value),
    };

    console.log("Manual Order Payload:", payload);

    reset();
    onOpenChange(false);
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
            {/* Patient */}
            <div className="space-y-2">
              <Label>Patient *</Label>
              <Input
                disabled
                value={`${preselectedPatient.firstName} ${preselectedPatient.lastName} - MRN: ${preselectedPatient.mrn}`}
              />
            </div>

            {/* Lab */}
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

            {/* Diagnosis */}
            <div className="space-y-2">
              <Label>Diagnosis *</Label>
              <Controller
                name="diagnosis"
                control={control}
                rules={{
                  validate: (value) =>
                    value && value.length > 0
                      ? true
                      : "At least one diagnosis is required",
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

            {/* Tests */}
            <div className="space-y-2">
              <Label>Tests *</Label>

              {testFields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <Input
                    placeholder="Enter test name"
                    {...register(`tests.${index}.value`, {
                      required: "Test is required",
                    })}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeTest(index)}
                    disabled={testFields.length === 1}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={() => addTest({ value: "" })}
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Test
              </Button>
            </div>

            {/* CPT Codes */}
            <div className="space-y-2">
              <Label>CPT Codes *</Label>

              {cptFields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <Input
                    placeholder="Enter CPT code"
                    {...register(`cptCodes.${index}.value`, {
                      required: "CPT code is required",
                    })}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeCpt(index)}
                    disabled={cptFields.length === 1}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={() => addCpt({ value: "" })}
              >
                <Plus className="w-4 h-4 mr-1" />
                Add CPT Code
              </Button>
            </div>

            {/* Reason */}
            {/* <div className="space-y-2">
              <Label>Clinical Reason *</Label>
              <Textarea
                rows={4}
                {...register("reason", {
                  required: "Clinical reason is required",
                })}
              />
              {errors.reason && (
                <p className="text-sm text-red-500">{errors.reason.message}</p>
              )}
            </div> */}

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
