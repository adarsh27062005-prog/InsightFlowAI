import {
  BarChart3,
  TrendingUp,
  Activity,
  ShieldAlert,
  Users,
  Globe2,
} from "lucide-react";

function AdvancedAnalyticsGrid({
  data = [],
}) {

  // =========================
  // MOCK CALCULATIONS
  // =========================
  const totalRevenue =
    data.reduce((sum, row) => {

      return (
        sum +
        Number(
          row.sales ||
          row.revenue ||
          row.amount ||
          0
        )
      );

    }, 0);

  const uniqueCustomers =
    new Set(

      data.map(
        (row) =>
          row.customer ||
          row.client
      )

    ).size;

  const uniqueRegions =
    new Set(

      data.map(
        (row) =>
          row.region ||
          row.state
      )

    ).size;

  const totalProducts =
    new Set(

      data.map(
        (row) =>
          row.product ||
          row.item
      )

    ).size;

  // =========================
  // CARDS
  // =========================
  const cards = [

    {
      title:
        "Revenue Intelligence",

      value:
        `$${totalRevenue.toLocaleString()}`,

      icon:
        TrendingUp,

      color:
        "text-green-400",

      bg:
        "from-green-500/10 to-green-500/5",

      border:
        "border-green-500/20",

      description:
        "AI-detected revenue analytics across enterprise operations.",
    },

    {
      title:
        "Customer Segmentation",

      value:
        uniqueCustomers,

      icon:
        Users,

      color:
        "text-cyan-400",

      bg:
        "from-cyan-500/10 to-cyan-500/5",

      border:
        "border-cyan-500/20",

      description:
        "Semantic clustering of enterprise customer intelligence.",
    },

    {
      title:
        "Regional Intelligence",

      value:
        uniqueRegions,

      icon:
        Globe2,

      color:
        "text-purple-400",

      bg:
        "from-purple-500/10 to-purple-500/5",

      border:
        "border-purple-500/20",

      description:
        "Operational regional analytics and market distribution.",
    },

    {
      title:
        "Product Intelligence",

      value:
        totalProducts,

      icon:
        BarChart3,

      color:
        "text-orange-400",

      bg:
        "from-orange-500/10 to-orange-500/5",

      border:
        "border-orange-500/20",

      description:
        "AI semantic product performance monitoring engine.",
    },

    {
      title:
        "Operational Monitoring",

      value:
        "Stable",

      icon:
        Activity,

      color:
        "text-blue-400",

      bg:
        "from-blue-500/10 to-blue-500/5",

      border:
        "border-blue-500/20",

      description:
        "Real-time operational workflow and processing visibility.",
    },

    {
      title:
        "Risk Detection",

      value:
        "Low",

      icon:
        ShieldAlert,

      color:
        "text-red-400",

      bg:
        "from-red-500/10 to-red-500/5",

      border:
        "border-red-500/20",

      description:
        "AI anomaly detection and semantic risk intelligence engine.",
    },

  ];

  return (

    <div className="space-y-8">

      {/* HEADER */}
      <div className="bg-[#111827] border border-gray-800 rounded-3xl p-8">

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

          <div>

            <div className="flex items-center gap-3 mb-4">

              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

              <span className="text-green-400 text-sm font-semibold">

                Advanced AI Analytics Active

              </span>

            </div>

            <h2 className="text-4xl font-black">

              Advanced Analytics Grid

            </h2>

            <p className="text-gray-400 mt-3 max-w-3xl leading-8">

              AI-generated enterprise intelligence across operational analytics,
              revenue monitoring, customer intelligence,
              semantic risk analysis,
              product performance,
              and regional business analytics.

            </p>

          </div>

        </div>

      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {cards.map(
          (
            card,
            index
          ) => {

            const Icon =
              card.icon;

            return (

              <div
                key={index}
                className={`relative overflow-hidden rounded-3xl border ${card.border} bg-gradient-to-br ${card.bg} p-8 hover:scale-[1.02] transition-all duration-300`}
              >

                {/* GLOW */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 blur-3xl rounded-full" />

                {/* CONTENT */}
                <div className="relative z-10">

                  {/* TOP */}
                  <div className="flex items-center justify-between mb-8">

                    <div
                      className={`p-4 rounded-2xl bg-black/20 ${card.color}`}
                    >

                      <Icon
                        size={30}
                      />

                    </div>

                    <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

                  </div>

                  {/* VALUE */}
                  <h2
                    className={`text-5xl font-black ${card.color}`}
                  >

                    {card.value}

                  </h2>

                  {/* TITLE */}
                  <h3 className="text-xl font-bold mt-5">

                    {card.title}

                  </h3>

                  {/* DESC */}
                  <p className="text-gray-400 mt-4 leading-7 text-sm">

                    {card.description}

                  </p>

                </div>

              </div>

            );

          }
        )}

      </div>

    </div>

  );

}

export default AdvancedAnalyticsGrid;