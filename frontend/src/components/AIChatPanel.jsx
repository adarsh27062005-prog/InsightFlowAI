import {
  useState,
  useEffect,
  useRef,
} from "react";

import { toast } from "react-toastify";

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
          `Welcome to InsightFlow AI 👋

I can analyze:

• Distributor performance
• Product intelligence
• Revenue analytics
• Regional insights
• Operational summaries
• Executive business metrics
• Semantic EDI intelligence

Ask enterprise business questions about your uploaded dataset.`,
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
  // ASK AI
  // =========================
  const askAI = async (
    userQuestion
  ) => {

    try {

      setLoading(true);

      const response =
        await fetch(

          "http://127.0.0.1:8000/ai/chat",

          {

            method: "POST",

            headers: {

              "Content-Type":
                "application/json",

            },

            body: JSON.stringify({

              prompt:
userQuestion,

              data,

              schema,

            }),

          }
        );

      const result =
        await response.json();

      return (
        result.response ||
        "No AI response generated."
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "AI backend connection failed."
      );

      return (
        "AI backend connection failed."
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

        toast.warning(
          "Enter a business question first."
        );

        return;

      }

      // =========================
      // EMPTY DATASET CHECK
      // =========================
      if (
        !data ||
        data.length === 0
      ) {

        toast.warning(
          "Upload or generate a dataset first."
        );

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

      // =========================
      // TEMP AI THINKING
      // =========================
      const thinkingMessage = {

        role: "assistant",

        text:
          "Analyzing enterprise dataset and generating semantic intelligence...",

        thinking: true,

      };

      setMessages((prev) => [

        ...prev,
        thinkingMessage,

      ]);

      // AI RESPONSE
      const answer =
        await askAI(
          finalQuestion
        );

      // REMOVE THINKING
      setMessages((prev) =>
        prev.filter(
          (msg) =>
            !msg.thinking
        )
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
          "Conversation reset successfully 👋 Ask new business intelligence questions.",
      },
    ]);

    toast.success(
      "Conversation cleared."
    );

  };

  return (

    <div className="bg-[#111827] border border-gray-800 rounded-3xl p-8 mt-8 overflow-hidden">

      {/* HEADER */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 mb-8">

        {/* LEFT */}
        <div>

          <div className="flex items-center gap-3 mb-3">

            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

            <span className="text-green-400 text-sm font-semibold">

              Live Semantic AI Assistant

            </span>

          </div>

          <h2 className="text-4xl font-black">

            Conversational Analytics

          </h2>

          <p className="text-gray-400 mt-2 leading-7 max-w-3xl">

            Enterprise conversational intelligence engine for semantic analytics,
            executive summaries, operational monitoring,
            revenue analysis, distributor intelligence,
            customer insights, and AI-driven business querying.

          </p>

        </div>

        {/* RIGHT */}
        <div className="flex gap-4">

          <button
            onClick={clearChat}
            className="bg-[#1F2937] hover:bg-[#374151] border border-gray-700 px-5 py-3 rounded-2xl transition-all duration-300"
          >

            Clear Conversation

          </button>

        </div>

      </div>

      {/* METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

        <div className="bg-[#1F2937] border border-gray-700 rounded-2xl p-6">

          <p className="text-gray-400 text-sm">

            Dataset Records

          </p>

          <h2 className="text-5xl font-black text-cyan-400 mt-3">

            {data.length}

          </h2>

        </div>

        <div className="bg-[#1F2937] border border-gray-700 rounded-2xl p-6">

          <p className="text-gray-400 text-sm">

            Semantic Columns

          </p>

          <h2 className="text-5xl font-black text-purple-400 mt-3">

            {schema?.length || 0}

          </h2>

        </div>

        <div className="bg-[#1F2937] border border-gray-700 rounded-2xl p-6">

          <p className="text-gray-400 text-sm">

            AI Status

          </p>

          <h2 className="text-3xl font-black text-green-400 mt-5">

            Operational

          </h2>

        </div>

      </div>

      {/* QUESTIONS */}
      <SuggestedQuestions
        onSelectQuestion={(q) =>
          handleSend(q)
        }
      />

      {/* CHAT */}
      <div className="relative bg-[#0B1120] border border-gray-700 rounded-3xl h-[550px] overflow-y-auto p-6 mt-8">

        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/5 blur-3xl rounded-full" />

        <div className="relative z-10 space-y-6">

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
                  className={`max-w-[85%] rounded-3xl p-5 whitespace-pre-line leading-8 shadow-lg ${
                    msg.role === "user"

                      ? "bg-cyan-500 text-black"

                      : "bg-[#1F2937] text-white border border-gray-700"
                  }`}
                >

                  {/* ROLE */}
                  <div
                    className={`text-xs font-bold uppercase tracking-widest mb-3 ${
                      msg.role === "user"
                        ? "text-black/70"
                        : "text-cyan-400"
                    }`}
                  >

                    {msg.role === "user"
                      ? "You"
                      : "InsightFlow AI"}

                  </div>

                  {/* TEXT */}
                  <div className="text-[15px]">

                    {msg.text}

                  </div>

                </div>

              </div>

            )
          )}

          {/* LOADING */}
          {loading && (

            <div className="flex justify-start">

              <div className="bg-[#1F2937] border border-gray-700 rounded-3xl px-6 py-5 max-w-[320px]">

                <div className="flex items-center gap-4">

                  <div className="flex gap-2">

                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" />

                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce delay-100" />

                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce delay-200" />

                  </div>

                  <span className="text-gray-300">

                    AI analyzing semantic intelligence...

                  </span>

                </div>

              </div>

            </div>

          )}

          <div ref={chatEndRef} />

        </div>

      </div>

      {/* QUICK ACTIONS */}
      <div className="mt-8">

        <h3 className="text-lg font-bold mb-4 text-cyan-400">

          Executive Quick Actions

        </h3>

        <div className="flex flex-wrap gap-4">

          {[
            "Which distributor generated the highest sales?",
            "Top selling products by revenue",
            "Which region has maximum sales?",
            "Show distributor performance summary",
            "Which products are underperforming?",
            "Executive business summary",
            "Top customers by revenue",
            "Revenue trend analysis",
            "Operational AI summary",
          ].map((item) => (

            <button
              key={item}
              onClick={() =>
                handleSend(item)
              }
              className="bg-[#1F2937] hover:bg-cyan-500 hover:text-black border border-gray-700 hover:border-cyan-400 px-5 py-3 rounded-2xl text-sm transition-all duration-300"
            >

              {item}

            </button>

          ))}

        </div>

      </div>

      {/* INPUT */}
      <div className="flex flex-col xl:flex-row gap-4 mt-8">

        <input
          type="text"
          placeholder="Ask semantic business intelligence questions..."
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
          className="flex-1 bg-[#1F2937] border border-gray-700 rounded-2xl px-6 py-5 outline-none focus:border-cyan-400 text-white"
        />

        <button
          onClick={() =>
            handleSend()
          }
          disabled={loading}
          className="bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black font-bold px-10 py-5 rounded-2xl transition-all duration-300"
        >

          {loading
            ? "Analyzing..."
            : "Send Message"}

        </button>

      </div>

    </div>

  );

}

export default AIChatPanel;