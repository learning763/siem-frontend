import { useForm } from "@tanstack/react-form";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Shield,
  User,
} from "lucide-react";
import { useState } from "react";

import { m } from "@/lib/i18n";

import { AuthLeftPanel } from "./auth-left-panel";

export function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [signupError, setSignupError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
    onSubmit: async ({ value }) => {
      setSignupError(null);

      if (value.password !== value.confirmPassword) {
        setSignupError(m.passwords_do_not_match());
        return;
      }
      if (!value.acceptTerms) {
        setSignupError(m.must_accept_terms());
        return;
      }

      setIsLoading(true);
      try {
        await new Promise((r) => setTimeout(r, 1200));
        console.log("Signup submitted:", value);
        setSubmittedEmail(value.email);
        setIsSuccess(true);
      } catch {
        setSignupError(m.signup_failed());
      } finally {
        setIsLoading(false);
      }
    },
  });

  if (isSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `linear-gradient(rgba(148,163,184,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148,163,184,1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-3xl" />

        <div className="relative z-10 w-full max-w-sm px-6 text-center">
          <div className="mb-5 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">
              <CheckCircle2 className="h-7 w-7 text-emerald-400" />
            </div>
          </div>
          <h2 className="mb-2 text-xl font-semibold text-white">
            {m.request_submitted()}
          </h2>
          <p className="mb-1 text-sm text-slate-400">
            {m.request_submitted_desc()}
          </p>
          <p className="mb-6 text-sm font-medium text-cyan-400">
            {submittedEmail}
          </p>
          <p className="mb-8 text-xs text-slate-500">
            {m.request_activation_desc()}
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-6 py-2.5 text-sm font-semibold text-slate-950 transition-all hover:bg-cyan-400"
          >
            {m.return_to_login()}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-950">
      <AuthLeftPanel />

      {/* ── Right panel ── */}
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

          {signupError && (
            <div className="mb-6 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {signupError}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void form.handleSubmit();
            }}
            className="space-y-3"
          >
            <form.Field
              name="fullName"
              validators={{
                onChange: ({ value }) =>
                  value.trim().length < 2 ? m.full_name_min() : undefined,
              }}
            >
              {(field) => (
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-400">
                    {m.full_name()}
                  </label>
                  <div className="relative">
                    <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-600" />
                    <input
                      id={field.name}
                      name={field.name}
                      type="text"
                      autoComplete="name"
                      placeholder="Jane Smith"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      className="w-full rounded-lg border border-slate-700 bg-slate-800/80 py-2 pr-4 pl-10 text-sm text-white placeholder-slate-600 transition-colors outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/20"
                    />
                  </div>
                  {field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0 && (
                      <p className="mt-1 text-xs text-red-400">
                        {field.state.meta.errors[0]?.toString()}
                      </p>
                    )}
                </div>
              )}
            </form.Field>

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
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-400">
                    {m.work_email()}
                  </label>
                  <div className="relative">
                    <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-600" />
                    <input
                      id={field.name}
                      name={field.name}
                      type="email"
                      autoComplete="email"
                      placeholder="analyst@corp.local"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      className="w-full rounded-lg border border-slate-700 bg-slate-800/80 py-2 pr-4 pl-10 text-sm text-white placeholder-slate-600 transition-colors outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/20"
                    />
                  </div>
                  {field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0 && (
                      <p className="mt-1 text-xs text-red-400">
                        {field.state.meta.errors[0]?.toString()}
                      </p>
                    )}
                </div>
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
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-400">
                    {m.password()}
                  </label>
                  <div className="relative">
                    <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-600" />
                    <input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Min. 8 chars, 1 uppercase, 1 number"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      className="w-full rounded-lg border border-slate-700 bg-slate-800/80 py-2 pr-11 pl-10 text-sm text-white placeholder-slate-600 transition-colors outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-600 transition-colors hover:text-slate-400"
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
                  </div>
                  {field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0 && (
                      <p className="mt-1 text-xs text-red-400">
                        {field.state.meta.errors[0]?.toString()}
                      </p>
                    )}
                </div>
              )}
            </form.Field>

            <form.Field
              name="confirmPassword"
              validators={{
                onChange: ({ value }) =>
                  !value ? m.confirm_password_required() : undefined,
              }}
            >
              {(field) => (
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-400">
                    {m.confirm_password()}
                  </label>
                  <div className="relative">
                    <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-600" />
                    <input
                      id={field.name}
                      name={field.name}
                      type={showConfirm ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="••••••••••••"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      className="w-full rounded-lg border border-slate-700 bg-slate-800/80 py-2 pr-11 pl-10 text-sm text-white placeholder-slate-600 transition-colors outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-600 transition-colors hover:text-slate-400"
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
                  </div>
                  {field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0 && (
                      <p className="mt-1 text-xs text-red-400">
                        {field.state.meta.errors[0]?.toString()}
                      </p>
                    )}
                </div>
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

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-500 py-2.5 text-sm font-semibold text-slate-950 transition-all hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950" />
                  {m.submitting_request()}
                </>
              ) : (
                m.register_title()
              )}
            </button>
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
