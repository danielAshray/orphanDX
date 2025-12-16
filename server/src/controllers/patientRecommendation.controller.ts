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

const owlIcd10Codes: string[] = [
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

const hartLabIcd10Codes: string[] = [
  "I20.9",
  "I20.8",
  "R07.9",
  "R07.89",
  "R06.02",
  "R07.2",
  "R12",
  "R53.81",
  "M79.602",
  "R68.84",
  "R00.2",
  "R42",
  "I25.119",
  "I70.209",
  "I25.10",
  "I25.110",
  "I25.111",
  "I25.5",
  "I25.702",
  "I10",
  "Z82.41",
  "Z82.49",
  "E78.5",
  "E78.2",
  "E11.9",
  "E11.8",
  "E11.22",
  "E10.9",
  "E10.8",
  "N18.9",
  "N18.1",
  "N18.2",
  "N18.30",
  "N18.4",
  "N18.5",
  "E88.81",
  "E66.9",
  "I65.21",
  "I65.22",
  "I65.23",
  "F17.210",
  "F17.218",
  "F17.219",
  "R94.39",
  "R94.31",
  "I73.9",
];

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

export const throwNotFound = (data: any, entity: string) => {
  if (!data) {
    throw { message: `${entity} not found`, code: 404 };
  }
};

export const recommendPatient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { patientId, testId, facilityId, reason, priority, labId } = req.body;
    const patient = await prisma.patient.findFirst({
      where: { id: +patientId },
      include: {
        patientDiagnoses: {
          select: { diagnosis: { select: { icd10: true } } },
        },
      },
    });

    const facility = prisma.facility.findFirst({ where: { id: facilityId } });
    const test = prisma.test.findFirst({ where: { id: testId } });
    throwNotFound(test, "Test");
    throwNotFound(facility, "Facility");
    throwNotFound(patient, "Patient");

    const lab = await prisma.lab.findFirst({ where: { id: labId } });
    throwNotFound(lab, "Lab");
    const owlLabMatch = lab!.name === "Luxor Scientific Lab";

    const age = calculateAge(patient!.dob);
    if (owlLabMatch && age < 18) {
      return res.status(422).json({
        message:
          "Patient must be at least 18 years of age to qualify for the test.",
      });
    }

    const foundOwlCode = patient?.patientDiagnoses.some((diagnosis) =>
      owlIcd10Codes.includes(diagnosis.diagnosis.icd10)
    );
    if (owlLabMatch && !foundOwlCode) {
      return res.status(422).json({
        message: "Patient does not meet the stated diagnosis code.",
      });
    }

    const hartLabMatch = lab!.name === "HART Lab";
    const foundHartLabCode = patient?.patientDiagnoses.some((diagnosis) =>
      hartLabIcd10Codes.includes(diagnosis.diagnosis.icd10)
    );

    if (hartLabMatch && !foundHartLabCode) {
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
        labId: 1,
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

export const editPatientRecommendation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = +req.params.id;
    const { patientId, testId, facilityId, reason, priority, labId } = req.body;
    const patient = await prisma.patient.findFirst({
      where: { id: +patientId },
      include: {
        patientDiagnoses: {
          select: { diagnosis: { select: { icd10: true } } },
        },
      },
    });

    const patientRecommendation = prisma.patientRecommendation.findFirst({
      where: { id },
    });
    throwNotFound(patientRecommendation, "Patient Recommendation");

    const facility = prisma.facility.findFirst({ where: { id: facilityId } });
    const test = prisma.test.findFirst({ where: { id: testId } });
    throwNotFound(test, "Test");
    throwNotFound(facility, "Facility");
    throwNotFound(patient, "Patient");

    const lab = await prisma.lab.findFirst({ where: { id: labId } });
    throwNotFound(lab, "Lab");
    const owlLabMatch = lab!.name === "Luxor Scientific Lab";

    const age = calculateAge(patient!.dob);
    if (owlLabMatch && age < 18) {
      return res.status(422).json({
        message:
          "Patient must be at least 18 years of age to qualify for the test.",
      });
    }

    const hartLabMatch = lab!.name === "HART Lab";
    const foundHartLabCode = patient?.patientDiagnoses.some((diagnosis) =>
      hartLabIcd10Codes.includes(diagnosis.diagnosis.icd10)
    );

    if (hartLabMatch && !foundHartLabCode) {
      return res.status(422).json({
        message: "Patient does not meet the stated diagnosis code.",
      });
    }

    const foundOwlCode = patient?.patientDiagnoses.some((diagnosis) =>
      owlIcd10Codes.includes(diagnosis.diagnosis.icd10)
    );
    if (owlLabMatch && !foundOwlCode) {
      return res.status(422).json({
        message: "Patient does not meet the stated diagnosis code.",
      });
    }

    const response = await prisma.patientRecommendation.update({
      where: { id },
      data: {
        patientId,
        testId,
        facilityId,
        reason,
        priority,
        labId: 1,
      },
    });

    res.status(201).json({
      message: "Patient recommendation successfully updated",
      data: response,
    });
  } catch (exception) {
    next(exception);
  }
};
