from fastapi import APIRouter
from pydantic import BaseModel

from groq import Groq
from dotenv import load_dotenv

import os

from app.ai.rag_engine import query_pdf
from app.ai.agent_orchestrator import route_agent

# =========================
# LOAD ENV
# =========================

load_dotenv()

# =========================
# GROQ CLIENT
# =========================

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

# =========================
# ROUTER
# =========================

router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)

# =========================
# REQUEST MODEL
# =========================

class PromptRequest(BaseModel):

    prompt: str

# =========================
# AI CHAT
# =========================

@router.post("/chat")
def ai_chat(request: PromptRequest):

    user_prompt = request.prompt

    try:

        # =========================
        # MULTI-AGENT ROUTING
        # =========================

        agent_result = route_agent(
            user_prompt
        )

        selected_agent = agent_result.get(
            "agent",
            "Conversational Agent"
        )

        # =========================
        # DOCUMENT AGENT
        # =========================

        if selected_agent == "Document Agent":

            rag_result = query_pdf(
                user_prompt
            )

            context = rag_result.get(
                "retrieved_context",
                ""
            )

            completion = client.chat.completions.create(

                model="llama-3.1-8b-instant",

                messages=[

                    {
                        "role": "system",
                        "content": """
You are InsightFlow AI,
an enterprise healthcare analytics assistant.

Use the provided document context
to answer intelligently.

Give concise executive insights.
"""
                    },

                    {
                        "role": "user",
                        "content": f"""
Context:
{context}

Question:
{user_prompt}
"""
                    }

                ],

                temperature=0.3

            )

            answer = (
                completion.choices[0]
                .message.content
            )

            return {

                "agent": selected_agent,

                "response": answer

            }

        # =========================
        # FORECAST AGENT
        # =========================

        elif selected_agent == "Forecast Agent":

            system_prompt = """
You are InsightFlow Forecast Agent.

Responsibilities:
- forecasting
- trend prediction
- future operational insights
- KPI growth estimation

Respond professionally.
"""

        # =========================
        # ANOMALY AGENT
        # =========================

        elif selected_agent == "Anomaly Agent":

            system_prompt = """
You are InsightFlow Anomaly Agent.

Responsibilities:
- anomaly detection
- operational risk analysis
- SLA risk monitoring
- unusual pattern identification

Respond professionally.
"""

        # =========================
        # EXECUTIVE AGENT
        # =========================

        elif selected_agent == "Executive Agent":

            system_prompt = """
You are InsightFlow Executive Agent.

Responsibilities:
- executive summaries
- operational intelligence
- business recommendations
- strategic insights

Respond professionally and concisely.
"""

        # =========================
        # DEFAULT CONVERSATIONAL AGENT
        # =========================

        else:

            system_prompt = """
You are InsightFlow Conversational AI.

Responsibilities:
- enterprise analytics
- healthcare operations
- semantic intelligence
- conversational business analytics

Respond clearly and professionally.
"""

        # =========================
        # GROQ COMPLETION
        # =========================

        completion = client.chat.completions.create(

            model="llama-3.1-8b-instant",

            messages=[

                {
                    "role": "system",
                    "content": system_prompt
                },

                {
                    "role": "user",
                    "content": user_prompt
                }

            ],

            temperature=0.4

        )

        answer = (
            completion.choices[0]
            .message.content
        )

        return {

            "agent": selected_agent,

            "response": answer

        }

    except Exception as e:

        return {

            "agent": "System",

            "response": f"AI processing error: {str(e)}"

        }