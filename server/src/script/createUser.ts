import { prisma } from "../lib/prisma";

async function createOrganization() {
  await prisma.organization.create({
    data: {
      name: "OrphanDx Lab",
      phone: "123-456-7890",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      suite: "Suite 100",
      street: "123 Lab Street",
      role: "LAB", // make sure this matches your OrganizationRole enum
      // do NOT include arrays like users, patients, etc.
    },
  });
  console.log("organizatio ncreated");
}

createOrganization();
