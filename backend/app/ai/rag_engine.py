from pypdf import PdfReader

pdf_text_storage = ""

# =========================
# PROCESS PDF
# =========================

def process_pdf(file_path):

    global pdf_text_storage

    try:

        reader = PdfReader(file_path)

        text = ""

        for page in reader.pages:
            extracted = page.extract_text()

            if extracted:
                text += extracted + "\n"

        pdf_text_storage = text

        return {
            "status": "success",
            "message": "PDF processed successfully",
            "characters": len(text)
        }

    except Exception as e:

        return {
            "status": "error",
            "message": str(e)
        }

# =========================
# QUERY PDF
# =========================

def query_pdf(question):

    global pdf_text_storage

    if not pdf_text_storage:

        return {
            "retrieved_context":
            "No PDF document uploaded."
        }

    context = pdf_text_storage[:12000]

    return {
        "retrieved_context": context
    }