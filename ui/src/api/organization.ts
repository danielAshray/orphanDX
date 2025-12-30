import { Notification } from "@/components";
import api from "@/config/axios.config";
import { getErrorMessage } from "@/lib/utils";
import type { ApiReponse } from "@/types";
import { useMutation } from "@tanstack/react-query";

const organizationRoutes = Object.freeze({
  uploadPdf: "/",
});

const uploadOrganizationPdf = async (file: File): Promise<ApiReponse> => {
  const formData = new FormData();
  formData.append("pdf", file);
  const { data } = await api.post<ApiReponse>("/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
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

  