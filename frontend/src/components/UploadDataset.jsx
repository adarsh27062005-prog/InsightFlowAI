import { useState, useMemo } from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";

import {
  Upload,
  Database,
  FileSpreadsheet,
  Search,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

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

  const [isUploading, setIsUploading] =
    useState(false);

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
  const filteredData =
    useMemo(() => {

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
  const handleFileUpload =
    async (event) => {

      const file =
        event.target.files[0];

      if (!file) return;

      setIsUploading(true);

      const fileName =
        file.name.toLowerCase();

      setUploadStatus(
        "Processing dataset..."
      );

      setFileInfo({
        name: file.name,
        size: (
          file.size / 1024
        ).toFixed(2),
        type: file.type,
      });

      // =========================
      // PREPROCESS
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

            setData(
              result.data || []
            );

            setUploadStatus(
              "Dataset uploaded successfully"
            );

          } catch (error) {

            console.error(error);

            setUploadStatus(
              "Backend preprocessing failed"
            );

          } finally {

            setIsUploading(false);

          }
        };

      // CSV
      if (
        fileName.endsWith(".csv")
      ) {

        Papa.parse(file, {

          header: true,

          skipEmptyLines: true,

          complete: async (
            results
          ) => {

            await preprocessAndSetData(
              results.data
            );

          },

          error: () => {

            setUploadStatus(
              "CSV parsing failed"
            );

            setIsUploading(false);

          },

        });

      }

      // EXCEL
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

          setIsUploading(false);

        }

      }

      // UNSUPPORTED
      else {

        setUploadStatus(
          "Unsupported file format"
        );

        setIsUploading(false);

      }

    };

  return (

    <div className="bg-[#111827] border border-gray-800 rounded-3xl p-8 mt-8">

      {/* HEADER */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 mb-8">

        <div>

          <div className="flex items-center gap-3 mb-3">

            <Database
              size={22}
              className="text-cyan-400"
            />

            <span className="text-cyan-400 font-semibold text-sm">

              Enterprise Dataset Engine

            </span>

          </div>

          <h2 className="text-4xl font-black">

            Upload Intelligence Hub

          </h2>

          <p className="text-gray-400 mt-3 max-w-3xl leading-7">

            Upload enterprise healthcare, operational,
            enrollment, revenue, provider, workflow,
            or SLA datasets for AI-powered analytics.

          </p>

        </div>

        <label className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-5 rounded-2xl cursor-pointer transition-all duration-300 inline-flex items-center gap-3">

          <Upload size={20} />

          Upload Dataset

          <input
            ref={uploadRef}
            type="file"
            accept=".csv,.xlsx,.xls,.txt,.sql"
            className="hidden"
            onChange={handleFileUpload}
          />

        </label>

      </div>

      {/* STATUS */}
      {(fileInfo || uploadStatus) && (

        <div className="bg-[#1F2937] border border-gray-700 rounded-2xl p-6 mb-8">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            <div>

              <p className="text-gray-400 text-sm mb-2">
                File
              </p>

              <h3 className="font-semibold break-all">

                {fileInfo?.name}
              </h3>

            </div>

            <div>

              <p className="text-gray-400 text-sm mb-2">
                Size
              </p>

              <h3 className="font-semibold">

                {fileInfo?.size} KB
              </h3>

            </div>

            <div>

              <p className="text-gray-400 text-sm mb-2">
                Status
              </p>

              <div className="flex items-center gap-2">

                {isUploading ? (
                  <Loader2
                    size={18}
                    className="animate-spin text-cyan-400"
                  />
                ) : uploadStatus.includes(
                    "success"
                  ) ? (
                  <CheckCircle2
                    size={18}
                    className="text-green-400"
                  />
                ) : (
                  <AlertCircle
                    size={18}
                    className="text-yellow-400"
                  />
                )}

                <span>
                  {uploadStatus}
                </span>

              </div>

            </div>

            <div>

              <p className="text-gray-400 text-sm mb-2">
                Records
              </p>

              <h3 className="font-bold text-cyan-400 text-2xl">

                {data.length}
              </h3>

            </div>

          </div>

        </div>

      )}

      {/* INTELLIGENCE */}
      {datasetIntelligence && (

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">

          <div className="bg-[#1F2937] border border-gray-700 rounded-2xl p-6">

            <p className="text-gray-400 text-sm">
              Dataset Type
            </p>

            <h3 className="text-cyan-400 font-bold mt-3">

              {datasetIntelligence.datasetType}
            </h3>

          </div>

          <div className="bg-[#1F2937] border border-gray-700 rounded-2xl p-6">

            <p className="text-gray-400 text-sm">
              Rows
            </p>

            <h3 className="text-4xl font-black mt-3">

              {datasetIntelligence.rows}
            </h3>

          </div>

          <div className="bg-[#1F2937] border border-gray-700 rounded-2xl p-6">

            <p className="text-gray-400 text-sm">
              Columns
            </p>

            <h3 className="text-4xl font-black mt-3">

              {datasetIntelligence.columns}
            </h3>

          </div>

          <div className="bg-[#1F2937] border border-gray-700 rounded-2xl p-6">

            <p className="text-gray-400 text-sm">
              Ingestion
            </p>

            <h3 className="text-green-400 font-bold mt-3">

              Successful
            </h3>

          </div>

        </div>

      )}

      {/* SEARCH */}
      <div className="relative mb-8">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search uploaded dataset..."
          value={searchTerm}
          onChange={(e) => {

            setSearchTerm(
              e.target.value
            );

            setCurrentPage(1);

          }}
          className="w-full bg-[#1F2937] border border-gray-700 rounded-2xl pl-12 pr-4 py-4 outline-none focus:border-cyan-400"
        />

      </div>

      {/* TABLE */}
      {filteredData.length > 0 ? (

        <div className="overflow-auto rounded-2xl border border-gray-700">

          <table className="w-full text-sm">

            <thead className="bg-[#1F2937]">

              <tr>

                {Object.keys(
                  filteredData[0]
                ).map((key) => (

                  <th
                    key={key}
                    className="p-4 text-left text-cyan-400 whitespace-nowrap"
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
                    className="border-t border-gray-800 hover:bg-[#1F2937]/50 transition"
                  >

                    {Object.values(row).map(
                      (value, i) => (

                        <td
                          key={i}
                          className="p-4 whitespace-nowrap"
                        >

                          {String(value)}

                        </td>

                      )
                    )}

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      ) : (

        <div className="bg-[#1F2937] border border-gray-700 rounded-3xl py-20 text-center">

          <FileSpreadsheet
            size={60}
            className="mx-auto text-cyan-400 mb-6"
          />

          <h3 className="text-2xl font-bold mb-3">

            No Dataset Uploaded

          </h3>

          <p className="text-gray-400">

            Upload enterprise datasets to begin AI analytics

          </p>

        </div>

      )}

      {/* PAGINATION */}
      {filteredData.length > 0 && (

        <div className="flex justify-between items-center mt-8">

          <div className="text-sm text-gray-400">

            Showing {paginatedData.length} of{" "}
            {filteredData.length} records

          </div>

          <div className="flex items-center gap-4">

            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.max(prev - 1, 1)
                )
              }
              className="bg-[#1F2937] border border-gray-700 hover:border-cyan-400 px-5 py-3 rounded-xl transition"
            >

              Previous

            </button>

            <div className="text-sm text-gray-400">

              Page {currentPage} of{" "}
              {totalPages}

            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(
                    prev + 1,
                    totalPages
                  )
                )
              }
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-5 py-3 rounded-xl transition"
            >

              Next

            </button>

          </div>

        </div>

      )}

    </div>

  );
}

export default UploadDataset;