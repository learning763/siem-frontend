import { useState } from "react";
import {
  Globe,
  LogOut,
  Menu,
  RefreshCw,
  Search,
  ShieldCheck,
  Zap,
} from "lucide-react";

function classNames(...classes: Array<string | boolean>) {
  return classes.filter(Boolean).join(" ");
}

function severityColor(s: string) {
  switch (s) {
    case "critical":
      return "bg-red-500";
    case "high":
      return "bg-orange-500";
    case "medium":
      return "bg-amber-400";
    default:
      return "bg-slate-500";
  }
}

export function Navbar({
  className = "",
  onMenuClick,
  onLogout,
}: {
  className?: string;
  onMenuClick?: () => void;
  onLogout?: () => void;
}) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, severity: "critical", title: "Brute-force attack detected", time: "2 min" },
    { id: 2, severity: "high", title: "Malware signature match", time: "8 min" },
    { id: 3, severity: "medium", title: "Unusual outbound traffic", time: "15 min" },
  ]);

  return (
    <header
      className={classNames(
        "flex h-16 shrink-0 items-center justify-between border-b border-slate-800/60 bg-slate-950/80 px-4 backdrop-blur-xl lg:px-6",
        className,
      )}
    >
      <div className="flex items-center gap-4">
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800/60 hover:text-white lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}

        <div
          className={classNames(
            "flex items-center gap-3 transition-all",
            searchOpen ? "w-96" : "w-auto",
          )}
        >
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search events, alerts, threats…"
              className="w-full rounded-xl border border-slate-800 bg-slate-900/60 py-2 pl-10 pr-4 text-sm text-slate-300 placeholder:text-slate-600 focus:border-cyan-500/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
              onFocus={() => setSearchOpen(true)}
              onBlur={() => setSearchOpen(false)}
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded border border-slate-700 bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-500">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-1.5 md:flex">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-xs font-medium text-emerald-400">Protected</span>
          </div>
          <div className="h-3 w-px bg-slate-800" />
          <div className="flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-amber-400" />
            <span className="text-xs font-medium text-amber-400">High Sensitivity</span>
          </div>
        </div>

        <div className="hidden items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-1.5 lg:flex">
          <Globe className="h-3.5 w-3.5 text-cyan-400" />
          <span className="text-xs font-medium text-slate-300">Active: Global SOC</span>
        </div>

        <button className="relative rounded-xl border border-slate-800 bg-slate-900/60 p-2 text-slate-400 transition hover:border-slate-700 hover:text-white">
          <RefreshCw className="h-4 w-4" />
        </button>

        <div className="relative">
          <button className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-2.5 py-1.5 text-slate-300 transition hover:border-slate-700 hover:text-white">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 text-xs font-bold text-white">
              AD
            </div>
            <span className="hidden text-sm font-medium lg:block">Admin User</span>
            <svg className="h-3.5 w-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <span className="absolute -right-0.5 -top-0.5 inline-flex h-2.5 w-2.5 items-center justify-center rounded-full bg-red-500 ring-2 ring-slate-950">
            <span className="text-white">
              <svg className="h-2 w-2" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="6" />
              </svg>
            </span>
          </span>
        </div>

        <div className="relative">
          <button
            onClick={onLogout}
            title="Logout"
            className="relative rounded-xl border border-slate-800 bg-slate-900/60 p-2 text-slate-400 transition hover:border-red-500/40 hover:text-red-400"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>

        <div className="relative">
          <button className="relative rounded-xl border border-slate-800 bg-slate-900/60 p-2 text-slate-400 transition hover:border-slate-700 hover:text-white">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>
          <span className="absolute -right-1 -top-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-slate-950">
            {notifications.length}
          </span>
        </div>
      </div>
    </header>
  );
}

export function NotificationDropdown() {
  return (
    <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-2xl border border-slate-800 bg-slate-900 p-2 shadow-2xl shadow-black/40">
      <div className="flex items-center justify-between border-b border-slate-800 px-3 py-2">
        <h3 className="text-sm font-semibold text-white">Notifications</h3>
        <span className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-[10px] font-bold text-cyan-400">
          {notifications.length} NEW
        </span>
      </div>
      <div className="mt-2 space-y-1">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="flex items-start gap-3 rounded-xl border border-transparent p-2.5 transition-colors hover:border-slate-800 hover:bg-slate-800/30"
          >
            <span className={classNames("mt-1.5 h-2 w-2 rounded-full shrink-0", severityColor(n.severity))} />
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-200">{n.title}</p>
              <span className="text-[11px] text-slate-500">{n.time} ago</span>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-2 w-full rounded-lg border border-slate-800 py-2 text-xs font-medium text-slate-400 transition hover:text-white">
        View all alerts
      </button>
    </div>
  );
}
