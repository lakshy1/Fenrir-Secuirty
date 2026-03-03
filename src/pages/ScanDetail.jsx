import { useEffect, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import PageHeader from "../components/layout/PageHeader";
import {
  SearchCheck,
  Boxes,
  FlaskConical,
  ClipboardCheck,
  FileText,
  Clock3,
  ChevronDown,
  X,
} from "lucide-react";
import SeverityBadge from "../components/ui/SeverityBadge";
import PageTransition from "../components/ui/PageTransition";
import { SkeletonBlock, SkeletonText } from "../components/ui/Skeleton";
import Button from "../components/ui/Button";

const scanSteps = [
  { label: "Spidering", icon: SearchCheck, active: true },
  { label: "Mapping", icon: Boxes },
  { label: "Testing", icon: FlaskConical },
  { label: "Validating", icon: ClipboardCheck },
  { label: "Reporting", icon: FileText },
];

const activityLog = [
  {
    time: "09:00:00",
    text: (
      <>
        I&apos;ll begin a systematic penetration test on{" "}
        <span className="text-[#3f97a1]">helpdesk.democorp.com</span>. Let me start with reconnaissance
        and enumeration.
      </>
    ),
  },
  {
    time: "09:01:00",
    text: <>Good! target is online. Now let me perform port scanning to identify running services.</>,
  },
  {
    time: "09:02:00",
    text: (
      <>
        Excellent reconnaissance results:
        <br />
        <span className="text-[#202a3b] mr-2">|</span>
        <span className="text-[#989898]">
          - helpdesk.democorp.com: Apache httpd 2.4.65 on port 80 (web server)
        </span>
        <br />
        Let me probe the web server on target first to understand its structure.
      </>
    ),
  },
  {
    time: "09:03:00",
    text: (
      <>
        Great! I found a login page for a Help Desk Platform. I can see a useful comment:{" "}
        <span className="text-[#3f97a1]">&quot;TODO: Delete the testing account (test:test)&quot;.</span>{" "}
        Let me test this credential. The login redirects to{" "}
        <span className="bg-[#202a3b] text-[#f2f6ff] rounded px-2 py-0.5">/password/test</span>. Let me
        follow that path and explore it.
      </>
    ),
  },
];

const verificationLoops = [
  {
    time: "09:08:12",
    text: (
      <>
        Replayed <span className="text-[#3f97a1]">/api/users/profile?id=10032</span> and{" "}
        <span className="text-[#3f97a1]">/api/users/profile?id=10033</span>. Access control bypass is
        reproducible.
      </>
    ),
  },
  {
    time: "09:10:06",
    text: (
      <>
        Rate-limit check: submitted 120 login attempts in 60 seconds against{" "}
        <span className="text-[#3f97a1]">/api/auth/login</span>; no lockout observed.
      </>
    ),
  },
  {
    time: "09:11:49",
    text: (
      <>
        SQL injection payload <span className="text-[#3f97a1]">&apos; OR SLEEP(5)--</span> delayed
        response by 5.02s on <span className="text-[#3f97a1]">/api/users/profile</span>.
      </>
    ),
  },
];

const findings = [
  {
    severity: "critical",
    endpoint: "/api/users/profile",
    title: "SQL Injection in Authentication Endpoint",
    desc: "Time-based blind SQL injection confirmed on user-controlled input during authentication flow. Exploitation allows database-level access.",
  },
  {
    severity: "high",
    endpoint: "/api/auth/login",
    title: "Unauthorized Access to User Metadata",
    desc: "Authenticated low-privilege user was able to access metadata of other users. Access control checks were missing.",
  },
  {
    severity: "medium",
    endpoint: "/api/search",
    title: "Broken Authentication Rate Limiting",
    desc: "No effective rate limiting detected on login attempts. Automated brute-force attempts possible.",
  },
];

export default function ScanDetail() {
  const [isConsoleOpen, setIsConsoleOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("activity");
  const [scanStopped, setScanStopped] = useState(false);
  const [toast, setToast] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 900);
    return () => window.clearTimeout(timer);
  }, []);

  const showToast = (message) => {
    setToast(message);
    window.clearTimeout(showToast.timeoutId);
    showToast.timeoutId = window.setTimeout(() => setToast(""), 1800);
  };

  const currentLog = activeTab === "activity" ? activityLog : verificationLoops;

  return (
    <AppLayout
      topBar={
        <PageHeader
          dangerAction={scanStopped ? "Start Scan" : "Stop Scan"}
          onPrimaryAction={() => showToast("Report exported as PDF")}
          onDangerAction={() => {
            setScanStopped((prev) => !prev);
            showToast(scanStopped ? "Scan started" : "Scan stopped");
          }}
        />
      }
    >
      <PageTransition className="scan-page p-3 sm:p-5 space-y-4 pb-0 sm:pb-0 h-full min-h-0 flex flex-col">
        <section className="scan-progress-card rounded-xl border px-3 sm:px-5 py-4 shadow-[0_1px_2px_rgba(17,24,39,0.05)] card-fade-up">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-start gap-5 sm:gap-6">
            <div className="w-full lg:w-[150px] shrink-0 flex items-center justify-center my-auto py-3 sm:py-4 border-b lg:border-b-0 lg:border-r border-[var(--shell-border)]">
              <div className="scan-progress-circle h-[104px] w-[104px] sm:h-[130px] sm:w-[130px] rounded-full flex flex-col items-center justify-center text-center">
                <p className="text-[34px] sm:text-[42px] font-semibold leading-none">{scanStopped ? "0%" : "41%"}</p>
                <p className="text-[12px] sm:text-[14px] mt-1">{scanStopped ? "Stopped" : "InProgress"}</p>
              </div>
            </div>

            <div className="w-full flex-1 min-w-0">
              <div className="relative py-2">
                <div className="relative pb-1">
                  <div className="absolute left-0 right-0 top-[20px] sm:top-[31px] h-[2px] bg-[var(--shell-border)]" />
                  <div className="relative grid grid-cols-5 gap-1 sm:gap-4 px-1 sm:px-3">
                    {scanSteps.map((step) => {
                      const Icon = step.icon;
                      return (
                        <div key={step.label} className="min-w-0 flex flex-col items-center">
                          <div className="w-full flex justify-center">
                            <div
                              className={`scan-step-dot relative z-[1] h-[40px] w-[40px] sm:h-[62px] sm:w-[62px] rounded-full border flex items-center justify-center ${
                                step.active ? "is-active" : ""
                              }`}
                              aria-label={`${step.label} phase`}
                            >
                              <Icon size={15} className="sm:h-[22px] sm:w-[22px]" />
                            </div>
                          </div>
                          <p className="scan-step-label text-[11px] sm:text-[16px] leading-tight mt-2 sm:mt-3 font-medium text-center w-full">
                            {step.label}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-3 sm:mt-5 w-full border-t border-[var(--shell-border)]" />

              <div className="pt-4 sm:pt-5 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-5">
                <Meta label="Scan Type" value="Grey Box" />
                <Meta label="Targets" value="google.com" />
                <Meta label="Started At" value="Nov 22, 09:00AM" />
                <Meta label="Credentials" value="2 Active" />
                <Meta label="Files" value="Control.pdf" />
                <Meta label="Checklists" value="40/350" accent />
              </div>
            </div>
          </div>
        </section>

        <section className="scan-console flex-1 min-h-0 rounded-2xl border shadow-[0_10px_22px_rgba(18,26,39,0.08)] overflow-hidden card-fade-up">
          <header className="scan-console-header min-h-0 sm:h-[70px] px-3 sm:px-8 py-2 sm:py-0 border-b flex items-center justify-between gap-2 sm:gap-0">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              <span className={`h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full ${scanStopped ? "bg-[#d9574b]" : "bg-[#4ea1a4]"}`} />
              <h3 className="text-[15px] sm:text-[19px] font-semibold truncate">Live Scan Console</h3>
              <span className="scan-running-pill h-7 sm:h-8 px-3 sm:px-4 rounded-full text-[12px] sm:text-[15px] inline-flex items-center gap-1 sm:gap-2 shrink-0">
                <Clock3 size={11} className="sm:h-[14px] sm:w-[14px]" />
                {scanStopped ? "Stopped" : "Running..."}
              </span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 text-[var(--shell-text-secondary)]">
              <Button
                variant="ghost"
                onClick={() => setIsConsoleOpen((prev) => !prev)}
                className="h-8 w-8 sm:h-9 sm:w-9 !p-0 rounded-md"
                ariaLabel={isConsoleOpen ? "Collapse console" : "Expand console"}
              >
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-200 ${isConsoleOpen ? "" : "-rotate-180"}`}
                  aria-hidden="true"
                />
              </Button>
              <Button
                variant="ghost"
                onClick={() => setIsConsoleOpen(false)}
                className="h-8 w-8 sm:h-9 sm:w-9 !p-0 rounded-md"
                ariaLabel="Close console"
              >
                <X size={20} aria-hidden="true" />
              </Button>
            </div>
          </header>

          {isConsoleOpen && (
            <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_1fr]">
              <div className="xl:border-r border-[var(--shell-border)]">
                <div className="h-[56px] sm:h-[72px] flex items-end gap-4 sm:gap-7 px-4 sm:px-8 border-b border-[var(--shell-border)] overflow-x-auto no-scrollbar">
                  <button
                    type="button"
                    onClick={() => setActiveTab("activity")}
                    role="tab"
                    aria-selected={activeTab === "activity"}
                    aria-controls="activity-panel"
                    className={`h-full text-[15px] sm:text-[17px] font-semibold whitespace-nowrap ${
                      activeTab === "activity"
                        ? "border-b-[3px] border-[#4ea1a4] text-[#42989c]"
                        : "text-[var(--shell-text-secondary)]"
                    }`}
                  >
                    Activity Log
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("verification")}
                    role="tab"
                    aria-selected={activeTab === "verification"}
                    aria-controls="verification-panel"
                    className={`h-full text-[15px] sm:text-[17px] font-semibold whitespace-nowrap ${
                      activeTab === "verification"
                        ? "border-b-[3px] border-[#4ea1a4] text-[#42989c]"
                        : "text-[var(--shell-text-secondary)]"
                    }`}
                  >
                    Verification Loops
                  </button>
                </div>

                <div
                  id={activeTab === "activity" ? "activity-panel" : "verification-panel"}
                  role="tabpanel"
                  className="scan-log-area no-scrollbar px-4 sm:px-7 py-4 sm:py-6 space-y-4 sm:space-y-5 max-h-[420px] sm:max-h-[690px] overflow-auto font-mono text-[14px] sm:text-[15px] leading-[1.45]"
                  aria-busy={isLoading}
                >
                  {isLoading
                    ? Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="space-y-2">
                          <SkeletonBlock className="h-4 w-20" />
                          <SkeletonText lines={2} />
                        </div>
                      ))
                    : currentLog.map((item) => (
                        <p key={item.time}>
                          <span className="scan-log-time">[{item.time}]</span> {item.text}
                        </p>
                      ))}
                </div>
              </div>

              <div className="scan-findings-wrap">
                <div className="h-[56px] sm:h-[72px] px-4 sm:px-8 flex items-center border-b border-[var(--shell-border)]">
                  <h4 className="text-[16px] sm:text-[19px] font-semibold">Finding Log</h4>
                </div>

                <div className="no-scrollbar p-2 sm:p-3 space-y-2 sm:space-y-3 max-h-[460px] sm:max-h-[762px] overflow-auto mt-3 sm:mt-4">
                  {isLoading
                    ? Array.from({ length: 3 }).map((_, index) => (
                        <article
                          key={index}
                          className="scan-finding-card rounded-xl sm:rounded-2xl border p-3 sm:p-4"
                        >
                          <div className="flex items-center justify-between mb-3 gap-2">
                            <SkeletonBlock className="h-7 w-24 rounded-full" />
                            <SkeletonBlock className="h-4 w-14" />
                          </div>
                          <SkeletonBlock className="h-5 w-4/5 mb-2" />
                          <SkeletonBlock className="h-4 w-2/5 mb-2" />
                          <SkeletonText lines={2} />
                        </article>
                      ))
                    : findings.map((item) => (
                        <article
                          key={item.title}
                          className="scan-finding-card rounded-xl sm:rounded-2xl border p-3 sm:p-4 shadow-[0_2px_7px_rgba(17,24,39,0.05)]"
                        >
                          <div className="flex items-center justify-between mb-2.5 sm:mb-3 gap-2">
                            <SeverityBadge type={item.severity} count={1} showLabel className="!rounded-full !h-7" />
                            <span className="text-[12px] sm:text-[13px] text-[var(--shell-text-secondary)]">
                              10:45:23
                            </span>
                          </div>
                          <h5 className="text-[16px] sm:text-[17px] leading-tight font-semibold mb-1.5">
                            {item.title}
                          </h5>
                          <p className="text-[14px] sm:text-[15px] text-[var(--shell-accent)] font-mono mb-1.5 break-all">
                            {item.endpoint}
                          </p>
                          <p className="text-[14px] sm:text-[14px] leading-6">{item.desc}</p>
                        </article>
                      ))}
                </div>
              </div>
            </div>
          )}
        </section>

        <footer className="scan-footer mt-auto shrink-0 -mx-3 sm:-mx-5 border-t px-3 sm:px-6 py-3 flex flex-wrap items-center gap-3 sm:gap-4 text-[14px] sm:text-[15px]">
          <div className="flex flex-wrap items-center gap-x-10 gap-y-0">
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#8190a8]" />
              Sub-Agents: 2
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#8190a8]" />
              Parallel Executions: 2
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#8190a8]" />
              Operations: 14
            </span>
          </div>
          <div className="w-full sm:w-auto sm:ml-auto flex flex-wrap items-center gap-x-5 sm:gap-x-8 gap-y-1 font-medium">
            <span className="text-[#e05249]">Critical: 1</span>
            <span className="text-[#de7f33]">High: 1</span>
            <span className="text-[#dbad3f]">Medium: 1</span>
            <span className="text-[#83b942]">Low: 0</span>
          </div>
        </footer>
      </PageTransition>

      {toast && (
        <div
          className="fixed right-4 bottom-4 z-[110] px-4 py-2 rounded-lg bg-[#111827] text-white text-sm shadow-lg"
          role="status"
          aria-live="polite"
        >
          {toast}
        </div>
      )}
    </AppLayout>
  );
}

function Meta({ label, value, accent = false }) {
  return (
    <div>
      <p className="text-[14px] text-[var(--shell-text-secondary)] font-semibold mb-1">{label}</p>
      <p
        className={`text-[15px] leading-tight font-bold break-words ${
          accent ? "text-[var(--shell-accent)]" : "text-[var(--shell-text-primary)]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
