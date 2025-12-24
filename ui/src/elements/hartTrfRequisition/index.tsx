import React, { useEffect, useState } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import templatePdf from "@/templates/HART_TRF_Requisition.pdf";
import { Loader } from "lucide-react";

type FormValues = {
  name: string;
  ssn?: string;
  dob?: string;
  sex?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  phone?: string;
  email?: string;
  race?: string;
  ethnicity?: string;
  bmi?: string;
  height?: string;
  weight?: string;

  billTo?: string;
  doi?: string;
  relationshipToSub?: string;
  patientInsuranceProvider?: string;
  subName?: string;
  subDob?: string;
  insuranceAddress?: string;
  insuranceCity?: string;
  insuranceState?: string;
  insuranceZip?: string;

  pocily?: string;
  group?: string;
  insurancePhone?: string;
  insuranceFax?: string;

  collectorName?: string;
  fasting?: boolean;
  hrSinceLastMeal?: string;
  dateCollected?: string;
  timeCollected?: string;
  am?: boolean;

  icd10Codes?: string[];

  patientSignature?: string;
  patientSDate?: string;

  providerSignature?: string;
  providerSDate?: string;
};

interface HartTrfRequisitionProps {
  values: FormValues;
}

const HartTrfRequisition: React.FC<HartTrfRequisitionProps> = ({ values }) => {
  const [pdfUrl, setPdfUrl] = useState<string>("");

  const comboAddress = [values.city, values.state, values.zip]
    .filter(Boolean)
    .join(", ");

  useEffect(() => {
    const generatePdf = async () => {
      // Fetch PDF template
      const existingPdfBytes = await fetch(templatePdf).then((res) =>
        res.arrayBuffer()
      );

      // Load PDF
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const page = pdfDoc.getPage(0);

      // Draw values at specific coordinates
      page.drawText(values.name, {
        x: 16,
        y: 704,
        size: 6,
        font,
        color: rgb(0, 0, 0),
      });
      if (values.ssn)
        page.drawText(values.ssn, {
          x: 216,
          y: 704,
          size: 6,
          font,
          color: rgb(0, 0, 0),
        });
      if (values.dob)
        page.drawText(values.dob, {
          x: 16,
          y: 682,
          size: 6,
          font,
          color: rgb(0, 0, 0),
        });
      if (values.sex)
        page.drawRectangle({
          x: values.sex === "male" ? 160 : 189,
          y: 681,
          width: 6,
          height: 6,
          color: rgb(0, 0, 0),
          borderColor: rgb(0, 0, 0),
        });
      if (values.address)
        page.drawText(values.address, {
          x: 16,
          y: 660,
          size: 6,
          font,
          color: rgb(0, 0, 0),
        });
      if (values.race)
        page.drawRectangle({
          x:
            values.race === "asian"
              ? 36
              : values.race === "black"
              ? 69
              : values.race === "caucasian"
              ? 101
              : values.race === "hispanic"
              ? 149
              : values.race === "native american"
              ? 192
              : values.race === "other"
              ? 262
              : 294,
          y: 604,
          width: 6,
          height: 6,
          color: rgb(0, 0, 0),
          borderColor: rgb(0, 0, 0),
        });
      if (values.ethnicity)
        page.drawRectangle({
          x:
            values.ethnicity === "hispanic"
              ? 50
              : values.ethnicity === "non-hispanic"
              ? 95
              : 155,
          y: 593,
          width: 6,
          height: 6,
          color: rgb(0, 0, 0),
          borderColor: rgb(0, 0, 0),
        });
      if (comboAddress)
        page.drawText(comboAddress, {
          x: 16,
          y: 638,
          size: 6,
          font,
          color: rgb(0, 0, 0),
        });

      if (values.phone)
        page.drawText(values.phone, {
          x: 16,
          y: 618,
          size: 6,
          font,
          color: rgb(0, 0, 0),
        });
      if (values.email)
        page.drawText(values.email, {
          x: 160,
          y: 618,
          size: 6,
          font,
          color: rgb(0, 0, 0),
        });
      if (values.bmi)
        page.drawText(values.bmi, {
          x: 16,
          y: 570,
          size: 6,
          font,
          color: rgb(0, 0, 0),
        });
      if (values.height)
        page.drawText(values.height, {
          x: 162,
          y: 570,
          size: 6,
          font,
          color: rgb(0, 0, 0),
        });
      if (values.weight)
        page.drawText(values.weight, {
          x: 308,
          y: 570,
          size: 6,
          font,
          color: rgb(0, 0, 0),
        });

      if (values.patientSignature)
        page.drawText(values.patientSignature, {
          x: 61,
          y: 231,
          size: 6,
          font,
          color: rgb(0, 0, 0),
        });
      if (values.patientSDate)
        page.drawText(values.patientSDate, {
          x: 302,
          y: 231,
          size: 6,
          font,
          color: rgb(0, 0, 0),
        });
      if (values.providerSignature)
        page.drawText(values.providerSignature, {
          x: 412,
          y: 231,
          size: 6,
          font,
          color: rgb(0, 0, 0),
        });
      if (values.providerSDate)
        page.drawText(values.providerSDate, {
          x: 540,
          y: 231,
          size: 6,
          font,
          color: rgb(0, 0, 0),
        });

      // Save PDF and create Blob URL
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], {
        type: "application/pdf",
      });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    };

    generatePdf();

    // Cleanup blob URL on unmount
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [values]);

  if (!pdfUrl)
    return (
      <div className="flex items-center justify-center w-full h-[600px]">
        <Loader className="animate-spin" />
      </div>
    );

  return (
    <iframe
      src={pdfUrl}
      width="100%"
      height="600px"
      style={{ border: "none" }}
    />
  );
};

export default HartTrfRequisition;
