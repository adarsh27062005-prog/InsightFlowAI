function TurnaroundDashboard({
  data,
}) {

  // =========================
  // SAFE HELPERS
  // =========================
  const getValue = (row, keys) => {

    for (const key of keys) {

      if (
        row[key] !== undefined &&
        row[key] !== null &&
        row[key] !== ""
      ) {

        return row[key];

      }
    }

    return null;
  };

  // =========================
  // TURNAROUND ANALYSIS
  // =========================
  let totalTime = 0;

  let validRows = 0;

  let maxTime = 0;

  data.forEach((row) => {

    const turnaround =
      Number(
        getValue(row, [
          "turnaround_time",
          "tat",
          "processing_time",
          "hours",
        ])
      );

    if (!isNaN(turnaround)) {

      totalTime += turnaround;

      validRows++;

      if (turnaround > maxTime) {
        maxTime = turnaround;
      }

    }

  });

  const avgTurnaround =
    validRows > 0
      ? (
          totalTime / validRows
        ).toFixed(1)
      : 0;

  return (

    <div className="space-y-8">

      {/* HEADER */}
      <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800">

        <h1 className="text-3xl font-bold mb-2">

          Turnaround Dashboard

        </h1>

        <p className="text-gray-400">

          Processing efficiency & turnaround intelligence

        </p>

      </div>

      {/* KPI SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* AVG */}
        <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">

          <h3 className="text-cyan-400 text-sm mb-3">

            Average Turnaround

          </h3>

          <p className="text-4xl font-bold">

            {avgTurnaround}

          </p>

        </div>

        {/* MAX */}
        <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">

          <h3 className="text-cyan-400 text-sm mb-3">

            Maximum Turnaround

          </h3>

          <p className="text-4xl font-bold text-red-400">

            {maxTime}

          </p>

        </div>

        {/* RECORDS */}
        <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">

          <h3 className="text-cyan-400 text-sm mb-3">

            Processed Cases

          </h3>

          <p className="text-4xl font-bold text-green-400">

            {validRows}

          </p>

        </div>

      </div>

      {/* SUMMARY */}
      <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800">

        <h2 className="text-2xl font-bold mb-6">

          Turnaround Intelligence

        </h2>

        <div className="space-y-4">

          <div className="bg-[#1F2937] p-5 rounded-xl border border-gray-700">

            <p className="text-lg">

              Average operational turnaround:
              {" "}
              <span className="font-bold text-cyan-400">

                {avgTurnaround}

              </span>

            </p>

          </div>

          <div className="bg-[#1F2937] p-5 rounded-xl border border-gray-700">

            <p className="text-lg">

              Longest observed turnaround:
              {" "}
              <span className="font-bold text-red-400">

                {maxTime}

              </span>

            </p>

          </div>

        </div>

      </div>

    </div>

  );
}

export default TurnaroundDashboard;