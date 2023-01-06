---
title: "MediaRecorder API Tutorial"
metaTitle: "MediaRecorder API Tutorial"
metaDesc: "MediaRecorder API Tutorial"
socialImage: assets/images/webrtc.jpg
date: "2022-03-16"
tags:
	- webrtc
---

## Introduction

Hello! Here I will show you how to use the MediaRecorder API to record your web camera and save the recorded media to a local file.

---

## What is the MediaRecorder API?

In simple terms, the MediaRecorder API makes it possible to capture the data from a MediaStream or HTMLMediaElement object for analysis, processing, or saving to disk. 

In this tutorial we will be taking the local MediaStream, recording it and then saving it to disk.

---

## Creating the HTML file

First we need to create a simple HTML file, here I just create two buttons, one to start the record and one to stop the record, as well as a local video object to display the media.

Open up index.html and add the following:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Media Recorder Example</title>
  </head>

  <body>
    <h1>Simple Media Recorder Sample<h1>
    <br />

    <button onclick="startRecord();">Start Record</button>
    <button onclick="stopRecord();">Stop Record</button>
    <hr>

    <video id="localVideo" muted autoplay></video>

    <script src="main.js"></script>
  </body>
</html>
```

Next we need to create the main.js file. 

---

## Setting up the global variables

```javascript
const localVideo = document.getElementById('localVideo');
let chunks = [];
let mediaRecorder;
```

Here the localVideo is the video object we defined in the index.html file.

The chunks array is an array we will use to store the data received from the mediaRecorder.

Finally the mediaRecorder is the object we will use to actually record the media.

Next we need to write a function to start the recording.

---

## Creating the startRecord Function

The startRecord function basically creates the mediaRecorder object, initializes the user's local media, sets up the listeners and starts the recording session.

```javascript
const startRecord = async () => {
  const mimeType = 'video/webm;codecs=vp8,opus';

  if (!MediaRecorder.isTypeSupported(mimeType)) {
    alert('vp8/opus mime type is not supported');

    return;
  }

  const options = {
    audioBitsPerSecond: 128000,
    mimeType,
    videoBitsPerSecond: 2500000
  }

  const mediaStream = await getLocalMediaStream();

  mediaRecorder = new MediaRecorder(mediaStream, options);

  setListeners();

  mediaRecorder.start(1000);
};
```

Here we specify the mimeType that we would prefer, the default is browser specific. Here we want VP8 video codec with opus audio codec. We also check to see if it is supported, if it's not supported we return an alert.

We also set up the MediaRecorder options with the mimeType and the audio and video bits per second. You don't need to include the bits per second I'm just doing it for demonstration purposes.

Next we call a helper function to get the user's local MediaStream. The helper function is as follows:

```javascript
const getLocalMediaStream = async () => {
  const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  localVideo.srcObject = mediaStream;

  return mediaStream;
};
```

This helper function basically just calls getUserMedia with simple constraints, display the video in the video object and returns a MediaStream object.

Next we create the MediaRecorder object, set up the listeners and then start the recording session with a timeslice of 1000 milliseconds.

#### Timeslice

Timeslice is the number of milliseconds to record into each Blob.

Next we need to create the listeners to handle the MediaRecorder events.

---

## Setting up the MediaRecorder listeners

For this example we only need to handle the ondataavailable and the onstop events.

ondataavailable is needed to add the data to the chunks array.

onstop is needed so that we can save the recorded session to file.

Create the setListeners function:

```javascript
const setListeners = () => {
  mediaRecorder.ondataavailable = handleOnDataAvailable;
  mediaRecorder.onstop = handleOnStop;
};
```

Next we need to create the handleOnDataAvailable function:

```javascript
const handleOnDataAvailable = ({ data }) => {
  if (data.size > 0) {
    chunks.push(data);
  }
};
```

Here we just make sure we actually have data and if so add it to the chunks array.

Next we need to create the handleOnStop function:

```javascript
const handleOnStop = () => {
  saveFile();

  destroyListeners();
  mediaRecorder = undefined;
};
```

Here we call the saveFile function which we will define later, destroy the listeners and then deinitialize the mediaRecorder object.

Finally we need to create the destroyListeners function:

```javascript
const destroyListeners = () => {
  mediaRecorder.ondataavailable = undefined;
  mediaRecorder.onstop = undefined;
};
```

Here we just clear the listeners, it's a good practice to clear any event listeners that you have set once you are done with it.

---

## Creating the stopRecord Function

The stop record function is very simple:

```javascript
const stopRecord = async () => {
  if (!mediaRecorder) return;

  mediaRecorder.stop();
};
```

Here we basically  just check that the mediaRecorder is actually defined and if so call stop to stop the recording session.

Finally we need to create a function that will save the recorded media to disk.

---

## Saving the recorded data to disk

The saveFile function is as follows:

```javascript
const saveFile = () => {
  const blob = new Blob(chunks);

  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.style = 'display: none';
  link.href = blobUrl;
  link.download = 'recorded_file.webm';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  window.URL.revokeObjectURL(blobUrl);
  chunks = [];
};
```

Here we create a new Blob object from the chunks array and transform it into an object URL.

We then use a little hack to create a url element and then click so it downloads automatically without the user having to do anything.

Finally we clean up the url and reset the chunks array.

---

## Conclusion

Here I have shown the basics of the MediaRecorder API, feel free to play around with it. 

There is a lot more you can do with the MediaRecorder API, feel free to experiment if you're interested. 😎

The source code for this example can be found here:
https://github.com/ethand91/mediarecorder-localfile-sample

---

## Sidenote

I'm still working on the Android WebRTC tutorial, the API has changed since I remembered so please forgive the long wait it is still in progress. 🙏

---

Like me work? I post about a variety of topics, if you would like to see more please like and follow me.
Also I love coffee. 

[![“Buy Me A Coffee”](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/ethand9999)
