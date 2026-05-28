from fastapi import APIRouter

import numpy as np

from sklearn.ensemble import IsolationForest
from sklearn.linear_model import LinearRegression

from app.services.data_store import get_dataframe

router = APIRouter(
    prefix="/ml",
    tags=["Machine Learning"]
)

# =========================
# FORECASTING
# =========================

@router.get("/forecast")
def forecast_data():

    df = get_dataframe()

    if df is None:

        return {
            "error": "No dataset uploaded."
        }

    numeric_cols = list(
        df.select_dtypes(
            include=["number"]
        ).columns
    )

    if len(numeric_cols) == 0:

        return {
            "error": "No numeric columns found."
        }

    target_col = numeric_cols[0]

    values = df[target_col].fillna(0).values

    X = np.array(
        range(len(values))
    ).reshape(-1, 1)

    y = values

    model = LinearRegression()

    model.fit(X, y)

    future_X = np.array(
        range(len(values), len(values) + 10)
    ).reshape(-1, 1)

    predictions = model.predict(future_X)

    return {

        "target_column": target_col,

        "forecast": [
            round(float(x), 2)
            for x in predictions
        ]

    }


# =========================
# ANOMALY DETECTION
# =========================

@router.get("/anomalies")
def detect_anomalies():

    df = get_dataframe()

    if df is None:

        return {
            "error": "No dataset uploaded."
        }

    numeric_df = df.select_dtypes(
        include=["number"]
    )

    if numeric_df.empty:

        return {
            "error": "No numeric data available."
        }

    model = IsolationForest(
        contamination=0.05,
        random_state=42
    )

    predictions = model.fit_predict(
        numeric_df.fillna(0)
    )

    anomaly_indices = np.where(
        predictions == -1
    )[0]

    return {

        "total_anomalies":
        int(len(anomaly_indices)),

        "anomaly_rows":
        anomaly_indices.tolist()

    }