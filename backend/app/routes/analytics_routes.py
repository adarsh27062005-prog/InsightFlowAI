from fastapi import APIRouter
import numpy as np

from app.services.data_store import get_dataframe

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)

# =========================
# SUMMARY ANALYTICS
# =========================

@router.get("/summary")
def analytics_summary():

    df = get_dataframe()

    if df is None:

        return {
            "error": "No dataset uploaded yet."
        }

    total_rows = len(df)

    total_columns = len(df.columns)

    missing_values = int(
        df.isnull().sum().sum()
    )

    numeric_columns = list(
        df.select_dtypes(
            include=np.number
        ).columns
    )

    return {

        "total_records": total_rows,

        "total_columns": total_columns,

        "missing_values": missing_values,

        "numeric_columns": numeric_columns,

        "status": "success"

    }

# =========================
# KPI ANALYTICS
# =========================

@router.get("/kpis")
def kpi_data():

    df = get_dataframe()

    if df is None:

        return {
            "error": "No dataset uploaded yet."
        }

    numeric_df = df.select_dtypes(
        include=np.number
    )

    if numeric_df.empty:

        return {
            "error": "No numeric columns found."
        }

    insights = {}

    for col in numeric_df.columns:

        insights[col] = {

            "mean": round(
                float(df[col].mean()), 2
            ),

            "max": round(
                float(df[col].max()), 2
            ),

            "min": round(
                float(df[col].min()), 2
            ),

            "sum": round(
                float(df[col].sum()), 2
            )

        }

    return {

        "kpis": insights,

        "status": "success"

    }

# =========================
# COLUMN INSIGHTS
# =========================

@router.get("/columns")
def column_insights():

    df = get_dataframe()

    if df is None:

        return {
            "error": "No dataset uploaded yet."
        }

    insights = {}

    for col in df.columns:

        insights[col] = {

            "dtype": str(df[col].dtype),

            "unique_values": int(
                df[col].nunique()
            ),

            "missing_values": int(
                df[col].isnull().sum()
            )

        }

    return {

        "columns": insights

    }