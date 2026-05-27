import {
  Search,
  Upload,
  Bell,
} from "lucide-react";

import {
  useLocation,
} from "react-router-dom";

function Header({ onUploadClick }) {

  const location =
    useLocation();

  // =========================
  // PAGE TITLE
  // =========================
  const getPageTitle = () => {

    switch (location.pathname) {

      case "/analytics":
        return "Analytics";

      case "/reports":
        return "Reports";

      case "/ai-insights":
        return "AI Insights";

      default:
        return "Dashboard";
    }
  };

  return (

    <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

      {/* LEFT SECTION */}
      <div>

        <h1 className="text-4xl font-bold text-white">

          {getPageTitle()}

        </h1>

        <p className="text-gray-400 mt-2">

          Welcome to your enterprise AI analytics platform

        </p>

      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-4">

        {/* SEARCH */}
        <div className="relative hidden md:block">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search analytics..."
            className="bg-[#111827] border border-gray-700 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-cyan-400 w-64"
          />

        </div>

        {/* NOTIFICATION */}
        <button
          className="bg-[#111827] border border-gray-700 hover:border-cyan-400 p-3 rounded-xl transition"
        >

          <Bell size={20} />

        </button>

        {/* UPLOAD BUTTON */}
        <button
          onClick={onUploadClick}
          
          className="bg-cyan-500 hover:bg-cyan-400 px-5 py-3 rounded-xl cursor-pointer text-sm font-semibold transition shadow-lg shadow-cyan-500/20"
        >

          <Upload size={18} />

          Upload Dataset

        </button>

      </div>

    </header>
  );
}

export default Header;