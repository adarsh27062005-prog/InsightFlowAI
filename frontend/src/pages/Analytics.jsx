import { useState } from "react";

import DiseasePieChart from "../components/DiseasePieChart";
import AnalyticsChart from "../components/AnalyticsChart";
import BarAnalyticsChart from "../components/BarAnalyticsChart";

function Analytics({
  data,
  setData
}) {

  const [ddlColumns, setDdlColumns] =
    useState([]);

  const [selectedColumns, setSelectedColumns] =
    useState([]);

  // =========================
  // DDL UPLOAD
  // =========================
  const handleDDLUpload = async (
    event
  ) => {

    const file =
      event.target.files[0];

    if (!file) return;

    const text =
      await file.text();

    const lines =
      text.split("\n");

    const extractedColumns =
      [];

    lines.forEach((line) => {

      const cleanLine =
        line.trim();

      const isColumnLine =

        cleanLine.includes(
          "VARCHAR"
        ) ||

        cleanLine.includes(
          "DATE"
        ) ||

        cleanLine.includes(
          "DOUBLE"
        ) ||

        cleanLine.includes(
          "TIMESTAMP"
        ) ||

        cleanLine.includes(
          "INTEGER"
        ) ||

        cleanLine.includes(
          "DECIMAL"
        );

      if (isColumnLine) {

        const column =
          cleanLine
            .split(" ")[0]
            .replace(",", "")
            .trim();

        if (
          column &&
          !extractedColumns.includes(
            column
          )
        ) {

          extractedColumns.push(
            column
          );

        }

      }

    });

    const previewData =
      extractedColumns.map(
        (col, index) => ({

          id: index + 1,

          column_name: col,

        })
      );

    setDdlColumns(
      previewData
    );

    setSelectedColumns(

      previewData.map(
        (item) =>
          item.column_name
      )

    );

  };

  // =========================
  // SYNTHETIC DATASET
  // =========================
  const generateSyntheticDataset =
    async () => {

      try {

        const response =
          await fetch(

            "https://insightflow-backend-cqbu.onrender.com/api/generate-dataset",

            {

              method: "POST",

              headers: {

                "Content-Type":
                  "application/json",

              },

              body: JSON.stringify({

                columns:
                  selectedColumns,

                rows: 500,

              }),

            }

          );

        const result =
          await response.json();

        setData(result.data);

      } catch (error) {

        console.log(error);

        alert(
          "Dataset generation failed"
        );

      }

    };

  return (

    <div className="space-y-8">

      {/* DDL ENGINE */}
      <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800">

        <h2 className="text-3xl font-bold mb-2">

          DDL Upload Engine

        </h2>

        <p className="text-gray-400 mb-6">

          Upload SQL DDL schema to generate synthetic healthcare datasets

        </p>

        <label className="bg-cyan-500 text-black px-5 py-3 rounded-xl cursor-pointer font-semibold">

          Upload DDL File

          <input
            type="file"
            accept=".sql,.txt"
            className="hidden"
            onChange={handleDDLUpload}
          />

        </label>

      </div>

      {/* SYNTHETIC GENERATOR */}
      <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800">

        <h2 className="text-3xl font-bold mb-2">

          Synthetic Dataset Generator

        </h2>

        <p className="text-gray-400 mb-6">

          AI-powered healthcare dataset generation engine

        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <div className="bg-[#1F2937] p-5 rounded-xl">

            <p className="text-gray-400 text-sm">

              Selected Columns

            </p>

            <h3 className="text-4xl font-bold text-cyan-400">

              {selectedColumns.length}

            </h3>

          </div>

          <div className="bg-[#1F2937] p-5 rounded-xl">

            <p className="text-gray-400 text-sm">

              Dataset Size

            </p>

            <h3 className="text-4xl font-bold text-green-400">

              500 Rows

            </h3>

          </div>

          <div className="bg-[#1F2937] p-5 rounded-xl">

            <p className="text-gray-400 text-sm">

              AI Engine

            </p>

            <h3 className="text-4xl font-bold text-cyan-400">

              Active

            </h3>

          </div>

        </div>

        {/* COLUMN SELECTION */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">

          {ddlColumns.map((col, index) => (

            <label
              key={index}
              className="flex items-center gap-2 bg-[#1F2937] p-3 rounded-lg border border-gray-700"
            >

              <input
                type="checkbox"

                checked={selectedColumns.includes(
                  col.column_name
                )}

                onChange={(e) => {

                  if (e.target.checked) {

                    setSelectedColumns([
                      ...selectedColumns,
                      col.column_name
                    ]);

                  } else {

                    setSelectedColumns(

                      selectedColumns.filter(
                        (c) =>
                          c !==
                          col.column_name
                      )

                    );

                  }

                }}
              />

              <span className="text-sm">

                {col.column_name}

              </span>

            </label>

          ))}

        </div>

        <button
          onClick={
            generateSyntheticDataset
          }
          className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-4 rounded-xl font-bold transition"
        >

          Generate Synthetic Dataset

        </button>

      </div>

      {/* HEADER */}
      <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800">

        <h1 className="text-3xl font-bold mb-2">

          Enterprise Analytics Center

        </h1>

        <p className="text-gray-400">

          AI-powered healthcare operational intelligence

        </p>

      </div>

      {/* KPI STRIP */}
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

            Active Analytics

          </p>

          <h2 className="text-4xl font-bold">

            3

          </h2>

        </div>

        <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">

          <p className="text-cyan-400 text-sm mb-2">

            AI Monitoring

          </p>

          <h2 className="text-2xl font-bold text-green-400">

            Active

          </h2>

        </div>

      </div>

      {/* TOP GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        {/* PIE CHART */}
        <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800 hover:border-cyan-500 transition-all duration-300">

          <div className="flex justify-between items-center mb-6">

            <div>

              <h2 className="text-2xl font-bold">

                Diagnosis Distribution

              </h2>

              <p className="text-gray-400 text-sm mt-1">

                AI category segmentation

              </p>

            </div>

            <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />

          </div>

          <div className="h-[400px] flex items-center justify-center">

            <DiseasePieChart data={data} />

          </div>

        </div>

        {/* BAR CHART */}
        <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800 hover:border-cyan-500 transition-all duration-300">

          <div className="flex justify-between items-center mb-6">

            <div>

              <h2 className="text-2xl font-bold">

                Top Dataset Categories

              </h2>

              <p className="text-gray-400 text-sm mt-1">

                Operational category intelligence

              </p>

            </div>

            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

          </div>

          <div className="h-[400px] flex items-center justify-center">

            <BarAnalyticsChart data={data} />

          </div>

        </div>

      </div>

      {/* LINE CHART */}
      <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800 hover:border-cyan-500 transition-all duration-300">

        <div className="flex justify-between items-center mb-6">

          <div>

            <h2 className="text-2xl font-bold">

              Dataset Trend Analysis

            </h2>

            <p className="text-gray-400 text-sm mt-1">

              AI-generated operational trend analytics

            </p>

          </div>

          <div className="w-3 h-3 rounded-full bg-purple-400 animate-pulse" />

        </div>

        <div className="h-[450px]">

          <AnalyticsChart data={data} />

        </div>

      </div>

    </div>
  );
}

export default Analytics;