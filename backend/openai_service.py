import os
import json
from dotenv import load_dotenv
from openai import AzureOpenAI

load_dotenv()

client = AzureOpenAI(
    api_key=os.getenv("AZURE_OPENAI_KEY"),
    api_version=os.getenv("AZURE_OPENAI_API_VERSION"),
    azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
)

deployment = os.getenv("AZURE_OPENAI_DEPLOYMENT")


def analyze_product_with_ai(text, caption, tags):

    prompt = f"""
You are an AI Shopping Expert.

OCR Text:
{text}

Image Caption:
{caption}

Detected Tags:
{", ".join(tags)}

Your task:

1. Identify the product.
2. Guess the brand if possible.
3. Guess the product category.
4. Estimate a confidence score (0-100).
5. Give a purchase score (1-5).
6. Explain the product.
7. Give pros and cons.
8. Detect marketing exaggeration.
9. Suggest better alternatives.

Return ONLY valid JSON.

{{
    "product_name": "",
    "brand": "",
    "category": "",
    "confidence": 0,
    "summary": "",
    "pros": [],
    "cons": [],
    "score": 0,
    "best_for": "",
    "marketing_claim_analysis": "",
    "alternatives": [],
    "recommendation": "",
    "badge": "",
    "specifications": {{
        "Display": "",
        "Processor": "",
        "RAM": "",
        "Storage": "",
        "Battery": "",
        "Warranty": "",
        "Country": ""
    }}
}}

Rules:

- recommendation must be one of:
  Highly Recommended
  Recommended
  Average
  Not Recommended

- badge must be one emoji like:
  ⭐
  🔥
  👍
  ❌

- score should be between 1 and 5.

Return ONLY JSON.

Do not use markdown.
Do not use ``` blocks.
"""

    response = client.chat.completions.create(
        model=deployment,
        temperature=0.2,
        messages=[
            {
                "role": "system",
                "content": "You are an expert AI Product Analyst."
            },
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    content = response.choices[0].message.content.strip()

    return json.loads(content)