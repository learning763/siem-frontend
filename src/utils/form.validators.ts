import type { __UNSAFE } from "@/types/util.types";

const usernameRegex = /^[a-zA-Z0-9]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

interface ValidatorParams<T> {
  value: T;
  fieldApi?: __UNSAFE;
}

export const signupValidators = {
  username: ({ value }: ValidatorParams<string>): string | undefined => {
    if (!value) return m.username_required();
    if (value.length < 3) return m.min_3_chars();
    if (value.length > 20) return m.max_20_chars();
    if (!usernameRegex.test(value)) return m.no_special_chars();
    return undefined;
  },

  email: ({ value }: ValidatorParams<string>): string | undefined => {
    if (!value) return m.email_required();
    if (!emailRegex.test(value)) return m.invalid_email();
    return undefined;
  },
  emailOrUsername: ({
    value,
    fieldApi,
  }: ValidatorParams<string>): string | undefined => {
    if (!value) return m.field_required();
    if (value.includes("@")) {
      return signupValidators.email({ value, fieldApi });
    }
    return signupValidators.username({ value, fieldApi });
  },

  password: ({ value }: ValidatorParams<string>): string | undefined => {
    if (!value) return m.password_required();
    if (value.length < 8) return m.min_8_chars();
    if (!passwordRegex.test(value)) return m.password_requirements();
    return undefined;
  },
  confirmPassword: ({
    value,
    fieldApi,
  }: ValidatorParams<string>): string | undefined => {
    if (!value) return m.confirm_password_required();
    if (fieldApi && value !== fieldApi.form.getFieldValue("password")) {
      return m.passwords_do_not_match();
    }
    return undefined;
  },

  terms: ({ value }: ValidatorParams<boolean>): string | undefined => {
    if (!value) return m.field_required();
    return undefined;
  },

  required: ({ value }: ValidatorParams<string>): string | undefined => {
    if (!value) return m.field_required();
    return undefined;
  },
};
