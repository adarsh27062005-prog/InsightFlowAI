import { useRef } from "react";

function DDLUpload({
  setSchema,
}) {

  const fileRef = useRef(null);

  // =========================
  // SEMANTIC COLUMN DETECTOR
  // =========================
  const detectSemanticType = (
    columnName
  ) => {

    const lower =
      columnName.toLowerCase();

    // =========================
    // DISTRIBUTOR
    // =========================
    if (

      lower.includes("distributor") ||
      lower.includes("vendor") ||
      lower.includes("supplier")

    ) {

      return "Distributor";

    }

    // =========================
    // PRODUCT
    // =========================
    if (

      lower.includes("product") ||
      lower.includes("item") ||
      lower.includes("sku")

    ) {

      return "Product";

    }

    // =========================
    // SALES
    // =========================
    if (

      lower.includes("sales") ||
      lower.includes("revenue") ||
      lower.includes("amount")

    ) {

      return "Revenue";

    }

    // =========================
    // QUANTITY
    // =========================
    if (

      lower.includes("qty") ||
      lower.includes("quantity") ||
      lower.includes("units")

    ) {

      return "Quantity";

    }

    // =========================
    // DATE
    // =========================
    if (

      lower.includes("date") ||
      lower.includes("time") ||
      lower.includes("month")

    ) {

      return "Date";

    }

    // =========================
    // CUSTOMER
    // =========================
    if (

      lower.includes("customer") ||
      lower.includes("client")

    ) {

      return "Customer";

    }

    // =========================
    // REGION
    // =========================
    if (

      lower.includes("region") ||
      lower.includes("state") ||
      lower.includes("city") ||
      lower.includes("country")

    ) {

      return "Region";

    }

    // =========================
    // STATUS
    // =========================
    if (
      lower.includes("status")
    ) {

      return "Status";

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
        "Tracks distributor or supplier information.",

      Product:
        "Represents product or SKU level details.",

      Revenue:
        "Stores sales or revenue metrics.",

      Quantity:
        "Represents units sold or shipped.",

      Date:
        "Captures operational or transaction dates.",

      Customer:
        "Contains customer level information.",

      Region:
        "Tracks geography or regional analytics.",

      Status:
        "Represents operational workflow status.",

      General:
        "General operational business field.",

    };

    return (
      descriptions[
        semanticType
      ] || descriptions.General
    );

  };

  // =========================
  // PARSE DDL
  // =========================
  const parseDDL = (text) => {

  // =========================
  // ADVANCED DDL REGEX
  // =========================
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

    // =========================
    // OPERATION CATEGORY
    // =========================
    let operationalCategory =
      "General Analytics";

    if (
      semanticType ===
      "Revenue"
    ) {

      operationalCategory =
        "Sales Analytics";

    }

    else if (
      semanticType ===
      "Distributor"
    ) {

      operationalCategory =
        "Supply Chain";

    }

    else if (
      semanticType ===
      "Product"
    ) {

      operationalCategory =
        "Product Intelligence";

    }

    else if (
      semanticType ===
      "Customer"
    ) {

      operationalCategory =
        "Customer Analytics";

    }

    else if (
      semanticType ===
      "Region"
    ) {

      operationalCategory =
        "Regional Intelligence";

    }

    // =========================
    // SAMPLE VALUES
    // =========================
    let sampleValues = [];

    if (
      semanticType ===
      "Distributor"
    ) {

      sampleValues = [

        "ABC Distribution",
        "Global Supply Inc",
        "West Coast Retail",

      ];

    }

    else if (
      semanticType ===
      "Product"
    ) {

      sampleValues = [

        "SKU-1001",
        "Laptop Pro",
        "Wireless Mouse",

      ];

    }

    else if (
      semanticType ===
      "Revenue"
    ) {

      sampleValues = [

        "12000",
        "4500",
        "9800",

      ];

    }

    else if (
      semanticType ===
      "Region"
    ) {

      sampleValues = [

        "California",
        "Texas",
        "New York",

      ];

    }

    else if (
      semanticType ===
      "Status"
    ) {

      sampleValues = [

        "Completed",
        "Pending",
        "Returned",

      ];

    }

    columns.push({

      name,

      type,

      semanticType,

      description:
        generateDescription(
          semanticType
        ),

      operationalCategory,

      sampleValues,

    });

  }

  return columns;

};
  // =========================
  // HANDLE FILE
  // =========================
  const handleUpload =
    async (e) => {

      const file =
        e.target.files[0];

      if (!file) return;

      const text =
        await file.text();

      const parsed =
        parseDDL(text);

      console.log(
        "Parsed Schema:",
        parsed
      );

      setSchema(parsed);

    };

  return (

    <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800">

      {/* HEADER */}
      <div className="mb-6">

        <h2 className="text-2xl font-bold">

          EDI / DDL Upload Engine

        </h2>

        <p className="text-gray-400 text-sm mt-1">

          Upload EDI 867 or SQL DDL schema for semantic analytics generation

        </p>

      </div>

      {/* BUTTON */}
      <button
        onClick={() =>
          fileRef.current?.click()
        }
        className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-3 rounded-xl font-semibold transition"
      >

        Upload DDL File

      </button>

      {/* INPUT */}
      <input
        ref={fileRef}
        type="file"
        accept=".sql,.txt"
        onChange={handleUpload}
        className="hidden"
      />

    </div>

  );
}

export default DDLUpload;
