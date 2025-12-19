import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";

async function main() {
  const adminEmail = "daniel@ashrayconsulting.com";
  const adminPassword = "Rememberme@123";

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log("Admin already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.create({
    data: {
      email: adminEmail,
      password: hashedPassword,
      name: "Developer",
      role: "ADMIN",
    },
  });

  console.log("Developer account created:", admin.email);
}

import { faker } from "@faker-js/faker";

async function seedPatient() {
  console.log("Seeding 100 patients with insurance and diagnoses...");

  for (let i = 0; i < 100; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const mrn = `MRN-2025-${i.toString().padStart(3, "0")}`;
    const dob = faker.date.birthdate({ min: 50, max: 90, mode: "age" });
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
    };

    const numDiagnoses = faker.number.int({ min: 1, max: 3 });
    const diagnosesData = Array.from({ length: numDiagnoses }).map(() => ({
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
            firstName,
            lastName,
            mrn,
            dateOfBirth: dob,
            gender,
            phone,
            email,
            insurance: {
              create: insuranceData,
            },
            diagnoses: {
              createMany: {
                data: diagnosesData.map((d) => ({
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
    } catch {}
  }
}

main();

seedPatient();
