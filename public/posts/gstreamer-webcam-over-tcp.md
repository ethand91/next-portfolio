---
title: "GStreamer C++ - Stream Webcam over TCP Tutorial"
metaTitle: "GStreamer C++ - Stream Webcam over TCP Tutorial"
metaDesc: "GStreamer C++ - Stream Webcam over TCP Tutorial"
socialImage: assets/images/gstreamer.jpg
date: "2022-11-15"
tags:
	- gstreamer
---

## Introduction

Hello! In this tutorial I will show you how to stream the user's webcam over TCP using native GStreamer(C++).

---

## Requirements

- C++
- GStreamer
- GStreamer dev
- Basic knowledge of C++ and GStreamer

GStreamer installation will depend on your environment etc. But you find instructions on how to install GStreamer via: 
https://gstreamer.freedesktop.org/documentation/installing/index.html?gi-language=c

---

## Writing the Code

Next we need to actually write the code for the project, create a new file called sender.cpp and open it up in your favorite text editor.

Now we can start to code, first we need to include the headers needed:

```c++
#include <gst/gst.h>
#include <glib-unix.h>

#define HOST "127.0.0.1"
```

Here we include the GStreamer header file and if your using Linux like me you will need to also include "glib-unix". We have also defined the HOST constant which is where the stream will be sent.

Next we will need to create the main function and initialize our elements.

```c++
int main (gint argc, gchar *argv[])
{ 
  GstElement *pipeline;
  GstElement *src;
  GstElement *videoconvert;
  GstElement *videoscale;
  GstElement *encoder;
  GstElement *capsfilter;
  GstElement *muxer;
  GstElement *sink;
  GstCaps *caps;
  GMainLoop *loop;
  gint ret = -1;
```

Here we create a number of elements:

- pipeline is the GStreamer pipeline
- src is the source of the media (WebCam)
- videoconvert converts the video
- videoscale is for if scaling is required
- encoder to encode the video
- capsfilter to allow us to change the resolution etc of the video
- muxer is needed to sink the media to TCP
- sink is used to send the media over tcp
- caps is used to set the caps that will then be past to the capsfilter
- loop is the GStreamer main loop
- ret is bascially the exit code

Phew! Next we need to initialize GStreamer and the pipeline, we will also set the source to be user's webcam.

```c++
gst_init(NULL, NULL);

pipeline = gst_pipeline_new("pipeline");

src = gst_element_factory_make("autovideosrc", "autovideosrc");


if (!src)
{
    g_printerr("Failed to create src\n");

    goto no_src;
}
```

Here we have initialized GStreamer and created a new pipeline. We have also set the source to autovideosrc and autoaudiosrc which should detect your webcam and mic.

If for some reason we fail to get the source (no webcam/mic) the application will stop.

Next we will create the videoconvert/videoscale elements:

```c++
videoconvert = gst_element_factory_make("videoconvert", "videoconvert");
  
if (!videoconvert)
{
    g_printerr("Failed to create videoconvert\n");

    goto no_videoconvert;
}

videoscale = gst_element_factory_make("videoscale", "videoscale");
  
if (!videoscale)
{ 
	g_printerr("Failed to create videoscale\n");

	goto no_videoscale;
}

```

Nothing to complicated yet. Next we need to create the caps filter:

```c++
capsfilter = gst_element_factory_make("capsfilter", "capsfilter");
  
if (!capsfilter)
{ 
	g_printerr("Failed to create capsfilter\n");
 
	goto no_caps;
}
  
caps = gst_caps_from_string("video/x-raw,width=640,height=480");
g_object_set(capsfilter, "caps", caps, NULL);
gst_caps_unref(caps);
```

Here we have set the resolution of the video to VGA. This step is not required but a lot of my work involves VGA resolution. Feel free to skip this part or try playing with different resolutions etc. After the caps have been set we don't need caps anymore so it is unreffed.

Next we can create the other elements needed:

```c++
encoder = gst_element_factory_make("theoraenc", "theoraenc");
  
if (!encoder)
{ 
	g_printerr("Failed to create encoder\n");
    
	goto no_encoder;
  }
  
muxer = gst_element_factory_make("oggmux", "oggmux");
  
if (!muxer)
{ 
	g_printerr("Failed to create muxer\n");
    
	goto no_muxer;
}
  
sink = gst_element_factory_make("tcpserversink", "tcpserversink");
  
if (!sink)
{ 
	g_printerr("Failed to create sink\n");
    
	goto no_sink;
}
```

Here we initialize the encoder which will convert the video into a Theora stream, and we create the muxer which will mux the video and audio into a ogg file. We then finally create the sink which is tcpserversink which allow us to stream the file over tcp.

Finally we can add and link the elements and finally start streaming!

```c++
g_object_set(sink, "host", HOST, NULL);
  
gst_bin_add_many(GST_BIN(pipeline), src, videoconvert, videoscale, capsfilter, encoder, muxer, sink, NULL);
gst_element_link_many(src, videoconvert, videoscale, capsfilter, encoder, muxer, sink, NULL);
  
gst_element_set_state(pipeline, GST_STATE_PLAYING);
g_print("Pipeline playing\n");
  
loop = g_main_loop_new(NULL, TRUE);
g_unix_signal_add(SIGINT, signal_handler, loop);
g_main_loop_run(loop);
g_main_loop_unref(loop);
  
gst_element_set_state(pipeline, GST_STATE_NULL);
g_print("Closed succesfully\n");

ret = 0;
goto no_src;
```

Here we set the host argument of the sink to tell it to stream to localhost.
After that we start adding and linking the elements, please note GStreamer is very strict on the order of the elements.

We then set the pipeline status to PLAYING, we then tell it to stop when the user preases CTRL+R (This may vary depending on your OS etc.)

Once the user kills the process the elements are cleaned up.

Finally we need to add the elements for error handling and cleaning up any elements:

```c++
no_sink:
  gst_object_unref(sink);

no_muxer:
  gst_object_unref(muxer);

no_encoder:
  gst_object_unref(encoder);

no_caps:
  gst_object_unref(capsfilter);

no_videoscale:
  gst_object_unref(videoscale);

no_videoconvert:
  gst_object_unref(videoconvert);

no_src:
  gst_object_unref(pipeline);
  gst_deinit();

  return ret;
```

Nothing too interesting but it is important to clean up.

All done!
You can build the source with the following command: 

```bash
cc sender.cpp -o sender `pkg-config --cflags --libs gstreamer-1.0`
```

After that you can run the program via:

```bash
./sender
```

If all is successful you should be able to access your stream via TCP! 
Chrome does not seem to like TCP streams because they don't respond with anything but you can use another browser, or be like me and use VLC.

If you are using VLC open it up, click media and then network.
The address to the stream is "tcp://localhost:4953". Open it up and you should be able to see/hear the stream.

---

## Conclusion

Here I have show how to capture the user's local media with GStreamer and C++ and stream it over TCP. 

I hope the tutorial was useful to you and feel free to try experimenting with different elements etc. For example replace TCP with RTMP.

The source code for this project is available at:
https://github.com/ethand91/gstreamer-samples

---

Like me work? I post about a variety of topics, if you would like to see more please like and follow me.
Also I love coffee. 

[![“Buy Me A Coffee”](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/ethand9999)
