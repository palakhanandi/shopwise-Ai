import azure.cognitiveservices.speech as speechsdk
import os

speech_key = os.getenv("SPEECH_KEY")
speech_region = os.getenv("SPEECH_REGION")

def speak(text):

    speech_config = speechsdk.SpeechConfig(
        subscription=speech_key,
        region=speech_region
    )

    speech_config.speech_synthesis_voice_name = "en-US-JennyNeural"

    synthesizer = speechsdk.SpeechSynthesizer(
        speech_config=speech_config
    )

    synthesizer.speak_text_async(text).get()

    return {"message": "Speech completed"}