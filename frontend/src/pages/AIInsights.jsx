import PredictiveAnalytics from "../components/PredictiveAnalytics";
import ReferenceQuestions from "../components/ReferenceQuestions";
import AIChatPanel from "../components/AIChatPanel";
import AdvancedAnalyticsGrid from "../components/AdvancedAnalyticsGrid";
function AIInsights({
  data,
  insights,
}) {

  // =========================
  // AI HEALTH STATUS
  // =========================
  const aiStatus =
    data.length > 0
      ? "Operational"
      : "Awaiting Dataset";

  // =========================
  // EXECUTIVE METRICS
  // =========================
  const totalRecords =
    data.length;

  const totalColumns =
    data.length > 0
      ? Object.keys(data[0]).length
      : 0;

  return (

    <div className="space-y-8">

      {/* ================================= */}
      {/* HERO SECTION */}
      {/* ================================= */}
      <div className="relative overflow-hidden bg-gradient-to-br from-cyan-500/10 via-[#111827] to-purple-500/10 border border-cyan-500/20 rounded-3xl p-10">

        {/* GLOW */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full" />

        <div className="relative z-10">

          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">

            {/* LEFT */}
            <div>

              <div className="inline-flex items-center gap-3 bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-full mb-5">

                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />

                <span className="text-cyan-400 text-sm font-medium">

                  Enterprise AI Intelligence Active

                </span>

              </div>

              <h1 className="text-5xl font-black leading-tight mb-4">

                AI Insights Center

              </h1>

              <p className="text-gray-300 text-lg max-w-3xl leading-8">

                Conversational semantic analytics platform for operational intelligence,
                executive summaries, predictive healthcare insights,
                EDI semantic intelligence, and AI-driven business analytics.

              </p>

            </div>

            {/* RIGHT KPI */}
            <div className="grid grid-cols-1 gap-5 min-w-[320px]">

              <div className="bg-[#111827]/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-6">

                <p className="text-gray-400 text-sm mb-2">

                  AI Engine Status

                </p>

                <div className="flex items-center gap-3">

                  <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

                  <h2 className="text-3xl font-bold text-green-400">

                    {aiStatus}

                  </h2>

                </div>

              </div>

              <div className="bg-[#111827]/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-6">

                <p className="text-gray-400 text-sm mb-2">

                  Dataset Intelligence

                </p>

                <h2 className="text-4xl font-black text-cyan-400">

                  {totalRecords}

                </h2>

                <p className="text-gray-500 text-sm mt-2">

                  Records analyzed

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
      <AdvancedAnalyticsGrid
  data={data}
/>s

      {/* ================================= */}
      {/* EXECUTIVE KPI STRIP */}
      {/* ================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* RECORDS */}
        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 hover:border-cyan-500 transition-all duration-300">

          <p className="text-gray-400 text-sm mb-3">

            Total Records

          </p>

          <h2 className="text-5xl font-black text-cyan-400">

            {totalRecords}

          </h2>

        </div>

        {/* COLUMNS */}
        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 hover:border-purple-500 transition-all duration-300">

          <p className="text-gray-400 text-sm mb-3">

            Semantic Fields

          </p>

          <h2 className="text-5xl font-black text-purple-400">

            {totalColumns}

          </h2>

        </div>

        {/* INSIGHTS */}
        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 hover:border-green-500 transition-all duration-300">

          <p className="text-gray-400 text-sm mb-3">

            AI Insights

          </p>

          <h2 className="text-5xl font-black text-green-400">

            {insights.length}

          </h2>

        </div>

        {/* STATUS */}
        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 hover:border-yellow-500 transition-all duration-300">

          <p className="text-gray-400 text-sm mb-3">

            Semantic AI

          </p>

          <h2 className="text-3xl font-black text-yellow-400">

            Active

          </h2>

        </div>

      </div>

      {/* ================================= */}
      {/* PREDICTIVE ANALYTICS */}
      {/* ================================= */}
      <PredictiveAnalytics
        data={data}
      />

      {/* ================================= */}
      {/* REFERENCE QUESTIONS */}
      {/* ================================= */}
      <ReferenceQuestions
        data={data}
      />

      {/* ================================= */}
      {/* AI GENERATED INSIGHTS */}
      {/* ================================= */}
      <div className="bg-[#111827] border border-gray-800 rounded-3xl p-8">

        {/* HEADER */}
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 mb-8">

          <div>

            <h2 className="text-3xl font-black">

              AI Generated Operational Insights

            </h2>

            <p className="text-gray-400 text-sm mt-2">

              Autonomous semantic intelligence engine generating enterprise business observations

            </p>

          </div>

          <div className="bg-green-500/10 border border-green-500/20 px-5 py-3 rounded-2xl">

            <span className="text-green-400 font-semibold">

              AI Insight Engine Running

            </span>

          </div>

        </div>

        {/* INSIGHT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {insights.map((insight, index) => (

            <div
              key={index}
              className="group bg-[#1F2937] border border-gray-700 hover:border-cyan-500 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
            >

              <div className="flex gap-4">

                {/* ICON */}
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">

                  <div className="w-2 h-2 rounded-full bg-cyan-400" />

                </div>

                {/* TEXT */}
                <div className="flex-1">

                  <p className="text-gray-200 leading-8 text-[15px]">

                    {insight}

                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* ================================= */}
      {/* AI CHAT PANEL */}
      {/* ================================= */}
      <AIChatPanel
        data={data}
      />

      {/* ================================= */}
      {/* FOOTER STATUS */}
      {/* ================================= */}
      <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>

            <h3 className="text-cyan-400 font-bold text-lg">

              Conversational Semantic Intelligence Enabled

            </h3>

            <p className="text-gray-400 text-sm mt-1">

              Enterprise AI assistant can analyze distributors, products,
              operational metrics, trends, revenue intelligence,
              executive summaries, and semantic EDI workflows.

            </p>

          </div>

          <div className="flex items-center gap-3">

            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

            <span className="text-green-400 font-semibold">

              Live AI Processing

            </span>

          </div>

        </div>

      </div>

    </div>

  );

}

export default AIInsights;