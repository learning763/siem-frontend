import { apiRequest } from "@/lib/api";

export interface SignupPayload {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  country: string;
  password_confirm: string;
}

export interface SignupResponse {
  message?: string;
  email?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  access?: string;
  refresh?: string;
  token?: string;
  key?: string;
}

export class authApi {
  static async signup(payload: SignupPayload): Promise<SignupResponse> {
    return apiRequest<SignupResponse>("/auth/signup/", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  static async login(payload: LoginPayload): Promise<LoginResponse> {
    const res = await apiRequest<LoginResponse>("/auth/login/", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const token = res.access ?? res.token ?? res.key;
    if (token) {
      localStorage.setItem("access_token", token);
    }
    if (res.refresh) {
      localStorage.setItem("refresh_token", res.refresh);
    }

    return res;
  }

  static logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }
}
