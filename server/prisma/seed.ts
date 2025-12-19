import { PrismaPg } from "@prisma/adapter-pg";
import {
  Gender,
  OrderStatus,
  PatientRecommendationStatus,
  PrismaClient,
  Status,
  TestFrequency,
  TestPriority,
  UserRole,
} from "@prisma/client";

const adapter = new PrismaPg({
  connectionString: "postgresql://postgres:sysadmin@localhost:5434/orphan_dx",
});

const prisma = new PrismaClient({ adapter });

async function main() {
  // ------------------------- Facility -------------------------
  const facility = await prisma.facility.create({
    data: {
      name: "Main Medical Facility",
      email: "facility@example.com",
      phone: "555-0000",
      address: "123 Medical Street",
      status: Status.ACTIVE,
    },
  });

  // ------------------------- Users -------------------------
  const adminUser = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@example.com",
      password: "hashedpassword1",
      role: UserRole.ADMIN,
      status: Status.ACTIVE,
      facilityId: facility.id,
    },
  });

  const providerUser = await prisma.user.create({
    data: {
      name: "Provider User",
      email: "provider@example.com",
      password: "hashedpassword2",
      role: UserRole.PROVIDER,
      status: Status.ACTIVE,
      facilityId: facility.id,
    },
  });

  const labUser = await prisma.user.create({
    data: {
      name: "Lab User",
      email: "lab@example.com",
      password: "hashedpassword3",
      role: UserRole.LAB,
      status: Status.ACTIVE,
      facilityId: facility.id,
    },
  });

  // ------------------------- Practices -------------------------
  const practice1 = await prisma.practice.create({
    data: {
      name: "Care Practice 1",
      ehrVendor: "Epic",
      ehrOrgId: "EHR001",
      facilityId: facility.id,
      status: Status.ACTIVE,
    },
  });

  const practice2 = await prisma.practice.create({
    data: {
      name: "Care Practice 2",
      ehrVendor: "Cerner",
      ehrOrgId: "EHR002",
      facilityId: facility.id,
      status: Status.ACTIVE,
    },
  });

  // ------------------------- Provider -------------------------
  const provider = await prisma.provider.create({
    data: {
      userId: providerUser.id,
      facilityId: facility.id,
      practiceId: practice1.id,
      npiNumber: "1234567890",
      specialty: "Internal Medicine",
      status: Status.ACTIVE,
    },
  });

  // ------------------------- Insurance -------------------------
  const insuranceProvider1 = await prisma.insuranceProvider.create({
    data: { name: "Blue Shield" },
  });

  const insuranceProvider2 = await prisma.insuranceProvider.create({
    data: { name: "United Health" },
  });

  const plan1 = await prisma.insurancePlan.create({
    data: {
      providerId: insuranceProvider1.id,
      name: "Plan A",
      code: "BSA001",
    },
  });

  const plan2 = await prisma.insurancePlan.create({
    data: {
      providerId: insuranceProvider2.id,
      name: "Plan B",
      code: "UHB002",
    },
  });

  // ------------------------- Patients -------------------------
  const patient1 = await prisma.patient.create({
    data: {
      name: "John Doe",
      practiceId: practice1.id,
      ehrPatientId: "PAT001",
      dob: new Date("1985-05-15"),
      gender: Gender.MALE,
      phone: "555-1234",
      email: "johndoe@example.com",
      status: Status.ACTIVE,
    },
  });

  const patient2 = await prisma.patient.create({
    data: {
      name: "Jane Smith",
      practiceId: practice2.id,
      ehrPatientId: "PAT002",
      dob: new Date("1990-08-20"),
      gender: Gender.FEMALE,
      phone: "555-5678",
      email: "janesmith@example.com",
      status: Status.ACTIVE,
    },
  });

  // ------------------------- Patient Insurance -------------------------
  await prisma.patientInsurancePlan.createMany({
    data: [
      { patientId: patient1.id, insurancePlanId: plan1.id },
      { patientId: patient2.id, insurancePlanId: plan2.id },
    ],
  });

  // ------------------------- Diagnoses -------------------------
  const diagnosis1 = await prisma.diagnosis.create({
    data: { name: "Diabetes", icd10: "E11" },
  });

  const diagnosis2 = await prisma.diagnosis.create({
    data: { name: "Hypertension", icd10: "I10" },
  });

  await prisma.patientDiagnosis.createMany({
    data: [
      {
        patientId: patient1.id,
        diagnosisId: diagnosis1.id,
        onsetDate: new Date("2020-01-01"),
      },
      {
        patientId: patient2.id,
        diagnosisId: diagnosis2.id,
        onsetDate: new Date("2021-01-01"),
      },
    ],
  });

  // ------------------------- Lab -------------------------
  const lab = await prisma.lab.create({
    data: {
      name: "Central Lab",
      logoUrl: "https://example.com/logo.png",
      facilityId: facility.id,
      status: Status.ACTIVE,
    },
  });

  await prisma.labUser.create({
    data: {
      userId: labUser.id,
      labId: lab.id,
    },
  });

  // ------------------------- Tests -------------------------
  const test1 = await prisma.test.create({
    data: {
      labId: lab.id,
      name: "Blood Test",
      description: "Routine blood test",
      cptCode: "80050",
    },
  });

  const test2 = await prisma.test.create({
    data: {
      labId: lab.id,
      name: "Urine Test",
      description: "Routine urine test",
      cptCode: "81001",
    },
  });

  // ------------------------- Eligibility Rules -------------------------
  await prisma.testEligibilityRule.createMany({
    data: [
      { testId: test1.id, payer: "Blue Shield", rule: { maxAge: 65 } },
      { testId: test2.id, payer: "United Health", rule: { minAge: 18 } },
    ],
  });

  // ------------------------- Test Coverage -------------------------
  await prisma.testCoverage.createMany({
    data: [
      {
        testId: test1.id,
        insuranceId: plan1.id,
        frequency: TestFrequency.ANNUAL,
        notes: "Covered yearly",
      },
      {
        testId: test2.id,
        insuranceId: plan2.id,
        frequency: TestFrequency.SEMI_ANNUAL,
        notes: "Covered twice a year",
      },
    ],
  });

  // ------------------------- Recommendations -------------------------
  await prisma.patientRecommendation.createMany({
    data: [
      {
        patientId: patient1.id,
        testId: test1.id,
        providerId: provider.id,
        priority: TestPriority.MEDIUM,
      },
      {
        patientId: patient2.id,
        testId: test2.id,
        providerId: provider.id,
        priority: TestPriority.HIGH,
      },
    ],
  });

  // ------------------------- Orders -------------------------
  await prisma.order.createMany({
    data: [
      {
        patientId: patient1.id,
        testId: test1.id,
        providerId: provider.id,
        labId: lab.id,
        requisitionPdfUrl: "https://example.com/requisition1.pdf",
        status: OrderStatus.IN_PROGRESS,
      },
      {
        patientId: patient2.id,
        testId: test2.id,
        providerId: provider.id,
        labId: lab.id,
        requisitionPdfUrl: "https://example.com/requisition2.pdf",
        status: OrderStatus.SCHEDULED,
      },
    ],
  });

  // ------------------------- Events -------------------------
  await prisma.event.createMany({
    data: [
      { eventType: "ORDER_CREATED", entityId: patient1.id, metadata: { testId: test1.id } },
      { eventType: "ORDER_COMPLETED", entityId: patient2.id, metadata: { testId: test2.id } },
    ],
  });

  console.log("✅ Complete seeding finished!");
}

main()
  .catch(console.error)
  .finally(async () => prisma.$disconnect());
