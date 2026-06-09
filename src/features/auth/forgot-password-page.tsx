import { useForm } from "@tanstack/react-form";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Mail, Shield } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/library/Button";
import { Input } from "@/components/library/Input";
import { m } from "@/lib/i18n";

import { AuthLeftPanel } from "./auth-left-panel";

export function ForgotPasswordPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: { email: "" },
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      try {
        await new Promise((r) => setTimeout(r, 1000));
        setSubmittedEmail(value.email);
        setIsSuccess(true);
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
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-3xl" />

        <div className="relative z-10 w-full max-w-sm px-6 text-center">
          <div className="mb-5 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10">
              <CheckCircle2 className="h-7 w-7 text-cyan-400" />
            </div>
          </div>
          <h2 className="mb-2 text-xl font-semibold text-white">
            {m.reset_link_sent()}
          </h2>
          <p className="mb-1 text-sm text-slate-400">
            {m.reset_link_sent_desc()}
          </p>
          <p className="mb-6 text-sm font-medium text-cyan-400">
            {submittedEmail}
          </p>
          <p className="mb-8 text-xs text-slate-500">
            {m.check_inbox_instructions()}
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
            {m.reset_password()}
          </h2>
          <p className="mb-8 text-sm text-slate-500">
            {m.forgot_password_subtitle()}
          </p>

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
                  error={
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0
                      ? field.state.meta.errors[0]?.toString()
                      : undefined
                  }
                />
              )}
            </form.Field>

            <Button
              type="submit"
              fullWidth
              loading={isLoading}
              loadingText={m.sending_reset_link()}
              className="mt-2"
            >
              {m.send_reset_link()}
            </Button>
          </form>

          <div className="mt-6 flex justify-center">
            <Link
              to="/login"
              className="flex items-center gap-1.5 text-xs text-slate-500 transition-colors hover:text-slate-300"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {m.return_to_login()}
            </Link>
          </div>

          <p className="mt-10 text-center text-[10px] text-slate-700">
            {m.system_monitored()}
          </p>
        </div>
      </div>
    </div>
  );
}
