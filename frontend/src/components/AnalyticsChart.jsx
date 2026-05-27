import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

import {
  generateChartData,
} from "../utils/generateChartData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AnalyticsChart = ({
  data,
}) => {

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
            No Analytics Available
          </p>

          <p className="text-sm text-gray-500">
            Upload a dataset to generate AI-powered trends
          </p>

        </div>

      </div>
    );
  }

  // =========================
  // CHART CONFIG
  // =========================
  const enhancedChartData = {

  ...chartData,

  datasets:
    chartData.datasets.map(
      (dataset, index) => ({

        ...dataset,

        fill: true,

        tension: 0.45,

        borderWidth: 4,

        pointRadius: 5,

        pointHoverRadius: 9,

        pointBorderWidth: 2,

        pointBackgroundColor:
          "#22D3EE",

        pointBorderColor:
          "#0B1120",

        borderColor:
          index % 2 === 0
            ? "#22D3EE"
            : "#8B5CF6",

        backgroundColor:
          index % 2 === 0
            ? "rgba(34,211,238,0.12)"
            : "rgba(139,92,246,0.12)",

      })
    ),
};

  const options = {

    responsive: true,

    maintainAspectRatio: false,
    animation: {

  duration: 1800,

  easing: "easeOutQuart",
},

    interaction: {

      mode: "index",

      intersect: false,
    },

    plugins: {

      legend: {

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

    scales: {

      x: {

        grid: {
          color:
            "rgba(255,255,255,0.05)",
        },

        ticks: {
          color: "white",
        },
      },

      y: {

        grid: {
          color:
            "rgba(255,255,255,0.05)",
        },

        ticks: {
          color: "white",
        },
      },
    },
  };

  return (

    <div className="h-[320px]">

      <Line
        data={enhancedChartData}
        options={options}
      />

    </div>

  );
};

export default AnalyticsChart;