import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
  rightElement?: ReactNode;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, icon, rightElement, error, id, className, ...props }, ref) => (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="mb-1.5 block text-xs font-medium text-slate-400"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-600">
            {icon}
          </span>
        )}

        <input
          ref={ref}
          id={id}
          className={[
            "w-full rounded-lg border bg-slate-800/80 py-2.5 text-sm text-white placeholder-slate-600 outline-none transition-colors",
            error
              ? "border-red-500/50 focus:border-red-500/60 focus:ring-1 focus:ring-red-500/20"
              : "border-slate-700 focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/20",
            icon ? "pl-10" : "pl-4",
            rightElement ? "pr-11" : "pr-4",
            className ?? "",
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        />

        {rightElement && (
          <span className="absolute top-1/2 right-3 -translate-y-1/2">
            {rightElement}
          </span>
        )}
      </div>

      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  ),
);

Input.displayName = "Input";
