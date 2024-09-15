import os

# Define the folder and file path
output_folder = 'output_files'
output_filename = 'output.txt'
output_path = os.path.join(output_folder, output_filename)

# Ensure the output folder exists
if not os.path.exists(output_folder):
    os.makedirs(output_folder)

# Data to be written to the file
data = "This is the content that will be written to the new file.\n"
data += "Including some special characters: 𝄟, 😊, こんにちは"

# Write data to the file with UTF-8 encoding
with open(output_path, 'w', encoding='utf-8') as file:
    file.write(data)

print(f"Data has been written to {output_path}")
