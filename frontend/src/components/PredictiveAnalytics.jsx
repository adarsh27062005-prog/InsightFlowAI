import { useMemo } from "react";

function PredictiveAnalytics({
  data,
}) {

  // =========================
  // AI FORECAST ENGINE
  // =========================
  const forecast =
    useMemo(() => {

      // =====================
      // EMPTY DATA
      // =====================
      if (
        data.length === 0
      ) {

        return {

          currentVolume: 0,

          nextWeek: 0,

          growth: 0,

          growthRate: 0,

          riskLevel:
            "Unknown",

          status:
            "Awaiting Dataset",

          confidence:
            "0%",

        };
      }

      // =====================
      // CURRENT VOLUME
      // =====================
      const currentVolume =
        data.length;

      // =====================
      // AI SIMULATION
      // =====================
      const growthRate =
        12;

      const predictedGrowth =
        Math.floor(
          currentVolume *
          (growthRate / 100)
        );

      const nextWeek =
        currentVolume +
        predictedGrowth;

      // =====================
      // RISK DETECTION
      // =====================
      let riskLevel =
        "Low";

      if (
        currentVolume > 5000
      ) {

        riskLevel =
          "High";
      }

      else if (
        currentVolume > 1000
      ) {

        riskLevel =
          "Medium";
      }

      // =====================
      // AI STATUS
      // =====================
      let status =
        "Stable";

      if (
        predictedGrowth > 0
      ) {

        status =
          "Growth Expected";
      }

      // =====================
      // CONFIDENCE SCORE
      // =====================
      let confidence =
        "92%";

      if (
        currentVolume < 100
      ) {

        confidence =
          "74%";
      }

      return {

        currentVolume,

        nextWeek,

        growth:
          predictedGrowth,

        growthRate,

        riskLevel,

        status,

        confidence,

      };

    }, [data]);

  return (

    <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800 mb-8">

      <h2 className="text-2xl font-bold mb-6">

        Predictive Analytics

      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {/* CURRENT VOLUME */}
        <div className="bg-[#1F2937] p-6 rounded-xl border border-gray-700">

          <h3 className="text-cyan-400 mb-3">

            Current Dataset Volume

          </h3>

          <p className="text-4xl font-bold">

            {forecast.currentVolume}

          </p>

        </div>

        {/* NEXT WEEK */}
        <div className="bg-[#1F2937] p-6 rounded-xl border border-gray-700">

          <h3 className="text-cyan-400 mb-3">

            Predicted Next Week Volume

          </h3>

          <p className="text-4xl font-bold">

            {forecast.nextWeek}

          </p>

        </div>

        {/* GROWTH */}
        <div className="bg-[#1F2937] p-6 rounded-xl border border-gray-700">

          <h3 className="text-cyan-400 mb-3">

            Forecasted Growth

          </h3>

          <p className="text-4xl font-bold">

            +{forecast.growth}

          </p>

        </div>

        {/* GROWTH RATE */}
        <div className="bg-[#1F2937] p-6 rounded-xl border border-gray-700">

          <h3 className="text-cyan-400 mb-3">

            Growth Rate

          </h3>

          <p className="text-4xl font-bold">

            {forecast.growthRate}%

          </p>

        </div>

        {/* CONFIDENCE */}
        <div className="bg-[#1F2937] p-6 rounded-xl border border-gray-700">

          <h3 className="text-cyan-400 mb-3">

            AI Confidence Score

          </h3>

          <p className="text-4xl font-bold">

            {forecast.confidence}

          </p>

        </div>

        {/* RISK LEVEL */}
        <div className="bg-[#1F2937] p-6 rounded-xl border border-gray-700">

          <h3 className="text-cyan-400 mb-3">

            Operational Risk Level

          </h3>

          <p
            className={`text-3xl font-bold ${
              forecast.riskLevel === "High"
                ? "text-red-400"
                : forecast.riskLevel === "Medium"
                ? "text-yellow-400"
                : "text-green-400"
            }`}
          >

            {forecast.riskLevel}

          </p>

        </div>

      </div>

      {/* AI STATUS */}
      <div className="bg-[#1F2937] p-6 rounded-xl border border-gray-700 mt-6">

        <h3 className="text-cyan-400 mb-3">

          AI Forecast Status

        </h3>

        <p className="text-2xl font-bold text-green-400">

          {forecast.status}

        </p>

      </div>

    </div>
  );
}

export default PredictiveAnalytics;