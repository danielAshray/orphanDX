import { useCompleteOrder } from "@/api/order";
import type { completeOrderProps } from "@/types";
import { useState } from "react";

const emptyResult = {
  component: "",
  value: "",
  unit: "",
  status: "NORMAL",
  referenceRange: { low: "", high: "" },
};

const AddResultModal = ({ order, onClose }: any) => {
  const [summary, setSummary] = useState("");
  const [isNormal, setIsNormal] = useState(true);
  const [results, setResults] = useState([emptyResult]);
  const [recommendations, setRecommendations] = useState([{ action: "" }]);
  const { isPending, mutate } = useCompleteOrder();
  const submit = () => {
    const payload: completeOrderProps = {
      orderId: order.id,
      isNormal,
      summary,
      result: results.map((r) => ({
        component: r.component,
        value: Number(r.value),
        unit: r.unit,
        referenceRange: {
          low: Number(r.referenceRange.low),
          high: Number(r.referenceRange.high),
        },
        status: r.status as "NORMAL" | "HIGH" | "LOW",
      })),
      recomendations: recommendations
        .filter((r) => r.action.trim())
        .map((r) => ({ action: r.action })),
    };

    mutate(payload, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-3xl p-6 overflow-y-auto max-h-[90vh]">
        <h3 className="text-lg font-semibold mb-4">
          Add Lab Result – {order.patientName}
        </h3>

        {/* Summary */}
        <label className="block mb-4">
          <span className="text-sm font-medium">Summary</span>
          <textarea
            className="mt-1 w-full rounded-lg border p-2"
            rows={3}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </label>

        {/* Normal toggle */}
        <label className="flex items-center gap-2 mb-6">
          <input
            type="checkbox"
            checked={isNormal}
            onChange={(e) => setIsNormal(e.target.checked)}
          />
          <span className="text-sm">Overall Normal</span>
        </label>

        {/* Results */}
        <h4 className="font-medium mb-2">Results</h4>

        <div className="space-y-3">
          {results.map((r, i) => (
            <div
              key={i}
              className="grid grid-cols-7 gap-2 items-center border rounded-xl p-3"
            >
              <input
                placeholder="Component"
                className="col-span-2 input"
                value={r.component}
                onChange={(e) => {
                  const copy = [...results];
                  copy[i].component = e.target.value;
                  setResults(copy);
                }}
              />

              <input
                placeholder="Value"
                className="input"
                value={r.value}
                onChange={(e) => {
                  const copy = [...results];
                  copy[i].value = e.target.value;
                  setResults(copy);
                }}
              />

              <input
                placeholder="Unit"
                className="input"
                value={r.unit}
                onChange={(e) => {
                  const copy = [...results];
                  copy[i].unit = e.target.value;
                  setResults(copy);
                }}
              />

              <input
                placeholder="Low"
                className="input"
                value={r.referenceRange.low}
                onChange={(e) => {
                  const copy = [...results];
                  copy[i].referenceRange.low = e.target.value;
                  setResults(copy);
                }}
              />

              <input
                placeholder="High"
                className="input"
                value={r.referenceRange.high}
                onChange={(e) => {
                  const copy = [...results];
                  copy[i].referenceRange.high = e.target.value;
                  setResults(copy);
                }}
              />

              <select
                className="input"
                value={r.status}
                onChange={(e) => {
                  const copy = [...results];
                  copy[i].status = e.target.value;
                  setResults(copy);
                }}
              >
                <option value="NORMAL">NORMAL</option>
                <option value="HIGH">HIGH</option>
                <option value="LOW">LOW</option>
              </select>
            </div>
          ))}
        </div>

        <button
          className="mt-3 text-sm text-blue-600"
          onClick={() => setResults([...results, emptyResult])}
        >
          + Add Result
        </button>

        {/* Recommendations */}
        <h4 className="font-medium mt-6 mb-2">Recommendations</h4>

        {recommendations.map((r, i) => (
          <input
            key={i}
            placeholder="Recommendation"
            className="w-full mb-2 rounded-lg border p-2"
            value={r.action}
            onChange={(e) => {
              const copy = [...recommendations];
              copy[i].action = e.target.value;
              setRecommendations(copy);
            }}
          />
        ))}

        <button
          className="text-sm text-blue-600"
          onClick={() =>
            setRecommendations([...recommendations, { action: "" }])
          }
        >
          + Add Recommendation
        </button>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6">
          <button className="px-4 py-2 rounded-lg border" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-5 py-2 rounded-lg bg-blue-600 text-white"
            onClick={submit}
            disabled={isPending}
          >
            {isPending ? "Submitting..." : "Submit Result"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddResultModal;
