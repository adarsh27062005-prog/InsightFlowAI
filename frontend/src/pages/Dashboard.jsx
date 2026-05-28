import {
  useState,
  useEffect,
} from "react";
import EmptyState from "../components/EmptyState";
import PageWrapper from "../components/PageWrapper";
import EnterpriseTable from "../components/EnterpriseTable";
import AdvancedAnalyticsGrid from "../components/AdvancedAnalyticsGrid";
function Dashboard({

  data = [],
  insights = [],
  autoKPIs = [],
  detectedKPIs = [],
  uploadRef,

}) {

  // =========================
  // SAFE METRICS
  // =========================
  const totalRecords =
    data.length;

  const totalColumns =
    data.length > 0
      ? Object.keys(data[0]).length
      : 0;

  const operationalStatus =
    totalRecords > 0
      ? "Stable"
      : "Awaiting Dataset";

  const aiStatus =
    totalRecords > 0
      ? "Online"
      : "Idle";
  // =========================
// FETCH AI EXECUTIVE SUMMARY
// =========================
useEffect(() => {

  const fetchExecutiveSummary =
    async () => {

      if (!data || data.length === 0) {
        return;
      }

      try {

        setLoadingSummary(true);

        const response =
          await fetch(
            "http://127.0.0.1:8000/insights/executive-summary"
          );

        const result =
          await response.json();

        if (result.summary) {

          setExecutiveSummary(
            result.summary
          );

        }

      } catch (error) {

        console.log(error);

      } finally {

        setLoadingSummary(false);

      }

    };

  fetchExecutiveSummary();

}, [data]);
  const [executiveSummary, setExecutiveSummary] =
  useState("");

const [loadingSummary, setLoadingSummary] =
  useState(false);

  return (

  <PageWrapper>

    <div className="space-y-8">

      {/* ================================= */}
      {/* EMPTY STATE */}
      {/* ================================= */}
      {data.length === 0 && (

        <EmptyState />

      )}

      {/* ================================= */}
      {/* HERO SECTION */}
      {/* ================================= */}
      <div className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-500/20 p-10 rounded-3xl overflow-hidden relative">

        {/* GLOW */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full" />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-10">

          {/* LEFT */}
          <div>

            <div className="inline-flex items-center gap-3 bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-full mb-6">

              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

              <span className="text-cyan-400 text-sm font-semibold">

                Enterprise AI Intelligence Active

              </span>

            </div>

            <h1 className="text-5xl font-extrabold leading-tight mb-6">

              Enterprise Healthcare
              <br />

              Intelligence Platform

            </h1>

            <p className="text-gray-300 text-lg max-w-4xl leading-9">

              AI-powered operational analytics platform for healthcare,
              semantic business intelligence, provider monitoring,
              enterprise reporting, workflow optimization,
              conversational analytics, and predictive operational insights.

            </p>

            {/* ACTIONS */}
            <div className="flex flex-wrap gap-4 mt-8">

              <button
                onClick={() =>
                  uploadRef?.current?.click()
                }
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-7 py-4 rounded-2xl transition-all duration-300"
              >

                Upload Enterprise Dataset

              </button>

              <div className="bg-[#111827] border border-gray-700 px-6 py-4 rounded-2xl">

                <span className="text-gray-300 text-sm">

                  Semantic Analytics Engine Enabled

                </span>

              </div>

            </div>

          </div>

          {/* RIGHT STATUS PANEL */}
          <div className="bg-[#111827]/90 backdrop-blur-xl border border-gray-700 p-7 rounded-3xl min-w-[320px]">

            <div className="flex items-center gap-3 mb-7">

              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

              <span className="text-green-400 font-semibold text-lg">

                System Operational

              </span>

            </div>

            <div className="space-y-5">

              <div className="flex justify-between">

                <span className="text-gray-400">

                  Records Loaded

                </span>

                <span className="text-white font-bold">

                  {totalRecords}

                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-400">

                  Dataset Columns

                </span>

                <span className="text-cyan-400 font-bold">

                  {totalColumns}

                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-400">

                  Analytics Engine

                </span>

                <span className="text-green-400 font-bold">

                  {aiStatus}

                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-400">

                  Operational Status

                </span>

                <span className="text-purple-400 font-bold">

                  {operationalStatus}

                </span>

              </div>

            </div>

          </div>

        </div>

      </div>
      <AdvancedAnalyticsGrid
  data={data}
/>

      {/* ================================= */}
      {/* ENTERPRISE KPI STRIP */}
      {/* ================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

        {/* TOTAL RECORDS */}
        <div className="bg-[#111827] p-8 rounded-3xl border border-gray-800 hover:border-cyan-500 transition-all duration-300">

          <div className="flex justify-between items-start mb-6">

            <div>

              <p className="text-gray-400 text-sm">

                Total Records

              </p>

              <h2 className="text-5xl font-extrabold mt-3 text-cyan-400">

                {totalRecords}

              </h2>

            </div>

            <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />

          </div>

          <div className="flex justify-between items-center">

            <span className="text-gray-500 text-sm">

              Enterprise ingestion

            </span>

            <span className="text-green-400 font-semibold text-sm">

              ↑ 18%

            </span>

          </div>

        </div>

        {/* AI STATUS */}
        <div className="bg-[#111827] p-8 rounded-3xl border border-gray-800 hover:border-green-500 transition-all duration-300">

          <div className="flex justify-between items-start mb-6">

            <div>

              <p className="text-gray-400 text-sm">

                AI Engine

              </p>

              <h2 className="text-4xl font-extrabold mt-3 text-green-400">

                {aiStatus}

              </h2>

            </div>

            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

          </div>

          <div className="flex justify-between items-center">

            <span className="text-gray-500 text-sm">

              Semantic intelligence

            </span>

            <span className="text-green-400 font-semibold text-sm">

              Stable

            </span>

          </div>

        </div>

        {/* DATASET QUALITY */}
        <div className="bg-[#111827] p-8 rounded-3xl border border-gray-800 hover:border-purple-500 transition-all duration-300">

          <div className="flex justify-between items-start mb-6">

            <div>

              <p className="text-gray-400 text-sm">

                Dataset Quality

              </p>

              <h2 className="text-5xl font-extrabold mt-3 text-purple-400">

                98%

              </h2>

            </div>

            <div className="w-3 h-3 rounded-full bg-purple-400 animate-pulse" />

          </div>

          <div className="flex justify-between items-center">

            <span className="text-gray-500 text-sm">

              AI preprocessing

            </span>

            <span className="text-green-400 font-semibold text-sm">

              Excellent

            </span>

          </div>

        </div>

        {/* OPERATIONS */}
        <div className="bg-[#111827] p-8 rounded-3xl border border-gray-800 hover:border-orange-500 transition-all duration-300">

          <div className="flex justify-between items-start mb-6">

            <div>

              <p className="text-gray-400 text-sm">

                Operations

              </p>

              <h2 className="text-4xl font-extrabold mt-3 text-orange-400">

                Active

              </h2>

            </div>

            <div className="w-3 h-3 rounded-full bg-orange-400 animate-pulse" />

          </div>

          <div className="flex justify-between items-center">

            <span className="text-gray-500 text-sm">

              Monitoring systems

            </span>

            <span className="text-green-400 font-semibold text-sm">

              Online

            </span>

          </div>

        </div>

      </div>

      {/* ================================= */}
      {/* AUTO KPI GRID */}
      {/* ================================= */}
      {Array.isArray(autoKPIs) &&
        autoKPIs.length > 0 && (

          <div className="bg-[#111827] p-8 rounded-3xl border border-gray-800">

            <div className="flex justify-between items-center mb-8">

              <div>

                <h2 className="text-3xl font-bold">

                  Enterprise KPI Intelligence

                </h2>

                <p className="text-gray-400 text-sm mt-2">

                  AI-generated operational metrics and semantic analytics

                </p>

              </div>

              <div className="flex items-center gap-3">

                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

                <span className="text-green-400 font-medium">

                  Real-Time Detection

                </span>

              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

              {autoKPIs.map(
                (
                  kpi,
                  index
                ) => (

                  <div
                    key={index}
                    className="bg-[#1F2937] p-7 rounded-2xl border border-gray-700 hover:border-cyan-500 transition-all duration-300"
                  >

                    <div className="flex justify-between items-start mb-5">

                      <h3 className="text-gray-400 text-sm">

                        {kpi?.title || "KPI"}

                      </h3>

                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />

                    </div>

                    <h2 className="text-4xl font-bold text-cyan-400">

                      {kpi?.value || 0}

                    </h2>

                    <div className="flex justify-between items-center mt-5">

                      <span className="text-gray-500 text-xs">

                        AI Operational Trend

                      </span>

                      <span className="text-green-400 font-semibold text-sm">

                        ↑ 12%

                      </span>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

        )}

      {/* ================================= */}
      {/* DETECTED KPI SECTION */}
      {/* ================================= */}
      {Array.isArray(detectedKPIs) &&
        detectedKPIs.length > 0 && (

          <div className="bg-[#111827] p-8 rounded-3xl border border-gray-800">

            <div className="mb-8">

              <h2 className="text-3xl font-bold">

                Semantic Intelligence Metrics

              </h2>

              <p className="text-gray-400 text-sm mt-2">

                Automatically detected healthcare operational intelligence indicators

              </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

              {detectedKPIs.map(
                (
                  kpi,
                  index
                ) => (

                  <div
                    key={index}
                    className="bg-[#1F2937] p-6 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all duration-300"
                  >

                    <p className="text-purple-400 text-sm mb-4">

                      {kpi?.title || "Metric"}

                    </p>

                    <h3 className="text-4xl font-bold">

                      {kpi?.value || 0}

                    </h3>

                  </div>

                )
              )}

            </div>

          </div>

        )}

      {/* ================================= */}
      {/* AI OPERATIONAL INSIGHTS */}
      {/* ================================= */}
      <div className="bg-[#111827] p-8 rounded-3xl border border-gray-800">

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 mb-8">

          <div>

            <h2 className="text-3xl font-bold">

              AI Operational Insights

            </h2>

            <p className="text-gray-400 text-sm mt-2">

              Enterprise healthcare intelligence and operational monitoring engine

            </p>

          </div>

          <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 px-5 py-3 rounded-2xl">

            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

            <span className="text-green-400 font-semibold">

              AI Monitoring Active

            </span>

          </div>

        </div>

        <div className="space-y-5">

          {Array.isArray(insights) &&
            insights
              .slice(0, 6)
              .map(
                (
                  insight,
                  index
                ) => (

                  <div
                    key={index}
                    className="bg-[#1F2937] border border-gray-700 hover:border-cyan-500 transition-all duration-300 p-6 rounded-2xl flex items-start gap-5"
                  >

                    <div className="w-3 h-3 rounded-full bg-cyan-400 mt-2 animate-pulse" />

                    <p className="text-gray-200 leading-8">

                      {insight}

                    </p>

                  </div>

                )
              )}

        </div>

      </div>
      {/* ================================= */}
{/* EXECUTIVE AI SUMMARY */}
{/* ================================= */}
<div className="bg-[#111827] p-8 rounded-3xl border border-cyan-500/20">

  <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 mb-8">

    <div>

      <div className="flex items-center gap-3 mb-4">

        <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />

        <span className="text-cyan-400 font-semibold">

          AI Executive Intelligence

        </span>

      </div>

      <h2 className="text-4xl font-black">

        Automated Executive Summary

      </h2>

      <p className="text-gray-400 mt-3 leading-7 max-w-3xl">

        AI-generated operational intelligence,
        executive reporting,
        anomaly detection,
        business risks,
        and strategic recommendations
        based on uploaded enterprise datasets.

      </p>

    </div>

  </div>

  <div className="bg-[#1F2937] border border-gray-700 rounded-3xl p-8">

    {loadingSummary ? (

      <div className="flex items-center gap-4">

        <div className="flex gap-2">

          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-bounce" />

          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-bounce delay-100" />

          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-bounce delay-200" />

        </div>

        <span className="text-gray-300 text-lg">

          AI generating executive operational insights...

        </span>

      </div>

    ) : (

      <div className="whitespace-pre-line text-gray-200 leading-9 text-[15px]">

        {executiveSummary ||
          "Upload dataset to generate AI executive intelligence."}

      </div>

    )}

  </div>

</div>
      {/* LIVE DATA PREVIEW */}
<EnterpriseTable
  data={data}
/>

    </div>
     </PageWrapper>

  );

}

export default Dashboard;