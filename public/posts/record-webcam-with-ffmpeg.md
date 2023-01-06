---
title: "How to record webcam video and audio using ffmpeg"
metaTitle: "How to record webcam video and audio using ffmpeg"
metaDesc: "How to record webcam video and audio using ffmpeg"
socialImage: assets/images/ffmpeg.webp
date: "2022-09-24"
tags:
	- ffmpeg
---

## Introduction

Hello! 👋

In this tutorial I will show you how to use the ffmpeg command to record your webcams video and audio to an mp4 file.

---

## The Command

The command is a pretty simple one liner. (Please note my machine is Linux so the format/input may change depending on your OS)
You can alter the command based on your webcam input by checing the following documentation:
https://trac.ffmpeg.org/wiki/Capture/Webcam

```bash
ffmpeg -f pulse -ac 2 -i default -f v4l2 -i /dev/video0 -t 00:00:20 -vcodec libx264 record.mp4
```

The -f defines the format, pulse for audio and v4l2(Video 4 Linux 2).
The -ac defines the audio channels, in this case 2.
The -i defines the input, default for audio and the webcam for video. 
The -t defines the duration of the recording, in this case 20 seconds.
The -vcodec defines the output video codec, since it is an mp4 file it is set to libx264 (H.264)
Audio should default to AAC so -acodec is not needed.

---

## Conclusion
Here I've given a very simple demonstration on how to use the ffmpeg command to capture the user's webcam footage with audio.

I'm thinking of creating a C++ example and will let you know when that's finished. 😎

Side note, I'm sorry for the wait on my WebRTC Android Tutorial, been pretty hectic recently but it's almost finished!

Hope you found this quick tutorial useful and if you have any useful resources for learning FFmpeg please share them with me.

---

Like me work? I post about a variety of topics, if you would like to see more please like and follow me.
Also I love coffee. 

[![“Buy Me A Coffee”](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/ethand9999)

