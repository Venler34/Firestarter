import requests
import time
API_TOKEN = 'RMhDJXO2yeXd1mhvtyGVZ4L4DC23wLpv'
# API endpoint
GENERATE_URL = 'https://studio-api.suno.ai/api/external/generate/'
FEED_URL = "'https://studio-api.suno.ai/api/external/clips/"


headers = {
    "Authorization": f"Bearer {API_TOKEN}",
    "Content-Type": "application/json"
}

# Read the topic from the output.txt file
with open("output.txt", "r") as file:
    topic = file.read().strip()
    print(topic)

# Data to send in the POST request
data = {
    "topic": topic, 
    "prompt": "This is a song about HackMIT\n yeah HackMIT\n yeah HackMIT\n la la la",
    "tags": " hip hop",

    # "prompt": "This is a song about HackMIT\n yeah HackMIT\n yeah HackMIT\n la la la",
	# "tags": "pop",
	# "mv": "chirp-v3-5"
}

# Generate a song by making a POST request
response = requests.post(GENERATE_URL, json=data, headers=headers)

print(response.text)

# Check if the POST request was successful
if response.status_code == 200:
    response_data = response.json()
    song_id = response_data.get("id")  # Assuming the response contains the generated song's ID

    print(f"Song generation initiated with ID: {song_id}")
    
    def poll_song_status(song_id):
        feed_url_with_ids = f"{FEED_URL}?ids={song_id}"
        while True:
            response = requests.get(feed_url_with_ids, headers=headers)
            
            if response.status_code == 200:
                response_data = response.json()
                
                # Check if "clips" are available
                if "clips" in response_data and response_data["clips"]:
                    clip = response_data["clips"][0]
                    status = clip["status"]
                    
                    if status == "complete":
                        audio_url = clip.get("audio_url")
                        print(f"Song generation complete. Audio URL: {audio_url}")
                        return audio_url
                    else:
                        print(f"Song status: {status}. Retrying in 5 seconds...")
                else:
                    print("No clips found. Retrying in 5 seconds...")
            else:
                print(f"Error fetching status: {response.status_code} - {response.text}")
                return None

            time.sleep(5)

    # Use the song_id obtained from the previous step
    audio_url = poll_song_status(song_id)
else:
    print(f"Error: {response.status_code} - {response.text}")