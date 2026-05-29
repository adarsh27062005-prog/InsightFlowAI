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
  // API URL
  // =========================
  const API_URL =
    import.meta.env.VITE_API_URL;

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

          `${API_URL}/ai/chat`,

          {

            method: "POST",

            headers: {

              "Content-Type":
                "application/json",

            },

            body: JSON.stringify({

              prompt:
                userQuestion,

            }),

          }
        );

      // =========================
      // RESPONSE VALIDATION
      // =========================
      if (!response.ok) {

        throw new Error(
          "Backend request failed"
        );

      }

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
      // TEMP THINKING MESSAGE
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

      // =========================
      // AI RESPONSE
      // =========================
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

      // AI MESSAGE
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

                <span className="text-gray-300">

                  AI analyzing semantic intelligence...

                </span>

              </div>

            </div>

          )}

          <div ref={chatEndRef} />

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