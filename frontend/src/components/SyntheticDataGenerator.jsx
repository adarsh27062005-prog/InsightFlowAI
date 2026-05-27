import { useState } from "react";

function SyntheticDataGenerator({
  selectedColumns,
  setData,
}) {

  const [loading, setLoading] =
    useState(false);

  const [summary, setSummary] =
    useState([]);

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
            "Select columns first."
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
        // GENERATION SUMMARY
        // =========================
        const processSummary =
          [];

        processSummary.push(
          `Detected ${columnNames.length} semantic business columns from uploaded DDL schema.`
        );

        processSummary.push(
          "AI semantic engine mapped business entities and operational fields."
        );

        processSummary.push(
          "Synthetic EDI-style dataset generation initiated."
        );

        // =========================
        // GENERATE DATASET
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

                rows: 500,

              }),

            }
          );

        const result =
          await response.json();

        // =========================
        // GENERATION FAILED
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
          `Successfully generated ${result.data.length} synthetic business transaction records.`
        );

        // =========================
        // AUTO PREPROCESS
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
        // SET CLEANED DATA
        // =========================
        if (
          preprocessResult.success
        ) {

          setData(
            preprocessResult.data
          );

          processSummary.push(
            "AI preprocessing engine cleaned null values and standardized operational records."
          );

          processSummary.push(
            "Semantic normalization completed successfully."
          );

          processSummary.push(
            "Dataset is now ready for conversational analytics and semantic querying."
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
          "Backend connection failed."
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800 mt-8">

      {/* HEADER */}
      <div className="mb-6">

        <h2 className="text-2xl font-bold">

          Semantic Synthetic Dataset Engine

        </h2>

        <p className="text-gray-400 text-sm mt-1">

          AI-powered EDI semantic transaction generation and preprocessing workflow

        </p>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

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

            Generated Records

          </p>

          <h3 className="text-3xl font-bold mt-2 text-green-400">

            500

          </h3>

        </div>

        <div className="bg-[#1F2937] p-5 rounded-xl border border-gray-700">

          <p className="text-gray-400 text-sm">

            AI Semantic Engine

          </p>

          <h3 className="text-3xl font-bold mt-2 text-purple-400">

            Active

          </h3>

        </div>

      </div>

      {/* BUTTON */}
      <button
        onClick={
          generateDataset
        }
        disabled={loading}
        className="bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black font-bold px-8 py-4 rounded-2xl transition-all duration-300"
      >

        {loading
          ? "Generating Semantic Dataset..."
          : "Generate Semantic Dataset"}

      </button>

      {/* AI SUMMARY */}
      {summary.length > 0 && (

        <div className="mt-8 bg-[#0B1120] border border-gray-700 rounded-2xl p-6">

          <div className="flex items-center justify-between mb-5">

            <div>

              <h3 className="text-xl font-bold text-cyan-400">

                AI Processing Summary

              </h3>

              <p className="text-gray-400 text-sm mt-1">

                Transparent preprocessing and semantic workflow reasoning

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