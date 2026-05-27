import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

import {
  generateChartData,
} from "../utils/generateChartData";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function DiseasePieChart({
  data,
}) {

  const chartData =
    generateChartData(data);

  // =========================
  // EMPTY STATE
  // =========================
  if (!chartData) {

    return (

      <div className="flex items-center justify-center h-full text-gray-400 text-center">

        <div>

          <p className="text-xl mb-2">
            No Visualization Available
          </p>

          <p className="text-sm text-gray-500">
            Upload healthcare datasets to generate AI charts
          </p>

        </div>

      </div>
    );
  }

  // =========================
  // ENHANCED DATASET COLORS
  // =========================
  const enhancedChartData = {

    ...chartData,

    datasets: [

      {
        ...chartData.datasets[0],

        backgroundColor: [

          "#22D3EE",
          "#3B82F6",
          "#8B5CF6",
          "#14B8A6",
          "#F59E0B",
          "#EF4444",
          "#10B981",
          "#EC4899",

        ],

        borderColor: "#111827",

        borderWidth: 2,

        hoverOffset: 12,
      },
    ],
  };

  // =========================
  // CHART OPTIONS
  // =========================
  const options = {

    responsive: true,

    maintainAspectRatio: false,

    plugins: {

      legend: {

        position: "bottom",

        labels: {

          color: "white",

          padding: 20,

          font: {
            size: 12,
          },
        },
      },

      tooltip: {

        backgroundColor:
          "#111827",

        titleColor:
          "#22D3EE",

        bodyColor:
          "#FFFFFF",

        borderColor:
          "#22D3EE",

        borderWidth: 1,

        padding: 12,
      },
    },
  };

  return (

    <div className="h-[320px]">

      <Pie
        data={enhancedChartData}
        options={options}
      />

    </div>

  );
}

export default DiseasePieChart;