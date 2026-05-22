import os
import json
from typing import List
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq
import fitz
from dotenv import load_dotenv

load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

app = FastAPI(title="Contract AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def extract_text_from_pdf(file_bytes):
    """Helper function to read PDF text."""
    text = ""
    with fitz.open(stream=file_bytes, filetype="pdf") as doc:
        for page in doc:
            text += page.get_text()
    return text

@app.post("/api/upload")
async def upload_document(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files allowed.")
    
    return {"message": "File uploaded successfully", "filename": file.filename}

@app.post("/api/analyze")
async def analyze_contract(files: List[UploadFile] = File(...)):
    if not files:
        raise HTTPException(status_code=400, detail="No files received.")
    target_file = files[0]

    if not target_file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Please upload a PDF file.")

    try:
        pdf_content = await target_file.read()
        contract_text = extract_text_from_pdf(pdf_content)
        if len(contract_text) > 25000:
            contract_text = contract_text[:25000]
        response = client.chat.completions.create(
            model="llama3-8b-8192",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a highly skilled legal AI assistant. Analyze the provided contract. "
                        "Identify the key dates, potential risks, user obligations, and provide a summary. "
                        "You MUST respond ONLY in valid JSON format."
                    )
                },
                {
                    "role": "user", 
                    "content": f"Return JSON with exactly these keys: "
                               f"'summary' (string), 'risks' (list of strings), "
                               f"'obligations' (list of strings), 'red_flags' (list of strings).\n\n"
                               f"Contract text:\n{contract_text}"
                }
            ],
            response_format={"type": "json_object"}
        )
        analysis = json.loads(response.choices[0].message.content)
        return analysis

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Server Error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)