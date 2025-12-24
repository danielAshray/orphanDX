import { toast } from "react-toastify";

type ToastStatusType = "success" | "error" | "default";

type NotifyProps = {
  toastMessage: string;
  toastStatus: ToastStatusType;
  position?: "top-left" | "bottom-left" | "bottom-right" | "top-right";
};

const Notification = (props: NotifyProps) => {
  const { toastMessage, toastStatus, position = "bottom-right" } = props;
  switch (toastStatus) {
    case "success":
      toast.success(toastMessage, { autoClose: 1000, position });
      break;
    case "error":
      toast.error(toastMessage);
      break;
    default:
      toast(toastMessage);
  }
};

export default Notification;
