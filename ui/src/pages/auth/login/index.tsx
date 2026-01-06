import { ImageWithFallback, Input } from "@/components";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { useLoginUser } from "@/hooks";
import {
  CheckCircle,
  Database,
  Eye,
  EyeOff,
  Loader,
  Shield,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

export interface LoginProps {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { mutate, isPending } = useLoginUser();

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit: SubmitHandler<LoginProps> = (input) => {
    mutate({ email: input.email, password: input.password });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center justify-center">
              <ImageWithFallback
                src="/logo.png"
                alt="Logo"
                className="w-auto h-10 object-cover"
              />

              <p className="text-xs text-gray-500">
                Specialty Test Intelligence Platform
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-gray-900 mb-4">
                Intelligent Patient Care Through Smart Testing
              </h2>
              <p className="text-gray-600 text-lg">
                Cloud-based platform that connects directly to your EHR,
                intelligently surfaces missed test opportunities, and automates
                order workflows—enabling better patient outcomes through timely
                diagnostics.
              </p>
            </div>

            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="/images/doctor.jpeg"
                alt="Healthcare Technology Platform"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white text-sm">
                  Zero installs. Zero local footprint. Real-time EHR
                  integration.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                  <Database className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-900">EHR Integration</p>
                  <p className="text-sm text-gray-600">API & SFTP support</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-gray-900">Smart Detection</p>
                  <p className="text-sm text-gray-600">
                    Auto-surface candidates
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-gray-900">Payer Aligned</p>
                  <p className="text-sm text-gray-600">Coverage guidance</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-gray-900">Analytics</p>
                  <p className="text-sm text-gray-600">Predictive insights</p>
                </div>
              </div>
            </div>

            <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-xl p-6 space-y-3">
              <h3 className="text-gray-900">Platform Benefits</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                  Real-time patient data analysis
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                  Payer-aligned coverage recommendations
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                  Automated order and requisition workflow
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                  Comprehensive lab results integration
                </li>
              </ul>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <Card className="w-full max-w-md p-8 shadow-xl">
              <div className="flex flex-col items-center justify-center mb-8">
                <ImageWithFallback
                  src="/logo.png"
                  alt="Logo"
                  className="w-auto h-10 object-cover"
                />

                <p className="text-gray-600">
                  Sign in to access your dashboard
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="user@company.com"
                    autoComplete="on"
                    {...register("email", { required: "Email is required." })}
                  />

                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      autoComplete="off"
                      {...register("password", {
                        required: "Password is required.",
                      })}
                    />
                    <button
                      type="button"
                      onClick={handleTogglePassword}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors duration-150 ease-in-out cursor-pointer"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  {errors.password && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="outline"
                  disabled={isPending}
                  className="w-full cursor-pointer"
                >
                  Sign In {isPending && <Loader className=" animate-spin" />}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-600">
                  Please use your registered OrphanDX account to log in.
                </p>
              </div>

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  Access is restricted to authorized personnel. Do not share
                  credentials or patient data.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
