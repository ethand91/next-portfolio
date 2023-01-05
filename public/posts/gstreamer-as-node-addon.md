---
title: "Gstreamer tutorial Part 1 as a node native addon."
metaTitle: "Gstreamer tutorial Part 1 as a node native addon."
metaDesc: "Gstreamer tutorial Part 1 as a node native addon."
socialImage: assets/images/gstreamer.jpg
date: "2022-02-02"
tags:
	- gstreamer
---

## Introduction

Hello! I needed to call some GStreamer C++ code in my application from node, however there isn't a lot of information on how to do this so I thought I'd try it myself. Just leaving this to remind myself later of the basics and if it helps anyone else, Win-Win. :)

Also I am pretty new to creating native modules, so this was a good learning experience.

This sample basically takes the sample GStreamer application Basic Tutorial 1: Hello World source and enables it to be called via NodeJS.

Here I will be using the "node-addon-api"package for wrapping.

---

## Requirements
* Gstreamer + GStreamer-Devel installed
* PkgConfig
* NodeJS

---

First we need to create the C++ file, open up "src/gstreamer.cc" and type/copy the following:

```c++
#include <gst/gst.h>
#include <napi.h>

using namespace Napi; 

Number Play (const CallbackInfo& info)
{
  GstElement *pipeline;
  GstBus *bus;
  GstMessage *message;

  gst_init(NULL, NULL);

  pipeline = gst_parse_launch(
    "playbin uri=https://www.freedesktop.org/software/gstreamer-sdk/data/media/sintel_trailer-480p.webm"
  , NULL);

  gst_element_set_state(pipeline, GST_STATE_PLAYING);

  bus = gst_element_get_bus(pipeline);
  message = gst_bus_timed_pop_filtered(bus, GST_CLOCK_TIME_NONE, (GstMessageType)(GST_MESSAGE_ERROR | GST_MESSAGE_EOS));

  if (GST_MESSAGE_TYPE(message) == GST_MESSAGE_ERROR)
  {
    g_error("An error occured");
  }

  gst_message_unref(message);
  gst_object_unref(bus);
  gst_element_set_state(pipeline, GST_STATE_NULL);
  gst_object_unref(pipeline);

  return Number::New(info.Env(), 0);
}

Object Init (Env env, Object exports)
{
  exports.Set("play", Function::New(env, Play));

  return exports;
}

NODE_API_MODULE(addon, Init);
```

Next we need to create the "bindings.gyp" file which allows us to compile native addon modules for NodeJS. 
Open it up and add the following:

```bash
{
  "targets": [
    {
      "target_name": "gstreamer",
      "sources": [
        "src/gstreamer.cc"
      ],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")",
        "<!@(pkg-config gstreamer-1.0 --cflags-only-I | sed s/-I//g)"
      ],
      "libraries": [
        "<!@(pkg-config gstreamer-1.0 --libs)"
      ],
      "cflags!": ["-fno-exceptions"],
      "cflags_cc!": ["-fno-exceptions"],
      "defines": ["NAPI_CPP_EXCEPTIONS"]
    } 
  ]
}
```

Here we basically include the needed libraries and header files, in this case we only need GStreamer.

Next we need to initialize the NodeJS Module.

```bash
npm init -y
```

Install the necessary packages:

```bash
npm i bindings node-addon-api
```

Now we need to build the native addon:

```bash
npm i
```

Now that the native module has been built we can create a test file to test it, open up "test.js" and add the following:

```javascript
const addon = require('bindings')('gstreamer');

addon.play();
```

Done now we just need to execute it:

```bash
node test.js
```

If done correctly you should now see the video playing in a new window.

Next I would like to pass the src to the native module and play that. Possibly an RTSP feed. :)

Github Repo:
https://github.com/ethand91/gstreamer-node-samples/tree/master/hello-world

---

Like me work? Any support is appreciated. :)
[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/ethand9999)

