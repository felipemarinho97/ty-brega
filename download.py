import json
import os

file = open('./finalVideos.json')

data = json.loads(file.read())

i = 1

for item in data:
    os.system('youtube-dl -x --audio-format "m4a" --audio-quality 0 -o "' +str(i)+ '.%(title)s.%(ext)s" ' + item['videoURL'])
    i+=1