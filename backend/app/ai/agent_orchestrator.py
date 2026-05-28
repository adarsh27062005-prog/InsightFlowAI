from app.ai.rag_engine import query_pdf

# =========================
# EXECUTIVE AGENT
# =========================
def executive_agent():

    return (
        "Executive Agent detected operational intelligence requests. "
        "Business systems are functioning within expected thresholds."
    )

# =========================
# FORECAST AGENT
# =========================
def forecast_agent():

    return (
        "Forecast Agent predicts stable operational growth trends "
        "over the upcoming reporting cycle."
    )

# =========================
# ANOMALY AGENT
# =========================
def anomaly_agent():

    return (
        "Anomaly Agent detected minor operational deviations "
        "requiring monitoring attention."
    )

# =========================
# DOCUMENT AGENT
# =========================
def document_agent(prompt):

    return query_pdf(prompt)

# =========================
# CONVERSATIONAL AGENT
# =========================
def conversational_agent():

    return (
        "Conversational Agent processed enterprise analytics query successfully."
    )

# =========================
# ORCHESTRATOR
# =========================
def route_agent(prompt):

    user_prompt = prompt.lower()

    # DOCUMENT AI
    if (
        "pdf" in user_prompt
        or "document" in user_prompt
        or "policy" in user_prompt
    ):

        return {
            "agent": "Document Agent",
            "response": document_agent(prompt)
        }

    # FORECASTING
    elif (
        "forecast" in user_prompt
        or "prediction" in user_prompt
        or "future" in user_prompt
        or "trend" in user_prompt
    ):

        return {
            "agent": "Forecast Agent",
            "response": forecast_agent()
        }

    # ANOMALIES
    elif (
        "anomaly" in user_prompt
        or "risk" in user_prompt
        or "alert" in user_prompt
        or "issue" in user_prompt
    ):

        return {
            "agent": "Anomaly Agent",
            "response": anomaly_agent()
        }

    # EXECUTIVE
    elif (
        "executive" in user_prompt
        or "summary" in user_prompt
        or "business" in user_prompt
    ):

        return {
            "agent": "Executive Agent",
            "response": executive_agent()
        }

    # DEFAULT
    else:

        return {
            "agent": "Conversational Agent",
            "response": conversational_agent()
        }