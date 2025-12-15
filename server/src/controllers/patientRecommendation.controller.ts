import { NextFunction, Response, Request } from "express";
import { prisma } from "../prisma";

export interface IDiagnosis {
  id: number;
  name: string;
  icd10: string;
}
export interface PatientDiagnosis {
  id: number;
  patientId: number;
  diagnosis: IDiagnosis[];
}

export interface Diagnosis {
  id: number;
  name: String;
  icd10: String;
}

const qualifyingIcd10Codes: string[] = [
  "E11.9",
  "E11.65",
  "R73.01",
  "R73.02",
  "R73.09",
  "E66.01",
  "E66.9",
  "Z68.30-Z68.39",
  "E78.0",
  "E78.1",
  "E78.2",
  "E78.41",
  "E78.5",
  "E78.9",
  "E28.2",
  "E03.9",
  "E03.8",
  "E89.0",
  "G47.33",
  "L40.9",
  "L40.1",
  "L40.0-L40.8",
  "E23.0",
  "E29.1",
  "E89.5",
  "Z90.411",
  "Z90.412",
  "K91.89",
  "E86.1",
  "R74.01",
  "K76.0",
  "K74.01",
  "K75.81",
  "R74.8",
  "R94.5",
];
export const recommendPatient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { patientId, testId, facilityId, reason, priority } = req.body;
    const patient = await prisma.patient.findFirst({
      where: { id: +patientId },
      include: {
        patientDiagnoses: {
          select: { diagnosis: { select: { icd10: true } } },
        },
      },
    });
    if (!patient) {
      res.status(404).json({
        message: "Patient not found",
      });
    }
    const age = calculateAge(patient!.dob);
    if (age < 18) {
      return res.status(422).json({
        message:
          "Patient must be at least 18 years of age to qualify for the test.",
      });
    }
    const status = patient?.patientDiagnoses.some((diagnosis) =>
      qualifyingIcd10Codes.includes(diagnosis.diagnosis.icd10)
    );
    if (!status) {
      return res.status(422).json({
        message: "Patient does not meet the stated diagnosis code.",
      });
    }

    const response = await prisma.patientRecommendation.create({
      data: {
        patientId,
        testId,
        facilityId,
        reason,
        priority,
      },
    });

    res.status(201).json({
      message: "Patient recommendation successfully created",
      data: response,
    });
  } catch (exception) {
    next(exception);
  }
};

const calculateAge = (dob: Date | string) => {
  const todayDate = new Date();
  const birthDate = new Date(dob);
  let age = todayDate.getFullYear() - birthDate.getFullYear();
  let m = todayDate.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && todayDate.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};
