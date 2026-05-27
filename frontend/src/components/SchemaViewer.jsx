import { useState } from "react";

function SchemaViewer({
  schema,
  selectedColumns,
  setSelectedColumns,
}) {

  // =========================
  // TOGGLE COLUMN
  // =========================
  const toggleColumn = (column) => {

    const exists =
      selectedColumns.find(
        (item) =>
          item.name === column.name
      );

    if (exists) {

      setSelectedColumns(

        selectedColumns.filter(
          (item) =>
            item.name !== column.name
        )

      );

    } else {

      setSelectedColumns([
        ...selectedColumns,
        column,
      ]);
    }
  };

  if (!schema.length) {
    return null;
  }

  return (

    <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800 mt-8">

      {/* HEADER */}
      <div className="mb-6">

        <h2 className="text-2xl font-bold">

          Schema Intelligence Engine

        </h2>

        <p className="text-gray-400 text-sm mt-1">

          Select important columns for synthetic data generation

        </p>

      </div>

      {/* COLUMN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

        {schema.map((column, index) => {

          const active =
            selectedColumns.find(
              (item) =>
                item.name === column.name
            );

          return (

            <button
              key={index}
              onClick={() =>
                toggleColumn(column)
              }
              className={`p-5 rounded-2xl border transition-all duration-300 text-left ${
                active
                  ? "bg-cyan-500 text-black border-cyan-400"
                  : "bg-[#1F2937] border-gray-700 hover:border-cyan-500"
              }`}
            >

              <h3 className="font-bold text-lg break-words">

                {column.name}

              </h3>

              <p
                className={`text-sm mt-2 ${
                  active
                    ? "text-black"
                    : "text-gray-400"
                }`}
              >

                {column.type}

              </p>

            </button>

          );
        })}

      </div>

      {/* FOOTER */}
      <div className="mt-8 bg-[#0B1120] border border-gray-700 rounded-xl p-5">

        <div className="flex items-center justify-between">

          <div>

            <h4 className="text-cyan-400 font-semibold">

              Selected Columns

            </h4>

            <p className="text-gray-400 text-sm mt-1">

              {selectedColumns.length} columns selected for synthetic generation

            </p>

          </div>

          <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

        </div>

      </div>

    </div>
  );
}

export default SchemaViewer;