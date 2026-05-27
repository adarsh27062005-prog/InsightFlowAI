import ExecutiveSummary from "../components/ExecutiveSummary";
import ExportCenter from "../components/ExportCenter";
import EnterpriseTable from "../components/EnterpriseTable";
function Reports({
  data = [],
  insights = [],
}) {

  return (

    <div className="space-y-8">

      {/* HERO SECTION */}
      <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 p-8 rounded-3xl">

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">

          <div>

            <h1 className="text-4xl font-extrabold mb-4">

              Enterprise Reports Center

            </h1>

            <p className="text-gray-300 text-lg leading-8 max-w-3xl">

              AI-powered healthcare reporting workspace for operational
              analytics, executive summaries, export intelligence,
              provider reporting, and enterprise healthcare monitoring.

            </p>

          </div>

          {/* STATUS PANEL */}
          <div className="bg-[#111827] border border-gray-700 p-6 rounded-2xl min-w-[280px]">

            <div className="flex items-center gap-3 mb-5">

              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

              <span className="text-green-400 font-semibold">

                Reporting Engine Active

              </span>

            </div>

            <div className="space-y-3 text-sm text-gray-400">

              <div className="flex justify-between">

                <span>Reports Generated</span>

                <span className="text-white font-semibold">

                  {data.length > 0 ? "Live" : "0"}

                </span>

              </div>

              <div className="flex justify-between">

                <span>AI Monitoring</span>

                <span className="text-cyan-400 font-semibold">

                  Enabled

                </span>

              </div>

              <div className="flex justify-between">

                <span>Operational Status</span>

                <span className="text-green-400 font-semibold">

                  Stable

                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* REPORT METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* TOTAL RECORDS */}
        <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">

          <h3 className="text-cyan-400 text-sm mb-3">

            Records Processed

          </h3>

          <p className="text-4xl font-extrabold">

            {data.length}

          </p>

        </div>

        {/* AI STATUS */}
        <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">

          <h3 className="text-cyan-400 text-sm mb-3">

            AI Report Engine

          </h3>

          <p className="text-2xl font-bold text-green-400">

            Operational

          </p>

        </div>

        {/* DATA STATUS */}
        <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">

          <h3 className="text-cyan-400 text-sm mb-3">

            Dataset Status

          </h3>

          <p className="text-2xl font-bold">

            {data.length > 0
              ? "Connected"
              : "Awaiting Upload"}

          </p>

        </div>

        {/* REPORT MODE */}
        <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">

          <h3 className="text-cyan-400 text-sm mb-3">

            Reporting Mode

          </h3>

          <p className="text-2xl font-bold text-cyan-400">

            Enterprise

          </p>

        </div>

      </div>

      {/* EXECUTIVE SUMMARY */}
      <ExecutiveSummary
        data={data || []}
      />

      {/* EXPORT CENTER */}
      <ExportCenter
        data={data || []}
        insights={insights || []}
      />

      {/* AI REPORT INSIGHTS */}
      <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800">

        <div className="mb-6">

          <h2 className="text-2xl font-bold">

            AI Reporting Insights

          </h2>

          <p className="text-gray-400 text-sm mt-1">

            Executive operational intelligence generated from uploaded datasets

          </p>

        </div>

        {(insights || []).length > 0 ? (

          <div className="space-y-5">

            {insights.map((insight, index) => (

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
          

        ) : (

          <div className="bg-[#1F2937] border border-gray-700 rounded-2xl p-10 text-center text-gray-400">

            Upload a dataset to generate AI reporting insights

          </div>

        )}

      </div>
      {/* DATA PREVIEW */}
<EnterpriseTable
  data={data}
/>

    </div>
    
  );
}

export default Reports;