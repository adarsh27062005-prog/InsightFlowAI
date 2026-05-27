import { useState, useMemo } from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";

function UploadDataset({
  data,
  setData,
  insights,
  uploadRef,
}) {

  // =========================
  // STATES
  // =========================
  const [fileInfo, setFileInfo] =
    useState(null);

  const [uploadStatus, setUploadStatus] =
    useState("");

  const [searchTerm, setSearchTerm] =
    useState("");
  const [currentPage, setCurrentPage] =
  useState(1);

const rowsPerPage = 10;
  // =========================
  // DATASET INTELLIGENCE
  // =========================
  const datasetIntelligence =
    useMemo(() => {

      if (!data.length) {
        return null;
      }

      const columns =
        Object.keys(data[0]);

      const lowerColumns =
        columns.map((col) =>
          col.toLowerCase()
        );

      let datasetType =
        "General Analytics Dataset";

      // =========================
      // HEALTHCARE ENROLLMENT
      // =========================
      if (

        lowerColumns.some((col) =>
          col.includes("provider")
        ) &&

        lowerColumns.some((col) =>
          col.includes("patient")
        )

      ) {

        datasetType =
          "Healthcare Enrollment Dataset";
      }

      // =========================
      // FINANCIAL
      // =========================
      if (

        lowerColumns.some((col) =>
          col.includes("payment")
        ) ||

        lowerColumns.some((col) =>
          col.includes("billing")
        )

      ) {

        datasetType =
          "Financial Analytics Dataset";
      }

      // =========================
      // SLA
      // =========================
      if (

        lowerColumns.some((col) =>
          col.includes("sla")
        )

      ) {

        datasetType =
          "Operational SLA Dataset";
      }

      return {

        rows:
          data.length,

        columns:
          columns.length,

        datasetType,

        ingestion:
          "Successful",

      };

    }, [data]);

  // =========================
// SEARCH FILTER
// =========================
const filteredData = useMemo(() => {

  return data.filter((row) => {

    return Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(
        searchTerm.toLowerCase()
      );

  });

}, [data, searchTerm]);
// =========================
// PAGINATION
// =========================

const totalPages =
  Math.max(
    1,
    Math.ceil(
      filteredData.length /
      rowsPerPage
    )
  );

const startIndex =
  (currentPage - 1) *
  rowsPerPage;

const paginatedData =
  filteredData.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  // =========================
  // FILE UPLOAD HANDLER
  // =========================
  const handleFileUpload = async (event) => {

  const file =
    event.target.files[0];

  if (!file) return;

  const fileName =
    file.name.toLowerCase();

  setUploadStatus(
    "Processing file..."
  );

  setFileInfo({
    name: file.name,
    size: (
      file.size / 1024
    ).toFixed(2),
    type: file.type,
  });

  // =========================
  // COMMON PREPROCESS FUNCTION
  // =========================
  const preprocessAndSetData =
    async (rawData) => {

      try {

        const response =
          await fetch(

            "https://insightflow-backend-cqbu.onrender.com/api/preprocess",

            {

              method: "POST",

              headers: {

                "Content-Type":
                  "application/json",

              },

              body: JSON.stringify({

                data: rawData,

              }),

            }

          );

        if (!response.ok) {

  throw new Error(
    "Server preprocessing failed"
  );

}

const result =
  await response.json();

        console.log(
          "Processed:",
          result
        );

        setData(
          result.data || []
        );

        setUploadStatus(
          "Dataset uploaded successfully"
        );

      } catch (error) {

        console.error(
          "Preprocess Error:",
          error
        );

        setUploadStatus(
          "Backend preprocessing failed"
        );
      }
    };

  // =========================
  // CSV FILE
  // =========================
  if (fileName.endsWith(".csv")) {

    Papa.parse(file, {

      header: true,

      skipEmptyLines: true,

      complete: async (results) => {

        await preprocessAndSetData(
          results.data
        );

      },

      error: () => {

        setUploadStatus(
          "CSV parsing failed"
        );
      },

    });

  }

  // =========================
  // EXCEL FILE
  // =========================
  else if (

    fileName.endsWith(".xlsx") ||

    fileName.endsWith(".xls")

  ) {

    try {

      const reader =
        new FileReader();

      reader.onload =
        async (e) => {

          const binaryStr =
            e.target.result;

          const workbook =
            XLSX.read(binaryStr, {

              type: "binary",

            });

          const sheetName =
            workbook.SheetNames[0];

          const worksheet =
            workbook.Sheets[sheetName];

          const jsonData =
            XLSX.utils.sheet_to_json(
              worksheet
            );

          await preprocessAndSetData(
            jsonData
          );

        };

      reader.readAsBinaryString(
        file
      );

    } catch {

      setUploadStatus(
        "Excel parsing failed"
      );
    }

  }

  // =========================
  // TXT / SQL FILE
  // =========================
  else if (

    fileName.endsWith(".txt") ||

    fileName.endsWith(".sql")

  ) {

    try {

      const reader =
        new FileReader();

      reader.onload =
        async (e) => {

          const text =
            e.target.result;

          const lines =
            text.split("\n");

          const extractedColumns =
            [];

          lines.forEach((line) => {

            const cleanLine =
              line.trim();

            const isColumnLine =

              cleanLine.includes(
                "VARCHAR"
              ) ||

              cleanLine.includes(
                "DATE"
              ) ||

              cleanLine.includes(
                "DOUBLE"
              ) ||

              cleanLine.includes(
                "TIMESTAMP"
              ) ||

              cleanLine.includes(
                "INTEGER"
              ) ||

              cleanLine.includes(
                "DECIMAL"
              );

            if (isColumnLine) {

              const column =
                cleanLine
                  .split(" ")[0]
                  .replace(",", "")
                  .trim();

              if (
                column &&
                !extractedColumns.includes(
                  column
                )
              ) {

                extractedColumns.push(
                  column
                );
              }
            }

          });

          const previewData =
            extractedColumns.map(
              (col, index) => ({

                id: index + 1,

                column_name: col,

              })
            );

          await preprocessAndSetData(
            previewData
          );

        };

      reader.readAsText(file);

    } catch {

      setUploadStatus(
        "TXT/SQL processing failed"
      );
    }

  }

  // =========================
  // UNSUPPORTED FILE
  // =========================
  else {

    setUploadStatus(
      "Unsupported file format"
    );

    alert(
      "Unsupported file format"
    );
  }

};
  return (

    <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800 mt-8 overflow-auto">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">

        <div>

          <h2 className="text-2xl font-bold">
            Upload Dataset
          </h2>

          <p className="text-gray-400 text-sm mt-1">
            Supports CSV, Excel, TXT and SQL schema files
          </p>

        </div>

        <label className="bg-cyan-500 hover:bg-cyan-400 px-4 py-2 rounded-lg cursor-pointer text-sm font-semibold transition">

          Upload File

          <input
  ref={uploadRef}
  type="file"
  accept=".csv,.xlsx,.xls,.txt,.sql"
  className="hidden"
  onChange={handleFileUpload}
/>
        </label>

      </div>

      {/* FILE INFO */}
      {fileInfo && (

        <div className="bg-[#1F2937] p-4 rounded-xl mb-6 border border-gray-700">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">

            <div>

              <span className="text-cyan-400">
                File:
              </span>

              <p>
                {fileInfo.name}
              </p>

            </div>

            <div>

              <span className="text-cyan-400">
                Size:
              </span>

              <p>
                {fileInfo.size} KB
              </p>

            </div>

            <div>

              <span className="text-cyan-400">
                Status:
              </span>

              <p>
                {uploadStatus}
              </p>

            </div>

          </div>

        </div>
      )}

      {/* INSIGHTS */}
      {insights.length > 0 && (

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

          {insights.map(
            (item, index) => (

              <div
                key={index}
                className="bg-[#1F2937] p-4 rounded-xl border border-gray-700"
              >

                <p className="text-cyan-400 font-semibold">
                  {item}
                </p>

              </div>
            )
          )}

        </div>
      )}

      {/* DATASET INTELLIGENCE */}
{datasetIntelligence && (

  <div className="bg-[#1F2937] border border-cyan-500/30 p-5 rounded-2xl mb-6">

    <div className="flex flex-wrap gap-6">

      <div>

        <p className="text-gray-400 text-sm">
          Dataset Type
        </p>

        <h3 className="text-cyan-400 font-bold text-lg">

          {datasetIntelligence.datasetType}

        </h3>

      </div>

      <div>

        <p className="text-gray-400 text-sm">
          Rows
        </p>

        <h3 className="font-bold text-lg">

          {datasetIntelligence.rows}

        </h3>

      </div>

      <div>

        <p className="text-gray-400 text-sm">
          Columns
        </p>

        <h3 className="font-bold text-lg">

          {datasetIntelligence.columns}

        </h3>

      </div>

      <div>

        <p className="text-gray-400 text-sm">
          Ingestion Status
        </p>

        <h3 className="text-green-400 font-bold text-lg">

          {datasetIntelligence.ingestion}

        </h3>

      </div>

    </div>

  </div>

)}
      {/* SEARCH BAR */}
      <div className="mb-5">

        <input
          type="text"
          placeholder="Search records..."
          value={searchTerm}
          onChange={(e) => {

  setSearchTerm(
    e.target.value
  );

  setCurrentPage(1);

}}
          className="w-full bg-[#1F2937] border border-gray-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400"
        />

      </div>
      {/* DATASET INFO */}
<div className="flex justify-between items-center mb-4 text-sm text-gray-400">

  <p>
    Showing{" "}
    {paginatedData.length}
    {" "}of{" "}
    {filteredData.length}
    {" "}records
  </p>

  <p>
    Page {currentPage}
    {" "}of{" "}
    {totalPages || 1}
  </p>

</div>

            {/* TABLE */}
      {filteredData.length > 0 ? (

        <>
          <div className="overflow-auto">

            <table className="w-full text-sm text-left">

              <thead>

                <tr className="text-cyan-400 border-b border-gray-700">

                  {Object.keys(
                    filteredData[0]
                  ).map((key) => (

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

                {paginatedData.map(
                  (row, index) => (

                    <tr
                      key={index}
                      className="border-b border-gray-800 hover:bg-[#1F2937]"
                    >

                      {Object.values(row).map(
                        (value, i) => (

                          <td
                            key={i}
                            className="p-3 whitespace-nowrap"
                          >

                            {String(value)}

                          </td>
                        )
                      )}

                    </tr>
                  ))}

              </tbody>

            </table>

          </div>

          {/* PAGINATION */}
          <div className="flex justify-center items-center gap-4 mt-6">

            <button
              onClick={() =>
                setCurrentPage(
                  (prev) =>
                    Math.max(prev - 1, 1)
                )
              }
              className="bg-[#1F2937] px-4 py-2 rounded-lg border border-gray-700 hover:border-cyan-400"
            >
              Previous
            </button>

            <button
              onClick={() =>
                setCurrentPage(
                  (prev) =>
                    Math.min(
                      prev + 1,
                      totalPages
                    )
                )
              }
              className="bg-cyan-500 px-4 py-2 rounded-lg text-black font-semibold hover:bg-cyan-400"
            >
              Next
            </button>

          </div>
        </>

      ) : (

        <div className="text-gray-400 text-center py-16">

          Upload enterprise datasets to begin analytics

        </div>

      )}
    </div>
  );
}

export default UploadDataset;