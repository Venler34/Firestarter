from flask import Flask, render_template, request, redirect, url_for, jsonify
import os
import uuid
import requests
from PyPDF2 import PdfReader
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Set the upload folder and allowed file extensions
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'txt', 'pdf'}

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

# Route to handle the file upload, extract text, save to file, and summarize
@app.route('/upload', methods=['POST'])
@cross_origin()
def upload_file():
    if 'file' not in request.files:
        print("File was invalid")
        return 'No file part'
    
    file = request.files['file']

    if file.filename == '':
        print("File was not selected")
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

        # Read the text from the new file
        with open(output_path, 'r', encoding='utf-8') as file:
            text_to_summarize = file.read()

        # Call the Llama model API for summarization
        MODEL_ID = "8w6yyp2q"
        BASETEN_API_KEY = "YMKFudUr.FcjOTi13DlaR3ZtCbBIumoXeqFJy25yx"

        messages = [
            {"role": "system", "content": "You are someone that is going to be an expert summarizer professor who will summarize the text that I provide to you."},
            {"role": "user", "content": text_to_summarize},
        ]

        payload = {
            "messages": messages,
            "stream": False,
            "max_tokens": 2048,
            "temperature": 0.9
        }

        res = requests.post(
            f"https://model-{MODEL_ID}.api.baseten.co/production/predict",
            headers={"Authorization": f"Api-Key {BASETEN_API_KEY}"},
            json=payload,
            stream = False

        )
        summary = ""
        # print("Raw Response:", res.text)
        for chunk in res.iter_content(chunk_size=None):
            summary += (chunk.decode("utf-8"))
        # if res.status_code == 200:
        #     # print(res.json())
        #     summary = res.json().get('summary', 'No summary available.')
        # else:
        #     summary = f"Error: {res.status_code} - {res.text}"

        print(summary)

        return jsonify({"content": f'''
        <h2>Extracted Text:</h2><pre>{extracted_text}</pre>
        <h2>Summary:</h2><pre>{summary}</pre>
        <br><a href="/download/{unique_filename}">Download the file</a>
        '''})

    return 'File type not allowed'

# Route to download the newly created file
@app.route('/download/<filename>')
def download_file(filename):
    return redirect(url_for('static', filename=f'output_files/{filename}'))

if __name__ == "__main__":
    app.run(debug=True)
