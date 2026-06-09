import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  ChevronDown,
  FileText,
  LayoutDashboard,
  LogOut,
  Package,
  Search,
  Server,
  Settings,
  Shield,
  ShieldAlert,
  User,
} from "lucide-react";

function classNames(...classes: Array<string | boolean>) {
  return classes.filter(Boolean).join(" ");
}

interface NavItem {
  label: string;
  icon: React.ElementType;
  badge?: number | string;
  children?: Array<{ label: string; href: string }>;
  href: string;
}

const navSections: Array<{ title: string; items: Array<NavItem> }> = [
  {
    title: "MONITORING",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, href: "/" },
      {
        label: "Threat Intelligence",
        icon: ShieldAlert,
        href: "/threats",
        children: [
          { label: "Live Threats", href: "/threats/live" },
          { label: "Threat Feeds", href: "/threats/feeds" },
          { label: "IOC Management", href: "/threats/iocs" },
        ],
      },
      { label: "Alert Management", icon: Bell, href: "/alerts", badge: 24 },
      { label: "Asset Inventory", icon: Server, href: "/assets" },
    ],
  },
  {
    title: "INVESTIGATION",
    items: [
      { label: "Events & Logs", icon: FileText, href: "/events" },
      {
        label: "Incident Response",
        icon: AlertTriangle,
        href: "/incidents",
        children: [
          { label: "Active Incidents", href: "/incidents/active" },
          { label: "Playbooks", href: "/incidents/playbooks" },
        ],
      },
      {
        label: "Threat Hunting",
        icon: Search,
        href: "/hunting",
      },
    ],
  },
  {
    title: "ANALYTICS",
    items: [
      { label: "Reports", icon: BarChart3, href: "/reports" },
      { label: "Compliance", icon: Shield, href: "/compliance" },
      { label: "User Analytics", icon: User, href: "/users" },
      { label: "System Health", icon: Activity, href: "/health" },
    ],
  },
  {
    title: "MANAGEMENT",
    items: [
      { label: "Data Sources", icon: Package, href: "/sources" },
      { label: "Settings", icon: Settings, href: "/settings" },
    ],
  },
];

export function Sidebar({
  className = "",
  onClose,
}: {
  className?: string;
  onClose?: () => void;
}) {
  const [expanded, setExpanded] = useState<string | null>("Threat Intelligence");
  const [activeItem, setActiveItem] = useState("Dashboard");

  const toggleExpand = (label: string) => {
    setExpanded((prev) => (prev === label ? null : label));
  };

  return (
    <aside
      className={classNames(
        "flex h-screen w-72 flex-col border-r border-slate-800/60 bg-slate-950/95 text-slate-400 backdrop-blur-xl",
        className,
      )}
    >
      <div className="flex h-16 shrink-0 items-center gap-3 border-b border-slate-800/60 px-5">
        <div className="relative">
          <ShieldAlert className="h-8 w-8 text-cyan-500" />
          <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-950" />
        </div>
        <div className="leading-tight">
          <div className="text-sm font-bold text-white">CyberShield SIEM</div>
          <div className="text-xs text-slate-500">v3.2.1 Enterprise</div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-auto rounded-lg p-1.5 text-slate-500 hover:bg-slate-800 hover:text-white lg:hidden"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {navSections.map((section) => (
          <div key={section.title} className="mb-6 last:mb-0">
            <div className="mb-2 px-3 text-[11px] font-bold uppercase tracking-widest text-slate-600">
              {section.title}
            </div>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isExpanded = expanded === item.label;
                const isActive = activeItem === item.label;

                if (item.children) {
                  return (
                    <div key={item.label}>
                      <button
                        onClick={() => toggleExpand(item.label)}
                        className={classNames(
                          "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                          isActive
                            ? "bg-cyan-500/10 text-cyan-400"
                            : "text-slate-400 hover:bg-slate-800/60 hover:text-white",
                        )}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        <span className="flex-1 text-left">{item.label}</span>
                        {item.badge && (
                          <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-[10px] font-bold text-red-400">
                            {item.badge}
                          </span>
                        )}
                        <ChevronDown
                          className={classNames(
                            "h-3.5 w-3.5 transition-transform duration-200",
                            isExpanded ? "rotate-180" : "",
                          )}
                        />
                      </button>
                      {isExpanded && (
                        <div className="mt-1 ml-8 space-y-0.5 border-l border-slate-800 pl-3">
                          {item.children.map((child) => (
                            <a
                              key={child.href}
                              href={child.href}
                              className="block rounded-md px-3 py-2 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-800/40 hover:text-slate-300"
                            >
                              {child.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setActiveItem(item.label)}
                    className={classNames(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                      isActive
                        ? "bg-cyan-500/10 text-cyan-400 shadow-sm shadow-cyan-500/5"
                        : "text-slate-400 hover:bg-slate-800/60 hover:text-white",
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-[10px] font-bold text-red-400 ring-1 ring-red-500/20">
                        {item.badge}
                      </span>
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="shrink-0 space-y-2 border-t border-slate-800/60 p-3">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-slate-800/60 hover:text-white">
          <Settings className="h-4 w-4 shrink-0" />
          <span>System Settings</span>
        </button>
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/10">
          <LogOut className="h-4 w-4 shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
