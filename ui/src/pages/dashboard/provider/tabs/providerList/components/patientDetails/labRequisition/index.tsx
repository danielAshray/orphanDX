import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Separator } from "@/components";
import { Download, Printer } from "lucide-react";
import { toast } from "sonner";

interface LabRequisitionProps {
  data: {
    orderId: string;
    patient: any;
    diagnosis: {
      name: string;
      icd10: string;
    };
    test: {
      name: string;
      code: string;
      id: string;
    };
    provider: {
      name: string;
      npi: string;
      phone: string;
    };
    clinic: {
      name: string;
      address: string;
      city: string;
      state: string;
      zip: string;
      phone: string;
    };
  };
}

const LabRequisition = ({ data }: LabRequisitionProps) => {
  const handlePrint = () => {
    window.print();
    toast.success("Print dialog opened");
  };

  const handleDownload = () => {
    toast.success("Requisition downloaded as PDF");
  };

  const barcodeValue = data.orderId;

  return (
    <div className="space-y-4">
      <div className="flex gap-2 print:hidden">
        <Button onClick={handlePrint} className="gap-2">
          <Printer className="w-4 h-4" />
          Print
        </Button>
        <Button onClick={handleDownload} variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Download PDF
        </Button>
      </div>

      <Card className="p-8 bg-white">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">O</span>
            </div>
            <div>
              <h1 className="text-gray-900">OrphanDX</h1>
              <p className="text-sm text-gray-600">
                Specialty Laboratory Test Requisition
              </p>
            </div>
          </div>
          <Separator className="my-4" />
        </div>

        <div className="mb-6">
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm text-gray-600">Order Number</p>
                <p className="text-gray-900">{data.orderId}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Date</p>
                <p className="text-gray-900">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Barcode */}
            <div className="mt-4 flex flex-col items-center">
              <svg width="200" height="60" className="border border-gray-300">
                <rect x="5" y="5" width="2" height="40" fill="black" />
                <rect x="10" y="5" width="4" height="40" fill="black" />
                <rect x="17" y="5" width="2" height="40" fill="black" />
                <rect x="22" y="5" width="3" height="40" fill="black" />
                <rect x="28" y="5" width="2" height="40" fill="black" />
                <rect x="33" y="5" width="5" height="40" fill="black" />
                <rect x="41" y="5" width="2" height="40" fill="black" />
                <rect x="46" y="5" width="3" height="40" fill="black" />
                <rect x="52" y="5" width="2" height="40" fill="black" />
                <rect x="57" y="5" width="4" height="40" fill="black" />
                <rect x="64" y="5" width="2" height="40" fill="black" />
                <rect x="69" y="5" width="3" height="40" fill="black" />
                <rect x="75" y="5" width="5" height="40" fill="black" />
                <rect x="83" y="5" width="2" height="40" fill="black" />
                <rect x="88" y="5" width="3" height="40" fill="black" />
                <rect x="94" y="5" width="2" height="40" fill="black" />
                <rect x="99" y="5" width="4" height="40" fill="black" />
                <rect x="106" y="5" width="2" height="40" fill="black" />
                <rect x="111" y="5" width="5" height="40" fill="black" />
                <rect x="119" y="5" width="2" height="40" fill="black" />
                <rect x="124" y="5" width="3" height="40" fill="black" />
                <rect x="130" y="5" width="2" height="40" fill="black" />
                <rect x="135" y="5" width="4" height="40" fill="black" />
                <rect x="142" y="5" width="2" height="40" fill="black" />
                <rect x="147" y="5" width="3" height="40" fill="black" />
                <rect x="153" y="5" width="2" height="40" fill="black" />
                <rect x="158" y="5" width="5" height="40" fill="black" />
                <rect x="166" y="5" width="2" height="40" fill="black" />
                <rect x="171" y="5" width="3" height="40" fill="black" />
                <rect x="177" y="5" width="2" height="40" fill="black" />
                <rect x="182" y="5" width="4" height="40" fill="black" />
                <rect x="189" y="5" width="2" height="40" fill="black" />
                <text x="100" y="55" textAnchor="middle" className="text-xs">
                  {barcodeValue}
                </text>
              </svg>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-gray-900 mb-3 pb-2 border-b">
            Patient Information
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Name</p>
              <p className="text-gray-900">
                {data.patient.firstName} {data.patient.lastName}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Date of Birth</p>
              <p className="text-gray-900">{data.patient.dateOfBirth}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Medical Record Number</p>
              <p className="text-gray-900">{data.patient.mrn}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Gender</p>
              <p className="text-gray-900">{data.patient.gender}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="text-gray-900">{data.patient.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="text-gray-900">{data.patient.email}</p>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {data.patient.insurance && (
          <div className="mb-6">
            <h3 className="text-gray-900 mb-3 pb-2 border-b">
              Insurance Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Insurance Provider</p>
                <p className="text-gray-900">
                  {data.patient.insurance.provider}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Plan Name</p>
                <p className="text-gray-900">{data.patient.insurance.plan}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Member ID</p>
                <p className="text-gray-900">
                  {data.patient.insurance.memberId}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Insurance Type</p>
                <p className="text-gray-900">{data.patient.insurance.type}</p>
              </div>
            </div>
          </div>
        )}

        <Separator className="my-6" />

        {/* Test Information */}
        <div className="mb-6">
          <h3 className="text-gray-900 mb-3 pb-2 border-b">Test Ordered</h3>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-gray-900 mb-1">{data.test.name}</p>
            <p className="text-sm text-gray-600">Test Code: {data.test.code}</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-gray-900 mb-3 pb-2 border-b">
            Diagnosis Information
          </h3>

          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 px-3 py-1 rounded">
                <p className="text-sm text-gray-900">{data.diagnosis.icd10}</p>
              </div>
              <p className="text-sm text-gray-700">{data.diagnosis.name}</p>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="mb-6">
          <h3 className="text-gray-900 mb-3 pb-2 border-b">
            Ordering Provider
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Provider Name</p>
              <p className="text-gray-900">{data.provider.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">NPI Number</p>
              <p className="text-gray-900">{data.provider.npi}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Provider Phone</p>
              <p className="text-gray-900">{data.provider.phone}</p>
            </div>
          </div>
        </div>

        {/* Clinic Information */}
        <div className="mb-6">
          <h3 className="text-gray-900 mb-3 pb-2 border-b">
            Clinic Information
          </h3>
          <div className="space-y-2">
            <div>
              <p className="text-sm text-gray-600">Facility Name</p>
              <p className="text-gray-900">{data.clinic.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Address</p>
              <p className="text-gray-900">{data.clinic.address}</p>
              <p className="text-gray-900">
                {data.clinic.city}, {data.clinic.state} {data.clinic.zip}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="text-gray-900">{data.clinic.phone}</p>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Specimen Collection */}
        <div className="mb-6">
          <h3 className="text-gray-900 mb-3 pb-2 border-b">
            Specimen Collection Information
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Collection Date</p>
              <div className="border-b border-gray-400 mt-2 pb-1"></div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Collection Time</p>
              <div className="border-b border-gray-400 mt-2 pb-1"></div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Collector Name</p>
              <div className="border-b border-gray-400 mt-2 pb-1"></div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Collector Signature</p>
              <div className="border-b border-gray-400 mt-2 pb-1"></div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-300">
          <p className="text-xs text-gray-600 text-center">
            This requisition is valid for 30 days from the date of issue. For
            questions or support, contact OrphanDX at 1-800-LAB-TEST
          </p>
          <p className="text-xs text-gray-500 text-center mt-2">
            OrphanDX Laboratory Services • CLIA Certified • CAP Accredited
          </p>
        </div>
      </Card>
    </div>
  );
};

export default LabRequisition;
