import { CheckCircle2, Lock, Shield } from "lucide-react";

import { m } from "@/lib/i18n";

export function AuthLeftPanel() {
  return (
    <div className="relative hidden h-screen flex-col overflow-hidden border-r border-slate-800/60 bg-slate-900 px-8 pt-8 pb-6 lg:flex lg:w-[52%]">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(rgba(148,163,184,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,163,184,1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute top-1/3 -left-32 h-[500px] w-[500px] rounded-full bg-cyan-500/8 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-[300px] w-[300px] rounded-full bg-blue-600/6 blur-3xl" />

      {/* Logo */}
      <div className="relative z-10 flex shrink-0 items-center gap-3">
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

      {/* Threat map — fills all remaining space */}
      <div className="relative z-10 flex flex-1 flex-col py-5">
        <div className="mb-3 flex shrink-0 items-center justify-between">
          <span className="text-[11px] font-semibold tracking-widest text-slate-400 uppercase">
            {m.live_threat_map()}
          </span>
          <span className="flex items-center gap-1.5 text-[10px] text-red-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400" />
            {m.active_attacks({ count: 3 })}
          </span>
        </div>

        {/* SVG fills the flex-1 container */}
        <div className="relative min-h-0 flex-1 rounded-xl border border-slate-700/60 bg-slate-950/60 p-3">
          <svg
            viewBox="0 0 400 215"
            className="h-full w-full"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="tgrid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="rgba(148,163,184,0.07)"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="400" height="215" fill="url(#tgrid)" />

            {/* Defended perimeter zone */}
            <ellipse
              cx="192"
              cy="113"
              rx="70"
              ry="58"
              fill="rgba(34,211,238,0.03)"
              stroke="rgba(34,211,238,0.12)"
              strokeWidth="1"
              strokeDasharray="5 4"
            />

            {/* Blocked attack lines */}
            <line
              x1="22"
              y1="192"
              x2="170"
              y2="148"
              stroke="#1e293b"
              strokeWidth="1"
              strokeDasharray="4 5"
            />
            <line
              x1="378"
              y1="178"
              x2="214"
              y2="148"
              stroke="#1e293b"
              strokeWidth="1"
              strokeDasharray="4 5"
            />

            {/* Active attack lines */}
            <line
              x1="22"
              y1="40"
              x2="192"
              y2="80"
              stroke="#ef4444"
              strokeWidth="1"
              strokeDasharray="4 5"
              opacity="0.3"
            />
            <line
              x1="22"
              y1="115"
              x2="162"
              y2="148"
              stroke="#ef4444"
              strokeWidth="1"
              strokeDasharray="4 5"
              opacity="0.3"
            />
            <line
              x1="378"
              y1="52"
              x2="222"
              y2="148"
              stroke="#ef4444"
              strokeWidth="1"
              strokeDasharray="4 5"
              opacity="0.3"
            />

            {/* Moving attack packets */}
            <circle r="2.5" fill="#ef4444" opacity="0.9">
              <animateMotion
                dur="1.8s"
                repeatCount="indefinite"
                path="M 22 40 L 192 80"
              />
            </circle>
            <circle r="2.5" fill="#ef4444" opacity="0.9">
              <animateMotion
                dur="2.3s"
                repeatCount="indefinite"
                begin="0.6s"
                path="M 22 115 L 162 148"
              />
            </circle>
            <circle r="2.5" fill="#ef4444" opacity="0.9">
              <animateMotion
                dur="2.0s"
                repeatCount="indefinite"
                begin="0.3s"
                path="M 378 52 L 222 148"
              />
            </circle>

            {/* A1 — active, left-top */}
            <circle
              cx="22"
              cy="40"
              r="5"
              fill="#450a0a"
              stroke="#ef4444"
              strokeWidth="1.5"
            />
            <circle
              cx="22"
              cy="40"
              r="9"
              fill="none"
              stroke="#ef4444"
              strokeWidth="0.8"
            >
              <animate
                attributeName="r"
                values="7;15;7"
                dur="2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.5;0;0.5"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
            <text
              x="33"
              y="37"
              fill="#fca5a5"
              fontSize="7.5"
              fontFamily="monospace"
            >
              185.220.x
            </text>
            <text
              x="33"
              y="47"
              fill="#475569"
              fontSize="6"
              fontFamily="monospace"
            >
              CN · Tor Exit
            </text>

            {/* A2 — active, left-mid */}
            <circle
              cx="22"
              cy="115"
              r="5"
              fill="#450a0a"
              stroke="#ef4444"
              strokeWidth="1.5"
            />
            <circle
              cx="22"
              cy="115"
              r="9"
              fill="none"
              stroke="#ef4444"
              strokeWidth="0.8"
            >
              <animate
                attributeName="r"
                values="7;15;7"
                dur="2.3s"
                repeatCount="indefinite"
                begin="0.5s"
              />
              <animate
                attributeName="opacity"
                values="0.5;0;0.5"
                dur="2.3s"
                repeatCount="indefinite"
                begin="0.5s"
              />
            </circle>
            <text
              x="33"
              y="112"
              fill="#fca5a5"
              fontSize="7.5"
              fontFamily="monospace"
            >
              194.165.x
            </text>
            <text
              x="33"
              y="122"
              fill="#475569"
              fontSize="6"
              fontFamily="monospace"
            >
              RU · VPN
            </text>

            {/* A3 — blocked, left-bot */}
            <circle
              cx="22"
              cy="192"
              r="4"
              fill="#0f172a"
              stroke="#334155"
              strokeWidth="1"
            />
            <text
              x="33"
              y="189"
              fill="#475569"
              fontSize="7.5"
              fontFamily="monospace"
            >
              45.33.x
            </text>
            <text
              x="33"
              y="199"
              fill="#334155"
              fontSize="6"
              fontFamily="monospace"
            >
              BR · Blocked
            </text>

            {/* A4 — active, right-top */}
            <circle
              cx="378"
              cy="52"
              r="5"
              fill="#450a0a"
              stroke="#ef4444"
              strokeWidth="1.5"
            />
            <circle
              cx="378"
              cy="52"
              r="9"
              fill="none"
              stroke="#ef4444"
              strokeWidth="0.8"
            >
              <animate
                attributeName="r"
                values="7;15;7"
                dur="2.1s"
                repeatCount="indefinite"
                begin="0.2s"
              />
              <animate
                attributeName="opacity"
                values="0.5;0;0.5"
                dur="2.1s"
                repeatCount="indefinite"
                begin="0.2s"
              />
            </circle>
            <text
              x="367"
              y="49"
              fill="#fca5a5"
              fontSize="7.5"
              fontFamily="monospace"
              textAnchor="end"
            >
              103.21.x
            </text>
            <text
              x="367"
              y="59"
              fill="#475569"
              fontSize="6"
              fontFamily="monospace"
              textAnchor="end"
            >
              HK · Cloud
            </text>

            {/* A5 — blocked, right-bot */}
            <circle
              cx="378"
              cy="178"
              r="4"
              fill="#0f172a"
              stroke="#334155"
              strokeWidth="1"
            />
            <text
              x="367"
              y="175"
              fill="#475569"
              fontSize="7.5"
              fontFamily="monospace"
              textAnchor="end"
            >
              91.108.x
            </text>
            <text
              x="367"
              y="185"
              fill="#334155"
              fontSize="6"
              fontFamily="monospace"
              textAnchor="end"
            >
              NL · Blocked
            </text>

            {/* T1 — web-01 */}
            <circle
              cx="192"
              cy="80"
              r="17"
              fill="rgba(34,211,238,0.04)"
              stroke="rgba(34,211,238,0.18)"
              strokeWidth="1"
            />
            <circle
              cx="192"
              cy="80"
              r="9"
              fill="#0c4a6e"
              stroke="#22d3ee"
              strokeWidth="1.5"
            />
            <circle cx="192" cy="80" r="4" fill="#22d3ee" />
            <text
              x="192"
              y="101"
              fill="#94a3b8"
              fontSize="7.5"
              fontFamily="monospace"
              textAnchor="middle"
            >
              web-01
            </text>

            {/* T2 — db-primary (amber — under attack) */}
            <circle
              cx="162"
              cy="148"
              r="17"
              fill="rgba(245,158,11,0.05)"
              stroke="rgba(245,158,11,0.22)"
              strokeWidth="1"
            />
            <circle
              cx="162"
              cy="148"
              r="9"
              fill="#431407"
              stroke="#f59e0b"
              strokeWidth="1.5"
            />
            <circle cx="162" cy="148" r="4" fill="#f59e0b" />
            <text
              x="162"
              y="169"
              fill="#94a3b8"
              fontSize="7.5"
              fontFamily="monospace"
              textAnchor="middle"
            >
              db-primary
            </text>

            {/* T3 — auth-svc */}
            <circle
              cx="222"
              cy="148"
              r="17"
              fill="rgba(34,211,238,0.04)"
              stroke="rgba(34,211,238,0.18)"
              strokeWidth="1"
            />
            <circle
              cx="222"
              cy="148"
              r="9"
              fill="#0c4a6e"
              stroke="#22d3ee"
              strokeWidth="1.5"
            />
            <circle cx="222" cy="148" r="4" fill="#22d3ee" />
            <text
              x="222"
              y="169"
              fill="#94a3b8"
              fontSize="7.5"
              fontFamily="monospace"
              textAnchor="middle"
            >
              auth-svc
            </text>

            {/* Zone label */}
            <text
              x="192"
              y="208"
              fill="rgba(34,211,238,0.2)"
              fontSize="6"
              fontFamily="monospace"
              textAnchor="middle"
              letterSpacing="3"
            >
              {m.defended_perimeter()}
            </text>
          </svg>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 flex shrink-0 items-center gap-4 text-[10px] text-slate-600">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="h-3 w-3 text-emerald-500" />
          {m.all_systems_operational()}
        </span>
        <span className="flex items-center gap-1.5">
          <Lock className="h-3 w-3" />
          {m.tls_encrypted()}
        </span>
      </div>
    </div>
  );
}
