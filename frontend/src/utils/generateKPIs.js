export function generateKPIs(data) {

  // =========================
  // EMPTY DATA
  // =========================
  if (!data || data.length === 0) {
    return [];
  }

  const columns =
    Object.keys(data[0]);

  const lowerColumns =
    columns.map((c) =>
      c.toLowerCase()
    );

  const kpis = [];

  // =========================
  // TOTAL RECORDS
  // =========================
  kpis.push({

    title:
      "Total Records",

    value:
      data.length,

  });

  // =========================
  // TOTAL COLUMNS
  // =========================
  kpis.push({

    title:
      "Dataset Columns",

    value:
      columns.length,

  });

  // =========================
  // PATIENT FIELDS
  // =========================
  const patientColumns =
    lowerColumns.filter(
      (c) =>

        c.includes("patient") ||
        c.includes("gender") ||
        c.includes("age") ||
        c.includes("birth")

    );

  if (
    patientColumns.length > 0
  ) {

    kpis.push({

      title:
        "Patient Fields",

      value:
        patientColumns.length,

    });
  }

  // =========================
  // INSURANCE FIELDS
  // =========================
  const insuranceColumns =
    lowerColumns.filter(
      (c) =>

        c.includes("payer") ||
        c.includes("insurance") ||
        c.includes("coverage") ||
        c.includes("copay")

    );

  if (
    insuranceColumns.length > 0
  ) {

    kpis.push({

      title:
        "Insurance Metrics",

      value:
        insuranceColumns.length,

    });
  }

  // =========================
  // FINANCIAL METRICS
  // =========================
  const financialColumns =
    lowerColumns.filter(
      (c) =>

        c.includes("amount") ||
        c.includes("payment") ||
        c.includes("billing") ||
        c.includes("revenue") ||
        c.includes("cost")

    );

  if (
    financialColumns.length > 0
  ) {

    kpis.push({

      title:
        "Financial Metrics",

      value:
        financialColumns.length,

    });
  }

  // =========================
  // TIMELINE METRICS
  // =========================
  const dateColumns =
    lowerColumns.filter(
      (c) =>

        c.includes("date") ||
        c.includes("time") ||
        c.includes("year") ||
        c.includes("month")

    );

  if (
    dateColumns.length > 0
  ) {

    kpis.push({

      title:
        "Timeline Fields",

      value:
        dateColumns.length,

    });
  }

  // =========================
  // AVERAGE AGE
  // =========================
  const ageColumn =
    columns.find((column) => {

      const lower =
        column.toLowerCase();

      return (
        lower.includes("age")
      );
    });

  if (ageColumn) {

    const totalAge =
      data.reduce(
        (sum, row) =>

          sum +
          Number(
            row[ageColumn] || 0
          ),

        0
      );

    const averageAge =
      (
        totalAge /
        data.length
      ).toFixed(1);

    kpis.push({

      title:
        "Average Age",

      value:
        averageAge,

    });
  }

  // =========================
  // DATA QUALITY SCORE
  // =========================
  let filledValues = 0;

  let totalValues = 0;

  data.forEach((row) => {

    Object.values(row).forEach(
      (value) => {

        totalValues++;

        if (
          value !== null &&
          value !== "" &&
          value !== undefined
        ) {

          filledValues++;
        }
      }
    );
  });

  const qualityScore =
    (
      (filledValues /
        totalValues) *
      100
    ).toFixed(0);

  kpis.push({

    title:
      "Data Quality",

    value:
      `${qualityScore}%`,

  });

  // =========================
  // LIMIT KPI COUNT
  // =========================
  return kpis.slice(0, 8);
}