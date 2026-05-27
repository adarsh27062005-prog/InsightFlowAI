function ProviderDashboard({
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
  // PROVIDER ANALYSIS
  // =========================
  const providerMap = {};

  data.forEach((row) => {

    const provider =
      getValue(row, [
        "provider",
        "Provider",
        "provider_name",
        "physician",
      ]) || "Unknown";

    providerMap[provider] =
      (providerMap[provider] || 0) + 1;

  });

  const sortedProviders =
    Object.entries(providerMap)
      .sort((a, b) => b[1] - a[1]);

  const totalProviders =
    sortedProviders.length;

  const topProvider =
    sortedProviders[0]?.[0] || "N/A";

  const topProviderVolume =
    sortedProviders[0]?.[1] || 0;

  return (

    <div className="space-y-8">

      {/* HEADER */}
      <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800">

        <h1 className="text-3xl font-bold mb-2">

          Provider Dashboard

        </h1>

        <p className="text-gray-400">

          Provider network intelligence & operational activity

        </p>

      </div>

      {/* KPI SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* TOTAL PROVIDERS */}
        <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">

          <h3 className="text-cyan-400 text-sm mb-3">

            Total Providers

          </h3>

          <p className="text-4xl font-bold">

            {totalProviders}

          </p>

        </div>

        {/* TOP PROVIDER */}
        <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">

          <h3 className="text-cyan-400 text-sm mb-3">

            Top Provider

          </h3>

          <p className="text-2xl font-bold break-words">

            {topProvider}

          </p>

        </div>

        {/* TOP VOLUME */}
        <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">

          <h3 className="text-cyan-400 text-sm mb-3">

            Highest Volume

          </h3>

          <p className="text-4xl font-bold text-green-400">

            {topProviderVolume}

          </p>

        </div>

      </div>

      {/* PROVIDER TABLE */}
      <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800">

        <h2 className="text-2xl font-bold mb-6">

          Provider Activity Breakdown

        </h2>

        {sortedProviders.length > 0 ? (

          <div className="overflow-auto">

            <table className="w-full text-left">

              <thead>

                <tr className="border-b border-gray-700 text-cyan-400">

                  <th className="p-4">
                    Provider
                  </th>

                  <th className="p-4">
                    Volume
                  </th>

                </tr>

              </thead>

              <tbody>

                {sortedProviders.map(
                  ([provider, volume], index) => (

                    <tr
                      key={index}
                      className="border-b border-gray-800 hover:bg-[#1F2937]"
                    >

                      <td className="p-4">

                        {provider}

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

            Upload dataset to analyze provider activity

          </div>

        )}

      </div>

    </div>

  );
}

export default ProviderDashboard;