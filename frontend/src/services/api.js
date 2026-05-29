const BASE_URL = "https://insightflowai-lkc3.onrender.com";

export async function sendAIMessage(prompt) {

    const response = await fetch(`${BASE_URL}/ai/chat`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            prompt
        })
    });

    return response.json();
}

export async function getAnalyticsSummary() {

    const response = await fetch(`${BASE_URL}/analytics/summary`);

    return response.json();
}