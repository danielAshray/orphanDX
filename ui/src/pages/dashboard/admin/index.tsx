import React, { useState } from "react";
import SelectionScreen from "./selectionScreen";
import { AdminDashboard } from "./adminDashboard";

const Admin: React.FC = () => {
  const [selectedType, setSelectedType] = useState<"lab" | "facility" | null>(
    null
  );
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null);

  const handleSelection = (type: "lab" | "facility", entityId: string) => {
    setSelectedType(type);
    setSelectedEntity(entityId);
  };

  const handleBack = () => {
    setSelectedType(null);
    setSelectedEntity(null);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-8">
      {/* Main Content */}
      {!selectedType || !selectedEntity ? (
        <SelectionScreen onSelect={handleSelection} />
      ) : (
        <AdminDashboard
          type={selectedType}
          entityId={selectedEntity}
          onBack={handleBack}
        />
      )}
    </div>
  );
};

export default Admin;
