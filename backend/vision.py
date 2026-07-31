import os
from dotenv import load_dotenv

from azure.ai.vision.imageanalysis import ImageAnalysisClient
from azure.ai.vision.imageanalysis.models import VisualFeatures

from azure.core.credentials import AzureKeyCredential

load_dotenv()

endpoint = os.getenv("VISION_ENDPOINT")
key = os.getenv("VISION_KEY")


client = ImageAnalysisClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(key)
)


def analyze_product(image_path):

    with open(image_path, "rb") as image_data:

        result = client.analyze(
            image_data=image_data,
            visual_features=[
                VisualFeatures.READ,
                VisualFeatures.CAPTION,
                VisualFeatures.TAGS
            ]
        )

    extracted_text = ""

    if result.read:

        for block in result.read.blocks:

            for line in block.lines:

                extracted_text += line.text + "\n"

    tags = []

    if result.tags:

        for tag in result.tags.list:

            tags.append(tag.name)

    caption = ""

    if result.caption:

        caption = result.caption.text

    return {
        "text": extracted_text,
        "caption": caption,
        "tags": tags
    }