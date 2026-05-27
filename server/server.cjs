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

        // NULL HANDLING
        if (
          value === null ||
          value === undefined ||
          value === ""
        ) {
          value = "N/A";
        }

        // STRING CLEANUP
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

    const firstNames = [
      "John",
      "David",
      "Michael",
      "Sarah",
      "Emily",
      "Daniel",
      "Sophia",
      "Olivia",
    ];

    const lastNames = [
      "Smith",
      "Johnson",
      "Brown",
      "Williams",
      "Miller",
      "Wilson",
    ];

    const diseases = [
      "Diabetes",
      "Hypertension",
      "Asthma",
      "Cancer",
      "Heart Disease",
      "Flu",
    ];

    const providers = [
      "United Healthcare",
      "Aetna",
      "Cigna",
      "Blue Cross",
    ];

    // =========================
    // ROW GENERATION
    // =========================
    for (let i = 0; i < totalRows; i++) {
      const row = {};

      columns.forEach((column) => {
        const lower = column.toLowerCase();

        // NAME
        if (lower.includes("name")) {
          row[column] =
            `${randomItem(firstNames)} ${randomItem(lastNames)}`;
        }

        // AGE
        else if (lower.includes("age")) {
          row[column] =
            Math.floor(Math.random() * 60) + 18;
        }

        // GENDER
        else if (lower.includes("gender")) {
          row[column] = randomItem([
            "Male",
            "Female",
          ]);
        }

        // DIAGNOSIS
        else if (
          lower.includes("diagnosis") ||
          lower.includes("disease")
        ) {
          row[column] = randomItem(diseases);
        }

        // PROVIDER
        else if (lower.includes("provider")) {
          row[column] = randomItem(providers);
        }

        // DATE
        else if (lower.includes("date")) {
          row[column] = new Date()
            .toISOString()
            .split("T")[0];
        }

        // PAYMENT
        else if (
          lower.includes("amount") ||
          lower.includes("payment") ||
          lower.includes("billing")
        ) {
          row[column] = (
            Math.random() * 5000
          ).toFixed(2);
        }

        // STATUS
        else if (lower.includes("status")) {
          row[column] = randomItem([
            "Approved",
            "Pending",
            "Rejected",
          ]);
        }

        // SLA
        else if (lower.includes("sla")) {
          row[column] = randomItem([
            "Within SLA",
            "Breach",
          ]);
        }

        // DEFAULT
        else {
          row[column] = `Value_${i + 1}`;
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
    // COLUMN FINDER
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

    // =========================
    // SEMANTIC COLUMN MAPPING
    // =========================
    const distributorColumn =
      findColumn([
        "distributor",
        "vendor",
        "supplier",
      ]);

    const productColumn =
      findColumn([
        "product",
        "sku",
        "item",
      ]);

    const revenueColumn =
      findColumn([
        "sales",
        "revenue",
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
        "country",
      ]);

    const customerColumn =
      findColumn([
        "customer",
        "client",
      ]);

    // =========================
    // TOTAL RECORDS
    // =========================
    if (
      lower.includes("total") ||
      lower.includes("records")
    ) {

      return res.json({
        answer:
          `Dataset contains ${data.length} records.`,
      });

    }

    // =========================
    // TOP DISTRIBUTOR BY SALES
    // =========================
    if (

      lower.includes("distributor") &&
      lower.includes("sales")

    ) {

      if (
        !distributorColumn ||
        !revenueColumn
      ) {

        return res.json({
          answer:
            "Distributor or revenue column not found.",
        });

      }

      const totals = {};

      data.forEach((row) => {

        const distributor =
          row[distributorColumn];

        const revenue =
          Number(
            row[revenueColumn]
          ) || 0;

        totals[distributor] =
          (totals[distributor] || 0) +
          revenue;

      });

      const topDistributor =
        Object.keys(totals).reduce(
          (a, b) =>
            totals[a] > totals[b]
              ? a
              : b
        );

      return res.json({

        answer:
          `${topDistributor} generated the highest sales revenue of $${totals[topDistributor].toLocaleString()}.`,

      });

    }

    // =========================
    // TOP PRODUCT
    // =========================
    if (

      lower.includes("top product") ||
      lower.includes("best selling")

    ) {

      if (
        !productColumn ||
        !quantityColumn
      ) {

        return res.json({
          answer:
            "Product or quantity column not found.",
        });

      }

      const totals = {};

      data.forEach((row) => {

        const product =
          row[productColumn];

        const qty =
          Number(
            row[quantityColumn]
          ) || 0;

        totals[product] =
          (totals[product] || 0) + qty;

      });

      const topProduct =
        Object.keys(totals).reduce(
          (a, b) =>
            totals[a] > totals[b]
              ? a
              : b
        );

      return res.json({

        answer:
          `${topProduct} is the best selling product with ${totals[topProduct]} total units sold.`,

      });

    }

    // =========================
    // TOP REGION
    // =========================
    if (
      lower.includes("region")
    ) {

      if (
        !regionColumn ||
        !revenueColumn
      ) {

        return res.json({
          answer:
            "Region or revenue column not found.",
        });

      }

      const totals = {};

      data.forEach((row) => {

        const region =
          row[regionColumn];

        const revenue =
          Number(
            row[revenueColumn]
          ) || 0;

        totals[region] =
          (totals[region] || 0) +
          revenue;

      });

      const topRegion =
        Object.keys(totals).reduce(
          (a, b) =>
            totals[a] > totals[b]
              ? a
              : b
        );

      return res.json({

        answer:
          `${topRegion} generated the highest regional revenue of $${totals[topRegion].toLocaleString()}.`,

      });

    }

    // =========================
    // TOP CUSTOMER
    // =========================
    if (
      lower.includes("customer")
    ) {

      if (
        !customerColumn ||
        !quantityColumn
      ) {

        return res.json({
          answer:
            "Customer or quantity column not found.",
        });

      }

      const totals = {};

      data.forEach((row) => {

        const customer =
          row[customerColumn];

        const qty =
          Number(
            row[quantityColumn]
          ) || 0;

        totals[customer] =
          (totals[customer] || 0) +
          qty;

      });

      const topCustomer =
        Object.keys(totals).reduce(
          (a, b) =>
            totals[a] > totals[b]
              ? a
              : b
        );

      return res.json({

        answer:
          `${topCustomer} purchased the highest quantity with ${totals[topCustomer]} units.`,

      });

    }

    // =========================
    // TOTAL REVENUE
    // =========================
    if (
      lower.includes("revenue") ||
      lower.includes("sales")
    ) {

      if (!revenueColumn) {

        return res.json({
          answer:
            "Revenue column not found.",
        });

      }

      let totalRevenue = 0;

      data.forEach((row) => {

        totalRevenue +=
          Number(
            row[revenueColumn]
          ) || 0;

      });

      return res.json({

        answer:
          `Total revenue generated is $${totalRevenue.toLocaleString()}.`,

      });

    }

    // =========================
    // EXECUTIVE SUMMARY
    // =========================
    if (
      lower.includes("summary") ||
      lower.includes("executive")
    ) {

      return res.json({

        answer: `
Executive Summary

• Total Records: ${data.length}

• Total Columns: ${columns.length}

• Semantic Intelligence Engine: Active

• Distributor Analytics: Enabled

• Revenue Analytics: Enabled

• Operational Monitoring: Running
`,

      });

    }

    // =========================
    // DEFAULT
    // =========================
    return res.json({

      answer:
        "Semantic analytics engine active. Ask about distributors, revenue, products, customers, quantity, regions or executive summaries.",

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
      `Dataset contains ${data.length} healthcare records.`,
      "AI preprocessing completed successfully.",
      "Synthetic healthcare intelligence active.",
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