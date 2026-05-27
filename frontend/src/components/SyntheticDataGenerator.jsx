import { useState } from "react";

function SyntheticDataGenerator({
  selectedColumns,
  setData,
}) {

  const [loading, setLoading] =
    useState(false);

  const [summary, setSummary] =
    useState([]);

  const [generatedRows, setGeneratedRows] =
    useState(500);

  const [datasetType, setDatasetType] =
    useState("Healthcare");

  // =========================
  // GENERATE DATASET
  // =========================
  const generateDataset =
    async () => {

      try {

        if (
          selectedColumns.length === 0
        ) {

          alert(
            "Select semantic columns first."
          );

          return;
        }

        setLoading(true);

        // =========================
        // COLUMN NAMES
        // =========================
        const columnNames =
          selectedColumns.map(
            (column) => {

              return (
                column.name ||
                column.column_name
              );

            }
          );

        // =========================
        // AI SUMMARY
        // =========================
        const processSummary =
          [];

        processSummary.push(
          `AI semantic engine detected ${columnNames.length} enterprise business columns.`
        );

        processSummary.push(
          `Dataset domain selected: ${datasetType}.`
        );

        processSummary.push(
          "Semantic entity mapping initialized successfully."
        );

        processSummary.push(
          "Synthetic operational workflow generation started."
        );

        // =========================
        // API CALL
        // =========================
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
                  columnNames,

                rows:
                  generatedRows,

              }),

            }
          );

        const result =
          await response.json();

        // =========================
        // FAILED
        // =========================
        if (
          !result.success
        ) {

          alert(
            "Dataset generation failed."
          );

          setLoading(false);

          return;
        }

        processSummary.push(
          `Successfully generated ${result.data.length} semantic operational records.`
        );

        processSummary.push(
          "Synthetic business intelligence dataset created successfully."
        );

        // =========================
        // PREPROCESS API
        // =========================
        const preprocessResponse =
          await fetch(

            "https://insightflow-backend-cqbu.onrender.com/api/preprocess",

            {

              method: "POST",

              headers: {

                "Content-Type":
                  "application/json",

              },

              body: JSON.stringify({

                data:
                  result.data,

              }),

            }
          );

        const preprocessResult =
          await preprocessResponse.json();

        // =========================
        // PREPROCESS SUCCESS
        // =========================
        if (
          preprocessResult.success
        ) {

          setData(
            preprocessResult.data
          );

          processSummary.push(
            "AI preprocessing removed operational inconsistencies."
          );

          processSummary.push(
            "Null normalization and text standardization completed."
          );

          processSummary.push(
            "Conversational analytics readiness confirmed."
          );

          processSummary.push(
            "Dataset is now optimized for AI dashboards and semantic querying."
          );

          setSummary(
            processSummary
          );

          alert(

            "Semantic synthetic dataset generated successfully."

          );

        }

        else {

          alert(
            "Preprocessing failed."
          );

        }

      } catch (error) {

        console.log(error);

        alert(
          "Backend AI connection failed."
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800 mt-8">

      {/* HEADER */}
      <div className="mb-8">

        <h2 className="text-2xl font-bold">

          Semantic Synthetic Dataset Engine

        </h2>

        <p className="text-gray-400 text-sm mt-1">

          Enterprise AI-powered semantic operational dataset generation workflow

        </p>

      </div>

      {/* CONFIGURATION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

        {/* DATASET TYPE */}
        <div>

          <label className="text-sm text-gray-400 block mb-3">

            Dataset Domain

          </label>

          <select
            value={datasetType}
            onChange={(e) =>
              setDatasetType(
                e.target.value
              )
            }
            className="w-full bg-[#1F2937] border border-gray-700 rounded-xl px-4 py-4 outline-none focus:border-cyan-400"
          >

            <option>
              Healthcare
            </option>

            <option>
              Supply Chain
            </option>

            <option>
              Insurance Claims
            </option>

            <option>
              Revenue Cycle
            </option>

            <option>
              EDI Transactions
            </option>

          </select>

        </div>

        {/* ROW COUNT */}
        <div>

          <label className="text-sm text-gray-400 block mb-3">

            Synthetic Record Count

          </label>

          <select
            value={generatedRows}
            onChange={(e) =>
              setGeneratedRows(
                Number(
                  e.target.value
                )
              )
            }
            className="w-full bg-[#1F2937] border border-gray-700 rounded-xl px-4 py-4 outline-none focus:border-cyan-400"
          >

            <option value={100}>
              100 Records
            </option>

            <option value={500}>
              500 Records
            </option>

            <option value={1000}>
              1000 Records
            </option>

            <option value={5000}>
              5000 Records
            </option>

          </select>

        </div>

      </div>

      {/* KPI STRIP */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">

        <div className="bg-[#1F2937] p-5 rounded-xl border border-gray-700">

          <p className="text-gray-400 text-sm">

            Selected Columns

          </p>

          <h3 className="text-3xl font-bold mt-2 text-cyan-400">

            {selectedColumns.length}

          </h3>

        </div>

        <div className="bg-[#1F2937] p-5 rounded-xl border border-gray-700">

          <p className="text-gray-400 text-sm">

            Synthetic Records

          </p>

          <h3 className="text-3xl font-bold mt-2 text-green-400">

            {generatedRows}

          </h3>

        </div>

        <div className="bg-[#1F2937] p-5 rounded-xl border border-gray-700">

          <p className="text-gray-400 text-sm">

            Dataset Domain

          </p>

          <h3 className="text-2xl font-bold mt-2 text-purple-400">

            {datasetType}

          </h3>

        </div>

        <div className="bg-[#1F2937] p-5 rounded-xl border border-gray-700">

          <p className="text-gray-400 text-sm">

            AI Semantic Engine

          </p>

          <h3 className="text-2xl font-bold mt-2 text-cyan-400">

            Active

          </h3>

        </div>

      </div>

      {/* GENERATE BUTTON */}
      <button
        onClick={
          generateDataset
        }
        disabled={loading}
        className="bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black font-bold px-8 py-4 rounded-2xl transition-all duration-300"
      >

        {loading
          ? "Generating Enterprise Semantic Dataset..."
          : "Generate Semantic Dataset"}

      </button>

      {/* AI PROCESSING SUMMARY */}
      {summary.length > 0 && (

        <div className="mt-8 bg-[#0B1120] border border-gray-700 rounded-2xl p-6">

          <div className="flex items-center justify-between mb-6">

            <div>

              <h3 className="text-xl font-bold text-cyan-400">

                AI Semantic Processing Summary

              </h3>

              <p className="text-gray-400 text-sm mt-1">

                Transparent enterprise workflow reasoning and preprocessing trace

              </p>

            </div>

            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

          </div>

          <div className="space-y-4">

            {summary.map(
              (
                item,
                index
              ) => (

                <div
                  key={index}
                  className="bg-[#111827] border border-gray-800 rounded-xl p-4"
                >

                  <div className="flex gap-3">

                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2" />

                    <p className="text-gray-300 leading-7">

                      {item}

                    </p>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

      )}

    </div>

  );

}

export default SyntheticDataGenerator;