from fastapi import APIRouter

from groq import Groq
from dotenv import load_dotenv

import os

from app.services.data_store import get_dataframe

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
    prefix="/insights",
    tags=["AI Insights"]
)

# =========================
# EXECUTIVE SUMMARY
# =========================
@router.get("/executive-summary")
def executive_summary():

    df = get_dataframe()

    if df is None:

        return {
            "error": "No dataset uploaded."
        }

    try:

        dataset_info = f"""
        Dataset Shape:
        Rows: {len(df)}
        Columns: {list(df.columns)}

        Dataset Preview:
        {df.head(10).to_string()}
        """

        completion = client.chat.completions.create(

            model="llama3-8b-8192",

            messages=[

                {
                    "role": "system",
                    "content":
                    """
                    You are InsightFlow AI,
                    an enterprise healthcare operational intelligence platform.

                    Generate:
                    - executive summary
                    - operational insights
                    - anomalies
                    - business risks
                    - recommendations

                    Keep response concise and executive-friendly.
                    """
                },

                {
                    "role": "user",
                    "content": dataset_info
                }

            ],

            temperature=0.4

        )

        answer = (
            completion.choices[0]
            .message.content
        )

        return {

            "summary": answer,

            "status": "success"

        }

    except Exception as e:

        return {

            "error": str(e)

        }