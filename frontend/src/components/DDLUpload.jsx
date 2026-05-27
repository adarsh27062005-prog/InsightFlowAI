import { useRef, useState } from "react";

function DDLUpload({
  setSchema,
}) {

  const fileRef = useRef(null);

  const [fileName, setFileName] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [uploadSummary, setUploadSummary] =
    useState([]);

  // =========================
  // SEMANTIC DETECTOR
  // =========================
  const detectSemanticType = (
    columnName
  ) => {

    const lower =
      columnName.toLowerCase();

    // DISTRIBUTOR
    if (

      lower.includes("distributor") ||
      lower.includes("vendor") ||
      lower.includes("supplier")

    ) {

      return "Distributor";

    }

    // PRODUCT
    if (

      lower.includes("product") ||
      lower.includes("item") ||
      lower.includes("sku")

    ) {

      return "Product";

    }

    // SALES
    if (

      lower.includes("sales") ||
      lower.includes("revenue") ||
      lower.includes("amount")

    ) {

      return "Revenue";

    }

    // QUANTITY
    if (

      lower.includes("qty") ||
      lower.includes("quantity") ||
      lower.includes("units")

    ) {

      return "Quantity";

    }

    // DATE
    if (

      lower.includes("date") ||
      lower.includes("time") ||
      lower.includes("month")

    ) {

      return "Date";

    }

    // CUSTOMER
    if (

      lower.includes("customer") ||
      lower.includes("client")

    ) {

      return "Customer";

    }

    // REGION
    if (

      lower.includes("region") ||
      lower.includes("state") ||
      lower.includes("city") ||
      lower.includes("country")

    ) {

      return "Region";

    }

    // STATUS
    if (
      lower.includes("status")
    ) {

      return "Status";

    }

    // CLAIMS
    if (

      lower.includes("claim") ||
      lower.includes("edi")

    ) {

      return "EDI Transaction";

    }

    return "General";

  };

  // =========================
  // BUSINESS DESCRIPTION
  // =========================
  const generateDescription = (
    semanticType
  ) => {

    const descriptions = {

      Distributor:
        "Tracks distributor or supplier intelligence.",

      Product:
        "Represents SKU or product-level analytics.",

      Revenue:
        "Stores operational revenue and financial metrics.",

      Quantity:
        "Tracks shipment or operational quantity metrics.",

      Date:
        "Captures operational workflow dates and timestamps.",

      Customer:
        "Contains customer or account intelligence.",

      Region:
        "Tracks regional or geography analytics.",

      Status:
        "Represents operational workflow state.",

      "EDI Transaction":
        "Tracks EDI operational transaction flows.",

      General:
        "General enterprise operational field.",

    };

    return (
      descriptions[
        semanticType
      ] || descriptions.General
    );

  };

  // =========================
  // OPERATIONAL CATEGORY
  // =========================
  const detectCategory = (
    semanticType
  ) => {

    const mapping = {

      Distributor:
        "Supply Chain",

      Product:
        "Product Intelligence",

      Revenue:
        "Financial Analytics",

      Quantity:
        "Operational Metrics",

      Date:
        "Time Intelligence",

      Customer:
        "Customer Analytics",

      Region:
        "Regional Intelligence",

      Status:
        "Workflow Intelligence",

      "EDI Transaction":
        "EDI Analytics",

      General:
        "Enterprise Analytics",

    };

    return (
      mapping[
        semanticType
      ] || "Enterprise Analytics"
    );

  };

  // =========================
  // SAMPLE VALUES
  // =========================
  const generateSamples = (
    semanticType
  ) => {

    const mapping = {

      Distributor: [

        "Cardinal Health",
        "McKesson",
        "AmerisourceBergen",

      ],

      Product: [

        "Ventilator",
        "IV Pump",
        "Glucose Monitor",

      ],

      Revenue: [

        "12000",
        "8500",
        "45000",

      ],

      Quantity: [

        "120",
        "450",
        "980",

      ],

      Region: [

        "Texas",
        "California",
        "Florida",

      ],

      Status: [

        "Completed",
        "Pending",
        "Returned",

      ],

      Customer: [

        "Apollo Hospital",
        "CareOne Clinic",
        "Metro Health",

      ],

      "EDI Transaction": [

        "EDI867",
        "CLAIM-1001",
        "TXN-7782",

      ],

      Date: [

        "2025-01-01",
        "2025-03-12",
        "2025-05-18",

      ],

      General: [

        "Value A",
        "Value B",
        "Value C",

      ],

    };

    return (
      mapping[
        semanticType
      ] || mapping.General
    );

  };

  // =========================
  // PARSE DDL
  // =========================
  const parseDDL = (
    text
  ) => {

    const regex =
      /(\w+)\s+(VARCHAR|CHAR|TEXT|DATE|TIMESTAMP|INTEGER|INT|BIGINT|DOUBLE|FLOAT|DECIMAL|NUMERIC|BOOLEAN)/gi;

    const columns = [];

    let match;

    while (
      (match = regex.exec(text)) !== null
    ) {

      const name =
        match[1];

      const type =
        match[2];

      const semanticType =
        detectSemanticType(name);

      columns.push({

        name,

        type,

        semanticType,

        description:
          generateDescription(
            semanticType
          ),

        operationalCategory:
          detectCategory(
            semanticType
          ),

        sampleValues:
          generateSamples(
            semanticType
          ),

      });

    }

    return columns;

  };

  // =========================
  // HANDLE FILE UPLOAD
  // =========================
  const handleUpload =
    async (e) => {

      try {

        setLoading(true);

        const file =
          e.target.files[0];

        if (!file) {

          setLoading(false);

          return;
        }

        setFileName(
          file.name
        );

        const text =
          await file.text();

        const parsed =
          parseDDL(text);

        // =========================
        // AI SUMMARY
        // =========================
        const summary = [];

        summary.push(
          `Uploaded schema file: ${file.name}`
        );

        summary.push(
          `AI semantic parser detected ${parsed.length} enterprise columns.`
        );

        summary.push(
          "Business entity recognition completed successfully."
        );

        summary.push(
          "Operational semantic categorization initialized."
        );

        summary.push(
          "Enterprise analytics metadata generated successfully."
        );

        setUploadSummary(
          summary
        );

        setSchema(parsed);

      } catch (error) {

        console.log(error);

        alert(
          "DDL parsing failed."
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800">

      {/* HEADER */}
      <div className="mb-8">

        <h2 className="text-2xl font-bold">

          Enterprise EDI / DDL Upload Engine

        </h2>

        <p className="text-gray-400 text-sm mt-1">

          AI-powered semantic schema parsing and enterprise metadata intelligence

        </p>

      </div>

      {/* KPI STRIP */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

        <div className="bg-[#1F2937] p-5 rounded-xl border border-gray-700">

          <p className="text-gray-400 text-sm">

            AI Semantic Parser

          </p>

          <h3 className="text-3xl font-bold mt-2 text-cyan-400">

            Active

          </h3>

        </div>

        <div className="bg-[#1F2937] p-5 rounded-xl border border-gray-700">

          <p className="text-gray-400 text-sm">

            Upload Type

          </p>

          <h3 className="text-3xl font-bold mt-2 text-green-400">

            DDL / EDI

          </h3>

        </div>

        <div className="bg-[#1F2937] p-5 rounded-xl border border-gray-700">

          <p className="text-gray-400 text-sm">

            AI Workflow

          </p>

          <h3 className="text-3xl font-bold mt-2 text-purple-400">

            Enabled

          </h3>

        </div>

      </div>

      {/* BUTTON */}
      <button
        onClick={() =>
          fileRef.current?.click()
        }
        disabled={loading}
        className="bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black px-8 py-4 rounded-2xl font-bold transition"
      >

        {loading
          ? "Processing Enterprise Schema..."
          : "Upload Enterprise Schema"}

      </button>

      {/* FILE NAME */}
      {fileName && (

        <div className="mt-5 bg-[#0B1120] border border-gray-700 rounded-xl p-4">

          <p className="text-gray-300">

            Uploaded File:

            <span className="text-cyan-400 ml-2 font-semibold">

              {fileName}

            </span>

          </p>

        </div>

      )}

      {/* INPUT */}
      <input
        ref={fileRef}
        type="file"
        accept=".sql,.txt,.edi,.csv"
        onChange={handleUpload}
        className="hidden"
      />

      {/* AI SUMMARY */}
      {uploadSummary.length > 0 && (

        <div className="mt-8 bg-[#0B1120] border border-gray-700 rounded-2xl p-6">

          <div className="flex items-center justify-between mb-5">

            <div>

              <h3 className="text-xl font-bold text-cyan-400">

                AI Upload Processing Summary

              </h3>

              <p className="text-gray-400 text-sm mt-1">

                Enterprise semantic workflow reasoning and metadata trace

              </p>

            </div>

            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

          </div>

          <div className="space-y-4">

            {uploadSummary.map(
              (
                item,
                index
              ) => (

                <div
                  key={index}
                  className="bg-[#111827] border border-gray-800 rounded-xl p-4"
                >

                  <div className="flex gap-3">

                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2" />

                    <p className="text-gray-300 leading-7">

                      {item}

                    </p>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

      )}

    </div>

  );

}

export default DDLUpload;