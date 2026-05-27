export const generateChartData = (data) => {

  // =========================
  // EMPTY DATA
  // =========================
  if (!data || data.length === 0) {

    return null;
  }

  const firstRow =
    data[0];

  const columns =
    Object.keys(firstRow);

  // =========================
  // DETECT CATEGORY COLUMN
  // =========================
  let categoryColumn =
    null;

  columns.forEach((column) => {

    const lower =
      column.toLowerCase();

    if (

      lower.includes("disease") ||
      lower.includes("diagnosis") ||
      lower.includes("category") ||
      lower.includes("status") ||
      lower.includes("condition") ||
      lower.includes("type") ||
      lower.includes("provider")

    ) {

      if (!categoryColumn) {

        categoryColumn =
          column;
      }
    }
  });

  // =========================
  // DETECT NUMERIC COLUMN
  // =========================
  let numericColumn =
    null;

  columns.forEach((column) => {

    const sample =
      data[0][column];

    if (

      !isNaN(sample) &&
      sample !== "" &&
      sample !== null

    ) {

      if (!numericColumn) {

        numericColumn =
          column;
      }
    }
  });

  // =========================
  // FALLBACKS
  // =========================
  if (!categoryColumn) {

    categoryColumn =
      columns[0];
  }

  if (!numericColumn) {

    numericColumn =
      columns[1];
  }

  // =========================
  // CATEGORY COUNTS
  // =========================
  const counts = {};

  data.forEach((row) => {

    const value =
      row[categoryColumn] ||
      "Unknown";

    counts[value] =
      (counts[value] || 0) + 1;
  });

  // =========================
  // SORT VALUES
  // =========================
  const sortedEntries =
    Object.entries(counts)
      .sort(
        (a, b) =>
          b[1] - a[1]
      )
      .slice(0, 10);

  const labels =
    sortedEntries.map(
      (item) => item[0]
    );

  const values =
    sortedEntries.map(
      (item) => item[1]
    );

  // =========================
  // DYNAMIC COLORS
  // =========================
  const backgroundColors = [

    "#22D3EE",
    "#3B82F6",
    "#8B5CF6",
    "#14B8A6",
    "#F59E0B",
    "#EF4444",
    "#10B981",
    "#EC4899",
    "#6366F1",
    "#84CC16",

  ];

  // =========================
  // TREND ANALYSIS
  // =========================
  const highestValue =
    Math.max(...values);

  const anomalyDetected =
    highestValue >
    data.length * 0.5;

  // =========================
  // RETURN ENTERPRISE DATA
  // =========================
  return {

    labels,

    datasets: [

      {

        label:
          categoryColumn,

        data:
          values,

        borderColor:
          "#22D3EE",

        backgroundColor:
          backgroundColors,

        borderWidth: 2,

        hoverOffset: 10,

        fill: true,

        tension: 0.4,

      },

    ],

    intelligence: {

      categoryColumn,

      numericColumn,

      anomalyDetected,

      topCategory:
        labels[0],

      topValue:
        values[0],

    },

  };
};