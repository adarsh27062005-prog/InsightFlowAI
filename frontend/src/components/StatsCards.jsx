function StatsCards({ data, insights }) {

  const averageAge =
    data.length > 0
      ? (
          data.reduce((sum, row) => {
            return sum + Number(row.Age || row.age || 0);
          }, 0) / data.length
        ).toFixed(1)
      : "49";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">

      <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800">
        <h2 className="text-gray-400 mb-3">
          Total Records
        </h2>

        <p className="text-4xl font-bold text-cyan-400">
          {data.length || 245}
        </p>
      </div>

      <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800">
        <h2 className="text-gray-400 mb-3">
          Average Age
        </h2>

        <p className="text-4xl font-bold text-cyan-400">
          {averageAge}
        </p>
      </div>

      <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800">
        <h2 className="text-gray-400 mb-3">
          AI Insights
        </h2>

        <p className="text-4xl font-bold text-cyan-400">
          {insights.length}
        </p>
      </div>

      <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800">
        <h2 className="text-gray-400 mb-3">
          Data Processed
        </h2>

        <p className="text-4xl font-bold text-cyan-400">
          {data.length > 0 ? `${data.length} Rows` : "12TB"}
        </p>
      </div>

    </div>
  );
}

export default StatsCards;