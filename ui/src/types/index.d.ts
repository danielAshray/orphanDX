export interface Insurance {
  id: string;
  patientId: string;
  provider: string;
  plan: string;
  memberId: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface Diagnosis {
  id: string;
  patientId: string;
  name: string;
  icd10: string;
  onsetDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface LabRule {
  id: string;
  testName: string;
  cptCode: string;
  labId: string;
  lab: {
    id: string;
    name: string;
  };
  code: string;
  message: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  createdAt: string;
  updatedAt: string;
}

export interface LabRecommendation {
  id: string;
  testName: string;
  cptCode: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  patientId: string;
  reason: string;
  status: "PENDING" | "COMPLETED" | "CANCELLED";
  labRuleId: string;
  diagnosisId: string;
  createdAt: string;
  updatedAt: string;
  labRule: LabRule;
}

export interface PatientDetailsType {
  id: string;
  firstName: string;
  lastName: string;
  mrn: string;
  dateOfBirth: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  phone: string;
  email: string;
  lastVisit: string;
  scheduledCount: number;
  recomendationCount: number;
  completedCount: number;
  facilityId: string;
  createdAt: string;
  updatedAt: string;
  insurance: Insurance;
  diagnosis: Diagnosis[];
  labRecommendations: LabRecommendation[];
  labOrder: LabOrder[];
}

export interface LabOrder {
  id: string;
  testName: string;
  cptCode: string;
  facilityId: string;
  labId: string;
  patientId: string;
  status: "ORDERED" | "COLLECTED" | "COMPLETED" | "CANCELLED";
  results: any | null;
  orderedAt: string;
  completedAt: string | null;
  createdById: string;
  createdAt: string;
  updatedAt: string;
  collectedAt: string;
}

export interface CompletedTest {
  id: string;
  testName: string;
  testCode: string;
  completedDate: string;
  orderId: string;
  hasAbnormalResults: boolean;
  hasNewRecommendations: boolean;
  result?: LabResult;
}

export interface ScheduledTest {
  id: string;
  testName: string;
  testCode: string;
  scheduledDate: string;
  orderId: string;
  status: "scheduled" | "collected" | "in-progress";
}

export interface LabResult {
  id: string;
  testName: string;
  diagnosis: { name: string };
  updatedAt: string;
  reportUrl?: string;
  testResult: {
    result: TestResultItem[];
    summary: string;
  };
  recommendedFollowUp?: string[];
}

export interface TestResultItem {
  component: string;
  value: string;
  unit: string;
  referenceRange?: {
    low: string;
    high: string;
  };
  status?: "high" | "HIGH" | "low" | "LOW" | "critical" | "Normal" | "NORMAL";
}

export interface Order {
  id: string;
  patientId: string;
  patientName: string;
  providerId: string;
  providerName: string;
  clinicName: string;
  facilityId?: string;
  labId?: string;
  testName: string;
  testCode: string;
  status:
    | "pending"
    | "sent"
    | "scheduled"
    | "collected"
    | "in-progress"
    | "completed"
    | "cancelled";
  createdAt: string;
  updatedAt: string;
  scheduledDate?: string;
  labResult?: LabResult;
}

export interface EventLog {
  id: string;
  eventType: string;
  timestamp: string;
  metadata: Record<string, any>;
}

export type UserRole = "admin" | "lab" | "facility" | "provider";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  organizationId?: string; // facilityId or labId
  organizationName?: string;
}

export interface Facility {
  id: string;
  name: string;
  address: string;
  phone: string;
  labPartnerId: string; // Which lab they send orders to
}

export interface Lab {
  id: string;
  name: string;
  address: string;
  phone: string;
  testingCapabilities: string[];
}

export interface Provider {
  id: string;
  name: string;
  npi: string;
  specialty: string;
  facilityId: string;
  email: string;
  phone: string;
}

export interface ApiReponse {
  status: string;
  code: number;
  message: string;
  data: any;
  detail: any;
}

export type completeOrderProps = {
  orderId: string;
  isNormal: boolean;
  summary: string;
  result: {
    component: string;
    value: number;
    unit: string;
    referenceRange: {
      low: number;
      high: number;
    };
    status: "NORMAL" | "HIGH" | "LOW";
  }[];
  recomendations: { action: string }[];
};

export type ManualOrderType = {
  patientId: string;
  labId: string;
  diagnosis: string[];
  tests: { testName: string; cptCode: string }[];
};
