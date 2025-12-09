import { PDFViewer } from "@react-pdf/renderer";
import HartTrfPdf from "./HartTrf.pdf";
import OwlLiverPdf from "./OWLiver.pdf";

export default function PdfPage() {
  return (
    <div>
      <PDFViewer style={{ width: "100%", height: "100vh" }}>
        <OwlLiverPdf />
      </PDFViewer>
    </div>
  );
}
