from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import os
import shutil

# Azure Services
from vision import analyze_product
from openai_service import analyze_product_with_ai
from speech_service import speak

app = FastAPI(title="ShopWise AI Backend")

# -----------------------------------
# CORS
# -----------------------------------
origins = [
    "http://localhost:5173",
    "https://shopwise-ai-1-zqxb.onrender.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# -----------------------------------
# Upload Folder
# -----------------------------------
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Serve uploaded images
app.mount(
    "/uploads",
    StaticFiles(directory=UPLOAD_FOLDER),
    name="uploads"
)

# -----------------------------------
# Voice Request
# -----------------------------------
class VoiceRequest(BaseModel):
    text: str

# -----------------------------------
# Home
# -----------------------------------
@app.get("/")
def home():
    return {
        "message": "✅ ShopWise AI Backend Running"
    }

# -----------------------------------
# Analyze Product
# -----------------------------------
@app.post("/analyze")
async def analyze(image: UploadFile = File(...)):

    file_path = os.path.join(
        UPLOAD_FOLDER,
        image.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    # Azure Vision
    vision_result = analyze_product(file_path)

    # Azure OpenAI
    ai_result = analyze_product_with_ai(
        vision_result["text"],
        vision_result["caption"],
        vision_result["tags"]
    )

    # Add Vision details
    ai_result["caption"] = vision_result["caption"]
    ai_result["tags"] = vision_result["tags"]

    # Uploaded image URL
    ai_result["image"] = (
        f"http://127.0.0.1:8000/uploads/{image.filename}"
    )

    return ai_result

# -----------------------------------
# Text To Speech
# -----------------------------------
@app.post("/speak")
async def text_to_speech(data: VoiceRequest):

    speak(data.text)

    return {
        "message": "Speech played successfully"
    }
