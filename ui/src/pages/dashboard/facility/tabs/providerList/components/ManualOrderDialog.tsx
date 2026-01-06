import {
  useForm,
  Controller,
  type SubmitHandler,
  useFieldArray,
  type Path,
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
import type { NewManualOrderType } from "@/types";
import { ScrollArea } from "@/components/scrollArea";
import { useQuery } from "@tanstack/react-query";
import { fetchLabsApi } from "@/api/organization";
import { useCreateNewOrderManually } from "@/api/order";

interface ManualOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ManualOrderDialog: React.FC<ManualOrderDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewManualOrderType>({
    defaultValues: {
      firstName: "",
      lastName: "",
      mrn: "",
      dateOfBirth: "",
      gender: "",
      phone: "",
      email: "",
      lastVisit: "",
      provider: "",
      plan: "",
      type: "",
      memberId: "",
      labId: "",
      diagnosis: [{ name: "", icd10: "", onsetDate: "" }],
      tests: [{ testName: "", cptCode: "" }],
    },
  });

  const {
    fields: diagnosisFields,
    append: appendDiagnosis,
    remove: removeDiagnosis,
  } = useFieldArray({
    control,
    name: "diagnosis",
  });

  const {
    fields: testFields,
    append: appendTest,
    remove: removeTest,
  } = useFieldArray({
    control,
    name: "tests",
  });

  const { data: labs } = useQuery({
    queryKey: ["fetchLabsApi"],
    queryFn: fetchLabsApi,
  });

  const labOptions = (labs?.data as { id: string; name: string }[]) ?? [];
  const { mutate } = useCreateNewOrderManually();

  const onSubmit: SubmitHandler<NewManualOrderType> = (values) => {
    mutate(values, {
      onSuccess: () => {
        reset();
        onOpenChange(false);
      },
    });
  };

  const getDiagnosisPath = (
    index: number,
    key: keyof NewManualOrderType["diagnosis"][number]
  ): Path<NewManualOrderType> =>
    `diagnosis.${index}.${key}` as Path<NewManualOrderType>;

  const getTestPath = (
    index: number,
    key: keyof NewManualOrderType["tests"][number]
  ): Path<NewManualOrderType> =>
    `tests.${index}.${key}` as Path<NewManualOrderType>;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[95vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5" />
            Create Manual Lab Order
          </DialogTitle>
          <DialogDescription>
            Enter patient, diagnosis, and test details.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[calc(100vh-140px)] pr-3">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
            {/* Patient Info */}
            <section className="grid grid-cols-2 gap-4">
              {[
                { label: "First Name", name: "firstName", type: "text" },
                { label: "Last Name", name: "lastName", type: "text" },
                { label: "MRN", name: "mrn", type: "text" },
                { label: "Date of Birth", name: "dateOfBirth", type: "date" },
                { label: "Phone", name: "phone", type: "text" },
                { label: "Email", name: "email", type: "text" },
                { label: "Last Visit", name: "lastVisit", type: "date" },
              ].map((field) => (
                <div key={field.name} className="space-y-1">
                  <Label>{field.label} *</Label>
                  <Input
                    type={field.type}
                    placeholder={`Enter ${field.label}`}
                    {...register(field.name as any, {
                      required: `${field.label} is required`,
                    })}
                  />
                  {errors[field.name as keyof NewManualOrderType] && (
                    <p className="text-sm text-red-500">
                      {(errors[field.name as keyof NewManualOrderType]
                        ?.message as string) || ""}
                    </p>
                  )}
                </div>
              ))}

              {/* Gender Dropdown */}
              <div className="space-y-1">
                <Label>Gender *</Label>
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: "Gender is required" }}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        {["MALE", "FEMALE", "OTHER"].map((gender) => (
                          <SelectItem key={gender} value={gender}>
                            {gender.charAt(0) + gender.slice(1).toLowerCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.gender && (
                  <p className="text-sm text-red-500">
                    {errors.gender.message}
                  </p>
                )}
              </div>
            </section>

            {/* Insurance */}
            <section className="grid grid-cols-2 gap-4">
              {[
                { label: "Insurance Provider", name: "provider" },
                { label: "Plan", name: "plan" },
                // { label: "Type", name: "type" },
                { label: "Member ID", name: "memberId" },
              ].map((field) => (
                <div key={field.name} className="space-y-1">
                  <Label>{field.label} *</Label>
                  <Input
                    placeholder={`Enter ${field.label}`}
                    {...register(field.name as any, {
                      required: `${field.label} is required`,
                    })}
                  />
                  {errors[field.name as keyof NewManualOrderType] && (
                    <p className="text-sm text-red-500">
                      {(errors[field.name as keyof NewManualOrderType]
                        ?.message as string) || ""}
                    </p>
                  )}
                </div>
              ))}

              {/* Type Dropdown */}
              <div className="space-y-1">
                <Label>Type *</Label>
                <Controller
                  name="type"
                  control={control}
                  rules={{ required: "Type is required" }}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {["Primary", "Secondary", "Self"].map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.type && (
                  <p className="text-sm text-red-500">{errors.type.message}</p>
                )}
              </div>
            </section>

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
            <div className="space-y-3">
              <Label>Diagnosis *</Label>

              {diagnosisFields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-4 gap-2">
                  {[
                    { placeholder: "Diagnosis Name", name: "name" },
                    { placeholder: "ICD-10", name: "icd10" },
                    {
                      placeholder: "Onset Date",
                      name: "onsetDate",
                      type: "date",
                    },
                  ].map((f) => (
                    <div key={f.name} className="space-y-1">
                      <Input
                        type={f.type || "text"}
                        placeholder={f.placeholder}
                        {...register(
                          getDiagnosisPath(
                            index,
                            f.name as keyof NewManualOrderType["diagnosis"][number]
                          ),
                          {
                            required: `${f.placeholder} is required`,
                          }
                        )}
                      />
                      {((errors.diagnosis?.[index] as any)?.[f.name] as any)
                        ?.message && (
                        <p className="text-sm text-red-500">
                          {
                            (
                              (errors.diagnosis?.[index] as any)?.[
                                f.name
                              ] as any
                            ).message
                          }
                        </p>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeDiagnosis(index)}
                    disabled={diagnosisFields.length === 1}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  appendDiagnosis({ name: "", icd10: "", onsetDate: "" })
                }
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Diagnosis
              </Button>
            </div>

            {/* Tests */}
            <div className="space-y-3">
              <Label>Tests *</Label>

              {testFields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  {[
                    { placeholder: "Test Name", name: "testName" },
                    { placeholder: "CPT Code", name: "cptCode" },
                  ].map((f) => (
                    <div key={f.name} className="flex-1 space-y-1">
                      <Input
                        placeholder={f.placeholder}
                        {...register(
                          getTestPath(
                            index,
                            f.name as keyof NewManualOrderType["tests"][number]
                          ),
                          {
                            required: `${f.placeholder} is required`,
                          }
                        )}
                      />
                      {((errors.tests?.[index] as any)?.[f.name] as any)
                        ?.message && (
                        <p className="text-sm text-red-500">
                          {
                            ((errors.tests?.[index] as any)?.[f.name] as any)
                              .message
                          }
                        </p>
                      )}
                    </div>
                  ))}
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
                onClick={() => appendTest({ testName: "", cptCode: "" })}
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Test
              </Button>
            </div>

            {/* Actions */}
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
