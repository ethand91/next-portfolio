---
title: "Download Youtube Videos With Python"
metaTitle: "Download Youtube Videos With Python"
	metaDesc: "Download Youtube Videos With Python"
socialImage: assets/images/python.png
date: "2022-12-08"
tags:
	- python
---

## Introduction

Hello! 🙂 In this tutorial I will show you how you can use python to download YouTube videos.

---

## Installing The Dependencies

First we need to install the required dependencies, we will be using a library called "pytube". Create a file called "requirements.txt" and add the following:

```
pytube
```

Next to install the dependencies you will need to run the following command:

```
pip install -r requirements.txt
```

Now we are ready to actually create the code. 😎

---

## Writing The Code

Next create a file called "main.py", first we need to declare the imports:

```python
import argparse
from pytube import YouTube
```

We will be using argparse to parse arguments passed to the script and we will be using pytube to download YouTube videos.

Next we need to declare which directories we want the video/audio to be saved to, I use the following constants:

```python
VIDEO_SAVE_DIRECTORY = "./videos"
AUDIO_SAVE_DIRECTORY = "./audio"
```

Videos and audio only will be saved into seperate directories. Next we need to create a function that handles both video and audio:

```python
def download(video_url):
    video = YouTube(video_url)
    video = video.streams.get_highest_resolution()

    try:
        video.download(VIDEO_SAVE_DIRECTORY)
    except:
        print("Failed to download video")

    print("video was downloaded successfully")
```

Nothing too complicated, this function takes the URL of the YouTube video, gets the highest resolution available and then downloads it into the videos directory. 

However if your like me and like using YouTube for mostly music content you may not need the video and just want the audio only, lets create another function that allows us to download the audio only:

```python
def download_audio(video_url):
    video = YouTube(video_url)
    audio = video.streams.filter(only_audio = True).first()

    try:
        audio.download(AUDIO_SAVE_DIRECTORY)
    except:
        print("Failed to download audio")

    print("audio was downloaded successfully")
```

Similar to the video function but this time we filter the streams for audio only and grab the first one available, after that we download the audio only stream to the audio directory.

Finally we need to write the main function:

```python
if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("-v", "--video", required = True, help = "URL to youtube video")
    ap.add_argument("-a", "--audio", required = False, help = "audio only", action = argparse.BooleanOptionalAction)
    args = vars(ap.parse_args())

    if args["audio"]:
        download_audio(args["video"])
    else:
        download(args["video"])
```

Here we use argparse to parse the video url, we also use an optional audio only flag. If the flag is enabled the audio of the video will be downloaded, by default both the video and audio will be downloaded.

Done! 😆
You should now be able to run the script via the following commands:

```bash
# video
python main.py -v "[YouTube Video URL]"

# audio
python main.py -a -v "[YouTube Video URL]"
```

The media should be available in the audio/videos directory.

---

## Conclusion

Here I have demonstrated how to download YouTube videos using a library called pytube.
I personally use this to download songs that I like. 😃

You can find the source for this tutorial here:
https://github.com/ethand91/python-youtube

---

Like me work? I post about a variety of topics, if you would like to see more please like and follow me.
Also I love coffee. 

[![“Buy Me A Coffee”](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/ethand9999)
