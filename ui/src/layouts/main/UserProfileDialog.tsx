import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";
import { Button } from "@/components/button";
import { Input, Label, Separator } from "@/components";
import type { User } from "@/types";
import {
  User as UserIcon,
  Mail,
  Building2,
  Shield,
  KeyRound,
  Save,
  Edit2,
  X,
} from "lucide-react";
import { Badge } from "@/components/badge";
import { Card } from "@/components/card";
import ChangePasswordDialog from "./ChangePasswordDialog";
import { ScrollArea } from "@/components/scrollArea";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateProfile } from "@/api/user";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import type { UserProfileProps } from ".";

interface UserProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User;
  userProfile: UserProfileProps;
  organization: any;
}

interface ProfileFormValues {
  name: string;
  email: string;
  title: string;
  phone: string;
}

const UserProfileDialog = ({
  open,
  onOpenChange,
  user,
  userProfile,
  organization,
}: UserProfileDialogProps) => {
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const { mutate } = useUpdateProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    defaultValues: {
      name: userProfile.name || "",
      email: userProfile.email || "",
      title: userProfile.title || "",
    },
  });

  useEffect(() => {
    if (userProfile) {
      reset({
        name: userProfile.name || "",
        email: userProfile.email || "",
        title: userProfile.title || "",
      });
    }
  }, [
    userProfile,
    reset,
    userProfile.name,
    userProfile.email,
    userProfile.title,
  ]);

  const onSubmit = async (data: ProfileFormValues) => {
    mutate(
      {
        ...data,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["fetchProfileApi"] });
          setIsEditing(false);
          reset(data);
        },
      }
    );
  };

  const handleCancel = () => {
    reset({
      name: userProfile.name,
      email: userProfile.email,
      title: userProfile.title || "",
    });
    setIsEditing(false);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "lab":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "facility":
        return "bg-green-100 text-green-700 border-green-200";
      case "provider":
        return "bg-orange-100 text-orange-700 border-orange-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserIcon className="w-5 h-5" />
              User Profile
            </DialogTitle>

            <div className="flex items-center justify-between">
              <DialogDescription>
                View and manage your account information and settings.
              </DialogDescription>

              {!isEditing && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="gap-2"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </Button>
              )}
            </div>
          </DialogHeader>

          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="space-y-6 mt-4">
              {/* User ID & Role Card */}
              <Card className="p-4 bg-linear-to-br from-blue-50 to-purple-50 border-blue-200">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">User ID</p>
                      <p className="text-gray-900">{user.id}</p>
                    </div>
                    <Badge className={getRoleBadgeColor(user.role)}>
                      {user.role.toUpperCase()}
                    </Badge>
                  </div>

                  {organization?.role && (
                    <div className="flex items-center gap-2 text-gray-700 pt-2 border-t border-blue-200">
                      <Building2 className="w-4 h-4" />
                      <span className="text-sm">{organization?.role}</span>
                    </div>
                  )}
                </div>
              </Card>

              <Separator />

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <h4 className="text-gray-900 flex items-center gap-2">
                  Basic Information
                </h4>

                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      {...register("name", { required: "Name is required" })}
                    />
                  ) : (
                    <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md">
                      <p className="text-gray-900">{userProfile.name}</p>
                    </div>
                  )}
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  {isEditing ? (
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        className="pl-10"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email address",
                          },
                        })}
                      />
                    </div>
                  ) : (
                    <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <p className="text-gray-900">{userProfile.email}</p>
                    </div>
                  )}
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  {isEditing ? (
                    <Input
                      id="title"
                      placeholder="e.g., Lab Manager, Physician, Administrator"
                      {...register("title")}
                    />
                  ) : (
                    <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md">
                      <p className="text-gray-600 italic">
                        {userProfile.title || "Not specified"}
                      </p>
                    </div>
                  )}
                </div>

                {isEditing && (
                  <div className="flex gap-3 justify-end pt-4 border-t mt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancel}
                      disabled={isSubmitting}
                      className="gap-2"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="gap-2"
                    >
                      <Save className="w-4 h-4" />
                      {isSubmitting ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                )}
              </form>

              <Separator />

              {/* Security Section */}
              <div className="space-y-4">
                <h4 className="text-gray-900 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Security
                </h4>

                <Card className="p-4 border-gray-200">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <KeyRound className="w-4 h-4 text-gray-600" />
                        <p className="text-gray-900">Password</p>
                      </div>
                      <p className="text-sm text-gray-600">
                        Last updated:{" "}
                        {dayjs(userProfile.updatedAt).format("MMMM D, YYYY")}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Keep your password secure and update it regularly.
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowChangePassword(true)}
                      className="gap-2 shrink-0"
                    >
                      <KeyRound className="w-4 h-4" />
                      Change Password
                    </Button>
                  </div>
                </Card>
              </div>

              <Separator />

              {/* Account Details */}
              <div className="space-y-4">
                <h4 className="text-gray-900">Account Details</h4>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Account Created</p>
                    <p className="text-gray-900">
                      {dayjs(userProfile.createdAt).format("MMMM D, YYYY")}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Last Login</p>
                    <p className="text-gray-900">Just now</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Change Password Dialog */}
      {showChangePassword && (
        <ChangePasswordDialog
          open={showChangePassword}
          onOpenChange={setShowChangePassword}
          user={user}
          organization={organization}
        />
      )}
    </>
  );
};

export default UserProfileDialog;
