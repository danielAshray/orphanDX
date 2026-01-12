import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";
import { Button } from "@/components/button";
import { Input, Label } from "@/components";
import type { User } from "@/types";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useChangePasssword } from "@/api/user";

interface ChangePasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User;
  organization: any;
}

interface FormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePasswordDialog = ({
  open,
  onOpenChange,
  user,
  organization,
}: ChangePasswordDialogProps) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutate, isPending } = useChangePasssword();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
  });

  const newPasswordValue = watch("newPassword");
  const currentPasswordValue = watch("currentPassword");
  const confirmPasswordValue = watch("confirmPassword");

  const onSubmit = (data: FormValues) => {
    mutate(
      { oldPassword: data.currentPassword, newPassword: data.newPassword },
      {
        onSuccess: () => {
          reset();
          onOpenChange(false);
        },
      }
    );
  };

  const handleCancel = () => {
    reset();
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Change Password
          </DialogTitle>
          <DialogDescription>
            Update your password to keep your account secure. Your password must
            be at least 8 characters long.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          {/* Current Password */}
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password *</Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Enter current password"
                {...register("currentPassword", { required: true })}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showCurrentPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="text-xs text-red-600">
                Current password is required
              </p>
            )}
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password *</Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter new password (min 8 characters)"
                {...register("newPassword", { required: true, minLength: 8 })}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showNewPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.newPassword?.type === "required" && (
              <p className="text-xs text-red-600">New password is required</p>
            )}
            {errors.newPassword?.type === "minLength" && (
              <p className="text-xs text-red-600">
                Password must be at least 8 characters
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password *</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter new password"
                {...register("confirmPassword", {
                  required: true,
                  validate: (val) =>
                    val === newPasswordValue || "Passwords do not match",
                })}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.confirmPassword?.type === "required" && (
              <p className="text-xs text-red-600">
                Confirm password is required
              </p>
            )}
            {errors.confirmPassword && (
              <p className="text-xs text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Password Requirements */}
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-gray-900 mb-2">Password Requirements:</p>
            <ul className="text-xs text-gray-700 space-y-1">
              <li className="flex items-center gap-2">
                <span
                  className={
                    newPasswordValue?.length >= 8
                      ? "text-green-600"
                      : "text-gray-400"
                  }
                >
                  {newPasswordValue?.length >= 8 ? "✓" : "○"}
                </span>
                At least 8 characters long
              </li>
              <li className="flex items-center gap-2">
                <span
                  className={
                    currentPasswordValue &&
                    newPasswordValue &&
                    currentPasswordValue !== newPasswordValue
                      ? "text-green-600"
                      : "text-gray-400"
                  }
                >
                  {currentPasswordValue &&
                  newPasswordValue &&
                  currentPasswordValue !== newPasswordValue
                    ? "✓"
                    : "○"}
                </span>
                Different from current password
              </li>
              <li className="flex items-center gap-2">
                <span
                  className={
                    newPasswordValue &&
                    confirmPasswordValue &&
                    newPasswordValue === confirmPasswordValue
                      ? "text-green-600"
                      : "text-gray-400"
                  }
                >
                  {newPasswordValue &&
                  confirmPasswordValue &&
                  newPasswordValue === confirmPasswordValue
                    ? "✓"
                    : "○"}
                </span>
                Passwords match
              </li>
            </ul>
          </div>

          {/* User Info */}
          <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-600">Changing password for:</p>
            <p className="text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-600">
              {user.role.toUpperCase()} - {organization?.role}
            </p>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Updating..." : "Change Password"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordDialog;
