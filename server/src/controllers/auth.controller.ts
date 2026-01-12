import { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/apiService";
import { comparePassword, hashPassword } from "../utils/bcryptService";
import { generateToken } from "../utils/jwtService";
import { sendResponse } from "../utils/responseService";
import emailQueue from "../workers/email.worker";

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const userExists = await prisma.user.findUnique({
      where: { email },
      include: { organization: { select: { id: true, role: true } } },
    });

    if (!userExists) {
      const message = "User not found";
      return next(ApiError.notFound(message));
    }

    const matchPassword = comparePassword(password, userExists.password);

    if (!matchPassword) {
      const message = "Invalid credentials";
      return next(ApiError.unauthorized(message));
    }

    const tokenPayload = {
      id: userExists.id,
      role: userExists.role,
      email: userExists.email,
      organization: {
        id: userExists.organizationId,
        role: userExists.organization?.role,
      },
    };

    const token = generateToken(tokenPayload);

    sendResponse(res, {
      success: true,
      code: 200,
      message: "User logged in successfully",
      data: {
        token,
        orgRole: !userExists.organization
          ? userExists.role
          : userExists.organization.role,
        user: {
          name: userExists.name,
          role: userExists.role,
          id: userExists.id,
          ...(userExists.organization
            ? { organization: tokenPayload.organization }
            : {}),
        },
      },
    });
  } catch (error: any) {
    next(ApiError.internal(undefined, error.message));
  }
};

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      const message = "User already exists";
      return next(ApiError.notFound(message));
    }

    const hashedPassword = hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        name,
        password: hashedPassword,
        email,
        role,
      },
    });

    sendResponse(res, {
      success: true,
      code: 200,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error: any) {
    next(ApiError.internal(undefined, error.message));
  }
};

const generateEmailVerificationCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      throw {
        message: "Email not found",
        success: false,
      };
    }
    const code = Math.floor(100000 + Math.random() * 900000);
    await prisma.user.update({
      where: { email: email },
      data: {
        passwordResetCode: String(code),
        passwordResetCodeDate: new Date(),
      },
    });

    const html = `<!DOCTYPE html>
                          <html>
                          <head>
                            <meta charset="UTF-8" />
                            <title>Password Reset Code</title>
                          </head>
                          <body style="margin:0; padding:0; background-color:#f3f4f6; font-family: Arial, sans-serif;">

                            <table width="100%" cellpadding="0" cellspacing="0" style="padding:20px;">
                              <tr>
                                <td align="center">

                                  <table width="100%" max-width="500" cellpadding="0" cellspacing="0"
                                        style="background-color:#FEFCFF; border-radius:10px; padding:30px; box-shadow:0 4px 12px rgba(0,0,0,0.08);">

                                    <tr>
                                      <td style="text-align:center; padding-bottom:20px;">
                                        <h1 style="margin:0; color:#222;">OrphanDx</h1>
                                        <p style="margin:5px 0 0; color:#666;">Password Reset Request</p>
                                      </td>
                                    </tr>

                                    <tr>
                                      <td style="color:#333; font-size:15px; line-height:1.6;">
                                        <p>Hello,</p>

                                        <p>
                                          We received a request to reset your password. Please use the verification
                                          code below to continue:
                                        </p>
                                      </td>
                                    </tr>

                                    <tr>
                                      <td align="center" style="padding:25px 0;">
                                        <div style="
                                          display:inline-block;
                                          background-color:#222;
                                          color:#FEFCFF;
                                          padding:14px 28px;
                                          font-size:22px;
                                          letter-spacing:3px;
                                          border-radius:8px;
                                          font-weight:bold;">
                                          ${code}
                                        </div>
                                      </td>
                                    </tr>

                                    <tr>
                                      <td style="color:#333; font-size:14px; line-height:1.6;">
                                        <p>
                                          This code will expire in 10 minutes. If you did not request a password reset,
                                          you can safely ignore this email.
                                        </p>

                                        <p style="margin-top:25px;">
                                          — The OrphanDx Team
                                        </p>
                                      </td>
                                    </tr>

                                    <tr>
                                      <td style="padding-top:25px; font-size:12px; color:#888; text-align:center;">
                                        © 2026 OrphanDx. All rights reserved.
                                      </td>
                                    </tr>

                                  </table>

                                </td>
                              </tr>
                            </table>

                          </body>
                          </html>
                          `;

    emailQueue.add("sendEmail", {
      to: email,
      subject: "Password Recovery",
      html,
    });
    sendResponse(res, {
      message: "Password Rcovery email successfully sent.",
      code: 201,
      success: true,
    });
  } catch (error: any) {
    const message = error.message || "Internal server error";
    return res.status(500).json({
      success: false,
      message,
      practiceId: req.query.practiceId || null,
    });
  }
};

const verifyEmailAndCode = async (email: string, code: string) => {
  const user = await prisma.user.findFirst({ where: { email } });
  if (!user) {
    throw { message: "Invalid email" };
  }
  if (user.passwordResetCode !== String(code)) {
    throw { message: "Invalid code" };
  }
  if (!user.passwordResetCodeDate) {
    throw { message: "Rest code date missing" };
  }
  const hoursDiff =
    (new Date().getTime() - new Date(user.passwordResetCodeDate).getTime()) /
    (1000 * 60 * 60);
  if (hoursDiff > 2) {
    throw { message: "Code expired" };
  }
  return user;
};

const verifyPasswordResetCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, code } = req.body;
    await verifyEmailAndCode(email, code);
    sendResponse(res, {
      message: "Password reset code verification successful",
      success: true,
      code: 200,
    });
  } catch (exception: any) {
    const message = exception.message || "Internal server error";
    return res.status(500).json({
      success: false,
      message,
    });
  }
};

const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, code } = req.body;
    await verifyEmailAndCode(email, code);
    const hashedPassword = hashPassword(password);
    await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
        passwordResetCode: null,
        passwordResetCodeDate: null,
      },
    });
    sendResponse(res, {
      message: "Password successfully reset",
      success: true,
    });
  } catch (exception: any) {
    const message = exception.message || "Internal server error";
    return res.status(500).json({
      success: false,
      message,
    });
  }
};

export {
  loginUser,
  registerUser,
  resetPassword,
  generateEmailVerificationCode,
  verifyPasswordResetCode,
};
