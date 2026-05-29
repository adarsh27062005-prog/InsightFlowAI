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
  // DATASET INFO
  // =========================

  const datasetIntelligence =
    useMemo(() => {

      if (!data.length) {
        return null;
      }

      const columns =
        Object.keys(data[0]);

      return {
        rows: data.length,
        columns: columns.length,
      };

    }, [data]);

  // =========================
  // FILTER
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
  // FILE UPLOAD
  // =========================

  const handleFileUpload =
    async (event) => {

      const file =
        event.target.files[0];

      if (!file) return;

      setIsUploading(true);

      setUploadStatus(
        "Uploading dataset..."
      );

      setFileInfo({
        name: file.name,
        size: (
          file.size / 1024
        ).toFixed(2),
      });

      try {

        // =========================
        // SEND FILE TO BACKEND
        // =========================

        const formData =
          new FormData();

        formData.append(
          "file",
          file
        );

        const response =
          await fetch(
            "https://insightflowai-krc3.onrender.com/upload/csv",
            {
              method: "POST",
              body: formData,
            }
          );

        if (!response.ok) {

          throw new Error(
            "Upload failed"
          );

        }

        const result =
          await response.json();

        console.log(result);

        // =========================
        // IMPORTANT FIX
        // =========================

        if (
          result.preview &&
          Array.isArray(result.preview)
        ) {

          setData(result.preview);

        } else {

          setData([]);

        }

        setUploadStatus(
          "Dataset uploaded successfully"
        );

      } catch (error) {

        console.error(error);

        setUploadStatus(
          "Backend upload failed"
        );

      } finally {

        setIsUploading(false);

      }

    };

  return (

    <div className="bg-[#111827] border border-gray-800 rounded-3xl p-8 mt-8">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-4xl font-black">

            Upload Intelligence Hub

          </h2>

          <p className="text-gray-400 mt-2">

            Upload datasets for AI analytics

          </p>

        </div>

        <label className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-4 rounded-2xl cursor-pointer flex items-center gap-3">

          <Upload size={20} />

          Upload Dataset

          <input
            ref={uploadRef}
            type="file"
            accept=".csv,.xlsx,.xls"
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

              <p className="text-gray-400 text-sm">
                File
              </p>

              <h3 className="font-semibold">
                {fileInfo?.name}
              </h3>

            </div>

            <div>

              <p className="text-gray-400 text-sm">
                Size
              </p>

              <h3 className="font-semibold">
                {fileInfo?.size} KB
              </h3>

            </div>

            <div>

              <p className="text-gray-400 text-sm">
                Status
              </p>

              <div className="flex items-center gap-2">

                {isUploading ? (
                  <Loader2
                    size={18}
                    className="animate-spin text-cyan-400"
                  />
                ) : uploadStatus.includes(
                    "successfully"
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

              <p className="text-gray-400 text-sm">
                Records
              </p>

              <h3 className="text-cyan-400 text-2xl font-bold">

                {data.length}

              </h3>

            </div>

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
          placeholder="Search dataset..."
          value={searchTerm}
          onChange={(e) => {

            setSearchTerm(
              e.target.value
            );

            setCurrentPage(1);

          }}
          className="w-full bg-[#1F2937] border border-gray-700 rounded-2xl pl-12 pr-4 py-4 outline-none"
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
                    className="p-4 text-left text-cyan-400"
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
                    className="border-t border-gray-800"
                  >

                    {Object.values(row).map(
                      (value, i) => (

                        <td
                          key={i}
                          className="p-4"
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

          <h3 className="text-2xl font-bold">

            No Dataset Uploaded

          </h3>

        </div>

      )}

    </div>

  );

}

export default UploadDataset;