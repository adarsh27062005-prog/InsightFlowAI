import {
  useState,
  useEffect,
  useRef,
} from "react";

import SuggestedQuestions from "./SuggestedQuestions";

function AIChatPanel({
  data,
  schema,
}) {

  const [question, setQuestion] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [messages, setMessages] =
    useState([
      {
        role: "assistant",
        text:
          "Hello 👋 Ask anything about your uploaded dataset.",
      },
    ]);

  const chatEndRef =
    useRef(null);

  // =========================
  // AUTO SCROLL
  // =========================
  useEffect(() => {

    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages]);

  // =========================
  // SEND TO BACKEND AI
  // =========================
  const askAI = async (
    userQuestion
  ) => {

    try {

      setLoading(true);

      const response =
        await fetch(

          "https://insightflow-backend-cqbu.onrender.com/api/ai-chat",

          {

            method: "POST",

            headers: {

              "Content-Type":
                "application/json",

            },

            body: JSON.stringify({
  question: userQuestion,
  data,
  schema,
}),

          }
        );

      const result =
        await response.json();

      return (
        result.answer ||
        "No response generated."
      );

    } catch (error) {

      console.log(error);

      return (
        "Backend AI connection failed."
      );

    } finally {

      setLoading(false);

    }

  };

  // =========================
  // SEND MESSAGE
  // =========================
  const handleSend =
    async (
      customQuestion = null
    ) => {

      const finalQuestion =
        customQuestion ||
        question;

      if (
        !finalQuestion.trim()
      ) {

        return;
      }

      // USER MESSAGE
      const userMessage = {

        role: "user",

        text: finalQuestion,

      };

      setMessages((prev) => [

        ...prev,
        userMessage,

      ]);

      setQuestion("");

      // AI RESPONSE
      const answer =
        await askAI(
          finalQuestion
        );

      const aiMessage = {

        role: "assistant",

        text: answer,

      };

      setMessages((prev) => [

        ...prev,
        aiMessage,

      ]);

    };

  // =========================
  // CLEAR CHAT
  // =========================
  const clearChat = () => {

    setMessages([
      {
        role: "assistant",
        text:
          "Chat cleared 👋 Ask a new question.",
      },
    ]);

  };

  return (

    <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800 mt-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">

        <div>

          <h2 className="text-2xl font-bold">

            Conversational Analytics

          </h2>

          <p className="text-gray-400 text-sm mt-1">

            AI-powered healthcare intelligence engine

          </p>

        </div>

        <button
          onClick={clearChat}
          className="bg-[#1F2937] hover:bg-[#374151] px-4 py-2 rounded-lg text-sm border border-gray-700 transition"
        >

          Clear Chat

        </button>

      </div>

      {/* SUGGESTED QUESTIONS */}
      <SuggestedQuestions
        onSelectQuestion={(
          q
        ) =>
          handleSend(q)
        }
      />

      {/* CHAT AREA */}
      <div className="bg-[#0B1120] rounded-xl p-4 h-[400px] overflow-y-auto border border-gray-700">

        <div className="space-y-4">

          {messages.map(
            (
              msg,
              index
            ) => (

              <div
                key={index}
                className={`flex ${
                  msg.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`p-4 rounded-2xl max-w-[80%] whitespace-pre-line ${
                    msg.role === "user"
                      ? "bg-cyan-500 text-black"
                      : "bg-[#1F2937] text-white"
                  }`}
                >

                  {msg.text}

                </div>

              </div>
            )
          )}

          {/* LOADING */}
          {loading && (

            <div className="flex justify-start">

              <div className="bg-[#1F2937] text-white px-4 py-3 rounded-2xl">

                AI analyzing dataset...

              </div>

            </div>

          )}

          <div ref={chatEndRef} />

        </div>

      </div>

      {/* QUICK QUESTIONS */}
      <div className="flex flex-wrap gap-3 mt-5">

        {[
  "Which distributor generated the highest sales?",
  "Top selling products by revenue",
  "Which region has maximum sales?",
  "Show distributor performance summary",
  "Which products are underperforming?",
  "Executive business summary",
  "Top customers by revenue",
].map((item) => (

          <button
            key={item}
            onClick={() =>
              setQuestion(item)
            }
            className="bg-[#1F2937] hover:bg-[#374151] px-4 py-2 rounded-lg text-sm border border-gray-700 transition"
          >

            {item}

          </button>

        ))}

      </div>

      {/* INPUT */}
      <div className="flex gap-3 mt-5">

        <input
          type="text"
          placeholder="Ask semantic business questions about distributors, products, sales, customers or regions..."
          value={question}
          onChange={(e) =>
            setQuestion(
              e.target.value
            )
          }
          onKeyDown={(e) => {

            if (
              e.key === "Enter"
            ) {

              handleSend();

            }
          }}
          className="flex-1 bg-[#1F2937] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
        />

        <button
          onClick={() =>
            handleSend()
          }
          className="bg-cyan-500 hover:bg-cyan-400 px-6 rounded-xl font-semibold text-black transition"
        >

          Send

        </button>

      </div>

    </div>
  );
}

export default AIChatPanel;