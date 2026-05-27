import PredictiveAnalytics from "../components/PredictiveAnalytics";
import ReferenceQuestions from "../components/ReferenceQuestions";
import AIChatPanel from "../components/AIChatPanel";

function AIInsights({
  data,
  insights,
}) {

  return (

    <div className="space-y-8">

      {/* PAGE HEADER */}
      <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800">

        <h1 className="text-3xl font-bold mb-2">

          AI Insights Center

        </h1>

        <p className="text-gray-400">

          Enterprise healthcare intelligence and operational AI analytics

        </p>

      </div>

      {/* PREDICTIVE ANALYTICS */}
      <PredictiveAnalytics
        data={data}
      />

      {/* REFERENCE QUESTIONS */}
      <ReferenceQuestions
        data={data}
      />

      {/* AI GENERATED INSIGHTS */}
      <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800">

        <div className="flex items-center justify-between mb-6">

          <div>

            <h2 className="text-2xl font-bold">

              AI Generated Insights

            </h2>

            <p className="text-gray-400 text-sm mt-1">

              Automated operational intelligence engine

            </p>

          </div>

          <div className="bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-xl">

            <span className="text-green-400 text-sm font-medium">

              AI Engine Active

            </span>

          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {insights.map((insight, index) => (

            <div
              key={index}
              className="bg-[#1F2937] p-5 rounded-xl border border-gray-700 hover:border-cyan-500 transition-all duration-300"
            >

              <div className="flex items-start gap-3">

                <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2" />

                <p className="text-gray-200 leading-7">

                  {insight}

                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* AI CHAT PANEL */}
      <AIChatPanel
        data={data}
      />

    </div>

  );
}

export default AIInsights;