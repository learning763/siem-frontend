import z from "zod";

import { AuthHelper } from "@/helpers/auth.helper";

import { apiHelper } from "@/lib/api";

//
interface LoginOptions {
  password: string;
  emailOrUsername: string;
}

interface RegisterOptions {
  username: string;
  email: string;
  password: string;
}

interface ResetPasswordOptions {
  email: string;
  code: string;
  newPassword: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
  };
}

/**
 *
 */
export class authApi {
  /**
   *
   */
  static async login(options: LoginOptions) {
    const response = await apiHelper.makeRequest<AuthResponse>(
      "/v4/auth/login",
      {
        method: "POST",
        body: JSON.stringify(options),
      },
    );
    if (response.success) {
      AuthHelper.setAuthCookie(response.data.accessToken);
    }
    return response;
  }

  /**
   *
   */
  static async register(options: RegisterOptions) {
    const response = await apiHelper.makeRequest<AuthResponse>(
      "/v4/auth/register",
      {
        method: "POST",
        body: JSON.stringify(options),
      },
    );

    if (response.success) {
      AuthHelper.setAuthCookie(response.data.accessToken);
    }
    return response;
  }

  static async forgotPassword(options: { email: string }) {
    const response = await apiHelper.makeRequest("/v4/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify(options),
    });

    const outputSchema = apiHelper.getBaseSchema(z.any());
    const output = outputSchema.parse(response);
    return output;
  }

  static async resetPassword(options: ResetPasswordOptions) {
    const response = await apiHelper.makeRequest("/v4/auth/reset-password", {
      method: "POST",
      body: JSON.stringify(options),
    });

    const outputSchema = apiHelper.getBaseSchema(z.any());
    const output = outputSchema.parse(response);
    return output;
  }
}
