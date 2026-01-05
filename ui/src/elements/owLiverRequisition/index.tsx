import React, { useEffect, useState } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { Loader } from "lucide-react";

const templatePdf = "/templates/OW_Liver_Requisition.pdf";

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

interface OWLiverRequisitionProps {
  values: FormValues;
}

const OWLiverRequisition: React.FC<OWLiverRequisitionProps> = ({ values }) => {
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

      if (values.collectorName)
        page.drawText(values.collectorName, {
          x: 80,
          y: 394,
          size: 8,
          font,
          color: rgb(0, 0, 0),
        });
      if (values.fasting)
        page.drawRectangle({
          x: values.fasting ? 295 : 321,
          y: 395,
          width: 5,
          height: 5,
          color: rgb(0, 0, 0),
          borderColor: rgb(0, 0, 0),
        });
      if (values.hrSinceLastMeal)
        page.drawText(values.hrSinceLastMeal, {
          x: 345,
          y: 382,
          size: 8,
          font,
          color: rgb(0, 0, 0),
        });
      if (values.dateCollected)
        page.drawText(values.dateCollected, {
          x: 378,
          y: 382,
          size: 8,
          font,
          color: rgb(0, 0, 0),
        });
      if (values.timeCollected)
        page.drawText(values.timeCollected, {
          x: 472,
          y: 382,
          size: 8,
          font,
          color: rgb(0, 0, 0),
        });
      if (values.am)
        page.drawRectangle({
          x: values.am ? 560 : 578,
          y: 395,
          width: 5,
          height: 5,
          color: rgb(0, 0, 0),
          borderColor: rgb(0, 0, 0),
        });

      if (values.icd10Codes)
        values.icd10Codes?.forEach((item) => {
          if (item === "E78.5") {
            page.drawRectangle({
              x: 16,
              y: 348,
              width: 5,
              height: 5,
              color: rgb(0, 0, 0),
            });
          }

          if (item === "E11.65") {
            page.drawRectangle({
              x: 16,
              y: 332,
              width: 5,
              height: 5,
              color: rgb(0, 0, 0),
            });
          }

          if (item === "E13.8") {
            page.drawRectangle({
              x: 16,
              y: 316,
              width: 5,
              height: 5,
              color: rgb(0, 0, 0),
            });
          }

          if (item === "E13.9") {
            page.drawRectangle({
              x: 16,
              y: 300,
              width: 5,
              height: 5,
              color: rgb(0, 0, 0),
            });
          }

          if (item === "K75.81") {
            page.drawRectangle({
              x: 16,
              y: 284,
              width: 5,
              height: 5,
              color: rgb(0, 0, 0),
            });
          }
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

      const pdfBytes = await pdfDoc.save();

      const blob = new Blob([new Uint8Array(pdfBytes)], {
        type: "application/pdf",
      });

      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    };

    generatePdf();
  }, [values]);

  if (!pdfUrl)
    return (
      <div className="flex items-center justify-center w-full h-[calc(100vh-140px)]">
        <Loader className="animate-spin" />
      </div>
    );

  return (
    <iframe
      src={pdfUrl}
      className="w-full h-[calc(100vh-140px)]"
      style={{ border: "none" }}
    />
  );
};

export default OWLiverRequisition;
