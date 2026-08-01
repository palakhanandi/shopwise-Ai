# 🛒 ShopWise AI – Smart Shopping Assistant

ShopWise AI is an AI-powered shopping assistant that helps users make informed purchasing decisions by analyzing product images using Azure AI services.

## ✨ Features

- 📷 Upload a product image
- 👁 Detect product using Azure AI Vision
- 🤖 Analyze product with Azure OpenAI
- ⭐ AI Purchase Score
- ✅ Pros & Cons
- 📋 Product Summary
- 🔄 Alternative Recommendations
- 📢 Marketing Claim Analysis
- 🎤 Voice Assistant (Azure Speech)

## 🛠 Tech Stack

**Frontend**
- React (Vite)
- Axios
- CSS

**Backend**
- FastAPI
- Python

**Azure AI Services**
- Azure AI Vision
- Azure OpenAI
- Azure AI Speech

## 🚀 Installation

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## 🔑 Environment Variables

Create a `.env` file in the backend folder:

```env
AZURE_OPENAI_KEY=
AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_DEPLOYMENT=
AZURE_OPENAI_API_VERSION=

VISION_ENDPOINT=
VISION_KEY=

SPEECH_KEY=
SPEECH_REGION=
```


## 👩‍💻 Developer

**Palak Hanandi**

Season of AI 2.0 Final Capstone Project
