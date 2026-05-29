from fastapi import APIRouter, UploadFile, File
import pandas as pd
import os
import traceback

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

        # SAVE FILE
        file_path = os.path.join(
            UPLOAD_DIR,
            file.filename
        )

        contents = await file.read()

        with open(
            file_path,
            "wb"
        ) as f:

            f.write(contents)

        # READ CSV
        df = pd.read_csv(
            file_path,
            encoding="utf-8"
        )

        # STORE DATAFRAME
        set_dataframe(df)

        return {

            "status": "success",

            "filename": file.filename,

            "rows": len(df),

            "columns": list(df.columns),

            "preview": df.head(5).to_dict(
                orient="records"
            )

        }

    except Exception as e:

        print(traceback.format_exc())

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

        file_path = os.path.join(
            UPLOAD_DIR,
            file.filename
        )

        contents = await file.read()

        with open(
            file_path,
            "wb"
        ) as f:

            f.write(contents)

        result = process_pdf(
            file_path
        )

        return {

            "status": "success",

            "filename": file.filename,

            "result": result

        }

    except Exception as e:

        print(traceback.format_exc())

        return {

            "status": "error",

            "message": str(e)

        }