export function generateChartData(data) {

  if (!data || data.length === 0) {
    return [];
  }

  // =========================
  // FIND BEST CATEGORY COLUMN
  // =========================
  const possibleColumns = [

    "diagnosis",
    "disease",
    "category",
    "department",
    "payer",
    "insurance",
    "gender",
    "region",
    "status",
  ];

  const firstRow =
    Object.keys(data[0]);

  let selectedColumn = null;

  firstRow.forEach((key) => {

    const lower =
      key.toLowerCase();

    if (
      possibleColumns.includes(lower)
    ) {

      selectedColumn = key;
    }
  });

  // fallback
  if (!selectedColumn) {

    selectedColumn =
      firstRow.find((key) => {

        return typeof data[0][key]
          === "string";
      });
  }

  if (!selectedColumn) {
    return [];
  }

  // =========================
  // COUNT VALUES
  // =========================
  const counts = {};

  data.forEach((row) => {

    const value =
      row[selectedColumn] ||
      "Unknown";

    counts[value] =
      (counts[value] || 0) + 1;
  });

  // =========================
  // CONVERT TO CHART FORMAT
  // =========================
  return Object.keys(counts).map(
    (key) => ({

      name: key,

      value: counts[key],
    })
  );
}