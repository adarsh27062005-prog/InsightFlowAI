function SLADashboard({
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
  // SLA ANALYSIS
  // =========================
  let breached = 0;

  let withinSLA = 0;

  data.forEach((row) => {

    const status =
      String(
        getValue(row, [
          "sla_status",
          "status",
          "Status",
        ]) || ""
      ).toLowerCase();

    if (
      status.includes("breach") ||
      status.includes("late") ||
      status.includes("delayed")
    ) {

      breached++;

    } else {

      withinSLA++;

    }

  });

  const total =
    breached + withinSLA;

  const breachRate =
    total > 0
      ? (
          (breached / total) * 100
        ).toFixed(1)
      : 0;

  return (

    <div className="space-y-8">

      {/* HEADER */}
      <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800">

        <h1 className="text-3xl font-bold mb-2">

          SLA Dashboard

        </h1>

        <p className="text-gray-400">

          Service-level agreement operational monitoring

        </p>

      </div>

      {/* KPI SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* WITHIN SLA */}
        <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">

          <h3 className="text-cyan-400 text-sm mb-3">

            Within SLA

          </h3>

          <p className="text-4xl font-bold text-green-400">

            {withinSLA}

          </p>

        </div>

        {/* BREACHED */}
        <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">

          <h3 className="text-cyan-400 text-sm mb-3">

            SLA Breaches

          </h3>

          <p className="text-4xl font-bold text-red-400">

            {breached}

          </p>

        </div>

        {/* BREACH RATE */}
        <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">

          <h3 className="text-cyan-400 text-sm mb-3">

            Breach Rate

          </h3>

          <p className="text-4xl font-bold">

            {breachRate}%

          </p>

        </div>

      </div>

      {/* STATUS PANEL */}
      <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800">

        <h2 className="text-2xl font-bold mb-6">

          SLA Intelligence Summary

        </h2>

        <div className="space-y-4">

          <div className="bg-[#1F2937] p-5 rounded-xl border border-gray-700">

            <p className="text-lg">

              Total Cases Reviewed:
              {" "}
              <span className="font-bold text-cyan-400">

                {total}

              </span>

            </p>

          </div>

          <div className="bg-[#1F2937] p-5 rounded-xl border border-gray-700">

            <p className="text-lg">

              SLA Operational Status:
              {" "}
              <span
                className={`font-bold ${
                  breached > 0
                    ? "text-red-400"
                    : "text-green-400"
                }`}
              >

                {breached > 0
                  ? "Attention Required"
                  : "Operational"}

              </span>

            </p>

          </div>

        </div>

      </div>

    </div>

  );
}

export default SLADashboard;