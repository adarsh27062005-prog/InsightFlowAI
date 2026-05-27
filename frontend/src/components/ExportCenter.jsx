import {
  exportCSV,
  exportExcel,
  exportPDF,
} from "../utils/exportUtils";

function ExportCenter({
  data,
  insights,
}) {

  // =========================
  // SAFE METRICS
  // =========================
  const totalRecords =
    data?.length || 0;

  const datasetStatus =
    totalRecords > 0
      ? "Connected"
      : "Awaiting Upload";

  const aiStatus =
    totalRecords > 0
      ? "Operational"
      : "Idle";

  // =========================
  // EXPORT HANDLERS
  // =========================
  const handleCSV = () => {

    if (!totalRecords) {

      alert(
        "No dataset available for export."
      );

      return;

    }

    exportCSV(data);

  };

  const handleExcel = () => {

    if (!totalRecords) {

      alert(
        "No dataset available for export."
      );

      return;

    }

    exportExcel(data);

  };

  const handlePDF = () => {

    if (!totalRecords) {

      alert(
        "No dataset available for export."
      );

      return;

    }

    exportPDF(
      data,
      insights
    );

  };

  return (

    <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800 mb-8">

      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 mb-8">

        <div>

          <h2 className="text-3xl font-bold">

            Enterprise Export Center

          </h2>

          <p className="text-gray-400 text-sm mt-2 leading-7">

            Generate AI-powered executive healthcare reports,
            operational analytics exports, compliance-ready datasets,
            and enterprise reporting packages.

          </p>

        </div>

        {/* STATUS PANEL */}
        <div className="bg-[#0B1120] border border-gray-700 rounded-2xl p-5 min-w-[280px]">

          <div className="flex items-center gap-3 mb-5">

            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

            <span className="text-green-400 font-semibold">

              Export Engine Active

            </span>

          </div>

          <div className="space-y-3 text-sm">

            <div className="flex justify-between">

              <span className="text-gray-400">

                Dataset Status

              </span>

              <span className="text-white font-semibold">

                {datasetStatus}

              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-400">

                Records Ready

              </span>

              <span className="text-cyan-400 font-semibold">

                {totalRecords}

              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-400">

                AI Report Engine

              </span>

              <span className="text-green-400 font-semibold">

                {aiStatus}

              </span>

            </div>

          </div>

        </div>

      </div>

      {/* ================================= */}
      {/* KPI STRIP */}
      {/* ================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

        {/* RECORDS */}
        <div className="bg-[#1F2937] border border-gray-700 rounded-2xl p-6">

          <h3 className="text-cyan-400 text-sm">

            Records Processed

          </h3>

          <p className="text-4xl font-bold mt-3">

            {totalRecords}

          </p>

        </div>

        {/* AI STATUS */}
        <div className="bg-[#1F2937] border border-gray-700 rounded-2xl p-6">

          <h3 className="text-cyan-400 text-sm">

            AI Reporting Status

          </h3>

          <p className="text-2xl font-bold mt-3 text-green-400">

            {aiStatus}

          </p>

        </div>

        {/* EXPORT MODE */}
        <div className="bg-[#1F2937] border border-gray-700 rounded-2xl p-6">

          <h3 className="text-cyan-400 text-sm">

            Export Mode

          </h3>

          <p className="text-2xl font-bold mt-3 text-purple-400">

            Enterprise

          </p>

        </div>

      </div>

      {/* ================================= */}
      {/* EXPORT CARDS */}
      {/* ================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* CSV */}
        <button
          onClick={handleCSV}
          className="group bg-[#1F2937] hover:bg-cyan-500 border border-gray-700 hover:border-cyan-400 rounded-2xl p-7 transition-all duration-300 text-left"
        >

          <div className="text-5xl mb-5">

            📄

          </div>

          <h3 className="text-2xl font-bold group-hover:text-black">

            CSV Export

          </h3>

          <p className="text-gray-400 text-sm mt-4 leading-7 group-hover:text-black">

            Download operational healthcare datasets
            in lightweight CSV format for analytics,
            compliance reporting, and enterprise ingestion.

          </p>

        </button>

        {/* EXCEL */}
        <button
          onClick={handleExcel}
          className="group bg-[#1F2937] hover:bg-green-500 border border-gray-700 hover:border-green-400 rounded-2xl p-7 transition-all duration-300 text-left"
        >

          <div className="text-5xl mb-5">

            📊

          </div>

          <h3 className="text-2xl font-bold group-hover:text-black">

            Excel Export

          </h3>

          <p className="text-gray-400 text-sm mt-4 leading-7 group-hover:text-black">

            Generate enterprise spreadsheet reports
            with structured operational intelligence,
            KPI summaries, and analytics-ready formatting.

          </p>

        </button>

        {/* PDF */}
        <button
          onClick={handlePDF}
          className="group bg-[#1F2937] hover:bg-red-500 border border-gray-700 hover:border-red-400 rounded-2xl p-7 transition-all duration-300 text-left"
        >

          <div className="text-5xl mb-5">

            🧾

          </div>

          <h3 className="text-2xl font-bold group-hover:text-black">

            Executive PDF

          </h3>

          <p className="text-gray-400 text-sm mt-4 leading-7 group-hover:text-black">

            Create AI-generated executive healthcare
            intelligence reports with operational insights,
            analytics summaries, and enterprise dashboards.

          </p>

        </button>

      </div>

      {/* ================================= */}
      {/* ENTERPRISE EXPORT SUMMARY */}
      {/* ================================= */}
      <div className="mt-8 bg-[#0B1120] border border-gray-700 rounded-2xl p-6">

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

          <div>

            <h4 className="text-cyan-400 font-bold text-lg mb-2">

              AI Export Intelligence

            </h4>

            <p className="text-gray-400 leading-7 max-w-4xl">

              Export workflows include AI-generated
              operational insights, semantic analytics,
              executive healthcare reporting,
              enterprise KPI intelligence,
              and compliance-ready reporting structures.

            </p>

          </div>

          {/* BADGES */}
          <div className="flex flex-wrap gap-3">

            <div className="bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-xl text-cyan-400 text-sm font-medium">

              Semantic Reporting

            </div>

            <div className="bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-xl text-green-400 text-sm font-medium">

              AI Analytics

            </div>

            <div className="bg-purple-500/10 border border-purple-500/20 px-4 py-2 rounded-xl text-purple-400 text-sm font-medium">

              Executive Ready

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default ExportCenter;