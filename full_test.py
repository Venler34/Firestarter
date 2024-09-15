from flask import Flask, render_template, request, redirect, url_for, jsonify, render_template_string
import os
import uuid
import requests
from PyPDF2 import PdfReader
import time
from flask_cors import CORS, cross_origin


app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Set the upload folder and allowed file extensions
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure the upload folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Check if file extension is allowed
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Extract text from a .txt file
def extract_text_from_txt(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return file.read()

# Extract text from a .pdf file
def extract_text_from_pdf(file_path):
    reader = PdfReader(file_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text() or ''
    return text
from google.cloud import vision
import io
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r"tactile-welder-435618-k3-bac3fa5999db.json"
client = vision.ImageAnnotatorClient()

def detectText(img_path):
    with io.open(img_path, 'rb') as image_file:
        content = image_file.read()

    image = vision.Image(content=content)
    response = client.document_text_detection(image=image)

    # Extract text from the OCR response
    extracted_text = response.full_text_annotation.text
    return extracted_text


# Route for the upload form
@app.route('/')
def upload_form():
    return '''
    <h1>Upload a File</h1>
    <form method="POST" enctype="multipart/form-data" action="/upload">
        <input type="file" name="file">
        <input type="submit" value="Upload">
    </form>
    '''

def download_mp4(url, song_filename):
    try:
        # Send a GET request to the URL
        response = requests.get(url, stream=True)  # stream=True for large files
        response.raise_for_status()  # Raise an HTTPError for bad responses

        # Open the file in binary write mode and save the content
        with open(song_filename, "wb") as file:
            print(f"Downloading {song_filename}...")
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:  # Filter out keep-alive new chunks
                    file.write(chunk)
        
        print(f"Successfully downloaded {song_filename}")

    except requests.RequestException as e:
        print(f"Failed to download {url}. Error: {e}")

    except IOError as e:
        print(f"Failed to write file {song_filename}. Error: {e}")


# Route to handle the file upload, extract text, summarize, and generate a song
@app.route('/upload', methods=['POST'])
@cross_origin()
def upload_file():
    if 'file' not in request.files:
        return 'No file part'

    file = request.files['file']

    if file.filename == '':
        return 'No selected file'

    if file and allowed_file(file.filename):
        filename = file.filename
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        # Extract text based on file type
        if filename.endswith('.txt'):
            extracted_text = extract_text_from_txt(file_path)
        elif filename.endswith('.pdf'):
            extracted_text = extract_text_from_pdf(file_path)
        elif filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            extracted_text = detectText(file_path)  # OCR for images
        else:
            return 'Unsupported file format'

        # Generate a unique filename for the new file
        unique_filename = f"{uuid.uuid4().hex}.txt"
        output_folder = 'output_files'
        output_path = os.path.join(output_folder, unique_filename)

        # Ensure the output folder exists
        if not os.path.exists(output_folder):
            os.makedirs(output_folder)

        # Write the extracted text to the new file
        with open(output_path, 'w', encoding='utf-8') as output_file:
            output_file.write(extracted_text)

        # Summarize the text using the Llama model API
        MODEL_ID = "8w6yyp2q"
        BASETEN_API_KEY = "YMKFudUr.FcjOTi13DlaR3ZtCbBIumoXeqFJy25yx"

        messages = [
            {"role": "system", "content": "You are someone that is going to be an expert summarizer professor who will summarize the text that I provide to you. Do not include the introduction sentence here is a summary under 250 characters please. You need to summarize the content to under 250 characters. "},
            {"role": "user", "content": extracted_text},
        ]


        payload = {
            "messages": messages,
            "stream": False,
            "max_tokens": 70,
            "temperature": 0.9
        }

        res = requests.post(
            f"https://model-{MODEL_ID}.api.baseten.co/production/predict",
            headers={"Authorization": f"Api-Key {BASETEN_API_KEY}"},
            json=payload,
            stream=False
        )
        
        summary = ""
        for chunk in res.iter_content(chunk_size=None):
            if len(summary) > 200: # goes over the word count
                break
            summary += (chunk.decode("utf-8"))

        # limit to less than 250 characters
        print("summary", summary[:250])


        # Generate a song based on the summarized text
        API_TOKEN = 'mK5w7UUPdrLR8eRtuU5Pk1DdKlXGsI30'
        GENERATE_URL = 'https://studio-api.suno.ai/api/external/generate/'
        FEED_URL = 'https://studio-api.suno.ai/api/external/clips/'
        # GENERATE_URL = 'https://studio-api.suno.ai/api/generate/lyrics/'
        
        headers = {
            "Authorization": f"Bearer {API_TOKEN}",
            "Content-Type": "application/json"
        }
        song_data = {
            "topic": summary,
            "prompt": "the angular frequency is 2 pi f",
            "tags": "hip hop",  # Adjust tags as needed
        }

     
        song_response = requests.post(GENERATE_URL, json=song_data, headers=headers)
        
        if song_response.status_code == 200:
            song_response_data = song_response.json()
            song_id = song_response_data.get("id")

            print(f"Song generation initiated with ID: {song_id}")
          
            song_link = f"https://cdn1.suno.ai/{song_id}.mp4"

            
            return jsonify({"song_link": song_link, "summary":summary})
            # # download the file at song_link
            # song_filename = f"{song_id}.mp4"
            # print(time.time())
            # time.sleep(35)
            # download_mp4(song_link, song_filename)
            # print("song filename", song_filename)

            # html_content = f'''
            #     <!DOCTYPE html>
            #     <html lang="en">
            #     <head>
            #         <meta charset="UTF-8">
            #         <meta name="viewport" content="width=device-width, initial-scale=1.0">
            #         <title>Video Embed Example</title>
            #     </head>
            #     <body>
            #         <h1>Embedded Video</h1>
            #         <video width="640" height="360" controls>
            #             <source src={song_filename} type="video/mp4">
            #         </video>
            #     </body>
            #     </html>
            
            # '''
            
            # # Return or save the HTML content as needed
            # with open('video_embed.html', 'w') as file:
            #     file.write(html_content)
            # print("HTML content saved as video_embed.html")

            # return html_content
            
        else:
            return f'Error generating song: {song_response.status_code} - {song_response.text}'

    return 'File type not allowed'

# Route to download the newly created file
@app.route('/download/<filename>')
def download_file(filename):
    return redirect(url_for('static', filename=f'output_files/{filename}'))

if __name__ == "__main__":
    app.run(debug=True)