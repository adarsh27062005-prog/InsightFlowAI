function WorkloadDashboard({
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
  // WORKLOAD ANALYSIS
  // =========================
  const workloadMap = {};

  data.forEach((row) => {

    const owner =
      getValue(row, [
        "assigned_to",
        "owner",
        "employee",
        "agent",
        "provider",
      ]) || "Unassigned";

    workloadMap[owner] =
      (workloadMap[owner] || 0) + 1;

  });

  const sortedWorkload =
    Object.entries(workloadMap)
      .sort((a, b) => b[1] - a[1]);

  const totalOwners =
    sortedWorkload.length;

  const highestOwner =
    sortedWorkload[0]?.[0] || "N/A";

  const highestVolume =
    sortedWorkload[0]?.[1] || 0;

  const totalCases =
    data.length;

  return (

    <div className="space-y-8">

      {/* HEADER */}
      <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800">

        <h1 className="text-3xl font-bold mb-2">

          Workload Dashboard

        </h1>

        <p className="text-gray-400">

          Workforce operational distribution & utilization

        </p>

      </div>

      {/* KPI SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* TOTAL CASES */}
        <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">

          <h3 className="text-cyan-400 text-sm mb-3">

            Total Cases

          </h3>

          <p className="text-4xl font-bold">

            {totalCases}

          </p>

        </div>

        {/* TOTAL OWNERS */}
        <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">

          <h3 className="text-cyan-400 text-sm mb-3">

            Active Owners

          </h3>

          <p className="text-4xl font-bold">

            {totalOwners}

          </p>

        </div>

        {/* TOP OWNER */}
        <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">

          <h3 className="text-cyan-400 text-sm mb-3">

            Highest Workload Owner

          </h3>

          <p className="text-2xl font-bold break-words">

            {highestOwner}

          </p>

        </div>

        {/* TOP VOLUME */}
        <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">

          <h3 className="text-cyan-400 text-sm mb-3">

            Highest Assigned Volume

          </h3>

          <p className="text-4xl font-bold text-red-400">

            {highestVolume}

          </p>

        </div>

      </div>

      {/* WORKLOAD TABLE */}
      <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800">

        <h2 className="text-2xl font-bold mb-6">

          Workload Distribution

        </h2>

        {sortedWorkload.length > 0 ? (

          <div className="overflow-auto">

            <table className="w-full text-left">

              <thead>

                <tr className="border-b border-gray-700 text-cyan-400">

                  <th className="p-4">
                    Owner
                  </th>

                  <th className="p-4">
                    Assigned Cases
                  </th>

                </tr>

              </thead>

              <tbody>

                {sortedWorkload.map(
                  ([owner, volume], index) => (

                    <tr
                      key={index}
                      className="border-b border-gray-800 hover:bg-[#1F2937]"
                    >

                      <td className="p-4">

                        {owner}

                      </td>

                      <td className="p-4 font-semibold">

                        {volume}

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        ) : (

          <div className="text-gray-400">

            Upload dataset to analyze workforce utilization

          </div>

        )}

      </div>

    </div>

  );
}

export default WorkloadDashboard;