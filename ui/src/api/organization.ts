import { Notification } from "@/components";
import api from "@/config/axios.config";
import { getErrorMessage } from "@/lib/utils";
import type { ApiReponse } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

type OrganizationData = {
  id: string;
  name: string;
  phone: string;
  city: string;
  state: string;
  zipCode: string;
  suite: string;
  street: string;
  organizationPdf?: String;
};
const organizationRoutes = Object.freeze({
  uploadPdf: "/organization/upload-pdf",
});

const uploadOrganizationPdf = async (file: File): Promise<ApiReponse> => {
  const formData = new FormData();
  formData.append("pdf", file);
  const { data } = await api.put<ApiReponse>(
    organizationRoutes.uploadPdf,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};

export const useUploadOrganizationPdf = () =>
  useMutation({
    mutationFn: uploadOrganizationPdf,
    onSuccess: () =>
      Notification({
        toastMessage: "PDF successfully uploaded",
        toastStatus: "success",
      }),
    onError: (error) =>
      Notification({
        toastMessage: getErrorMessage(error),
        toastStatus: "error",
      }),
  });

const fetchOrganizationData = async () => {
  const { data } = await api.get("/organization");
  return data.data;
};

export const useFetchOrganizationData = () =>
  useQuery<OrganizationData>({
    queryKey: ["organizationData"],
    queryFn: fetchOrganizationData,
  });
