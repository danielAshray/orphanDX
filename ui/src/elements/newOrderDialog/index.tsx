import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";
import { Button } from "@/components/button";
import { Label, Notification } from "@/components";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { mockPatients, mockProviders, mockLabs } from "@/data/mockDataNew";

interface NewOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  facilityId: string;
  labPartnerId: string;
}

const NewOrderDialog = ({
  open,
  onOpenChange,
  facilityId,
  labPartnerId,
}: NewOrderDialogProps) => {
  const [selectedProvider, setSelectedProvider] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedTest, setSelectedTest] = useState("");

  const facilityProviders = mockProviders.filter(
    (p) => p.facilityId === facilityId
  );
  const partnerLab = mockLabs.find((l) => l.id === labPartnerId);

  // Get patients for the selected provider
  const providerPatients = selectedProvider
    ? mockPatients.filter((_patient) => {
        // In a real app, this would filter by provider-patient relationships
        // For now, we'll show all patients
        return true;
      })
    : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProvider || !selectedPatient || !selectedTest) {
      Notification({
        toastMessage: "Please fill in all fields",
        toastStatus: "error",
      });
      return;
    }

    // In a real app, this would create an order in the backend
    const patient = mockPatients.find((p) => p.id === selectedPatient);

    Notification({
      toastMessage: `Order created successfully for ${patient?.name}`,
      toastStatus: "success",
    });

    // Reset form
    setSelectedProvider("");
    setSelectedPatient("");
    setSelectedTest("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Lab Order</DialogTitle>
          <DialogDescription>
            Create a new lab order to be sent to {partnerLab?.name}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="provider">Provider</Label>
            <Select
              value={selectedProvider}
              onValueChange={setSelectedProvider}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a provider" />
              </SelectTrigger>
              <SelectContent>
                {facilityProviders.map((provider) => (
                  <SelectItem key={provider.id} value={provider.id}>
                    {provider.name} - {provider.specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedProvider && (
            <div className="space-y-2">
              <Label htmlFor="patient">Patient</Label>
              <Select
                value={selectedPatient}
                onValueChange={setSelectedPatient}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a patient" />
                </SelectTrigger>
                <SelectContent>
                  {providerPatients.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id}>
                      {patient.name} (MRN: {patient.mrn})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {selectedPatient && (
            <div className="space-y-2">
              <Label htmlFor="test">Test Type</Label>
              <Select value={selectedTest} onValueChange={setSelectedTest}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a test" />
                </SelectTrigger>
                <SelectContent>
                  {partnerLab?.testingCapabilities.map((test) => (
                    <SelectItem key={test} value={test}>
                      {test}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex gap-3 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create Order</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewOrderDialog;
