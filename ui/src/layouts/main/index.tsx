import { Button } from "@/components/button";
import {
  Building2,
  FlaskConical,
  LogOut,
  ShieldCheck,
  Stethoscope,
  Upload,
} from "lucide-react";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "@/context/auth";
import { ImageWithFallback, Input, Notification } from "@/components";
import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogFooter,
} from "@/components/dialog";
import {
  useFetchOrganizationData,
  useUploadOrganizationPdf,
} from "@/api/organization";
import { useQuery } from "@tanstack/react-query";
import { ScrollArea } from "@/components/scrollArea";

const Main = () => {
  const { user, logout } = useAuthContext();

  const { name, role, organization } = user;

  const pdfInputRef = useRef<HTMLInputElement>(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isViewPdfOpen, setIsViewPdfOpen] = useState<boolean>(false);

  const uploadPdfMutation = useUploadOrganizationPdf();
  const getRoleIcon = () => {
    switch (role?.toLowerCase()) {
      case "admin":
        return <ShieldCheck className="w-4 h-4" />;
      case "lab":
        return <FlaskConical className="w-4 h-4" />;
      case "facility":
        return <Building2 className="w-4 h-4" />;
      case "provider":
        return <Stethoscope className="w-4 h-4" />;
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmitPdf = async () => {
    const file = pdfInputRef.current?.files?.[0];
    if (!file) return;
    if (file?.type !== "application/pdf") {
      Notification({
        toastMessage: "Only PDFs are allowed",
        toastStatus: "error",
      });
    }
    if (file?.size! > 5 * 1024 * 1024) {
      Notification({
        toastMessage: "File size must be less than 5 MB",
        toastStatus: "error",
      });
    }
    uploadPdfMutation.mutate(file);

    setSelectedFile(null);
    pdfInputRef.current = null;
    setIsUploadDialogOpen(false);
  };
  const handleLogout = () => {
    logout();
  };
  const { data: organizationData } = useFetchOrganizationData();

  const handleOpenPdf = () => {
    if (organizationData?.organizationPdf) {
      setIsViewPdfOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center justify-center">
              <ImageWithFallback
                src="/logo.png"
                alt="Logo"
                className="w-auto h-10 object-cover drop-shadow-lg drop-shadow-blue-400"
              />

              <p className="text-xs text-gray-500 text-shadow-lg text-shadow-purple-200">
                Specialty Test Intelligence Platform
              </p>
            </div>

            <div className="flex items-center gap-4">
              {organization.role === "LAB" &&
              organizationData?.organizationPdf ? (
                <Button
                  onClick={handleOpenPdf}
                  variant="outline"
                  className="cursor-pointer"
                  size="sm"
                >
                  View PDF
                </Button>
              ) : (
                <></>
              )}
              {organization.role === "LAB" && (
                <Button
                  onClick={() => setIsUploadDialogOpen(true)}
                  variant="outline"
                  className="cursor-pointer"
                  size="sm"
                >
                  <Upload />
                  Upload PDF
                </Button>
              )}
              <div className="flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-lg">
                {getRoleIcon()}
                <div>
                  <p className="text-sm text-gray-900">{name}</p>
                  <p className="text-xs text-gray-600">
                    {role.toUpperCase()} - {organization?.role}
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>
      <Dialog open={isViewPdfOpen} onOpenChange={setIsViewPdfOpen}>
        <DialogContent>
          <DialogTitle>Organization PDF</DialogTitle>
          <DialogDescription>Your Organization PDF</DialogDescription>
          <ScrollArea className="h-[calc(100vh-120px)]">
            <iframe
              width={"100%"}
              height={"750px"}
              src={`http://localhost:2000/${organizationData?.organizationPdf}`}
            />
          </ScrollArea>
        </DialogContent>
      </Dialog>
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload PDF</DialogTitle>
            <DialogDescription>Select a file to upload</DialogDescription>
          </DialogHeader>
          <div className="">
            <Input
              id="pdf"
              type="file"
              ref={pdfInputRef}
              onChange={handleOnChange}
              accept=".pdf"
            />
            {selectedFile && (
              <div className="text-sm text-gray-600">{selectedFile.name}</div>
            )}
          </div>

          <DialogFooter>
            <Button
              className="cursor-pointer"
              variant={"outline"}
              onClick={() => setIsUploadDialogOpen(false)}
            >
              {" "}
              Cancel
            </Button>
            <Button onClick={handleSubmitPdf} className="cursor-pointer">
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Main;
