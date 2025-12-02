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
} from "../src/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: "postgresql://postgres:sysadmin@localhost:5434/orphan_dx",
});
const prisma = new PrismaClient({ adapter });

async function main() {
  // ------------------------- Roles -------------------------
  await prisma.role.createMany({
    data: [
      { name: UserRole.ADMIN, description: "Administrator with full access" },
      { name: UserRole.PROVIDER, description: "Provider role" },
      { name: UserRole.LAB, description: "Lab role" },
    ],
    skipDuplicates: true,
  });

  const adminRole = await prisma.role.findUnique({
    where: { name: UserRole.ADMIN },
  });
  const providerRole = await prisma.role.findUnique({
    where: { name: UserRole.PROVIDER },
  });
  const labRole = await prisma.role.findUnique({
    where: { name: UserRole.LAB },
  });

  // ------------------------- Permissions -------------------------
  await prisma.permission.createMany({
    data: [
      { action: "CREATE", resource: "User", description: "Create a user" },
      { action: "READ", resource: "User", description: "Read users" },
      { action: "UPDATE", resource: "User", description: "Update a user" },
      { action: "DELETE", resource: "User", description: "Delete a user" },
      {
        action: "CREATE",
        resource: "Patient",
        description: "Create a patient",
      },
      { action: "READ", resource: "Patient", description: "Read patients" },
      { action: "UPDATE", resource: "Patient", description: "Update patient" },
      { action: "DELETE", resource: "Patient", description: "Delete patient" },
    ],
    skipDuplicates: true,
  });

  const allPermissions = await prisma.permission.findMany();

  // ------------------------- RolePermissions -------------------------
  if (adminRole && allPermissions.length) {
    for (const perm of allPermissions) {
      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: { roleId: adminRole.id, permissionId: perm.id },
        },
        update: {},
        create: { roleId: adminRole.id, permissionId: perm.id },
      });
    }
  }

  // ------------------------- Users -------------------------
  await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@example.com",
      password: "hashedpassword1",
      roleId: adminRole!.id,
      status: Status.ACTIVE,
    },
  });

  const providerUser = await prisma.user.create({
    data: {
      name: "Provider User",
      email: "provider@example.com",
      password: "hashedpassword2",
      roleId: providerRole!.id,
      status: Status.ACTIVE,
    },
  });

  const labUser = await prisma.user.create({
    data: {
      name: "Lab User",
      email: "lab@example.com",
      password: "hashedpassword3",
      roleId: labRole!.id,
      status: Status.ACTIVE,
    },
  });

  // ------------------------- Practices -------------------------
  const practice1 = await prisma.practice.create({
    data: {
      name: "Care Practice 1",
      ehrVendor: "Epic",
      ehrOrgId: "EHR001",
      status: Status.ACTIVE,
    },
  });
  const practice2 = await prisma.practice.create({
    data: {
      name: "Care Practice 2",
      ehrVendor: "Cerner",
      ehrOrgId: "EHR002",
      status: Status.ACTIVE,
    },
  });

  // ------------------------- Providers -------------------------
  const provider1 = await prisma.provider.create({
    data: {
      userId: providerUser.id,
      practiceId: practice1.id,
      npiNumber: "1234567890",
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
    data: { providerId: insuranceProvider1.id, name: "Plan A", code: "BSA001" },
  });
  const plan2 = await prisma.insurancePlan.create({
    data: { providerId: insuranceProvider2.id, name: "Plan B", code: "UHB002" },
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

  // ------------------------- Labs -------------------------
  const lab1 = await prisma.lab.create({
    data: { name: "Central Lab", logoUrl: "https://example.com/logo.png" },
  });

  await prisma.labUser.create({
    data: { userId: labUser.id, labId: lab1.id },
  });

  // ------------------------- Tests -------------------------
  const test1 = await prisma.test.create({
    data: {
      labId: lab1.id,
      name: "Blood Test",
      description: "Routine blood test",
      cptCode: "80050",
    },
  });
  const test2 = await prisma.test.create({
    data: {
      labId: lab1.id,
      name: "Urine Test",
      description: "Routine urine test",
      cptCode: "81001",
    },
  });

  // ------------------------- Test Eligibility Rules -------------------------
  await prisma.testEligibilityRule.createMany({
    data: [
      { testId: test1.id, payer: "Blue Shield", rule: { maxAge: 65 } },
      { testId: test2.id, payer: "United Health", rule: { minAge: 18 } },
    ],
  });

  // ------------------------- Test Coverages -------------------------
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

  // ------------------------- Patient Recommendations -------------------------
  await prisma.patientRecommendation.createMany({
    data: [
      {
        patientId: patient1.id,
        testId: test1.id,
        providerId: provider1.id,
        status: PatientRecommendationStatus.PENDING,
        priority: TestPriority.MEDIUM,
      },
      {
        patientId: patient2.id,
        testId: test2.id,
        providerId: provider1.id,
        status: PatientRecommendationStatus.PENDING,
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
        providerId: provider1.id,
        labId: lab1.id,
        requisitionPdfUrl: "https://example.com/requisition1.pdf",
        status: OrderStatus.IN_PROGRESS,
      },
      {
        patientId: patient2.id,
        testId: test2.id,
        providerId: provider1.id,
        labId: lab1.id,
        requisitionPdfUrl: "https://example.com/requisition2.pdf",
        status: OrderStatus.SCHEDULED,
      },
    ],
  });

  // ------------------------- Events -------------------------
  await prisma.event.createMany({
    data: [
      { eventType: "ORDER_CREATED", entityId: 1, metadata: { orderId: 1 } },
      { eventType: "ORDER_COMPLETED", entityId: 2, metadata: { orderId: 2 } },
    ],
  });

  console.log("✅ Complete seeding finished!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => prisma.$disconnect());
