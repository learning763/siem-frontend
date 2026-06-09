import { useForm } from "@tanstack/react-form";
import { Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Lock, Mail, Shield } from "lucide-react";
import { useState } from "react";

import { authApi } from "@/api/auth.api";
import { Button } from "@/components/library/Button";
import { Input } from "@/components/library/Input";
import { useToast } from "@/components/library/Toast";
import { m } from "@/lib/i18n";

import { AuthLeftPanel } from "./auth-left-panel";

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: { email: "", password: "" },
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      try {
        await authApi.login({ email: value.email, password: value.password });
        toast.success("Signed in successfully.");
        void navigate({ to: "/" });
      } catch (err) {
        toast.error(err instanceof Error ? err.message : m.login_failed());
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="flex h-screen bg-slate-950">
      <AuthLeftPanel />

      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-6 py-6">
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
            {m.login_welcome()}
          </h2>
          <p className="mb-8 text-sm text-slate-500">{m.login_subtitle()}</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void form.handleSubmit();
            }}
            className="space-y-4"
          >
            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) =>
                  !value.trim() ? m.email_required() : undefined,
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
                  error={
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0
                      ? field.state.meta.errors[0]?.toString()
                      : undefined
                  }
                />
              )}
            </form.Field>

            <form.Field
              name="password"
              validators={{
                onChange: ({ value }) =>
                  !value ? m.password_required() : undefined,
              }}
            >
              {(field) => (
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label
                      htmlFor={field.name}
                      className="text-xs font-medium text-slate-400"
                    >
                      {m.password()}
                    </label>
                    <Link
                      to="/forgot-password"
                      className="text-xs text-cyan-500 transition-colors hover:text-cyan-400"
                    >
                      {m.forgot_my_password()}
                    </Link>
                  </div>
                  <Input
                    id={field.name}
                    name={field.name}
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••••••"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    icon={<Lock className="h-4 w-4" />}
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
                    error={
                      field.state.meta.isTouched &&
                      field.state.meta.errors.length > 0
                        ? field.state.meta.errors[0]?.toString()
                        : undefined
                    }
                  />
                </div>
              )}
            </form.Field>

            <Button
              type="submit"
              fullWidth
              loading={isLoading}
              loadingText={m.logging_in()}
              className="mt-2"
            >
              {m.login_title()}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-500">
            {m.need_access()}{" "}
            <Link
              to="/signup"
              className="text-cyan-500 transition-colors hover:text-cyan-400"
            >
              {m.request_account()}
            </Link>
          </p>

          <p className="mt-10 text-center text-[10px] text-slate-700">
            {m.system_monitored()}
          </p>
        </div>
      </div>
    </div>
  );
}
