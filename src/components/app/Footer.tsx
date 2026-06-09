import { ShieldCheck } from "lucide-react";

function classNames(...classes: Array<string | boolean>) {
  return classes.filter(Boolean).join(" ");
}

export function Footer({ className = "" }: { className?: string }) {
  const now = new Date();
  const timestamp = now.toISOString().replace("T", " ").split(".")[0] + " UTC";

  return (
    <footer
      className={classNames(
        "shrink-0 border-t border-slate-800/60 bg-slate-950/90 px-4 py-3 backdrop-blur-sm lg:px-6",
        className,
      )}
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-cyan-500" />
            <span className="text-xs font-semibold text-slate-500">CyberShield SIEM</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-bold text-emerald-400 ring-1 ring-emerald-500/20">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              SYSTEM OPERATIONAL
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-2 py-1 text-[10px] font-bold text-cyan-400 ring-1 ring-cyan-500/20">
              INGESTING: 12,847 EPS
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <div className="text-[11px] text-slate-500">
            <span className="text-slate-400">Correlation Engine:</span> Active
          </div>
          <div className="text-[11px] text-slate-500">
            <span className="text-slate-400">ML Models:</span> 3 Loaded
          </div>
          <div className="text-[11px] text-slate-500">
            <span className="mr-1.5 text-slate-400">Updated:</span>
            <span className="font-mono text-slate-400">{timestamp}</span>
          </div>
          <div className="text-[11px] text-slate-600">
            © 2026 CyberShield Security. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
