export const detectKPIs = (data) => {

  // =========================
  // EMPTY DATA
  // =========================
  if (!data || data.length === 0) {
    return [];
  }

  const firstRow =
    data[0];

  const columns =
    Object.keys(firstRow);

  const detectedKPIs =
    [];

  // =========================
  // PREVENT DUPLICATES
  // =========================
  const addedTitles =
    new Set();

  const addKPI = (
    title,
    value
  ) => {

    if (
      !addedTitles.has(title)
    ) {

      detectedKPIs.push({
        title,
        value,
      });

      addedTitles.add(
        title
      );
    }
  };

  // =========================
  // COLUMN ANALYSIS
  // =========================
  columns.forEach((column) => {

    const lower =
      column.toLowerCase();

    // =====================
    // PATIENT ANALYTICS
    // =====================
    if (

      lower.includes("patient") ||
      lower.includes("member")

    ) {

      addKPI(
        "Patient Records",
        data.length
      );
    }

    // =====================
    // FINANCIAL ANALYTICS
    // =====================
    else if (

      lower.includes("payment") ||
      lower.includes("amount") ||
      lower.includes("billing") ||
      lower.includes("revenue") ||
      lower.includes("cost")

    ) {

      let total = 0;

      data.forEach((row) => {

        total +=
          Number(
            row[column]
          ) || 0;
      });

      addKPI(

        "Financial Volume",

        "$" +
          total.toLocaleString()

      );
    }

    // =====================
    // INSURANCE ANALYTICS
    // =====================
    else if (

      lower.includes("insurance") ||
      lower.includes("payer") ||
      lower.includes("plan")

    ) {

      const unique =
        new Set(

          data.map(
            (row) =>
              row[column]
          )

        );

      addKPI(

        "Insurance Providers",

        unique.size

      );
    }

    // =====================
    // AGE ANALYTICS
    // =====================
    else if (

      lower.includes("age")

    ) {

      const totalAge =
        data.reduce(
          (sum, row) =>

            sum +
            Number(
              row[column] || 0
            ),

          0
        );

      const avgAge =
        (
          totalAge /
          data.length
        ).toFixed(1);

      addKPI(

        "Average Patient Age",

        avgAge

      );
    }

    // =====================
    // DISEASE ANALYTICS
    // =====================
    else if (

      lower.includes("disease") ||
      lower.includes("diagnosis") ||
      lower.includes("condition")

    ) {

      const uniqueDiseases =
        new Set(

          data.map(
            (row) =>
              row[column]
          )

        );

      addKPI(

        "Diagnosis Categories",

        uniqueDiseases.size

      );
    }

    // =====================
    // TIMELINE ANALYTICS
    // =====================
    else if (

      lower.includes("date") ||
      lower.includes("time")

    ) {

      addKPI(

        "Timeline Records",

        data.length

      );
    }
  });

  // =========================
  // DATA COMPLETENESS
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

  const completeness =
    (
      (
        completedFields /
        totalFields
      ) * 100
    ).toFixed(0);

  addKPI(
    "Data Completeness",
    `${completeness}%`
  );

  // =========================
  // LIMIT KPIs
  // =========================
  return detectedKPIs.slice(0, 8);
};