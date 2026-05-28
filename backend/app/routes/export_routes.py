from fastapi import APIRouter
from fastapi.responses import FileResponse

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)

from reportlab.lib.styles import getSampleStyleSheet

import pandas as pd
import os

from app.services.data_store import get_dataframe

router = APIRouter(
    prefix="/export",
    tags=["Export"]
)

EXPORT_DIR = "app/exports"

os.makedirs(
    EXPORT_DIR,
    exist_ok=True
)

# =========================
# CSV EXPORT
# =========================
@router.get("/csv")
def export_csv():

    df = get_dataframe()

    if df is None:

        return {
            "error": "No dataset uploaded."
        }

    file_path = f"{EXPORT_DIR}/dataset_export.csv"

    df.to_csv(
        file_path,
        index=False
    )

    return FileResponse(

        path=file_path,

        filename="dataset_export.csv",

        media_type="text/csv"

    )

# =========================
# PDF EXPORT
# =========================
@router.get("/pdf")
def export_pdf():

    df = get_dataframe()

    if df is None:

        return {
            "error": "No dataset uploaded."
        }

    file_path = f"{EXPORT_DIR}/executive_report.pdf"

    doc = SimpleDocTemplate(
        file_path
    )

    styles = getSampleStyleSheet()

    elements = []

    title = Paragraph(

        "InsightFlow AI Executive Report",

        styles["Title"]

    )

    elements.append(title)

    elements.append(
        Spacer(1, 20)
    )

    summary = Paragraph(

        f"""
        Total Records: {len(df)}<br/>
        Total Columns: {len(df.columns)}<br/>
        Columns: {', '.join(df.columns)}
        """,

        styles["BodyText"]

    )

    elements.append(summary)

    elements.append(
        Spacer(1, 20)
    )

    preview = Paragraph(

        df.head(10).to_string(),

        styles["Code"]

    )

    elements.append(preview)

    doc.build(elements)

    return FileResponse(

        path=file_path,

        filename="executive_report.pdf",

        media_type="application/pdf"

    )