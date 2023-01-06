---
title: "GIF Image To Media Stream"
metaTitle: "GIF Image To Media Stream"
metaDesc: "GIF Image To Media Stream"
socialImage: assets/images/webrtc.jpg
date: "2022-03-25"
tags:
	- webrtc
---

## Introduction

Hello! Today I had to stream a GIF image from canvas to WebRTC, I can't show the full code but I am thinking of doing a full tutorial in the future for my WebRTC series. 

Libraries used:
* Konva
* Gifler

---

## What is Konva?

Konva is an HTML5 Canvas Javascript framework that enables high performance animations, transitions, node nesting, layering, filtering, caching, event handling for desktop, and mobile applications etc. 

### What is a Konva Stage?

In simple terms a Konva Stage is used as a display that displays layers.

### What is a Konva Layer?

A layer is something that can be drawn to.

---

## What is Gifler?

A library that renders GIF frames to a canvas element.

---

## Creating a basic HTML file

The HTML is pretty simple:

```html
<!DOCTYPE html>
<html lang="jp">
  <head>
    <title>Canvas</title>
    <meta charset="utf-8"/>
  </head>

  <body>
    <button onclick="publish();">Publish</button>
    <div id="container"></div>

    <script src="https://unpkg.com/konva@8.3.5/konva.min.js"></script>
    <script src="https://unpkg.com/gifler@0.1.0/gifler.min.js"></script>
    <script src="./main.js"></script>
  </body>
</html>
```

The container is div will be used to display the GIF image.

Next the Javascript part.

---

## Displaying the GIF image

First I created the Konva stage and the layer in a file called "main.js".

```javascript
const stage = new Konva.Stage({
  container: 'container',
  width: 640,
  height: 480 
});

const layer = new Konva.Layer();
stage.add(layer);
```

Once the layer is created it is added to the stage.

Next was to create the canvas element and create the "onDrawFrame" function:

```javascript
const canvas = document.createElement('canvas');

const onDrawFrame = (ctx, frame) => {
  canvas.width = frame.width;
  canvas.height = frame.height;
  ctx.drawImage(frame.buffer, 0, 0); 

  layer.draw();
};
```

Then read the image and add it to the Konva layer:

```javascript
gifler('./200.gif').frames(canvas, onDrawFrame);

const image = new Konva.Image({
  image: canvas
});

layer.add(image);
```

The frames from the GIF file will be processed via the "onDrawFrame" function, which is then drawn to the canvas.

---

## From Canvas to MediaStream

Once the Publish button is clicked the following happens:

```javascript
const publish = async () => {
  try {
    const mediaStream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
    const audioTrack = mediaStream.getAudioTracks()[0];

    if (!audioTrack) {
      alert('no audio');

      return;
    }

    const localCanvas = document.getElementsByTagName('canvas')[0];
    const canvasStream = localCanvas.captureStream(30);
    const canvasTrack = canvasStream.getVideoTracks()[0];

    if (!canvasTrack) {
      alert('failed to get video track');

      return;
    }

    console.log('got audio and video tracks');
    mediaStream.addTrack(canvasTrack);
	  
    // Add the stream to a PeerConnection etc.	  
  } catch (error) {
    console.error(error);
  }
};
```

The above basically calls "getUserMedia" to obtain the user's mic only. 
Once done "captureStream" is called with an argument of 30 FPS, the canvas video track is obtained and finally we add the canvas video track to the media stream object.

Once done you can then stream the media stream object via an RTCPeerConnection, which I will go over in more detail in the near future.

Note you can use the captureStream function on a canvas displaying anything it doesn't have to be a GIF. 

---

## Conclusion

Today I learned about both the Konva and Gifler libraries. 

TBH I probably didn't need to use Konva and could have probably done the same with Gifler. 😅
But it was a good learning experience. 😃

---

Like me work? I post about a variety of topics, if you would like to see more please like and follow me.
Also I love coffee. 

[![“Buy Me A Coffee”](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/ethand9999)
