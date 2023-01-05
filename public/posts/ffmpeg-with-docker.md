---
title: "Using a newer version of FFmpeg with Docker."
metaTitle: "Using a newer version of FFmpeg with Docker."
metaDesc: "Using a newer version of FFmpeg with Docker."
socialImage: assets/images/docker.webp
date: "2022-01-24"
tags:
	- docker
---

## Introduction

Hello, I needed to use FFmpeg in a node application, however the problem was the default FFmpeg that can be installed with the node image was too old and didn't support what I was trying to do.

There were two ways to handle this either compile FFmpeg from source, which would take a while and I really didn't want to have a long Dockerfile, not to mention the cleanup afterwards.

So I decided to copy the FFmpeg bin from the "jrottenberg/ffmpeg:4.4-alpine" into the Nodejs image. Reason being it's simpler.

---

## Using FFmpeg 4.4 with the node image

To use the FFmpeg bin with the node image I changed the head of my Dockerfile like so:

```Dockerfile
FROM jrottenberg/ffmpeg:4.4-alpine AS FFmpeg
FROM node:16-alpine

COPY --from=FFmpeg / /
```

With this I was able to use FFmpeg 4.4 with the Node 16 image. 
I also learned something new about Docker. 

Hopefully this will help me in future projects, and hopefully be of use to you.
