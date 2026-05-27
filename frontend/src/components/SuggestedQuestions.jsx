function SuggestedQuestions({
  onSelectQuestion,
}) {

  const questions = [

    "What are the top rejection reasons?",

    "Show SLA breaches",

    "Which provider has highest workload?",

    "What is the average turnaround time?",

    "Generate executive summary",

    "Show most common diagnosis",

    "How many records are uploaded?",

    "Show provider analytics",

  ];

  return (

    <div className="mb-5">

      <h3 className="text-sm text-gray-400 mb-3">

        Suggested Questions

      </h3>

      <div className="flex flex-wrap gap-3">

        {questions.map((question, index) => (

          <button
            key={index}
            onClick={() =>
              onSelectQuestion(question)
            }
            className="bg-[#1F2937] hover:border-cyan-400 border border-gray-700 px-4 py-2 rounded-xl text-sm transition"
          >

            {question}

          </button>

        ))}

      </div>

    </div>
  );
}

export default SuggestedQuestions;