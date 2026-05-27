import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarAnalyticsChart({ data }) {

  // =========================
  // EMPTY DATA
  // =========================
  if (!data || data.length === 0) {

    return (

      <div className="flex items-center justify-center h-full text-gray-400">

        Upload dataset to generate bar analytics

      </div>
    );
  }

  // =========================
  // DETECT TARGET COLUMN
  // =========================
  const firstRow =
    data[0];

  const columns =
    Object.keys(firstRow);

  let targetColumn =
    null;

  columns.forEach((column) => {

    const lower =
      column.toLowerCase();

    if (

      lower.includes("disease") ||
      lower.includes("diagnosis") ||
      lower.includes("category") ||
      lower.includes("status") ||
      lower.includes("provider") ||
      lower.includes("type") ||
      lower.includes("payer") ||
      lower.includes("insurance") ||
      lower.includes("specialty")

    ) {

      if (!targetColumn) {

        targetColumn =
          column;
      }
    }
  });

  // =========================
  // FALLBACK
  // =========================
  if (!targetColumn) {

    targetColumn =
      columns[0];
  }

  // =========================
  // COUNT VALUES
  // =========================
  const counts = {};

  data.forEach((row) => {

    const value =
      row[targetColumn] ||
      "Unknown";

    counts[value] =
      (counts[value] || 0) + 1;
  });

  // =========================
  // SORT TOP VALUES
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
  // DYNAMIC MAX VALUE
  // =========================
  const maxValue =
    Math.max(...values);

  // =========================
  // CHART DATA
  // =========================
  const chartData = {

    labels,

    datasets: [

      {
        label:
          `${targetColumn} Distribution`,

        data:
          values,

        backgroundColor: [

          "#22D3EE",
          "#3B82F6",
          "#8B5CF6",
          "#14B8A6",
          "#F59E0B",
          "#EF4444",
          "#10B981",
          "#EC4899",
          "#6366F1",
          "#06B6D4",

        ],

        borderRadius: 10,

        borderSkipped: false,

        hoverBackgroundColor: [

          "#67E8F9",
          "#60A5FA",
          "#A78BFA",
          "#2DD4BF",
          "#FBBF24",
          "#F87171",
          "#34D399",
          "#F472B6",
          "#818CF8",
          "#22D3EE",

        ],
      },
    ],
  };

  // =========================
  // OPTIONS
  // =========================
  const options = {

    responsive: true,

    maintainAspectRatio: false,

    animation: {

      duration: 1500,
    },

    plugins: {

      legend: {

        display: true,

        labels: {

          color: "white",

          font: {
            size: 13,
          },
        },
      },

      tooltip: {

        backgroundColor:
          "#111827",

        borderColor:
          "#22D3EE",

        borderWidth: 1,

        titleColor:
          "#22D3EE",

        bodyColor:
          "#FFFFFF",

        padding: 12,
      },
    },

    scales: {

      x: {

        ticks: {

          color: "white",

          maxRotation: 25,

          minRotation: 0,
        },

        grid: {

          color:
            "rgba(255,255,255,0.05)",
        },
      },

      y: {

        beginAtZero: true,

        suggestedMax:
          maxValue + 2,

        ticks: {

          color: "white",

          precision: 0,
        },

        grid: {

          color:
            "rgba(255,255,255,0.05)",
        },
      },
    },
  };

  return (

    <div className="h-full w-full">

      <Bar
        data={chartData}
        options={options}
      />

    </div>
  );
}

export default BarAnalyticsChart;