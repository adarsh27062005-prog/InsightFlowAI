import { useMemo } from "react";

function WorkflowQueue({ data }) {

  // =========================
  // QUEUE ANALYTICS
  // =========================
  const analytics = useMemo(() => {

    if (!data.length) {

      return {
        pending: 0,
        completed: 0,
        urgent: 0,
        avgTAT: 0,
      };
    }

    const statusColumn =
      Object.keys(data[0]).find((col) =>
        col.toLowerCase().includes("status")
      );

    const tatColumn =
      Object.keys(data[0]).find((col) => {

        const lower =
          col.toLowerCase();

        return (

          lower.includes("tat") ||
          lower.includes("turnaround") ||
          lower.includes("hours")

        );
      });

    let pending = 0;
    let completed = 0;
    let urgent = 0;
    let totalTat = 0;

    data.forEach((row) => {

      // =========================
      // STATUS
      // =========================
      const status =
        String(
          row[statusColumn] || ""
        ).toLowerCase();

      if (

        status.includes("pending") ||
        status.includes("open")

      ) {

        pending++;
      }

      if (

        status.includes("completed") ||
        status.includes("closed")

      ) {

        completed++;
      }

      // =========================
      // TAT
      // =========================
      const tat =
        Number(
          row[tatColumn]
        ) || 0;

      totalTat += tat;

      if (tat > 48) {
        urgent++;
      }

    });

    return {

      pending,

      completed,

      urgent,

      avgTAT:
        (
          totalTat / data.length
        ).toFixed(1),
    };

  }, [data]);

  return (

    <div className="space-y-8">

      {/* HEADER */}
      <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800">

        <h1 className="text-3xl font-bold mb-2">

          Workflow Queue

        </h1>

        <p className="text-gray-400">

          Operational workflow monitoring & queue intelligence

        </p>

      </div>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* PENDING */}
        <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">

          <h3 className="text-yellow-400 text-sm mb-3">

            Pending Cases

          </h3>

          <p className="text-4xl font-bold">

            {analytics.pending}

          </p>

        </div>

        {/* COMPLETED */}
        <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">

          <h3 className="text-green-400 text-sm mb-3">

            Completed Cases

          </h3>

          <p className="text-4xl font-bold">

            {analytics.completed}

          </p>

        </div>

        {/* URGENT */}
        <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">

          <h3 className="text-red-400 text-sm mb-3">

            Urgent Cases

          </h3>

          <p className="text-4xl font-bold">

            {analytics.urgent}

          </p>

        </div>

        {/* AVG TAT */}
        <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">

          <h3 className="text-cyan-400 text-sm mb-3">

            Avg Turnaround

          </h3>

          <p className="text-4xl font-bold">

            {analytics.avgTAT}h

          </p>

        </div>

      </div>

      {/* LIVE WORK QUEUE */}
      <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800">

        <h2 className="text-2xl font-bold mb-6">

          Active Operational Queue

        </h2>

        <div className="overflow-auto">

          <table className="w-full text-left text-sm">

            <thead>

              <tr className="border-b border-gray-700 text-cyan-400">

                {data.length > 0 &&
                  Object.keys(data[0])
                    .slice(0, 8)
                    .map((key) => (

                      <th
                        key={key}
                        className="p-3 whitespace-nowrap"
                      >

                        {key}

                      </th>
                    ))}
              </tr>

            </thead>

            <tbody>

              {data.slice(0, 15).map(
                (row, index) => (

                  <tr
                    key={index}
                    className="border-b border-gray-800 hover:bg-[#1F2937]"
                  >

                    {Object.values(row)
                      .slice(0, 8)
                      .map((value, i) => (

                        <td
                          key={i}
                          className="p-3 whitespace-nowrap"
                        >

                          {String(value)}

                        </td>
                      ))}

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default WorkflowQueue;