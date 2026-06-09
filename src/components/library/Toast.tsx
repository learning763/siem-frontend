import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

import { CheckCircle2, X, XCircle } from "lucide-react";

type ToastVariant = "success" | "error";

interface ToastItem {
  id: number;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  success: (message: string) => void;
  error: (message: string) => void;
}

let _nextId = 0;
const DURATION = 4000;

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const add = useCallback(
    (message: string, variant: ToastVariant) => {
      const id = ++_nextId;
      setToasts((prev) => [...prev, { id, message, variant }]);
      setTimeout(() => dismiss(id), DURATION);
    },
    [dismiss],
  );

  const success = useCallback(
    (message: string) => add(message, "success"),
    [add],
  );
  const error = useCallback((message: string) => add(message, "error"), [add]);

  return (
    <ToastContext.Provider value={{ success, error }}>
      {children}
      <div
        aria-live="polite"
        aria-label="Notifications"
        className="fixed top-4 right-4 z-50 flex flex-col gap-3"
      >
        {toasts.map((t) => (
          <Toast key={t.id} toast={t} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function Toast({
  toast: t,
  onDismiss,
}: {
  toast: ToastItem;
  onDismiss: (id: number) => void;
}) {
  const isSuccess = t.variant === "success";

  return (
    <div
      role="alert"
      style={{
        animation: "toast-enter 0.4s cubic-bezier(0.21, 1.02, 0.73, 1) forwards",
      }}
      className={`relative flex w-80 overflow-hidden rounded-xl border shadow-2xl backdrop-blur-sm ${
        isSuccess
          ? "border-emerald-500/20 bg-slate-900/95 shadow-emerald-900/30"
          : "border-red-500/20 bg-slate-900/95 shadow-red-900/30"
      }`}
    >
      {/* Left accent bar */}
      <div
        className={`w-[3px] shrink-0 ${isSuccess ? "bg-emerald-500" : "bg-red-500"}`}
      />

      <div className="flex flex-1 flex-col gap-1.5 px-4 py-3.5">
        {/* Header row */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {/* Icon badge */}
            <div
              className={`flex h-5 w-5 items-center justify-center rounded-full ${
                isSuccess ? "bg-emerald-500/15" : "bg-red-500/15"
              }`}
            >
              {isSuccess ? (
                <CheckCircle2 className="h-3 w-3 text-emerald-400" />
              ) : (
                <XCircle className="h-3 w-3 text-red-400" />
              )}
            </div>
            <span
              className={`text-[10px] font-bold tracking-widest uppercase ${
                isSuccess ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {isSuccess ? "Success" : "Error"}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onDismiss(t.id)}
            aria-label="Dismiss"
            className="rounded p-0.5 text-slate-600 transition-colors hover:bg-slate-800 hover:text-slate-300"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Message */}
        <p className="text-sm leading-relaxed text-slate-300">{t.message}</p>
      </div>

      {/* Progress bar */}
      <div className="absolute right-0 bottom-0 left-[3px] h-[2px] bg-slate-800">
        <div
          style={{
            animation: `toast-progress ${DURATION}ms linear forwards`,
          }}
          className={`h-full ${isSuccess ? "bg-emerald-500/50" : "bg-red-500/50"}`}
        />
      </div>
    </div>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
