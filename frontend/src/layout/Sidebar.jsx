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
  name: "SLA",
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
  icon: Activity,
}

  ];

  return (

    <aside className="w-64 min-h-screen sticky top-0 bg-[#111827] border-r border-gray-800 flex flex-col p-6">

      {/* LOGO */}
      <div className="mb-12">

        <h1 className="text-3xl font-extrabold text-cyan-400 tracking-wide">

          InsightFlow AI

        </h1>

        <p className="text-gray-400 text-sm mt-2">

          Enterprise Healthcare Intelligence

        </p>

      </div>

      {/* NAVIGATION */}
      <nav className="flex flex-col gap-4">

        {navItems.map((item) => {

          const Icon =
            item.icon;

          return (

            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>

                `group flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 border ${
                  isActive
                    ? "bg-cyan-500 text-black border-cyan-400 shadow-lg shadow-cyan-500/20 font-semibold"
                    : "bg-[#1F2937] border-gray-700 hover:border-cyan-500 hover:bg-[#273244] text-white"
                }`
              }
            >

              <Icon
                size={22}
                className="transition-transform duration-300 group-hover:scale-110"
              />

              <span className="text-sm tracking-wide">
                {item.name}
              </span>

            </NavLink>

          );
        })}

      </nav>

      {/* FOOTER */}
      <div className="mt-auto pt-10">

        <div className="bg-[#1F2937] border border-gray-700 rounded-2xl p-4">

          <p className="text-xs text-gray-400 mb-2">
            System Status
          </p>

          <div className="flex items-center gap-2">

            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

            <span className="text-sm text-green-400 font-medium">
              AI Engine Active
            </span>

          </div>

        </div>

      </div>

    </aside>

  );
}

export default Sidebar;