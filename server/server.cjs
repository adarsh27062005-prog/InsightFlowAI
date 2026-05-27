const express = require("express");
const cors = require("cors");

const app = express();

// =========================
// MIDDLEWARE
// =========================
app.use(cors());

app.use(
  express.json({
    limit: "100mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "100mb",
  })
);

// =========================
// ROOT
// =========================
app.get("/", (req, res) => {
  res.json({
    message: "InsightFlow AI Backend Running",
    status: "active",
  });
});

// =========================
// PREPROCESS API
// =========================
app.post("/api/preprocess", (req, res) => {
  try {
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({
        success: false,
        message: "No data received",
      });
    }

    const cleanedData = data.map((row) => {
      const cleanedRow = {};

      Object.keys(row).forEach((key) => {
        let value = row[key];

        if (
          value === null ||
          value === undefined ||
          value === ""
        ) {
          value = "N/A";
        }

        if (typeof value === "string") {
          value = value.trim();
        }

        cleanedRow[key] = value;
      });

      return cleanedRow;
    });

    res.json({
      success: true,
      data: cleanedData,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Preprocess failed",
    });

  }
});

// =========================
// SYNTHETIC DATA GENERATOR
// =========================
app.post("/api/generate-dataset", (req, res) => {

  try {

    const { columns, rows } = req.body;

    if (!columns || columns.length === 0) {

      return res.status(400).json({
        success: false,
        message: "No columns received",
      });

    }

    const totalRows = rows || 100;

    const generatedData = [];

    // =========================
    // HELPERS
    // =========================
    const randomItem = (arr) =>
      arr[Math.floor(Math.random() * arr.length)];

    // =========================
    // SEMANTIC BUSINESS DATA
    // =========================
    const distributors = [
      "Cardinal Health",
      "McKesson",
      "AmerisourceBergen",
      "Medline",
      "Walgreens Distribution",
    ];

    const products = [
      "Insulin Kit",
      "Heart Monitor",
      "Surgical Mask",
      "Blood Pressure Device",
      "Glucose Meter",
      "Ventilator",
      "IV Pump",
    ];

    const regions = [
      "Texas",
      "California",
      "Florida",
      "New York",
      "Illinois",
    ];

    const statuses = [
      "Completed",
      "Pending",
      "Returned",
      "Cancelled",
    ];

    const customers = [
      "City Hospital",
      "CareOne Clinic",
      "Apollo Healthcare",
      "Metro Medical",
      "Sunrise Hospital",
    ];

    // =========================
    // ROW GENERATION
    // =========================
    for (let i = 0; i < totalRows; i++) {

      const row = {};

      columns.forEach((column) => {

        const lower = column.toLowerCase();

        // DISTRIBUTOR
        if (
          lower.includes("distributor") ||
          lower.includes("vendor") ||
          lower.includes("supplier")
        ) {

          row[column] =
            randomItem(distributors);

        }

        // PRODUCT
        else if (
          lower.includes("product") ||
          lower.includes("item") ||
          lower.includes("sku")
        ) {

          row[column] =
            randomItem(products);

        }

        // CUSTOMER
        else if (
          lower.includes("customer") ||
          lower.includes("client")
        ) {

          row[column] =
            randomItem(customers);

        }

        // REGION
        else if (
          lower.includes("region") ||
          lower.includes("state") ||
          lower.includes("city")
        ) {

          row[column] =
            randomItem(regions);

        }

        // QUANTITY
        else if (
          lower.includes("qty") ||
          lower.includes("quantity") ||
          lower.includes("units")
        ) {

          row[column] =
            Math.floor(Math.random() * 500) + 1;

        }

        // REVENUE
        else if (
          lower.includes("sales") ||
          lower.includes("revenue") ||
          lower.includes("amount")
        ) {

          row[column] =
            (
              Math.random() * 50000
            ).toFixed(2);

        }

        // STATUS
        else if (
          lower.includes("status")
        ) {

          row[column] =
            randomItem(statuses);

        }

        // DATE
        else if (
          lower.includes("date") ||
          lower.includes("month") ||
          lower.includes("time")
        ) {

          const randomDate =
            new Date(
              2025,
              Math.floor(Math.random() * 12),
              Math.floor(Math.random() * 28) + 1
            );

          row[column] =
            randomDate
              .toISOString()
              .split("T")[0];

        }

        // DEFAULT
        else {

          row[column] =
            `Value_${i + 1}`;

        }

      });

      generatedData.push(row);

    }

    res.json({
      success: true,
      data: generatedData,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Dataset generation failed",
    });

  }

});

// =========================
// AI CHAT ENGINE
// =========================
app.post("/api/ai-chat", (req, res) => {

  try {

    const { question, data } = req.body;

    if (!data || data.length === 0) {

      return res.json({
        answer:
          "Please upload or generate a dataset first.",
      });

    }

    const lower =
      question.toLowerCase();

    const columns =
      Object.keys(data[0]);

    // =========================
    // FIND COLUMN
    // =========================
    const findColumn = (keywords) => {

      return columns.find((col) => {

        const lowerCol =
          col.toLowerCase();

        return keywords.some((key) =>
          lowerCol.includes(key)
        );

      });

    };

    const distributorColumn =
      findColumn([
        "distributor",
        "vendor",
        "supplier",
      ]);

    const productColumn =
      findColumn([
        "product",
        "item",
        "sku",
      ]);

    const revenueColumn =
      findColumn([
        "revenue",
        "sales",
        "amount",
      ]);

    const quantityColumn =
      findColumn([
        "quantity",
        "qty",
        "units",
      ]);

    const regionColumn =
      findColumn([
        "region",
        "state",
        "city",
      ]);

    // =========================
    // TOTAL RECORDS
    // =========================
    if (
      lower.includes("total") &&
      lower.includes("record")
    ) {

      return res.json({
        answer:
          `Total dataset records: ${data.length}`,
      });

    }

    // =========================
    // TOP DISTRIBUTOR
    // =========================
    if (
      lower.includes("top distributor")
    ) {

      if (
        distributorColumn &&
        quantityColumn
      ) {

        const totals = {};

        data.forEach((row) => {

          const distributor =
            row[distributorColumn];

          const qty =
            Number(
              row[quantityColumn]
            ) || 0;

          totals[distributor] =
            (totals[distributor] || 0)
            + qty;

        });

        const best =
          Object.keys(totals).reduce(
            (a, b) =>
              totals[a] > totals[b]
                ? a
                : b
          );

        return res.json({
          answer:
            `Top distributor is ${best} with quantity ${totals[best]}`,
        });

      }

    }

    // =========================
    // TOP PRODUCT
    // =========================
    if (
      lower.includes("top product")
    ) {

      if (
        productColumn &&
        quantityColumn
      ) {

        const totals = {};

        data.forEach((row) => {

          const product =
            row[productColumn];

          const qty =
            Number(
              row[quantityColumn]
            ) || 0;

          totals[product] =
            (totals[product] || 0)
            + qty;

        });

        const best =
          Object.keys(totals).reduce(
            (a, b) =>
              totals[a] > totals[b]
                ? a
                : b
          );

        return res.json({
          answer:
            `Top product is ${best} with quantity ${totals[best]}`,
        });

      }

    }

    // =========================
    // REVENUE
    // =========================
    if (
      lower.includes("revenue") ||
      lower.includes("sales")
    ) {

      if (revenueColumn) {

        let total = 0;

        data.forEach((row) => {

          total +=
            Number(
              row[revenueColumn]
            ) || 0;

        });

        return res.json({
          answer:
            `Total revenue generated is $${total.toLocaleString()}`,
        });

      }

    }

    // =========================
    // REGION
    // =========================
    if (
      lower.includes("region")
    ) {

      if (regionColumn) {

        const counts = {};

        data.forEach((row) => {

          const region =
            row[regionColumn];

          counts[region] =
            (counts[region] || 0)
            + 1;

        });

        const summary =
          Object.entries(counts)
            .map(
              ([key, value]) =>
                `${key}: ${value}`
            )
            .join("\n");

        return res.json({
          answer:
            `Regional distribution:\n${summary}`,
        });

      }

    }

    // =========================
    // EXECUTIVE SUMMARY
    // =========================
    if (
      lower.includes("summary") ||
      lower.includes("executive")
    ) {

      return res.json({
        answer:
`
Executive Summary

• Total Records: ${data.length}

• Total Columns: ${columns.length}

• Semantic AI Engine: Active

• Distributor Intelligence: Enabled

• Product Intelligence: Enabled

• Revenue Analytics: Enabled

• Regional Analytics: Enabled
`,
      });

    }

    // =========================
    // DEFAULT
    // =========================
    return res.json({
      answer:
        "I can analyze distributors, products, revenue, quantity, regions and executive summaries.",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      answer:
        "AI semantic processing failed.",
    });

  }

});

// =========================
// AI INSIGHTS API
// =========================
app.post("/api/ai-insights", (req, res) => {

  try {

    const { data } = req.body;

    if (!data) {

      return res.status(400).json({
        success: false,
        message: "No data received",
      });

    }

    const insights = [

      `Dataset contains ${data.length} records.`,

      "AI preprocessing completed successfully.",

      "Synthetic intelligence active.",

      "Operational monitoring engine running.",

    ];

    res.json({
      success: true,
      insights,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "AI insights failed",
    });

  }

});

// =========================
// SERVER START
// =========================
app.listen(5000, () => {

  console.log("Server running on port 5000");

});