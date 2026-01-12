import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { Organization } from "@prisma/client";

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
        cptCode: "TM211",
        testName: "Glucose Panel",
      },
      {
        icd10: "E11.65",
        message: "Type 2 diabetes with hyperglycemia",
        cptCode: "TM212",
        testName: "HbA1c",
      },
      {
        icd10: "R73.01",
        message: "Impaired fasting glucose",
        cptCode: "TM213",
        testName: "Fasting Glucose",
      },
      {
        icd10: "R73.02",
        message: "Impaired glucose tolerance (oral)",
        cptCode: "TM214",
        testName: "OGTT",
      },
      {
        icd10: "R73.09",
        message: "Other abnormal glucose",
        cptCode: "TM215",
        testName: "Random Glucose",
      },
      {
        icd10: "E66.01",
        message: "Morbid obesity (BMI ≥40)",
        cptCode: "TM216",
        testName: "BMI Assessment",
      },
      {
        icd10: "E66.9",
        message: "Obesity, unspecified",
        cptCode: "TM217",
        testName: "Weight Assessment",
      },
      {
        icd10: "Z68.30",
        message: "BMI 30-30.9",
        cptCode: "TM218",
        testName: "BMI 30",
      },
      {
        icd10: "Z68.31",
        message: "BMI 31-31.9",
        cptCode: "TM219",
        testName: "BMI 31",
      },
      {
        icd10: "Z68.32",
        message: "BMI 32-32.9",
        cptCode: "TM220",
        testName: "BMI 32",
      },
      {
        icd10: "Z68.33",
        message: "BMI 33-33.9",
        cptCode: "TM221",
        testName: "BMI 33",
      },
      {
        icd10: "Z68.34",
        message: "BMI 34-34.9",
        cptCode: "TM222",
        testName: "BMI 34",
      },
      {
        icd10: "Z68.35",
        message: "BMI 35-35.9",
        cptCode: "TM223",
        testName: "BMI 35",
      },
      {
        icd10: "Z68.36",
        message: "BMI 36-36.9",
        cptCode: "TM224",
        testName: "BMI 36",
      },
      {
        icd10: "Z68.37",
        message: "BMI 37-37.9",
        cptCode: "TM225",
        testName: "BMI 37",
      },
      {
        icd10: "Z68.38",
        message: "BMI 38-38.9",
        cptCode: "TM226",
        testName: "BMI 38",
      },
      {
        icd10: "Z68.39",
        message: "BMI 39-39.9",
        cptCode: "TM227",
        testName: "BMI 39",
      },
      {
        icd10: "E78.0",
        message: "Pure hypercholesterolemia",
        cptCode: "TM228",
        testName: "Cholesterol Panel",
      },
      {
        icd10: "E78.1",
        message: "Pure hyperglyceridemia",
        cptCode: "TM229",
        testName: "Triglyceride Test",
      },
      {
        icd10: "E78.2",
        message: "Mixed hyperlipidemia",
        cptCode: "TM230",
        testName: "Lipid Panel",
      },
      {
        icd10: "E78.41",
        message: "Elevated Lp(a)",
        cptCode: "TM231",
        testName: "Lp(a) Test",
      },
      {
        icd10: "E78.5",
        message: "Hypertriglyceridemia",
        cptCode: "TM232",
        testName: "Triglycerides",
      },
      {
        icd10: "E78.9",
        message: "Hyperlipidemia, unspecified",
        cptCode: "TM233",
        testName: "Lipid Screening",
      },
      {
        icd10: "E28.2",
        message: "Polycystic ovarian syndrome",
        cptCode: "TM234",
        testName: "Hormone Panel",
      },
      {
        icd10: "E03.9",
        message: "Hypothyroidism, unspecified",
        cptCode: "TM235",
        testName: "TSH Test",
      },
      {
        icd10: "E03.8",
        message: "Other hypothyroidism",
        cptCode: "TM236",
        testName: "Thyroid Panel",
      },
      {
        icd10: "E89.0",
        message: "Post-procedural hypothyroidism",
        cptCode: "TM237",
        testName: "Thyroid Check",
      },
      {
        icd10: "G47.33",
        message: "Obstructive sleep apnea",
        cptCode: "TM238",
        testName: "Sleep Study",
      },
      {
        icd10: "L40.9",
        message: "Psoriasis, unspecified",
        cptCode: "TM239",
        testName: "Skin Exam",
      },
      {
        icd10: "L40.1",
        message: "Generalized pustular psoriasis",
        cptCode: "TM240",
        testName: "Derm Exam 1",
      },
      {
        icd10: "L40.0",
        message: "Psoriasis vulgaris",
        cptCode: "TM241",
        testName: "Derm Exam 2",
      },
      {
        icd10: "L40.2",
        message: "Psoriasis guttate",
        cptCode: "TM242",
        testName: "Derm Exam 3",
      },
      {
        icd10: "L40.3",
        message: "Pustular psoriasis",
        cptCode: "TM243",
        testName: "Derm Exam 4",
      },
      {
        icd10: "L40.4",
        message: "Psoriatic arthropathy",
        cptCode: "TM244",
        testName: "Derm Exam 5",
      },
      {
        icd10: "L40.5",
        message: "Other psoriasis",
        cptCode: "TM245",
        testName: "Derm Exam 6",
      },
      {
        icd10: "L40.6",
        message: "Arthropathic psoriasis",
        cptCode: "TM246",
        testName: "Derm Exam 7",
      },
      {
        icd10: "L40.8",
        message: "Other psoriasis variants",
        cptCode: "TM247",
        testName: "Derm Exam 8",
      },
      {
        icd10: "E23.0",
        message: "Hypopituitarism",
        cptCode: "TM248",
        testName: "Pituitary Hormone Test",
      },
      {
        icd10: "E29.1",
        message: "Testicular hypogonadism",
        cptCode: "TM249",
        testName: "Testosterone Panel",
      },
      {
        icd10: "E89.5",
        message: "Post-procedural hypogonadism",
        cptCode: "TM250",
        testName: "Hormone Follow-up",
      },
      {
        icd10: "Z90.411",
        message: "Acquired absence of pancreas, partial",
        cptCode: "TM251",
        testName: "Pancreatic Function Test",
      },
      {
        icd10: "Z90.412",
        message: "Acquired absence of pancreas, total",
        cptCode: "TM252",
        testName: "Complete Pancreatic Assessment",
      },
      {
        icd10: "K91.89",
        message: "Other post-procedural GI disorders",
        cptCode: "TM253",
        testName: "GI Function Panel",
      },
      {
        icd10: "E86.1",
        message: "Exocrine pancreatic insufficiency",
        cptCode: "TM254",
        testName: "Digestive Enzyme Test",
      },
      {
        icd10: "R74.01",
        message: "Elevation of liver transaminase levels",
        cptCode: "TM255",
        testName: "Liver Enzyme Panel",
      },
      {
        icd10: "K76.0",
        message: "Fatty liver, not elsewhere classified",
        cptCode: "TM256",
        testName: "Liver Ultrasound",
      },
      {
        icd10: "K74.01",
        message: "Fibrosis of liver, early (F1)",
        cptCode: "TM257",
        testName: "Liver Fibrosis Test",
      },
      {
        icd10: "K75.81",
        message: "Non-alcoholic steatohepatitis (NASH)",
        cptCode: "TM258",
        testName: "NASH Panel",
      },
      {
        icd10: "R74.8",
        message: "Abnormal elevation of other serum enzyme levels",
        cptCode: "TM259",
        testName: "Liver Enzyme Follow-up",
      },
      {
        icd10: "R94.5",
        message: "Abnormal results of liver function studies",
        cptCode: "TM260",
        testName: "Liver Function Review",
      },
    ];

    // Find OWLiver Lab
    const owLab = await prisma.organization.findFirst({
      where: { role: "LAB", name: "OWLiver Lab" },
    });
    if (owLab) {
      await prisma.labRule.createMany({
        data: OWLIVER_ELIGIBLE_CODES.map((item) => ({
          code: item.icd10,
          message: item.message,
          labId: owLab.id,
          testName: item.testName,
          cptCode: item.cptCode,
        })),
        skipDuplicates: true,
      });
      console.log("OWLiver Lab rules created");
    }

    // HartTrf Lab rules (example: could be slightly different tests or codes)
    const HARTTRF_ELIGIBLE_CODES = [
      {
        icd10: "J45.909",
        message: "Asthma, unspecified",
        cptCode: "HT401",
        testName: "Pulmonary Function Test",
      },
      {
        icd10: "M54.5",
        message: "Low back pain",
        cptCode: "HT402",
        testName: "Spinal X-Ray",
      },
      {
        icd10: "N39.0",
        message: "Urinary tract infection, site not specified",
        cptCode: "HT403",
        testName: "Urinalysis",
      },
      {
        icd10: "K21.9",
        message: "Gastro-esophageal reflux disease without esophagitis",
        cptCode: "HT404",
        testName: "Esophageal pH Test",
      },
      {
        icd10: "E66.01",
        message: "Morbid obesity",
        cptCode: "HT405",
        testName: "BMI Measurement",
      },
      {
        icd10: "I50.9",
        message: "Heart failure, unspecified",
        cptCode: "HT406",
        testName: "Echocardiogram",
      },
      {
        icd10: "K76.9",
        message: "Liver disease, unspecified",
        cptCode: "HT407",
        testName: "Liver Ultrasound",
      },
      {
        icd10: "G47.33",
        message: "Obstructive sleep apnea",
        cptCode: "HT408",
        testName: "Sleep Study HT",
      },
      {
        icd10: "M79.1",
        message: "Myalgia",
        cptCode: "HT409",
        testName: "Muscle Enzyme Panel",
      },
      {
        icd10: "L29.9",
        message: "Pruritus, unspecified",
        cptCode: "HT410",
        testName: "Allergy Panel",
      },
      {
        icd10: "R42",
        message: "Dizziness and giddiness",
        cptCode: "HT411",
        testName: "Vestibular Function Test",
      },
      {
        icd10: "N18.9",
        message: "Chronic kidney disease, unspecified",
        cptCode: "HT412",
        testName: "Kidney Function Panel",
      },
      {
        icd10: "E87.6",
        message: "Hypokalemia",
        cptCode: "HT413",
        testName: "Electrolyte Panel",
      },
      {
        icd10: "M25.50",
        message: "Pain in joint, unspecified",
        cptCode: "HT414",
        testName: "Joint Fluid Analysis",
      },
      {
        icd10: "F41.1",
        message: "Generalized anxiety disorder",
        cptCode: "HT415",
        testName: "Cortisol Test",
      },
    ];

    // Find HartTrf Lab
    const htLab = await prisma.organization.findFirst({
      where: { role: "LAB", name: "HartTrf Lab" },
    });
    if (htLab) {
      await prisma.labRule.createMany({
        data: HARTTRF_ELIGIBLE_CODES.map((item) => ({
          code: item.icd10,
          message: item.message,
          labId: htLab.id,
          testName: item.testName,
          cptCode: item.cptCode,
        })),
        skipDuplicates: true,
      });
      console.log("HartTrf Lab rules created");
    }
  } catch (error) {
    console.error("Error creating lab rules:", error);
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
  // --- Create LAB organizations ---
  const labNames = ["OWLiver Lab", "HartTrf Lab"];
  const labOrgs: Organization[] = [];

  for (const name of labNames) {
    let labOrg = await prisma.organization.findFirst({
      where: { name, role: "LAB" },
    });

    if (!labOrg) {
      labOrg = await prisma.organization.create({
        data: {
          name,
          role: "LAB",
          phone: "000-000-0000",
          city: "N/A",
          state: "N/A",
          zipCode: "00000",
          suite: "N/A",
          street: "N/A",
        },
      });
      console.log("LAB organization created:", labOrg.name);
    } else {
      console.log("LAB organization already exists:", labOrg.name);
    }

    labOrgs.push(labOrg);
  }

  // --- Create FACILITY organization ---
  const facilityName = "Ashray Tech";
  let facilityOrg = await prisma.organization.findFirst({
    where: { name: facilityName, role: "FACILITY" },
  });

  if (!facilityOrg) {
    facilityOrg = await prisma.organization.create({
      data: {
        name: facilityName,
        role: "FACILITY",
        phone: "000-000-0000",
        city: "N/A",
        state: "N/A",
        zipCode: "00000",
        suite: "N/A",
        street: "N/A",
      },
    });
    console.log("FACILITY organization created:", facilityOrg.name);
  } else {
    console.log("FACILITY organization already exists:", facilityOrg.name);
  }

  console.log(
    "Organizations ready:",
    labOrgs.map((l) => l.name).join(", "),
    "| Facility:",
    facilityOrg.name
  );

  return { labOrgs, facilityOrg };
}

async function createLabAndFacilityUsers() {
  try {
    // --- LAB USERS ---
    const labUsersData = [
      { email: "pawan@owliver.com", name: "OWLiver Lab Admin" },
      { email: "pawan@harttrf.com", name: "HartTrf Lab Admin" },
    ];

    for (const labData of labUsersData) {
      // Find corresponding lab organization
      const labOrg = await prisma.organization.findFirst({
        where: {
          name: labData.name.includes("OWLiver")
            ? "OWLiver Lab"
            : "HartTrf Lab",
          role: "LAB",
        },
      });

      if (!labOrg) {
        console.warn("LAB organization not found for", labData.name);
        continue;
      }

      // Check if user exists
      const existingUser = await prisma.user.findFirst({
        where: { email: labData.email },
      });

      if (!existingUser) {
        const user = await prisma.user.create({
          data: {
            email: labData.email,
            password: await bcrypt.hash("Rememberme@123", 10),
            name: labData.name,
            role: "ADMIN",
            organizationId: labOrg.id,
          },
        });
        console.log("LAB user created:", user.email);
      } else {
        console.log("LAB user already exists:", existingUser.email);
      }
    }

    // --- FACILITY USER ---
    const facilityOrg = await prisma.organization.findFirst({
      where: { name: "Ashray Tech", role: "FACILITY" },
    });

    if (!facilityOrg) throw new Error("FACILITY organization not found");

    const facilityEmail = "ashmit@ashray.tech";
    const existingFacilityUser = await prisma.user.findFirst({
      where: { email: facilityEmail },
    });

    if (!existingFacilityUser) {
      const facilityUser = await prisma.user.create({
        data: {
          email: facilityEmail,
          password: await bcrypt.hash("Rememberme@123", 10),
          name: "Facility Admin",
          role: "ADMIN",
          organizationId: facilityOrg.id,
        },
      });
      console.log("FACILITY user created:", facilityUser.email);
    } else {
      console.log("FACILITY user already exists:", existingFacilityUser.email);
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

// callFunc["user"]();
callFunc["org"]();
// callFunc["labUser"]();
// callFunc["patient"]();
// callFunc["labRule"]();
// callFunc["recommendation"]();
