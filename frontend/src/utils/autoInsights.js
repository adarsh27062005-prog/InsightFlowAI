export const autoInsights = (data) => {

  // =========================
  // EMPTY DATA
  // =========================
  if (!data || data.length === 0) {
    return [];
  }

  const insights = [];

  const columns =
    Object.keys(data[0]);

  const lowerColumns =
    columns.map((c) =>
      c.toLowerCase()
    );

  // =========================
  // TOTAL RECORDS
  // =========================
  insights.push(
    `Dataset contains ${data.length} total records.`
  );

  // =========================
  // AGE ANALYSIS
  // =========================
  const ageColumn =
    columns.find((column) =>

      column
        .toLowerCase()
        .includes("age")

    );

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

    insights.push(

      `Average patient age is ${averageAge} years.`

    );
  }

  // =========================
  // FINANCIAL ANALYSIS
  // =========================
  const financialColumn =
    columns.find((column) => {

      const lower =
        column.toLowerCase();

      return (

        lower.includes("amount") ||
        lower.includes("payment") ||
        lower.includes("billing") ||
        lower.includes("revenue") ||
        lower.includes("cost")

      );
    });

  if (financialColumn) {

    const totalFinancial =
      data.reduce(
        (sum, row) =>

          sum +
          Number(
            row[financialColumn] || 0
          ),

        0
      );

    insights.push(

      `Total financial volume detected: $${totalFinancial.toLocaleString()}.`

    );
  }

  // =========================
  // DIAGNOSIS ANALYSIS
  // =========================
  const diagnosisColumn =
    columns.find((column) => {

      const lower =
        column.toLowerCase();

      return (

        lower.includes("disease") ||
        lower.includes("diagnosis") ||
        lower.includes("condition")

      );
    });

  if (diagnosisColumn) {

    const diagnosisMap = {};

    data.forEach((row) => {

      const value =
        row[diagnosisColumn] ||
        "Unknown";

      diagnosisMap[value] =
        (diagnosisMap[value] || 0) + 1;
    });

    const topDiagnosis =
      Object.keys(diagnosisMap)
        .sort(
          (a, b) =>
            diagnosisMap[b] -
            diagnosisMap[a]
        )[0];

    insights.push(

      `Most frequent diagnosis category is "${topDiagnosis}".`

    );
  }

  // =========================
  // PROVIDER ANALYSIS
  // =========================
  const providerColumn =
    columns.find((column) =>

      column
        .toLowerCase()
        .includes("provider")

    );

  if (providerColumn) {

    const providerMap = {};

    data.forEach((row) => {

      const provider =
        row[providerColumn];

      if (provider) {

        providerMap[provider] =
          (providerMap[provider] || 0) + 1;
      }
    });

    const topProvider =
      Object.keys(providerMap)
        .sort(
          (a, b) =>
            providerMap[b] -
            providerMap[a]
        )[0];

    if (topProvider) {

      insights.push(

        `Top performing provider detected: ${topProvider}.`

      );
    }
  }

  // =========================
  // STATUS ANALYSIS
  // =========================
  const statusColumn =
    columns.find((column) =>

      column
        .toLowerCase()
        .includes("status")

    );

  if (statusColumn) {

    const statusMap = {};

    data.forEach((row) => {

      const status =
        row[statusColumn];

      if (status) {

        statusMap[status] =
          (statusMap[status] || 0) + 1;
      }
    });

    const dominantStatus =
      Object.keys(statusMap)
        .sort(
          (a, b) =>
            statusMap[b] -
            statusMap[a]
        )[0];

    insights.push(

      `Dominant operational status identified as "${dominantStatus}".`

    );
  }

  // =========================
  // DATA QUALITY ANALYSIS
  // =========================
  let totalFields = 0;

  let completedFields = 0;

  data.forEach((row) => {

    Object.values(row).forEach(
      (value) => {

        totalFields++;

        if (

          value !== null &&
          value !== "" &&
          value !== undefined

        ) {

          completedFields++;
        }
      }
    );
  });

  const quality =
    (
      (
        completedFields /
        totalFields
      ) * 100
    ).toFixed(0);

  insights.push(

    `Dataset quality score calculated at ${quality}%.`

  );

  // =========================
  // ENTERPRISE AI INSIGHT
  // =========================
  if (data.length > 1000) {

    insights.push(

      "Large-scale enterprise dataset detected with high analytical potential."

    );
  }

  // =========================
  // LIMIT INSIGHTS
  // =========================
  return insights.slice(0, 8);
};