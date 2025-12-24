import { PDFViewer } from "@react-pdf/renderer";
import OwlLiverPdf from "./OwlLiver.pdf";
import HartTrfPdf from "./HartTrf.pdf";

export default function PdfPage() {
  return (
    <div>
      <PDFViewer style={{ width: "100%", height: "100vh" }}>
        <OwlLiverPdf />
      </PDFViewer>
    </div>
  );
}
