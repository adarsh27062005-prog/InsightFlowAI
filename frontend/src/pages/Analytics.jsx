import { useState } from "react";
import AdvancedAnalyticsGrid from "../components/AdvancedAnalyticsGrid";
import DDLUpload from "../components/DDLUpload";
import SchemaViewer from "../components/SchemaViewer";
import SyntheticDataGenerator from "../components/SyntheticDataGenerator";
import EnterpriseTable from "../components/EnterpriseTable";
import DiseasePieChart from "../components/DiseasePieChart";
import AnalyticsChart from "../components/AnalyticsChart";
import BarAnalyticsChart from "../components/BarAnalyticsChart";

function Analytics({

data,
setData,

schema,
setSchema,

semanticModel,
setSemanticModel,

processingSummary,
setProcessingSummary,

sourceType,
setSourceType,

}) {

// =========================
// SELECTED COLUMNS
// =========================
const [selectedColumns, setSelectedColumns] =
useState([]);

return (


<div className="space-y-8">

  {/* ================================= */}
  {/* DDL ENGINE */}
  {/* ================================= */}
  <DDLUpload
    setSchema={setSchema}
  />

  {/* ================================= */}
  {/* SCHEMA VIEWER */}
  {/* ================================= */}
  <SchemaViewer
    schema={schema}
    selectedColumns={selectedColumns}
    setSelectedColumns={setSelectedColumns}
  />

  {/* ================================= */}
  {/* SYNTHETIC GENERATOR */}
  {/* ================================= */}
  <SyntheticDataGenerator
    selectedColumns={selectedColumns}
    setData={setData}
  />

  {/* ================================= */}
  {/* PROCESSING SUMMARY */}
  {/* ================================= */}
  {processingSummary?.length > 0 && (

    <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800">

      <h2 className="text-2xl font-bold mb-5">

        AI Preprocessing Summary

      </h2>

      <div className="space-y-4">

        {processingSummary.map(
          (item, index) => (

            <div
              key={index}
              className="bg-[#1F2937] p-4 rounded-xl border border-gray-700"
            >

              {item}

            </div>

          )
        )}

      </div>

    </div>

  )}

  {/* ================================= */}
  {/* HEADER */}
  {/* ================================= */}
  <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800">

    <h1 className="text-3xl font-bold mb-2">

      Semantic Analytics Center

    </h1>

    <p className="text-gray-400">

      AI-powered EDI semantic intelligence platform

    </p>

  </div>
  <AdvancedAnalyticsGrid
  data={data}
/>

  {/* ================================= */}
  {/* KPI STRIP */}
  {/* ================================= */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

    <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">

      <p className="text-cyan-400 text-sm mb-2">

        Total Records

      </p>

      <h2 className="text-4xl font-bold">

        {data.length}

      </h2>

    </div>

    <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">

      <p className="text-cyan-400 text-sm mb-2">

        Semantic Fields

      </p>

      <h2 className="text-4xl font-bold">

        {semanticModel?.length || 0}

      </h2>

    </div>

    <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">

      <p className="text-cyan-400 text-sm mb-2">

        Source Type

      </p>

      <h2 className="text-2xl font-bold text-green-400">

        {sourceType || "EDI / DDL"}

      </h2>

    </div>

  </div>

  {/* ================================= */}
  {/* CHARTS */}
  {/* ================================= */}
  <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

    <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800">

      <h2 className="text-2xl font-bold mb-5">

        Semantic Category Distribution

      </h2>

      <div className="h-[400px] flex items-center justify-center">

        <DiseasePieChart
          data={data}
        />

      </div>

    </div>

    <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800">

      <h2 className="text-2xl font-bold mb-5">

        Business Intelligence Metrics

      </h2>

      <div className="h-[400px] flex items-center justify-center">

        <BarAnalyticsChart
          data={data}
        />

      </div>

    </div>

  </div>

  {/* ================================= */}
  {/* TREND ANALYSIS */}
  {/* ================================= */}
  <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800">

    <h2 className="text-2xl font-bold mb-5">

      AI Trend Analysis

    </h2>

    <div className="h-[450px]">

      <AnalyticsChart
        data={data}
      />

    </div>

  </div>
  {/* ANALYTICS DATA TABLE */}
<EnterpriseTable
  data={data}
/>

</div>


);

}

export default Analytics;
