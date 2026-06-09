import { useNavigate } from "@tanstack/react-router";
import { Sidebar } from "@/components/app/sidebar";
import { Navbar } from "@/components/app/Navbar";
import { Footer } from "@/components/app/Footer";
import { authApi } from "@/api/auth.api";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Globe,
  ShieldAlert,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  Zap,
} from "lucide-react";

function classNames(...classes: Array<string | boolean>) {
  return classes.filter(Boolean).join(" ");
}

export function HomePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    authApi.logout();
    void navigate({ to: "/login" });
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-950 text-slate-100">
      <Sidebar />
      <div className="flex h-screen w-full flex-col overflow-hidden lg:ml-0">
        <Navbar onLogout={handleLogout} />
        <main className="flex-1 overflow-y-auto bg-slate-950/50">
          <div className="mx-auto max-w-7xl space-y-6 p-4 lg:p-6">
            <HomeHeader />
            <KpiGrid />
            <AlertAndHotspotGrid />
            <AlertsAndActionsGrid />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}

function HomeHeader() {
  return (
    <div className="flex flex-col gap-1 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-white">Security Operations Center</h1>
        <p className="mt-1 text-sm text-slate-400">
          Real-time threat landscape overview for the last 24 hours.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2 text-xs font-medium text-slate-300 transition hover:border-slate-700 hover:text-white">
          <TrendingDown className="mr-2 inline h-3.5 w-3.5" />
          Export Report
        </button>
        <button className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2 text-xs font-medium text-slate-300 transition hover:border-slate-700 hover:text-white">
          <TrendingUp className="mr-2 inline h-3.5 w-3.5" />
          Full Analytics
        </button>
        <button className="rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-cyan-500/20 transition hover:shadow-cyan-500/30">
          <Zap className="mr-2 inline h-3.5 w-3.5" />
          Run Playbook
        </button>
      </div>
    </div>
  );
}

type Kpi = {
  title: string;
  value: string;
  change: string;
  up: boolean;
  icon: React.ElementType;
  accent: string;
};

const kpis: Array<Kpi> = [
  {
    title: "Threats Blocked (24h)",
    value: "1,247",
    change: "+12.3%",
    up: true,
    icon: ShieldAlert,
    accent: "text-rose-400",
  },
  {
    title: "Active Incidents",
    value: "23",
    change: "-8.1%",
    up: false,
    icon: AlertTriangle,
    accent: "text-amber-400",
  },
  {
    title: "Events Per Second",
    value: "12,847",
    change: "+5.7%",
    up: true,
    icon: Activity,
    accent: "text-cyan-400",
  },
  {
    title: "Data Sources Online",
    value: "98.4%",
    change: "41/42",
    up: true,
    icon: Globe,
    accent: "text-emerald-400",
  },
];

function KpiGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <div
            key={kpi.title}
            className="group rounded-2xl border border-slate-800/60 bg-slate-900/40 p-4 transition-all hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/5"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">{kpi.title}</span>
              <div className={classNames("rounded-lg bg-slate-800/60 p-2", kpi.accent)}>
                <Icon className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-2 flex items-end justify-between">
              <div>
                <div className="text-2xl font-bold text-white">{kpi.value}</div>
                <span
                  className={classNames(
                    "text-xs font-medium",
                    kpi.up ? "text-emerald-400" : "text-rose-400",
                  )}
                >
                  {kpi.change}
                </span>
              </div>
              <div className="h-10 w-16">
                <svg viewBox="0 0 60 20" className="h-full w-full" preserveAspectRatio="none">
                  <path
                    d={kpi.up ? "M0 16 Q 10 14, 20 12 T 40 6 T 60 2" : "M0 4 Q 10 6, 20 8 T 40 14 T 60 16"}
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    className={kpi.up ? "text-emerald-400" : "text-rose-400"}
                  />
                </svg>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

type ThreatItem = { region: string; count: number; color: string };

const threatMap: Array<ThreatItem> = [
  { region: "North America", count: 342, color: "bg-cyan-500" },
  { region: "Europe", count: 289, color: "bg-blue-500" },
  { region: "Asia Pacific", count: 412, color: "bg-violet-500" },
  { region: "South America", count: 98, color: "bg-amber-500" },
  { region: "Africa", count: 56, color: "bg-rose-500" },
];

function AlertTimeline() {
  return (
    <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-white">Alert Activity Timeline</h2>
          <p className="mt-1 text-xs text-slate-500">Detected events across all sources</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-lg bg-slate-800/60 px-2.5 py-1 text-[11px] font-medium text-cyan-400">
            Live
          </span>
        </div>
      </div>

      <div className="mt-5 h-56 w-full rounded-xl border border-slate-800/60 bg-slate-950/50 p-3">
        <svg viewBox="0 0 500 160" className="h-full w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 120 C 40 110, 80 140, 120 100 C 160 60, 200 100, 240 80 C 280 60, 320 90, 360 50 C 400 20, 440 60, 500 30"
            stroke="#06b6d4"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M0 120 C 40 110, 80 140, 120 100 C 160 60, 200 100, 240 80 C 280 60, 320 90, 360 50 C 400 20, 440 60, 500 30 L 500 160 L 0 160 Z"
            fill="url(#area)"
          />
        </svg>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-2">
        {["Critical", "High", "Medium", "Low"].map((label, idx) => (
          <div
            key={label}
            className={classNames(
              "rounded-lg border px-2.5 py-2 text-center text-xs font-semibold",
              idx === 0
                ? "border-red-500/30 bg-red-500/10 text-red-400"
                : idx === 1
                  ? "border-orange-500/30 bg-orange-500/10 text-orange-400"
                  : idx === 2
                    ? "border-amber-500/30 bg-amber-500/10 text-amber-400"
                    : "border-slate-700/50 bg-slate-900/60 text-slate-400",
            )}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

function ThreatHotspots() {
  return (
    <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-white">Threat Hotspots</h2>
          <p className="mt-1 text-xs text-slate-500">By geolocation</p>
        </div>
        <BarChart3 className="h-4 w-4 text-slate-500" />
      </div>

      <div className="mt-5 space-y-4">
        {threatMap.map((item) => (
          <div key={item.region}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-300">{item.region}</span>
              <span className="text-sm font-bold text-white">{item.count}</span>
            </div>
            <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className={classNames("h-full rounded-full", item.color)}
                style={{ width: `${(item.count / 500) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-2 rounded-xl border border-slate-800/60 bg-slate-950/50 p-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/10">
          <Globe className="h-4 w-4 text-rose-400" />
        </div>
        <div className="flex-1">
          <div className="text-xs font-medium text-white">Next GEO Report</div>
          <div className="text-[11px] text-slate-500">In 2 hours 14 minutes</div>
        </div>
      </div>
    </div>
  );
}

function AlertAndHotspotGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
      <div className="xl:col-span-2">
        <AlertTimeline />
      </div>
      <ThreatHotspots />
    </div>
  );
}

type AlertRow = {
  status: string;
  alert: string;
  source: string;
  time: string;
  severity: "critical" | "high" | "medium";
};

const alerts: Array<AlertRow> = [
  {
    status: "New",
    alert: "Ransomware ECDH key exchange",
    source: "Endpoint-MX-04",
    time: "2 min ago",
    severity: "critical",
  },
  {
    status: "Investigating",
    alert: "Lateral movement via RDP",
    source: "Gateway-Primary",
    time: "8 min ago",
    severity: "high",
  },
  {
    status: "New",
    alert: "C2 beacon, known APT28 IP",
    source: "Firewall-Core",
    time: "14 min ago",
    severity: "critical",
  },
  {
    status: "Monitoring",
    alert: "DNS tunneling pattern",
    source: "DNS-Sensor-01",
    time: "21 min ago",
    severity: "medium",
  },
];

function StatusBadge({ status }: { status: string }) {
  const cls =
    status === "New"
      ? "text-cyan-400"
      : status === "Investigating"
        ? "text-amber-400"
        : "text-slate-400";
  return <span className={cls}>● {status}</span>;
}

function SeverityBadge({ severity }: { severity: AlertRow["severity"] }) {
  const cls =
    severity === "critical"
      ? "bg-red-500/15 text-red-400"
      : severity === "high"
        ? "bg-orange-500/15 text-orange-400"
        : "bg-amber-500/15 text-amber-400";
  return (
    <span className={classNames("rounded-full px-2 py-1 text-[10px] font-bold uppercase", cls)}>
      {severity}
    </span>
  );
}

function RecentAlertsTable() {
  return (
    <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-5 lg:col-span-2">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-white">Recent Critical Alerts</h2>
          <p className="mt-1 text-xs text-slate-500">10 incidents requiring immediate attention</p>
        </div>
        <button className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-cyan-400 transition hover:bg-cyan-500/10">
          View all
        </button>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-slate-800/60">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-800/60 bg-slate-950/60 text-xs uppercase text-slate-500">
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Alert</th>
              <th className="px-4 py-3 font-medium">Source</th>
              <th className="px-4 py-3 font-medium">Time</th>
              <th className="px-4 py-3 font-medium">Severity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {alerts.map((row) => (
              <tr key={row.alert} className="transition hover:bg-slate-800/30">
                <td className="px-4 py-3">
                  <span className="rounded-full px-2 py-1 text-[10px] font-bold uppercase">
                    <StatusBadge status={row.status} />
                  </span>
                </td>
                <td className="px-4 py-3 text-xs font-medium text-slate-200">{row.alert}</td>
                <td className="px-4 py-3 text-xs text-slate-500">{row.source}</td>
                <td className="px-4 py-3 text-xs text-slate-500">{row.time}</td>
                <td className="px-4 py-3">
                  <SeverityBadge severity={row.severity} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

type ActionItem = {
  label: string;
  icon: React.ElementType;
};

const actions: Array<ActionItem> = [
  { label: "Block IP", icon: ShieldCheck },
  { label: "Isolate Host", icon: Globe },
  { label: "Reset Password", icon: Zap },
  { label: "Collect Logs", icon: Activity },
  { label: "Create Ticket", icon: AlertTriangle },
  { label: "Run Query", icon: BarChart3 },
];

function QuickActions() {
  return (
    <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-5">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-white">Quick Actions</h2>
        <p className="mt-1 text-xs text-slate-500">Common SOC operations</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              className="flex flex-col items-center justify-center gap-2 rounded-xl border border-slate-800/60 bg-slate-950/50 p-4 text-xs font-medium text-slate-400 transition hover:border-cyan-500/30 hover:text-cyan-400"
            >
              <Icon className="h-5 w-5" />
              {action.label}
            </button>
          );
        })}
      </div>

      <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/5 p-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-red-400" />
          <span className="text-xs font-bold text-red-400">Critical Attention</span>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-slate-400">
          Potential active ransomware outbreak on segment B. 3 endpoints reporting encryption
          activities. Immediate isolation recommended.
        </p>
        <button className="mt-3 w-full rounded-lg bg-red-500/10 py-2 text-xs font-bold text-red-400 transition hover:bg-red-500/20">
          Start Incident Response
        </button>
      </div>
    </div>
  );
}

function AlertsAndActionsGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <RecentAlertsTable />
      <QuickActions />
    </div>
  );
}
