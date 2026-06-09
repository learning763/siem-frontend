import { useForm } from "@tanstack/react-form";
import { Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Globe, Lock, Mail, Shield, User } from "lucide-react";
import { useState } from "react";

import { authApi } from "@/api/auth.api";
import { Button } from "@/components/library/Button";
import { Input } from "@/components/library/Input";
import { useToast } from "@/components/library/Toast";
import { m } from "@/lib/i18n";

import { AuthLeftPanel } from "./auth-left-panel";

export function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      country: "",
      password: "",
      passwordConfirm: "",
      acceptTerms: false,
    },
    onSubmit: async ({ value }) => {
      if (value.password !== value.passwordConfirm) {
        toast.error(m.passwords_do_not_match());
        return;
      }
      if (!value.acceptTerms) {
        toast.error(m.must_accept_terms());
        return;
      }

      setIsLoading(true);
      try {
        await authApi.signup({
          email: value.email,
          first_name: value.firstName,
          last_name: value.lastName,
          password: value.password,
          country: value.country,
          password_confirm: value.passwordConfirm,
        });
        toast.success(m.signup_success_toast());
        setTimeout(() => {
          void navigate({ to: "/login" });
        }, 1500);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : m.signup_failed());
      } finally {
        setIsLoading(false);
      }
    },
  });

  const fieldError = (errors: unknown[], isTouched: boolean) =>
    isTouched && errors.length > 0 ? errors[0]?.toString() : undefined;

  return (
    <div className="flex h-screen bg-slate-950">
      <AuthLeftPanel />

      <div className="relative flex flex-1 items-center justify-center overflow-y-auto px-6 py-6">
        <div
          className="absolute inset-0 opacity-[0.06] lg:hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(148,163,184,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148,163,184,1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-3xl" />

        <div className="relative z-10 w-full max-w-sm">
          {/* Mobile logo */}
          <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-500/10">
              <Shield className="h-5 w-5 text-cyan-400" />
            </div>
            <div>
              <p className="text-sm font-bold tracking-widest text-cyan-400">
                {m.platform_name()}
              </p>
              <p className="text-[10px] leading-none text-slate-500">
                {m.platform_tagline()}
              </p>
            </div>
          </div>

          <h2 className="mb-1 text-xl font-semibold text-white">
            {m.register_title()}
          </h2>
          <p className="mb-5 text-sm text-slate-500">{m.register_subtitle()}</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void form.handleSubmit();
            }}
            className="space-y-3"
          >
            {/* First + Last name */}
            <div className="grid grid-cols-2 gap-3">
              <form.Field
                name="firstName"
                validators={{
                  onChange: ({ value }) =>
                    !value.trim() ? m.first_name_required() : undefined,
                }}
              >
                {(field) => (
                  <Input
                    id={field.name}
                    name={field.name}
                    label={m.first_name()}
                    icon={<User className="h-4 w-4" />}
                    type="text"
                    autoComplete="given-name"
                    placeholder="Jane"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    error={fieldError(
                      field.state.meta.errors,
                      field.state.meta.isTouched,
                    )}
                  />
                )}
              </form.Field>

              <form.Field
                name="lastName"
                validators={{
                  onChange: ({ value }) =>
                    !value.trim() ? m.last_name_required() : undefined,
                }}
              >
                {(field) => (
                  <Input
                    id={field.name}
                    name={field.name}
                    label={m.last_name()}
                    icon={<User className="h-4 w-4" />}
                    type="text"
                    autoComplete="family-name"
                    placeholder="Smith"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    error={fieldError(
                      field.state.meta.errors,
                      field.state.meta.isTouched,
                    )}
                  />
                )}
              </form.Field>
            </div>

            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) => {
                  if (!value.trim()) return m.email_required();
                  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
                    return m.invalid_email();
                  return undefined;
                },
              }}
            >
              {(field) => (
                <Input
                  id={field.name}
                  name={field.name}
                  label={m.work_email()}
                  icon={<Mail className="h-4 w-4" />}
                  type="email"
                  autoComplete="email"
                  placeholder="analyst@corp.local"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  error={fieldError(
                    field.state.meta.errors,
                    field.state.meta.isTouched,
                  )}
                />
              )}
            </form.Field>

            <form.Field
              name="country"
              validators={{
                onChange: ({ value }) =>
                  !value.trim() ? m.country_required() : undefined,
              }}
            >
              {(field) => (
                <Input
                  id={field.name}
                  name={field.name}
                  label={m.country()}
                  icon={<Globe className="h-4 w-4" />}
                  type="text"
                  autoComplete="country-name"
                  placeholder="United States"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  error={fieldError(
                    field.state.meta.errors,
                    field.state.meta.isTouched,
                  )}
                />
              )}
            </form.Field>

            <form.Field
              name="password"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return m.password_required();
                  if (value.length < 8) return m.min_8_chars();
                  if (!/[A-Z]/.test(value)) return m.uppercase_required();
                  if (!/[0-9]/.test(value)) return m.number_required();
                  return undefined;
                },
              }}
            >
              {(field) => (
                <Input
                  id={field.name}
                  name={field.name}
                  label={m.password()}
                  icon={<Lock className="h-4 w-4" />}
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Min. 8 chars, 1 uppercase, 1 number"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  rightElement={
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="text-slate-600 transition-colors hover:text-slate-400"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  }
                  error={fieldError(
                    field.state.meta.errors,
                    field.state.meta.isTouched,
                  )}
                />
              )}
            </form.Field>

            <form.Field
              name="passwordConfirm"
              validators={{
                onChange: ({ value }) =>
                  !value ? m.confirm_password_required() : undefined,
              }}
            >
              {(field) => (
                <Input
                  id={field.name}
                  name={field.name}
                  label={m.confirm_password()}
                  icon={<Lock className="h-4 w-4" />}
                  type={showConfirm ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="••••••••••••"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  rightElement={
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      className="text-slate-600 transition-colors hover:text-slate-400"
                      aria-label={
                        showConfirm ? "Hide password" : "Show password"
                      }
                    >
                      {showConfirm ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  }
                  error={fieldError(
                    field.state.meta.errors,
                    field.state.meta.isTouched,
                  )}
                />
              )}
            </form.Field>

            <form.Field name="acceptTerms">
              {(field) => (
                <label className="flex cursor-pointer items-start gap-2.5">
                  <input
                    type="checkbox"
                    checked={field.state.value}
                    onChange={(e) => field.handleChange(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-600 bg-slate-800 accent-cyan-500"
                  />
                  <span className="text-xs leading-relaxed text-slate-400">
                    {m.accept_terms()}
                  </span>
                </label>
              )}
            </form.Field>

            <Button
              type="submit"
              fullWidth
              loading={isLoading}
              loadingText={m.submitting_request()}
              className="mt-2"
            >
              {m.register_title()}
            </Button>
          </form>

          <p className="mt-4 text-center text-xs text-slate-500">
            {m.already_have_account()}{" "}
            <Link
              to="/login"
              className="text-cyan-500 transition-colors hover:text-cyan-400"
            >
              {m.login_title()}
            </Link>
          </p>

          <p className="mt-5 text-center text-[10px] text-slate-700">
            {m.system_monitored()}
          </p>
        </div>
      </div>
    </div>
  );
}
