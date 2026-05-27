function ReferenceQuestions({
  data,
}) {

  // =========================
  // SAFE VALUE HELPER
  // =========================
  const getValue = (
    row,
    keys
  ) => {

    for (const key of keys) {

      if (

        row[key] !== undefined &&
        row[key] !== null &&
        row[key] !== ""

      ) {

        return row[key];
      }
    }

    return null;
  };

  // =========================
  // TOTAL RECORDS
  // =========================
  const totalRecords =
    data.length;

  // =========================
  // TOP DIAGNOSIS
  // =========================
  const diagnosisCount =
    {};

  data.forEach((row) => {

    const diagnosis =
      getValue(row, [

        "diagnosis",
        "Diagnosis",
        "disease",
        "Disease",
        "condition",

      ]) || "Unknown";

    diagnosisCount[
      diagnosis
    ] =

      (
        diagnosisCount[
          diagnosis
        ] || 0
      ) + 1;
  });

  const topDiagnosis =
    Object.keys(
      diagnosisCount
    )
      .sort(
        (a, b) =>

          diagnosisCount[b] -
          diagnosisCount[a]

      )[0] || "N/A";

  // =========================
  // PROVIDER COUNT
  // =========================
  const providers =
    new Set();

  data.forEach((row) => {

    const provider =
      getValue(row, [

        "provider",
        "Provider",
        "provider_name",

      ]);

    if (provider) {

      providers.add(
        provider
      );
    }
  });

  // =========================
  // FINANCIAL DETECTION
  // =========================
  let totalFinancial =
    0;

  data.forEach((row) => {

    Object.keys(row).forEach(
      (key) => {

        const lower =
          key.toLowerCase();

        if (

          lower.includes("amount") ||
          lower.includes("payment") ||
          lower.includes("billing") ||
          lower.includes("revenue")

        ) {

          totalFinancial +=
            Number(
              row[key]
            ) || 0;
        }
      }
    );
  });

  // =========================
  // DATA QUALITY
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

  // =========================
  // AI QUESTIONS
  // =========================
  const questions = [

    {
      question:
        "What is the dominant diagnosis category?",

      answer:
        topDiagnosis,
    },

    {
      question:
        "How many records were processed?",

      answer:
        totalRecords,
    },

    {
      question:
        "How many provider entities are active?",

      answer:
        providers.size,
    },

    {
      question:
        "What is the dataset quality score?",

      answer:
        `${quality}%`,
    },

    {
      question:
        "What is the estimated financial volume?",

      answer:
        `$${totalFinancial.toLocaleString()}`,
    },

    {
      question:
        "What is the operational AI status?",

      answer:
        totalRecords > 0
          ? "Operational"
          : "Awaiting Upload",
    },

  ];

  return (

    <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800 mb-8">

      <h2 className="text-2xl font-bold mb-6">

        AI Operational Intelligence

      </h2>

      <div className="space-y-5">

        {questions.map(
          (
            item,
            index
          ) => (

            <div
              key={index}
              className="bg-[#1F2937] p-5 rounded-xl border border-gray-700"
            >

              <h3 className="text-cyan-400 text-sm mb-2">

                {item.question}

              </h3>

              <p className="text-2xl font-bold">

                {item.answer}

              </p>

            </div>
          )
        )}

      </div>

    </div>
  );
}

export default ReferenceQuestions;