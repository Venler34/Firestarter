import sys
import openai
import os
from google.cloud import vision
import io

# Read the API key from the file
API_KEY = open("API_KEY", "r").read().strip()
openai.api_key = API_KEY

# Set the environment variable for Google Cloud credentials
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r"tactile-welder-435618-k3-bac3fa5999db.json"
client = vision.ImageAnnotatorClient()

def detectText(img):
    with io.open(img, 'rb') as image_file:
        content = image_file.read()

    image = vision.Image(content=content) #image object
    response = client.document_text_detection(image=image) #response object

    # Extract text from the OCR response
    extracted_text = response.full_text_annotation.text

    # Create a completion request to fix grammatical mistakes
    correction_response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a helpful assistant that corrects grammatical mistakes."},
            {"role": "user", "content": f"Correct the grammatical mistakes in the following text: {extracted_text}"}
        ]
    )

    corrected_text = correction_response.choices[0].message['content']
    print(corrected_text)




FILE_NAME = 'testhandimg3.png'
FOLDER_PATH = r'D:\HackMIT\VisionApiDemo\img'
detectText(os.path.join(FOLDER_PATH, FILE_NAME))

