export interface Patient {
  id: string;
  name: string;
  age: number;
  mrn: string;
  dob: string;
  insurance: {
    provider: string;
    planName: string;
    memberId: string;
    type: 'Commercial' | 'Medicare' | 'Medicaid';
  };
  diagnoses: Diagnosis[];
  demographics: {
    gender: string;
    phone: string;
    email: string;
  };
  recommendedTests: RecommendedTest[];
  lastVisit: string;
  isCandidate: boolean;
  completedTests?: CompletedTest[];
  scheduledTests?: ScheduledTest[];
}

export interface Diagnosis {
  code: string;
  description: string;
  onsetDate: string;
}

export interface RecommendedTest {
  id: string;
  testName: string;
  testCode: string;
  priority: 'high' | 'medium' | 'low';
  reason: string;
  payerCoverage: {
    covered: boolean;
    notes: string;
    requiresAuth: boolean;
  };
  cptCode: string;
  icdCodes: string[];
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
  status: 'scheduled' | 'collected' | 'in-progress';
}

export interface LabResult {
  id: string;
  orderId: string;
  testName: string;
  completedDate: string;
  reportUrl?: string;
  results: TestResultItem[];
  interpretation: string;
  recommendedFollowUp?: string[];
}

export interface TestResultItem {
  name: string;
  value: string;
  unit: string;
  referenceRange: string;
  flag?: 'high' | 'low' | 'critical';
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
  status: 'pending' | 'sent' | 'scheduled' | 'collected' | 'in-progress' | 'completed' | 'cancelled';
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

export type UserRole = 'admin' | 'lab' | 'facility' | 'provider';

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
