from fastapi import APIRouter, UploadFile, File
import pandas as pd
import os

from app.ai.rag_engine import process_pdf
from app.services.data_store import set_dataframe

router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)

UPLOAD_DIR = "app/uploads"

os.makedirs(
    UPLOAD_DIR,
    exist_ok=True
)

# =========================
# CSV UPLOAD
# =========================

@router.post("/csv")
async def upload_csv(
    file: UploadFile = File(...)
):

    try:

        file_path = (
            f"{UPLOAD_DIR}/{file.filename}"
        )

        with open(
            file_path,
            "wb"
        ) as f:

            f.write(
                await file.read()
            )

        # READ CSV
        df = pd.read_csv(file_path)

        # STORE DATAFRAME
        set_dataframe(df)

        return {

            "filename": file.filename,

            "rows": len(df),

            "columns": list(df.columns),

            "preview": df.head(5).to_dict(
                orient="records"
            ),

            "status": "uploaded successfully"

        }

    except Exception as e:

        return {
            "status": "error",
            "message": str(e)
        }

# =========================
# PDF UPLOAD
# =========================

@router.post("/pdf")
async def upload_pdf(
    file: UploadFile = File(...)
):

    try:

        file_path = (
            f"{UPLOAD_DIR}/{file.filename}"
        )

        with open(
            file_path,
            "wb"
        ) as f:

            f.write(
                await file.read()
            )

        result = process_pdf(
            file_path
        )

        return {

            "filename": file.filename,

            "result": result

        }

    except Exception as e:

        return {
            "status": "error",
            "message": str(e)
        }