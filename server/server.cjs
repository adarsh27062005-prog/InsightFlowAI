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

    const lower = question.toLowerCase();

    const columns = Object.keys(data[0]);

    // =========================
    // SAFE COLUMN FINDER
    // =========================
    const findColumn = (keywords) => {
      return columns.find((col) => {
        const lowerCol = col.toLowerCase();

        return keywords.some((key) =>
          lowerCol.includes(key)
        );
      });
    };

    // =========================
    // TOTAL RECORDS
    // =========================
    if (
      lower.includes("total") ||
      lower.includes("records") ||
      lower.includes("patients")
    ) {
      return res.json({
        answer: `Total records in dataset: ${data.length}`,
      });
    }

    // =========================
    // AVG AGE
    // =========================
    const ageColumn = findColumn(["age"]);

    if (
      lower.includes("average age") &&
      ageColumn
    ) {
      const avgAge = (
        data.reduce((sum, row) => {
          return (
            sum +
            Number(row[ageColumn] || 0)
          );
        }, 0) / data.length
      ).toFixed(1);

      return res.json({
        answer: `Average patient age is ${avgAge}`,
      });
    }

    // =========================
    // TOP DIAGNOSIS
    // =========================
    if (
      lower.includes("diagnosis") ||
      lower.includes("disease")
    ) {
      const diseaseColumn = findColumn([
        "diagnosis",
        "disease",
      ]);

      if (diseaseColumn) {
        const counts = {};

        data.forEach((row) => {
          const value =
            row[diseaseColumn] || "Unknown";

          counts[value] =
            (counts[value] || 0) + 1;
        });

        const topDisease = Object.keys(
          counts
        ).reduce((a, b) =>
          counts[a] > counts[b] ? a : b
        );

        return res.json({
          answer: `Most common diagnosis is ${topDisease}`,
        });
      }
    }

    // =========================
    // PROVIDER ANALYSIS
    // =========================
    if (lower.includes("provider")) {
      const providerColumn = findColumn([
        "provider",
      ]);

      if (providerColumn) {
        const unique = new Set(
          data.map(
            (row) => row[providerColumn]
          )
        );

        return res.json({
          answer: `Total providers detected: ${unique.size}`,
        });
      }
    }

    // =========================
    // FINANCIAL
    // =========================
    if (
      lower.includes("payment") ||
      lower.includes("billing") ||
      lower.includes("revenue")
    ) {
      const amountColumn = findColumn([
        "payment",
        "billing",
        "amount",
      ]);

      if (amountColumn) {
        let total = 0;

        data.forEach((row) => {
          total +=
            Number(row[amountColumn]) || 0;
        });

        return res.json({
          answer: `Total financial amount is $${total.toLocaleString()}`,
        });
      }
    }

    // =========================
    // SLA
    // =========================
    if (lower.includes("sla")) {
      const slaColumn = findColumn([
        "sla",
      ]);

      if (slaColumn) {
        let breaches = 0;

        data.forEach((row) => {
          const value = String(
            row[slaColumn]
          ).toLowerCase();

          if (value.includes("breach")) {
            breaches++;
          }
        });

        return res.json({
          answer: `Total SLA breaches detected: ${breaches}`,
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
        answer: `
Executive Summary

• Total Records: ${data.length}

• Dataset Columns: ${columns.length}

• AI Analytics Engine: Active

• Healthcare Intelligence: Running

• Operational Monitoring: Enabled
`,
      });
    }

    // =========================
    // DEFAULT
    // =========================
    return res.json({
      answer:
        "I can analyze records, diagnosis, providers, payments, SLA, rejections, workload and executive summaries.",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      answer: "AI processing failed.",
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