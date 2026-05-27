import EmptyState from "../components/EmptyState";

function Dashboard({
data = [],
insights = [],
autoKPIs = [],
detectedKPIs = [],
uploadRef,
}) {

return (


<div className="space-y-8">

  {/* EMPTY STATE */}
  {data.length === 0 && (
    <EmptyState />
  )}

  {/* HERO SECTION */}
  <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 p-8 rounded-3xl">

    <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">

      <div>

        <h1 className="text-4xl font-extrabold mb-4">

          Enterprise Healthcare Intelligence

        </h1>

        <p className="text-gray-300 text-lg max-w-3xl leading-8">

          AI-powered operational analytics platform for healthcare,
          enrollment, provider intelligence, financial monitoring,
          reporting automation, and enterprise dataset intelligence.

        </p>

      </div>

      {/* RIGHT STATUS */}
      <div className="bg-[#111827] border border-gray-700 p-6 rounded-2xl min-w-[280px]">

        <div className="flex items-center gap-3 mb-4">

          <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

          <span className="text-green-400 font-semibold">

            AI Monitoring Active

          </span>

        </div>

        <div className="space-y-3 text-sm text-gray-400">

          <div className="flex justify-between">

            <span>Records Loaded</span>

            <span className="text-white font-semibold">

              {data.length}

            </span>

          </div>

          <div className="flex justify-between">

            <span>Operational Status</span>

            <span className="text-cyan-400 font-semibold">

              Stable

            </span>

          </div>

          <div className="flex justify-between">

            <span>Analytics Engine</span>

            <span className="text-green-400 font-semibold">

              Online

            </span>

          </div>

        </div>

      </div>

    </div>

  </div>

  {/* KPI GRID */}
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

    {Array.isArray(autoKPIs) &&
      autoKPIs.map((kpi, index) => (

        <div
          key={index}
          className="bg-[#111827] p-8 rounded-2xl border border-gray-800 hover:border-cyan-500 transition-all duration-300"
        >

          <div className="flex justify-between items-start mb-4">

            <h2 className="text-gray-400 text-sm">

              {kpi?.title || "KPI"}

            </h2>

            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />

          </div>

          <div className="flex flex-col gap-3">

            <p className="text-4xl font-bold text-cyan-400">

              {kpi?.value || 0}

            </p>

            <div className="flex items-center justify-between">

              <p className="text-gray-500 text-xs">

                Compared to previous cycle

              </p>

              <div className="text-green-400 text-sm font-semibold">

                ↑ 12%

              </div>

            </div>

          </div>

        </div>

      ))}

  </div>

  {/* DETECTED KPI SECTION */}
  {Array.isArray(detectedKPIs) &&
    detectedKPIs.length > 0 && (

      <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800">

        <div className="flex justify-between items-center mb-8">

          <div>

            <h2 className="text-2xl font-bold">

              Auto Detected KPIs

            </h2>

            <p className="text-gray-400 text-sm mt-1">

              AI-generated enterprise intelligence metrics

            </p>

          </div>

          <div className="flex items-center gap-2">

            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

            <span className="text-green-400 text-sm">

              Live Detection

            </span>

          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          {detectedKPIs.map((kpi, index) => (

            <div
              key={index}
              className="bg-[#1F2937] p-6 rounded-2xl border border-gray-700 hover:border-cyan-500 transition-all duration-300"
            >

              <h3 className="text-cyan-400 text-sm mb-3">

                {kpi?.title || "Metric"}

              </h3>

              <p className="text-3xl font-bold">

                {kpi?.value || 0}

              </p>

            </div>

          ))}

        </div>

      </div>

    )}

  {/* AI INSIGHTS */}
  <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800">

    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

      <div>

        <h2 className="text-2xl font-bold">

          AI Operational Insights

        </h2>

        <p className="text-gray-400 text-sm mt-1">

          Enterprise healthcare intelligence engine

        </p>

      </div>

      {/* GLOBAL UPLOAD */}
      <button
        onClick={() =>
          uploadRef?.current?.click()
        }
        className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-6 py-3 rounded-xl transition-all duration-300"
      >

        Upload Dataset

      </button>

    </div>

    <div className="space-y-5">

      {Array.isArray(insights) &&
        insights.slice(0, 5).map((insight, index) => (

          <div
            key={index}
            className="bg-[#1F2937] border border-gray-700 hover:border-cyan-500 transition-all duration-300 p-5 rounded-2xl flex items-start gap-4"
          >

            <div className="w-3 h-3 rounded-full bg-cyan-400 mt-2 animate-pulse" />

            <p className="text-gray-200 leading-7">

              {insight}

            </p>

          </div>

        ))}

    </div>

  </div>

</div>


);
}

export default Dashboard;
