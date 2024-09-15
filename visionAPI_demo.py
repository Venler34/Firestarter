import os, io
from google.cloud import vision
import pandas as pd

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r"tactile-welder-435618-k3-bac3fa5999db.json"
client = vision.ImageAnnotatorClient()
#print(client)


def detectText(img):
    with io.open(img, 'rb') as image_file:
        content = image_file.read()

    image = vision.Image(content=content) #image object
    response = client.text_detection(image=image) #response object
    texts = response.text_annotations #text annotations

    df = pd.DataFrame(columns=['locale', 'description']) #look for locale and description column

    for text in texts:
        df = df._append(dict(locale=text.locale, description=text.description), ignore_index=True) #append the text annotations to the dataframe

    print(df['description'][0]) #print the text annotations
    return df


FILE_NAME = 'testimg2.jpeg'
FOLDER_PATH = r'D:\HackMIT\VisionApiDemo\img'
detectText(os.path.join(FOLDER_PATH, FILE_NAME))
