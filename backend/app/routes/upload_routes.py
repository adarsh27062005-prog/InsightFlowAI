from fastapi import APIRouter, UploadFile, File
import pandas as pd
import os

from app.ai.rag_engine import process_pdf
from app.services.data_store import set_dataframe

from app.db.database import SessionLocal
from app.db.models import UploadedFile

router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)

UPLOAD_DIR = "app/uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)

# =========================
# CSV UPLOAD
# =========================

@router.post("/csv")
async def upload_csv(file: UploadFile = File(...)):

    file_path = f"{UPLOAD_DIR}/{file.filename}"

    with open(file_path, "wb") as f:
        f.write(await file.read())

    # =========================
    # LOAD DATAFRAME
    # =========================
    df = pd.read_csv(file_path)

    # =========================
    # STORE DATAFRAME
    # =========================
    set_dataframe(df)

    # =========================
    # SAVE TO DATABASE
    # =========================
    db = SessionLocal()

    new_file = UploadedFile(

        filename=file.filename,

        filetype="csv",

        rows=len(df),

        columns=len(df.columns)

    )

    db.add(new_file)

    db.commit()

    db.close()

    # =========================
    # NUMERIC COLUMNS
    # =========================
    numeric_columns = list(
        df.select_dtypes(
            include=["number"]
        ).columns
    )

    # =========================
    # CATEGORICAL COLUMNS
    # =========================
    categorical_columns = list(
        df.select_dtypes(
            exclude=["number"]
        ).columns
    )

    # =========================
    # MISSING VALUES
    # =========================
    missing_values = int(
        df.isnull()
        .sum()
        .sum()
    )

    # =========================
    # RESPONSE
    # =========================
    return {

        "filename": file.filename,

        "rows": len(df),

        "columns": list(df.columns),

        "numeric_columns": numeric_columns,

        "categorical_columns": categorical_columns,

        "missing_values": missing_values,

        "preview": df.head(5).to_dict(
            orient="records"
        ),

        "status": "uploaded successfully"

    }

# =========================
# PDF UPLOAD
# =========================

@router.post("/pdf")
async def upload_pdf(file: UploadFile = File(...)):

    file_path = f"{UPLOAD_DIR}/{file.filename}"

    with open(file_path, "wb") as f:
        f.write(await file.read())

    result = process_pdf(file_path)

    return {

        "filename": file.filename,

        "result": result

    }