import { useState } from "react";
import { Building2, TestTube, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { Button } from "@/components/button";

const LABS = [
  { id: "lab-1", name: "Central Diagnostics Lab" },
  { id: "lab-2", name: "Advanced Research Lab" },
  { id: "lab-3", name: "City Medical Lab" },
  { id: "lab-4", name: "HealthTech Laboratory" },
];

const FACILITIES = [
  { id: "facility-1", name: "Memorial Hospital" },
  { id: "facility-2", name: "Community Health Center" },
  { id: "facility-3", name: "St. Mary's Medical Center" },
  { id: "facility-4", name: "Regional Care Facility" },
];

interface SelectionScreenProps {
  onSelect: (type: "lab" | "facility", entityId: string) => void;
}

const SelectionScreen: React.FC<SelectionScreenProps> = ({ onSelect }) => {
  const [selectedType, setSelectedType] = useState<"lab" | "facility" | null>(
    null
  );
  const [selectedEntityId, setSelectedEntityId] = useState<string>("");

  const handleContinue = () => {
    if (selectedType && selectedEntityId) {
      onSelect(selectedType, selectedEntityId);
    }
  };

  const entities =
    selectedType === "lab"
      ? LABS
      : selectedType === "facility"
      ? FACILITIES
      : [];

  return (
    <div className="max-w-2xl mx-auto mt-20 px-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h1 className="text-2xl mb-2">Admin Selection</h1>
        <p className="text-gray-600 mb-8">
          Choose the type and select a specific entity to view its dashboard
        </p>

        {/* Type Selection */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm mb-3">Select Type</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setSelectedType("lab");
                  setSelectedEntityId("");
                }}
                className={`p-6 rounded-lg border-2 transition-all ${
                  selectedType === "lab"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <TestTube
                  className={`size-8 mx-auto mb-3 ${
                    selectedType === "lab" ? "text-blue-500" : "text-gray-400"
                  }`}
                />
                <div
                  className={
                    selectedType === "lab" ? "text-blue-700" : "text-gray-700"
                  }
                >
                  Lab
                </div>
              </button>

              <button
                onClick={() => {
                  setSelectedType("facility");
                  setSelectedEntityId("");
                }}
                className={`p-6 rounded-lg border-2 transition-all ${
                  selectedType === "facility"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Building2
                  className={`size-8 mx-auto mb-3 ${
                    selectedType === "facility"
                      ? "text-blue-500"
                      : "text-gray-400"
                  }`}
                />
                <div
                  className={
                    selectedType === "facility"
                      ? "text-blue-700"
                      : "text-gray-700"
                  }
                >
                  Facility
                </div>
              </button>
            </div>
          </div>

          {/* Entity Dropdown */}
          {selectedType && (
            <div>
              <label className="block text-sm mb-3">
                Select {selectedType === "lab" ? "Lab" : "Facility"}
              </label>
              <Select
                value={selectedEntityId}
                onValueChange={setSelectedEntityId}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={`Choose a ${selectedType}...`} />
                </SelectTrigger>
                <SelectContent>
                  {entities.map((entity) => (
                    <SelectItem key={entity.id} value={entity.id}>
                      {entity.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Continue Button */}
          <Button
            onClick={handleContinue}
            disabled={!selectedType || !selectedEntityId}
            className="w-full mt-4"
          >
            Continue to Dashboard
            <ChevronRight className="size-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectionScreen;
