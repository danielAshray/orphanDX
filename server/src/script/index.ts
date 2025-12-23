import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

async function main() {
  const adminEmail = "daniel@ashrayconsulting.com";
  const adminPassword = "Rememberme@123";

  const serviceUser = await prisma.user.findFirst({
    where: { role: "SERVICE_ACCOUNT" },
  });

  if (serviceUser) {
    console.log("ServiceUser already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.create({
    data: {
      email: adminEmail,
      password: hashedPassword,
      name: "Developer",
      role: "SERVICE_ACCOUNT",
    },
  });

  console.log("Developer account created:", admin.email);
}

async function seedPatient() {
  console.log("Seeding 100 patients with insurance and diagnosis...");
  const organization = await prisma.organization.findFirst({
    where: { role: "FACILITY" },
  });

  if (!organization) return;
  for (let i = 0; i < 100; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const mrn = `MRN-2025-${i.toString().padStart(3, "0")}`;
    const dob = faker.date.birthdate({ min: 50, max: 90, mode: "age" });
    const dobFormatted = dayjs(dob).format("MM/DD/YYYY");
    const gender = faker.helpers.arrayElement(["MALE", "FEMALE", "OTHER"]);
    const phone = faker.phone.number({ style: "national" });
    const email = faker.internet.email({ firstName, lastName });

    const insuranceData = {
      provider: faker.helpers.arrayElement([
        "Medicare",
        "Aetna",
        "Blue Cross",
        "Cigna",
      ]),
      plan: faker.helpers.arrayElement(["Part B", "PPO", "HMO", "Medicaid"]),
      type: faker.helpers.arrayElement(["Primary", "Secondary", "Self"]),
      memberId: "0111",
    };

    const numDiagnosis = faker.number.int({ min: 1, max: 3 });
    const diagnosisData = Array.from({ length: numDiagnosis }).map(() => ({
      name: faker.helpers.arrayElement([
        "Coronary Artery Disease",
        "Hyperlipidemia",
        "Diabetes Mellitus",
        "Hypertension",
        "Asthma",
      ]),
      icd10: faker.helpers.arrayElement([
        "I25.10",
        "E78.5",
        "E11.9",
        "I10",
        "J45.909",
      ]),
      onsetDate: faker.date.past({ years: 10 }),
    }));

    try {
      await prisma.$transaction(async (tx) => {
        const patient = await tx.patient.create({
          data: {
            facilityId: organization.id,
            firstName,
            lastName,
            mrn,
            dateOfBirth: dobFormatted,
            gender,
            phone,
            email,
            lastVisit: new Date(),
            insurance: {
              create: insuranceData,
            },
            diagnosis: {
              createMany: {
                data: diagnosisData.map((d) => ({
                  name: d.name,
                  icd10: d.icd10,
                  onsetDate: d.onsetDate,
                })),
              },
            },
          },
        });

        console.log(
          `Created patient: ${patient.firstName} ${patient.lastName}`
        );
      });
      console.log("Seeding completed!");
    } catch (error) {
      console.log(error);
    }
  }
}

async function fillLabRule() {
  try {
    const OWLIVER_ELIGIBLE_CODES = [
      {
        icd10: "E11.9",
        message: "Type 2 diabetes mellitus without complications",
        cptCode: "TM210",
        testName: "Spravato",
      },
      {
        icd10: "E11.65",
        message: "Type 2 diabetes with hyperglycemia",
        cptCode: "TM210",
        testName: "Spravato",
      },
      {
        icd10: "R73.01",
        message: "Impaired fasting glucose",
        cptCode: "TM210",
        testName: "Spravato",
      },
      {
        icd10: "R73.02",
        message: "Impaired glucose tolerance (oral)",
        cptCode: "TM210",
        testName: "Spravato",
      },
      {
        icd10: "R73.09",
        message: "Other abnormal glucose",
        cptCode: "TM210",
        testName: "Spravato",
      },
      {
        icd10: "E66.01",
        message: "Morbid obesity (BMI ≥40)",
        cptCode: "TM210",
        testName: "Spravato",
      },
      {
        icd10: "E66.9",
        message: "Obesity, unspecified",
        cptCode: "TM210",
        testName: "Spravato",
      },
      {
        icd10: "Z68.30",
        message: "BMI 30-30.9",
        cptCode: "TM210",
        testName: "Spravato",
      },
      {
        icd10: "Z68.31",
        message: "BMI 31-31.9",
        cptCode: "TM210",
        testName: "Spravato",
      },
      {
        icd10: "Z68.32",
        message: "BMI 32-32.9",
        cptCode: "TM210",
        testName: "Spravato",
      },
      {
        icd10: "Z68.33",
        message: "BMI 33-33.9",
        cptCode: "TM210",
        testName: "Spravato",
      },
      {
        icd10: "Z68.34",
        message: "BMI 34-34.9",
        cptCode: "TM210",
        testName: "Spravato",
      },
      {
        icd10: "Z68.35",
        message: "BMI 35-35.9",
        cptCode: "TM210",
        testName: "Spravato",
      },
      {
        icd10: "Z68.36",
        message: "BMI 36-36.9",
        cptCode: "TM210",
        testName: "Spravato",
      },
      {
        icd10: "Z68.37",
        message: "BMI 37-37.9",
        cptCode: "TM210",
        testName: "Spravato",
      },
      {
        icd10: "Z68.38",
        message: "BMI 38-38.9",
        cptCode: "TM210",
        testName: "Spravato",
      },
      {
        icd10: "Z68.39",
        message: "BMI 39-39.9",
        cptCode: "TM210",
        testName: "Spravato",
      },
      {
        icd10: "E78.0",
        message: "Pure hypercholesterolemia",
        cptCode: "TM210",
        testName: "Spravato",
      },
      {
        icd10: "E78.1",
        message: "Pure hyperglyceridemia",
        cptCode: "TM210",
        testName: "Spravato",
      },
      {
        icd10: "E78.2",
        message: "Mixed hyperlipidemia",
        cptCode: "TM210",
        testName: "Spravato",
      },
      {
        icd10: "E78.41",
        message: "Elevated Lp(a)",
        cptCode: "TM210",
        testName: "Spravato",
      },
      {
        icd10: "E78.5",
        message: "Hypertriglyceridemia",
        cptCode: "TM210",
        testName: "Spravato",
      },
      {
        icd10: "E78.9",
        message: "Hyperlipidemia, unspecified",
        cptCode: "TM210",
        testName: "Spravato",
      },
      {
        icd10: "E28.2",
        message: "Polycystic ovarian syndrome",
        cptCode: "TM210",
        testName: "Spravato",
      },
      {
        icd10: "E03.9",
        message: "Hypothyroidism, unspecified",
        cptCode: "TM210",
        testName: "Spravato",
      },
      {
        icd10: "E03.8",
        message: "Other hypothyroidism",
        cptCode: "TM210",
        testName: "Spravato",
      },
      {
        icd10: "E89.0",
        message: "Post-procedural hypothyroidism",
        cptCode: "TM210",
        testName: "Spravato",
      },
      {
        icd10: "G47.33",
        message: "Obstructive sleep apnea",
        cptCode: "TM210",
        testName: "Spravato",
      },
      {
        icd10: "L40.9",
        message: "Psoriasis, unspecified",
        cptCode: "TM210",
        testName: "Spravato",
      },
      {
        icd10: "L40.1",
        message: "Generalized pustular psoriasis",
        cptCode: "TM210",
        testName: "Spravato",
      },
      {
        icd10: "L40.0",
        message: "Psoriasis vulgaris",
        cptCode: "TM210",
        testName: "Spravato",
      },
      {
        icd10: "L40.2",
        message: "Psoriasis guttate",
        cptCode: "TM210",
        testName: "Spravato",
      },
      {
        icd10: "L40.3",
        message: "Pustular psoriasis",
        cptCode: "TM210",
        testName: "Spravato",
      },
      {
        icd10: "L40.4",
        message: "Psoriatic arthropathy",
        cptCode: "TM210",
        testName: "Spravato",
      },
      {
        icd10: "L40.5",
        message: "Other psoriasis",
        cptCode: "TM210",
        testName: "Spravato",
      },
      {
        icd10: "L40.6",
        message: "Arthropathic psoriasis",
        cptCode: "TM210",
        testName: "Spravato",
      },
      {
        icd10: "L40.8",
        message: "Other psoriasis variants",
        cptCode: "TM210",
        testName: "Spravato",
      },
      {
        icd10: "E23.0",
        message: "Hypopituitarism",
        cptCode: "TM210",
        testName: "Spravato",
      },
      {
        icd10: "E29.1",
        message: "Testicular hypogonadism",
        cptCode: "TM210",
        testName: "Spravato",
      },
      {
        icd10: "E89.5",
        message: "Post-procedural hypogonadism",
        cptCode: "TM210",
        testName: "Spravato",
      },
      {
        icd10: "Z90.411",
        message: "Acquired absence of pancreas, partial",
        cptCode: "TM210",
        testName: "Spravato",
      },
      {
        icd10: "Z90.412",
        message: "Acquired absence of pancreas, total",
        cptCode: "TM210",
        testName: "Spravato",
      },
      {
        icd10: "K91.89",
        message: "Other post-procedural GI disorders",
        cptCode: "TM210",
        testName: "Spravato",
      },
      {
        icd10: "E86.1",
        message: "Exocrine pancreatic insufficiency",
        cptCode: "TM210",
        testName: "Spravato",
      },
      {
        icd10: "R74.01",
        message: "Elevation of liver transaminase levels",
        cptCode: "TM210",
        testName: "Spravato",
      },
      {
        icd10: "K76.0",
        message: "Fatty liver, not elsewhere classified",
        cptCode: "TM210",
        testName: "Spravato",
      },
      {
        icd10: "K74.01",
        message: "Fibrosis of liver, early (F1)",
        cptCode: "TM210",
        testName: "Spravato",
      },
      {
        icd10: "K75.81",
        message: "Non-alcoholic steatohepatitis (NASH)",
        cptCode: "TM210",
        testName: "Spravato",
      },
      {
        icd10: "R74.8",
        message: "Abnormal elevation of other serum enzyme levels",
        cptCode: "TM210",
        testName: "Spravato",
      },
      {
        icd10: "R94.5",
        message: "Abnormal results of liver function studies",
        cptCode: "TM210",
        testName: "Spravato",
      },
    ];

    const lab = await prisma.organization.findFirst({ where: { role: "LAB" } });

    if (!lab) return;
    await prisma.labRule.createMany({
      data: OWLIVER_ELIGIBLE_CODES.map((item) => ({
        code: item.icd10,
        message: item.message,
        labId: lab.id,
        testName: item.testName,
        cptCode: item.cptCode,
      })),
      skipDuplicates: true,
    });

    console.log("lab rules created");
  } catch (error) {
    console.log(error);
  }
}

async function createRecomendation() {
  try {
    const diagnosis = await prisma.diagnosis.findMany();

    for (const diagnisis of diagnosis) {
      const ruleFounds = await prisma.labRule.findMany({
        where: { code: diagnisis.icd10 },
      });

      for (const ruleFound of ruleFounds) {
        await prisma.labRecommendation.create({
          data: {
            labRuleId: ruleFound.id,
            testName: ruleFound.testName,
            reason: ruleFound.message,
            patientId: diagnisis.patientId,
            diagnosisId: diagnisis.id,
            priority: ruleFound.priority,
            cptCode: ruleFound.cptCode,
          },
        });
        await prisma.patient.update({
          where: { id: diagnisis.patientId },
          data: {
            recomendationCount: { increment: 1 },
          },
        });
        console.log(`created recomendation: `, ruleFound.code);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

async function createOrganizations() {
  let labOrg = await prisma.organization.findFirst({ where: { role: "LAB" } });
  if (!labOrg) {
    labOrg = await prisma.organization.create({
      data: {
        name: "Default Lab",
        role: "LAB",
        phone: "000-000-0000",
        city: "N/A",
        state: "N/A",
        zipCode: "00000",
        suite: "N/A",
        street: "N/A",
      },
    });
  }

  let facilityOrg = await prisma.organization.findFirst({
    where: { role: "FACILITY" },
  });
  if (!facilityOrg) {
    facilityOrg = await prisma.organization.create({
      data: {
        name: "Default Facility",
        role: "FACILITY",
        phone: "000-000-0000",
        city: "N/A",
        state: "N/A",
        zipCode: "00000",
        suite: "N/A",
        street: "N/A",
      },
    });
  }

  console.log("Organizations ready:", labOrg.name, facilityOrg.name);
  return { labOrg, facilityOrg };
}

async function createLabAndFacilityUsers() {
  try {
    // Check if LAB user exists
    const labUserExists = await prisma.user.findFirst({
      where: { role: "USER", organization: { role: "LAB" } },
    });

    if (!labUserExists) {
      const labOrg = await prisma.organization.findFirst({
        where: { role: "LAB" },
      });
      if (!labOrg) throw new Error("LAB organization not found");

      const labUser = await prisma.user.create({
        data: {
          email: "labuser@example.com",
          password: await bcrypt.hash("LabUser@123", 10),
          name: "Lab User",
          role: "ADMIN",
          organizationId: labOrg.id,
        },
      });

      console.log("LAB user created:", labUser.email);
    } else {
      console.log("LAB user already exists");
    }

    // Check if FACILITY user exists
    const facilityUserExists = await prisma.user.findFirst({
      where: { role: "USER", organization: { role: "FACILITY" } },
    });

    if (!facilityUserExists) {
      const facilityOrg = await prisma.organization.findFirst({
        where: { role: "FACILITY" },
      });
      if (!facilityOrg) throw new Error("FACILITY organization not found");

      const facilityUser = await prisma.user.create({
        data: {
          email: "facilityuser@example.com",
          password: await bcrypt.hash("FacilityUser@123", 10),
          name: "Facility User",
          role: "ADMIN",
          organizationId: facilityOrg.id,
        },
      });

      console.log("FACILITY user created:", facilityUser.email);
    } else {
      console.log("FACILITY user already exists");
    }
  } catch (error) {
    console.error("Error creating lab/facility users:", error);
  }
}

type tagType =
  | "user"
  | "org"
  | "labUser"
  | "patient"
  | "labRule"
  | "recommendation";
const callFunc: Record<tagType, Function> = {
  user: main,
  org: createOrganizations,
  labUser: createLabAndFacilityUsers,
  patient: seedPatient,
  labRule: fillLabRule,
  recommendation: createRecomendation,
};

callFunc["labUser"]();
