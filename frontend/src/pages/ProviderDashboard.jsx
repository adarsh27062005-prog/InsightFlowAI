import {
  Hospital,
  Activity,
  TrendingUp,
  ShieldCheck,
  Users,
  HeartPulse,
} from "lucide-react";

function ProviderDashboard({
  data,
}) {

  // =========================
  // SAFE HELPERS
  // =========================
  const getValue = (row, keys) => {

    for (const key of keys) {

      if (
        row[key] !== undefined &&
        row[key] !== null &&
        row[key] !== ""
      ) {

        return row[key];

      }
    }

    return null;

  };

  // =========================
  // PROVIDER ANALYSIS
  // =========================
  const providerMap = {};

  data.forEach((row) => {

    const provider =
      getValue(row, [
        "provider",
        "Provider",
        "provider_name",
        "physician",
      ]) || "Unknown";

    providerMap[provider] =
      (providerMap[provider] || 0) + 1;

  });

  const sortedProviders =
    Object.entries(providerMap)
      .sort((a, b) => b[1] - a[1]);

  const totalProviders =
    sortedProviders.length;

  const topProvider =
    sortedProviders[0]?.[0] || "N/A";

  const topProviderVolume =
    sortedProviders[0]?.[1] || 0;

  // =========================
  // KPI CONFIG
  // =========================
  const kpis = [

    {
      title: "Total Providers",
      value: totalProviders,
      icon: Hospital,
      color: "text-cyan-400",
    },

    {
      title: "Top Provider Volume",
      value: topProviderVolume,
      icon: Activity,
      color: "text-green-400",
    },

    {
      title: "Network Activity",
      value: `${data.length}`,
      icon: TrendingUp,
      color: "text-purple-400",
    },

    {
      title: "Top Provider",
      value: topProvider,
      icon: HeartPulse,
      color: "text-red-400",
    },

  ];

  return (

    <div className="space-y-8">

      {/* ================================= */}
      {/* HERO */}
      {/* ================================= */}
      <div className="relative overflow-hidden bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-500/20 rounded-3xl p-10">

        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full" />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">

          <div>

            <div className="flex items-center gap-3 mb-4">

              <ShieldCheck
                size={22}
                className="text-green-400"
              />

              <span className="text-green-400 font-semibold">

                Provider Intelligence Active

              </span>

            </div>

            <h1 className="text-5xl font-black mb-5">

              Provider Network Command Center

            </h1>

            <p className="text-gray-300 text-lg leading-8 max-w-4xl">

              Enterprise healthcare provider intelligence platform
              for operational monitoring, provider activity,
              workload distribution, patient servicing,
              and AI-driven provider performance analytics.

            </p>

          </div>

          {/* STATUS PANEL */}
          <div className="bg-[#111827] border border-gray-700 rounded-3xl p-8 min-w-[320px]">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

              <span className="text-green-400 font-semibold">

                Provider Monitoring Online

              </span>

            </div>

            <div className="space-y-4 text-sm">

              <div className="flex justify-between">

                <span className="text-gray-400">
                  Providers
                </span>

                <span className="font-bold">
                  {totalProviders}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-400">
                  Activity Records
                </span>

                <span className="font-bold text-cyan-400">
                  {data.length}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-400">
                  AI Status
                </span>

                <span className="font-bold text-green-400">
                  Operational
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-400">
                  System Health
                </span>

                <span className="font-bold text-purple-400">
                  Stable
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ================================= */}
      {/* KPI GRID */}
      {/* ================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {kpis.map((item, index) => {

          const Icon =
            item.icon;

          return (

            <div
              key={index}
              className="bg-[#111827] border border-gray-800 hover:border-cyan-500 transition-all duration-300 rounded-3xl p-8"
            >

              <div className="flex items-center justify-between mb-6">

                <div className="bg-[#1F2937] p-4 rounded-2xl">

                  <Icon
                    size={26}
                    className={item.color}
                  />

                </div>

                <TrendingUp
                  size={18}
                  className="text-green-400"
                />

              </div>

              <p className="text-gray-400 text-sm mb-3">

                {item.title}

              </p>

              <h2
                className={`font-black break-words ${
                  typeof item.value === "string"
                    ? "text-2xl"
                    : "text-5xl"
                }`}
              >

                {item.value}

              </h2>

            </div>

          );

        })}

      </div>

      {/* ================================= */}
      {/* PROVIDER TABLE */}
      {/* ================================= */}
      <div className="bg-[#111827] border border-gray-800 rounded-3xl p-8">

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 mb-8">

          <div>

            <h2 className="text-3xl font-black mb-2">

              Provider Activity Intelligence

            </h2>

            <p className="text-gray-400">

              AI-generated provider network operational analytics

            </p>

          </div>

          <div className="flex items-center gap-3">

            <Users
              size={20}
              className="text-cyan-400"
            />

            <span className="text-cyan-400 font-semibold">

              {totalProviders} Active Providers

            </span>

          </div>

        </div>

        {sortedProviders.length > 0 ? (

          <div className="overflow-auto rounded-2xl border border-gray-700">

            <table className="w-full text-left">

              <thead className="bg-[#1F2937]">

                <tr>

                  <th className="p-5 text-cyan-400">

                    Provider

                  </th>

                  <th className="p-5 text-cyan-400">

                    Activity Volume

                  </th>

                  <th className="p-5 text-cyan-400">

                    Status

                  </th>

                </tr>

              </thead>

              <tbody>

                {sortedProviders.map(
                  ([provider, volume], index) => (

                    <tr
                      key={index}
                      className="border-t border-gray-800 hover:bg-[#1F2937]/50 transition-all duration-300"
                    >

                      <td className="p-5 font-medium">

                        {provider}

                      </td>

                      <td className="p-5">

                        <span className="font-bold text-cyan-400">

                          {volume}

                        </span>

                      </td>

                      <td className="p-5">

                        <span className="bg-green-500/10 text-green-400 px-4 py-2 rounded-full text-sm font-semibold border border-green-500/20">

                          Active

                        </span>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        ) : (

          <div className="bg-[#1F2937] border border-gray-700 rounded-3xl py-20 text-center">

            <Hospital
              size={60}
              className="mx-auto text-cyan-400 mb-6"
            />

            <h3 className="text-2xl font-bold mb-3">

              No Provider Data Available

            </h3>

            <p className="text-gray-400">

              Upload enterprise datasets to analyze provider activity

            </p>

          </div>

        )}

      </div>

    </div>

  );

}

export default ProviderDashboard;