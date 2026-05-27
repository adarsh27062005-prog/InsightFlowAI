import { useMemo } from "react";

function DataPreprocessingPanel({
  data,
  setData,
}) {

  // =========================
  // PREPROCESS STATS
  // =========================
  const stats = useMemo(() => {

    if (data.length === 0) {

      return {

        totalRows: 0,
        missingValues: 0,
        duplicateRows: 0,

      };
    }

    // =========================
    // MISSING VALUES
    // =========================
    let missing = 0;

    data.forEach((row) => {

      Object.values(row).forEach(
        (value) => {

          if (

            value === null ||
            value === undefined ||
            value === ""

          ) {

            missing++;

          }

        }
      );

    });

    // =========================
    // DUPLICATES
    // =========================
    const unique =
      new Set(
        data.map((row) =>
          JSON.stringify(row)
        )
      );

    const duplicates =
      data.length - unique.size;

    return {

      totalRows:
        data.length,

      missingValues:
        missing,

      duplicateRows:
        duplicates,

    };

  }, [data]);

  // =========================
  // REMOVE DUPLICATES
  // =========================
  const removeDuplicates =
    () => {

      const uniqueData =
        Array.from(

          new Set(
            data.map((row) =>
              JSON.stringify(row)
            )
          )

        ).map((row) =>
          JSON.parse(row)
        );

      setData(uniqueData);

      alert(
        "Duplicate rows removed successfully."
      );
    };

  // =========================
  // CLEAN NULL VALUES
  // =========================
  const cleanNullValues =
    () => {

      const cleaned =
        data.map((row) => {

          const updatedRow =
            {};

          Object.keys(row).forEach(
            (key) => {

              let value =
                row[key];

              if (

                value === null ||
                value === undefined ||
                value === ""

              ) {

                value =
                  "N/A";

              }

              updatedRow[key] =
                value;

            }
          );

          return updatedRow;
        });

      setData(cleaned);

      alert(
        "Missing values cleaned successfully."
      );
    };

  // =========================
  // TRIM TEXT VALUES
  // =========================
  const trimTextValues =
    () => {

      const cleaned =
        data.map((row) => {

          const updatedRow =
            {};

          Object.keys(row).forEach(
            (key) => {

              let value =
                row[key];

              if (
                typeof value ===
                "string"
              ) {

                value =
                  value.trim();

              }

              updatedRow[key] =
                value;

            }
          );

          return updatedRow;
        });

      setData(cleaned);

      alert(
        "Text normalization completed."
      );
    };

  // =========================
  // AUTO PREPROCESS
  // =========================
  const autoPreprocess =
    () => {

      // STEP 1 REMOVE DUPLICATES
      let processed =
        Array.from(

          new Set(
            data.map((row) =>
              JSON.stringify(row)
            )
          )

        ).map((row) =>
          JSON.parse(row)
        );

      // STEP 2 CLEAN NULLS
      processed =
        processed.map((row) => {

          const updated =
            {};

          Object.keys(row).forEach(
            (key) => {

              let value =
                row[key];

              if (

                value === null ||
                value === undefined ||
                value === ""

              ) {

                value =
                  "N/A";

              }

              if (
                typeof value ===
                "string"
              ) {

                value =
                  value.trim();

              }

              updated[key] =
                value;

            }
          );

          return updated;
        });

      setData(processed);

      alert(
        "AI preprocessing completed successfully."
      );
    };

  return (

    <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800">

      {/* HEADER */}
      <div className="mb-8">

        <h2 className="text-2xl font-bold">

          AI Data Preprocessing Engine

        </h2>

        <p className="text-gray-400 text-sm mt-1">

          Enterprise healthcare dataset cleaning and preprocessing workflow

        </p>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-[#1F2937] p-6 rounded-2xl border border-gray-700">

          <h3 className="text-cyan-400 text-sm">

            Total Rows

          </h3>

          <p className="text-3xl font-bold mt-3">

            {stats.totalRows}

          </p>

        </div>

        <div className="bg-[#1F2937] p-6 rounded-2xl border border-gray-700">

          <h3 className="text-cyan-400 text-sm">

            Missing Values

          </h3>

          <p className="text-3xl font-bold mt-3">

            {stats.missingValues}

          </p>

        </div>

        <div className="bg-[#1F2937] p-6 rounded-2xl border border-gray-700">

          <h3 className="text-cyan-400 text-sm">

            Duplicate Rows

          </h3>

          <p className="text-3xl font-bold mt-3">

            {stats.duplicateRows}

          </p>

        </div>

      </div>

      {/* ACTION BUTTONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

        {/* AUTO AI */}
        <button
          onClick={
            autoPreprocess
          }
          className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold p-5 rounded-2xl transition-all duration-300"
        >

          AI Auto Preprocess

        </button>

        {/* REMOVE DUPES */}
        <button
          onClick={
            removeDuplicates
          }
          className="bg-[#1F2937] hover:bg-red-500 border border-gray-700 hover:border-red-400 p-5 rounded-2xl transition-all duration-300"
        >

          Remove Duplicates

        </button>

        {/* CLEAN NULLS */}
        <button
          onClick={
            cleanNullValues
          }
          className="bg-[#1F2937] hover:bg-yellow-500 border border-gray-700 hover:border-yellow-400 p-5 rounded-2xl transition-all duration-300"
        >

          Clean Missing Values

        </button>

        {/* TRIM TEXT */}
        <button
          onClick={
            trimTextValues
          }
          className="bg-[#1F2937] hover:bg-green-500 border border-gray-700 hover:border-green-400 p-5 rounded-2xl transition-all duration-300"
        >

          Normalize Text

        </button>

      </div>

      {/* FOOTER */}
      <div className="mt-8 bg-[#0B1120] border border-gray-700 rounded-xl p-5">

        <div className="flex items-center gap-3">

          <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

          <span className="text-green-400 font-medium">

            AI preprocessing engine active

          </span>

        </div>

      </div>

    </div>
  );
}

export default DataPreprocessingPanel;