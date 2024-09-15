import langchain


# from langchain.chains.summarize import load_summarize_chain
# from langchain_community.document_loaders import WebBaseLoader
# from langchain_openai import ChatOpenAI

# loader = WebBaseLoader("https://lilianweng.github.io/posts/2023-06-23-agent/")
# docs = loader.load()

# llm = ChatOpenAI(temperature=0, model_name="gpt-3.5-turbo-1106")
# chain = load_summarize_chain(llm, chain_type="stuff")


import requests

MODEL_ID = "8w6yyp2q"
BASETEN_API_KEY = "YMKFudUr.FcjOTi13DlaR3ZtCbBIumoXeqFJy25yx"


# Basic inference with streaming output

# The notebook may cut off streaming output, calling the model from the terminal instead could help.
text_file_path = 'output_files/d9edc59ad8b340aba3001fc1ea34a9d7.txt'

# Read the content from the text file
with open(text_file_path, 'r', encoding='utf-8') as file:
    content = file.read()



messages = [
    {"role": "system", "content": "You are someone that is going to be an expert summarizer professor who will summarize the text that I provide to you. You need to summarize the content to under 250 characters. Remove the sentence here is a summary. "},
    {"role": "user", "content": content},

]

payload = {
    "messages": messages,
    "stream": False,
    "max_tokens": 50,
    "temperature": 0.9
}

# Call model endpoint
res = requests.post(
    f"https://model-{MODEL_ID}.api.baseten.co/production/predict",
    headers={"Authorization": f"Api-Key {BASETEN_API_KEY}"},
    json=payload,
    stream=False
)

# Print the generated tokens as they get streamed
for chunk in res.iter_content(chunk_size=None):
    print(chunk.decode("utf-8"))
