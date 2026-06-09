import { type ButtonHTMLAttributes, type ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loading?: boolean;
  loadingText?: string;
  variant?: Variant;
  fullWidth?: boolean;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-all focus:outline-none disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-cyan-500 px-4 py-2.5 text-slate-950 hover:bg-cyan-400 focus:ring-2 focus:ring-cyan-500/40",
  outline:
    "border border-slate-700 bg-transparent px-4 py-2.5 text-slate-300 hover:border-slate-500 hover:text-white focus:ring-2 focus:ring-slate-500/30",
  ghost:
    "px-2 py-1.5 text-slate-500 hover:text-slate-300",
};

const spinnerColor: Record<Variant, string> = {
  primary: "border-slate-950/30 border-t-slate-950",
  outline: "border-slate-400/30 border-t-slate-300",
  ghost: "border-slate-500/30 border-t-slate-400",
};

export function Button({
  children,
  loading = false,
  loadingText,
  variant = "primary",
  fullWidth = false,
  disabled,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={[
        base,
        variants[variant],
        fullWidth ? "w-full" : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {loading ? (
        <>
          <span
            className={[
              "h-4 w-4 animate-spin rounded-full border-2",
              spinnerColor[variant],
            ].join(" ")}
          />
          {loadingText ?? children}
        </>
      ) : (
        children
      )}
    </button>
  );
}
