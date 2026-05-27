function RejectionDashboard({
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
  // REJECTION ANALYSIS
  // =========================
  const rejectionMap = {};

  data.forEach((row) => {

    const rejection =
      getValue(row, [
        "rejection_reason",
        "rejection",
        "reject_reason",
        "status",
        "Status",
      ]) || "Unknown";

    rejectionMap[rejection] =
      (rejectionMap[rejection] || 0) + 1;

  });

  const sortedRejections =
    Object.entries(rejectionMap)
      .sort((a, b) => b[1] - a[1]);

  const totalRejections =
    sortedRejections.reduce(
      (sum, item) => sum + item[1],
      0
    );

  const topRejection =
    sortedRejections[0]?.[0] || "N/A";

  const topCount =
    sortedRejections[0]?.[1] || 0;

  return (

    <div className="space-y-8">

      {/* HEADER */}
      <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800">

        <h1 className="text-3xl font-bold mb-2">

          Rejection Dashboard

        </h1>

        <p className="text-gray-400">

          Operational rejection intelligence & analysis

        </p>

      </div>

      {/* KPI SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* TOTAL */}
        <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">

          <h3 className="text-cyan-400 text-sm mb-3">

            Total Rejections

          </h3>

          <p className="text-4xl font-bold">

            {totalRejections}

          </p>

        </div>

        {/* TOP REASON */}
        <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">

          <h3 className="text-cyan-400 text-sm mb-3">

            Top Rejection Reason

          </h3>

          <p className="text-2xl font-bold break-words">

            {topRejection}

          </p>

        </div>

        {/* COUNT */}
        <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">

          <h3 className="text-cyan-400 text-sm mb-3">

            Top Rejection Count

          </h3>

          <p className="text-4xl font-bold">

            {topCount}

          </p>

        </div>

      </div>

      {/* REJECTION TABLE */}
      <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800">

        <h2 className="text-2xl font-bold mb-6">

          Rejection Breakdown

        </h2>

        {sortedRejections.length > 0 ? (

          <div className="overflow-auto">

            <table className="w-full text-left">

              <thead>

                <tr className="border-b border-gray-700 text-cyan-400">

                  <th className="p-4">
                    Rejection Reason
                  </th>

                  <th className="p-4">
                    Count
                  </th>

                </tr>

              </thead>

              <tbody>

                {sortedRejections.map(
                  ([reason, count], index) => (

                    <tr
                      key={index}
                      className="border-b border-gray-800 hover:bg-[#1F2937]"
                    >

                      <td className="p-4">

                        {reason}

                      </td>

                      <td className="p-4 font-semibold">

                        {count}

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        ) : (

          <div className="text-gray-400">

            Upload dataset to analyze rejections

          </div>

        )}

      </div>

    </div>

  );
}

export default RejectionDashboard;