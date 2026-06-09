import { useForm } from "@tanstack/react-form";
import { Link } from "@tanstack/react-router";
import { AlertCircle, Eye, EyeOff, Lock, Shield, User } from "lucide-react";
import { useState } from "react";

import { m } from "@/lib/i18n";

import { AuthLeftPanel } from "./auth-left-panel";

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: { username: "", password: "" },
    onSubmit: async ({ value }) => {
      setLoginError(null);
      setIsLoading(true);
      try {
        await new Promise((r) => setTimeout(r, 1000));
        console.log("Login submitted:", value);
      } catch {
        setLoginError(m.login_failed());
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="flex h-screen bg-slate-950">
      <AuthLeftPanel />

      {/* ── Right panel ── */}
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

          {loginError && (
            <div className="mb-6 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {loginError}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void form.handleSubmit();
            }}
            className="space-y-4"
          >
            <form.Field
              name="username"
              validators={{
                onChange: ({ value }) =>
                  !value.trim() ? m.username_required() : undefined,
              }}
            >
              {(field) => (
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-400">
                    {m.username_or_email()}
                  </label>
                  <div className="relative">
                    <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-600" />
                    <input
                      id={field.name}
                      name={field.name}
                      type="text"
                      autoComplete="username"
                      placeholder="analyst@corp.local"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      className="w-full rounded-lg border border-slate-700 bg-slate-800/80 py-2.5 pr-4 pl-10 text-sm text-white placeholder-slate-600 transition-colors outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/20"
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
                onChange: ({ value }) =>
                  !value ? m.password_required() : undefined,
              }}
            >
              {(field) => (
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="text-xs font-medium text-slate-400">
                      {m.password()}
                    </label>
                    <Link
                      to="/forgot-password"
                      className="text-xs text-cyan-500 transition-colors hover:text-cyan-400"
                    >
                      {m.forgot_my_password()}
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-600" />
                    <input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="••••••••••••"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      className="w-full rounded-lg border border-slate-700 bg-slate-800/80 py-2.5 pr-11 pl-10 text-sm text-white placeholder-slate-600 transition-colors outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/20"
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

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-500 py-2.5 text-sm font-semibold text-slate-950 transition-all hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950" />
                  {m.logging_in()}
                </>
              ) : (
                m.login_title()
              )}
            </button>
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
