function SyntheticDataGenerator({
  selectedColumns,
  setData,
}) {

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
        // GENERATE DATASET
        // =========================
        const response =
          await fetch(

            "http://localhost:5000/api/generate-dataset",

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

          return;
        }

        // =========================
        // AUTO PREPROCESS
        // =========================
        const preprocessResponse =
          await fetch(

            "http://localhost:5000/api/preprocess",

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

          alert(

            "Synthetic healthcare dataset generated and preprocessed successfully."

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

      }

    };

  return (

    <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800 mt-8">

      {/* HEADER */}
      <div className="mb-6">

        <h2 className="text-2xl font-bold">

          Synthetic Dataset Generator

        </h2>

        <p className="text-gray-400 text-sm mt-1">

          AI-powered healthcare dataset generation engine

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

            Dataset Size

          </p>

          <h3 className="text-3xl font-bold mt-2 text-green-400">

            500 Rows

          </h3>

        </div>

        <div className="bg-[#1F2937] p-5 rounded-xl border border-gray-700">

          <p className="text-gray-400 text-sm">

            AI Engine

          </p>

          <h3 className="text-3xl font-bold mt-2 text-cyan-400">

            Active

          </h3>

        </div>

      </div>

      {/* BUTTON */}
      <button
        onClick={
          generateDataset
        }
        className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-4 rounded-2xl transition-all duration-300"
      >

        Generate Synthetic Dataset

      </button>

    </div>
  );
}

export default SyntheticDataGenerator;