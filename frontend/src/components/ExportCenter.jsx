import {
  exportCSV,
  exportExcel,
  exportPDF,
} from "../utils/exportUtils";

function ExportCenter({
  data,
  insights,
}) {

  const totalRecords =
    data.length;

  return (

    <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800 mb-8">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">

        <div>

          <h2 className="text-2xl font-bold">

            Export Center

          </h2>

          <p className="text-gray-400 text-sm mt-1">

            Enterprise healthcare reporting and dataset exports

          </p>

        </div>

        <div className="mt-4 md:mt-0 bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-xl">

          <span className="text-cyan-400 text-sm font-medium">

            {totalRecords} Records Ready

          </span>

        </div>

      </div>

      {/* EXPORT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* CSV EXPORT */}
        <button
          onClick={() =>
            exportCSV(data)
          }
          className="group bg-[#1F2937] hover:bg-cyan-500 border border-gray-700 hover:border-cyan-400 rounded-2xl p-6 transition-all duration-300"
        >

          <div className="flex flex-col items-start">

            <div className="text-4xl mb-4">

              📄

            </div>

            <h3 className="text-xl font-bold group-hover:text-black">

              Export CSV

            </h3>

            <p className="text-gray-400 text-sm mt-2 text-left group-hover:text-black">

              Download operational healthcare datasets in CSV format

            </p>

          </div>

        </button>

        {/* EXCEL EXPORT */}
        <button
          onClick={() =>
            exportExcel(data)
          }
          className="group bg-[#1F2937] hover:bg-green-500 border border-gray-700 hover:border-green-400 rounded-2xl p-6 transition-all duration-300"
        >

          <div className="flex flex-col items-start">

            <div className="text-4xl mb-4">

              📊

            </div>

            <h3 className="text-xl font-bold group-hover:text-black">

              Export Excel

            </h3>

            <p className="text-gray-400 text-sm mt-2 text-left group-hover:text-black">

              Generate enterprise Excel spreadsheets with analytics data

            </p>

          </div>

        </button>

        {/* PDF EXPORT */}
        <button
          onClick={() =>
            exportPDF(
              data,
              insights
            )
          }
          className="group bg-[#1F2937] hover:bg-red-500 border border-gray-700 hover:border-red-400 rounded-2xl p-6 transition-all duration-300"
        >

          <div className="flex flex-col items-start">

            <div className="text-4xl mb-4">

              🧾

            </div>

            <h3 className="text-xl font-bold group-hover:text-black">

              Export PDF Report

            </h3>

            <p className="text-gray-400 text-sm mt-2 text-left group-hover:text-black">

              Create executive healthcare intelligence PDF reports

            </p>

          </div>

        </button>

      </div>

      {/* FOOTER */}
      <div className="mt-8 bg-[#0B1120] border border-gray-700 rounded-xl p-5">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>

            <h4 className="text-cyan-400 font-semibold mb-1">

              Export Intelligence

            </h4>

            <p className="text-gray-400 text-sm">

              AI-generated reports include operational insights, analytics summaries and enterprise healthcare KPIs.

            </p>

          </div>

          <div className="flex items-center gap-2">

            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

            <span className="text-green-400 text-sm font-medium">

              Export Engine Active

            </span>

          </div>

        </div>

      </div>

    </div>

  );
}

export default ExportCenter;