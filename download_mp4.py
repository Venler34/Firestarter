# create a program to download mp4 file from python
import requests

def download_mp4(url):
    response = requests.get(url)
    with open("song.mp4", "wb") as file:
        file.write(response.content)
# url = "https://cdn1.suno.ai/40f63969-3118-44de-803e-64b7b2862734.mp4"
# response = requests.get(url)
# with open("song.mp4", "wb") as file:
#     file.write(response.content)


# This will download the mp4 file from the given url and save it as song.mp4