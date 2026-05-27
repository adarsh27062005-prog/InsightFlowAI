import {
  LayoutDashboard,
  BarChart3,
  FileText,
  BrainCircuit,
  Users,
  AlertTriangle,
  Timer,
  Activity,
  Hospital,
  Briefcase,
  ChevronRight,
  Workflow,
} from "lucide-react";

import {
  NavLink,
} from "react-router-dom";

function Sidebar() {

  const navItems = [

    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },

    {
      name: "Analytics",
      path: "/analytics",
      icon: BarChart3,
    },

    {
      name: "Reports",
      path: "/reports",
      icon: FileText,
    },

    {
      name: "AI Insights",
      path: "/ai-insights",
      icon: BrainCircuit,
    },

    {
      name: "Enrollment",
      path: "/enrollment",
      icon: Users,
    },

    {
      name: "Rejections",
      path: "/rejections",
      icon: AlertTriangle,
    },

    {
      name: "SLA Monitoring",
      path: "/sla",
      icon: Timer,
    },

    {
      name: "Turnaround",
      path: "/turnaround",
      icon: Activity,
    },

    {
      name: "Providers",
      path: "/providers",
      icon: Hospital,
    },

    {
      name: "Workload",
      path: "/workload",
      icon: Briefcase,
    },

    {
      name: "Workflow Queue",
      path: "/workflow",
      icon: Workflow,
    },

  ];

  return (

    <aside className="hidden xl:flex w-[320px] min-h-screen sticky top-0 bg-[#111827] border-r border-gray-800 flex-col p-6 overflow-y-auto">

      {/* ================================= */}
      {/* LOGO */}
      {/* ================================= */}
      <div className="mb-12">

        <div className="flex items-center gap-4">

          {/* ICON */}
          <div className="w-16 h-16 rounded-3xl bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">

            <span className="text-black text-3xl font-black">

              I

            </span>

          </div>

          {/* TEXT */}
          <div>

            <h1 className="text-3xl font-black tracking-wide text-white">

              InsightFlow AI

            </h1>

            <p className="text-gray-400 text-sm mt-1 leading-6">

              Enterprise Healthcare Intelligence Platform

            </p>

          </div>

        </div>

      </div>

      {/* ================================= */}
      {/* STATUS PANEL */}
      {/* ================================= */}
      <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-5 mb-10">

        <div className="flex items-center gap-3 mb-4">

          <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

          <span className="text-green-400 text-sm font-semibold">

            AI Systems Operational

          </span>

        </div>

        <div className="space-y-3">

          <div className="flex items-center justify-between text-sm">

            <span className="text-gray-400">

              Analytics Engine

            </span>

            <span className="text-cyan-400 font-semibold">

              Active

            </span>

          </div>

          <div className="flex items-center justify-between text-sm">

            <span className="text-gray-400">

              AI Monitoring

            </span>

            <span className="text-green-400 font-semibold">

              Stable

            </span>

          </div>

          <div className="flex items-center justify-between text-sm">

            <span className="text-gray-400">

              Semantic Engine

            </span>

            <span className="text-purple-400 font-semibold">

              Online

            </span>

          </div>

        </div>

      </div>

      {/* ================================= */}
      {/* NAVIGATION */}
      {/* ================================= */}
      <nav className="flex flex-col gap-4 flex-1">

        {navItems.map((item) => {

          const Icon =
            item.icon;

          return (

            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>

                `group relative overflow-hidden flex items-center justify-between px-5 py-5 rounded-3xl transition-all duration-300 border ${
                  isActive

                    ? "bg-cyan-500 text-black border-cyan-400 shadow-2xl shadow-cyan-500/20"

                    : "bg-[#1F2937] border-gray-700 hover:border-cyan-500 hover:bg-[#273244] text-white"
                }`
              }
            >

              {/* GLOW */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-3xl rounded-full" />

              {/* LEFT */}
              <div className="relative z-10 flex items-center gap-4">

                <div className="p-3 rounded-2xl bg-black/10">

                  <Icon
                    size={22}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />

                </div>

                <span className="text-sm tracking-wide font-medium leading-6">

                  {item.name}

                </span>

              </div>

              {/* RIGHT */}
              <ChevronRight
                size={18}
                className="relative z-10 opacity-60"
              />

            </NavLink>

          );

        })}

      </nav>

      {/* ================================= */}
      {/* FOOTER */}
      {/* ================================= */}
      <div className="mt-10">

        <div className="bg-[#0B1120] border border-gray-800 rounded-3xl p-5">

          {/* TOP */}
          <div className="flex items-center gap-3 mb-4">

            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

            <span className="text-green-400 text-sm font-semibold">

              Enterprise AI Active

            </span>

          </div>

          {/* DESCRIPTION */}
          <p className="text-gray-400 text-sm leading-7">

            Semantic healthcare intelligence engine monitoring enterprise operational workflows in real time.

          </p>

          {/* METRICS */}
          <div className="mt-5 pt-5 border-t border-gray-800 space-y-3">

            <div className="flex items-center justify-between text-sm">

              <span className="text-gray-500">

                Platform

              </span>

              <span className="text-cyan-400 font-semibold">

                InsightFlow v2

              </span>

            </div>

            <div className="flex items-center justify-between text-sm">

              <span className="text-gray-500">

                Security

              </span>

              <span className="text-green-400 font-semibold">

                Protected

              </span>

            </div>

          </div>

        </div>

      </div>

    </aside>

  );

}

export default Sidebar;