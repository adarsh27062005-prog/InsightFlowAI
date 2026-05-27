function SchemaViewer({
  schema,
  selectedColumns,
  setSelectedColumns,
}) {

  // =========================
  // TOGGLE COLUMN
  // =========================
  const toggleColumn = (
    column
  ) => {

    const exists =
      selectedColumns.find(
        (item) =>
          item.name === column.name
      );

    // REMOVE
    if (exists) {

      setSelectedColumns(

        selectedColumns.filter(
          (item) =>
            item.name !== column.name
        )

      );

    }

    // ADD
    else {

      setSelectedColumns([

        ...selectedColumns,
        column,

      ]);

    }

  };

  // =========================
  // EMPTY
  // =========================
  if (!schema.length) {

    return null;

  }

  return (

    <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800 mt-8">

      {/* HEADER */}
      <div className="mb-8">

        <h2 className="text-2xl font-bold">

          Semantic Schema Intelligence

        </h2>

        <p className="text-gray-400 text-sm mt-1">

          AI automatically detected business meaning and EDI semantic metadata

        </p>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

        <div className="bg-[#1F2937] p-5 rounded-xl border border-gray-700">

          <p className="text-gray-400 text-sm">

            Total Columns

          </p>

          <h3 className="text-3xl font-bold mt-2 text-cyan-400">

            {schema.length}

          </h3>

        </div>

        <div className="bg-[#1F2937] p-5 rounded-xl border border-gray-700">

          <p className="text-gray-400 text-sm">

            Selected Columns

          </p>

          <h3 className="text-3xl font-bold mt-2 text-green-400">

            {selectedColumns.length}

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

      {/* COLUMN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

        {schema.map(
          (
            column,
            index
          ) => {

            const active =
              selectedColumns.find(
                (item) =>
                  item.name ===
                  column.name
              );

            return (

              <button
                key={index}
                onClick={() =>
                  toggleColumn(
                    column
                  )
                }
                className={`p-5 rounded-2xl border transition-all duration-300 text-left ${
                  active
                    ? "bg-cyan-500 text-black border-cyan-400"
                    : "bg-[#1F2937] border-gray-700 hover:border-cyan-500"
                }`}
              >

                {/* COLUMN NAME */}
                <h3 className="font-bold text-lg break-words">

                  {column.name}

                </h3>

                {/* TYPE */}
                <p
                  className={`text-sm mt-2 ${
                    active
                      ? "text-black"
                      : "text-gray-400"
                  }`}
                >

                  {column.type}

                </p>

                {/* SEMANTIC TYPE */}
                <div className="mt-4">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      active
                        ? "bg-black text-cyan-400"
                        : "bg-cyan-500/10 text-cyan-400"
                    }`}
                  >

                    {column.semanticType}

                  </span>

                </div>

                {/* DESCRIPTION */}
                <p
                  className={`text-sm mt-4 leading-6 ${
                    active
                      ? "text-black"
                      : "text-gray-300"
                  }`}
                >

                  {column.description}

                </p>

              </button>

            );

          }
        )}

      </div>

      {/* FOOTER */}
      <div className="mt-8 bg-[#0B1120] border border-gray-700 rounded-xl p-5">

        <div className="flex items-center justify-between">

          <div>

            <h4 className="text-cyan-400 font-semibold">

              AI Semantic Mapping Ready

            </h4>

            <p className="text-gray-400 text-sm mt-1">

              Selected columns will be used for semantic synthetic generation and conversational analytics

            </p>

          </div>

          <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

        </div>

      </div>

    </div>

  );

}

export default SchemaViewer;