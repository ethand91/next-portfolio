---
title: "Setting up YOLO with Darknet"
metaTitle: "Setting up YOLO with Darknet"
metaDesc: "Setting up YOLO with Darknet"
socialImage: assets/images/python.png
date: "2022-04-14"
tags:
	- cv
---

## Introduction

Hello! In this tutorial I will show you how to setup YOLO with Darknet.

---

## What is YOLO?

YOLO (You Only Look Once) is a single stage detector that is popular due to it's speed and accuracy, it has been used in various applications to detect people, animals, traffic signals etc.

There are other object detectors such as R-CNN however, they are not as reliable as YOLO.

In this tutorial we will be building YOLOv3, v3 is significantly larger than previous models but it is the best one to use.

---

## What is Darknet?

Darknet is an open source neural network framework written in C and CUDA. It is fast, easy to install, and supports CPU and GPU computation.

---

## Setting up YOLO with Darknet

First we need to install darknet

```bash
git clone https://github.com/pjreddie/darknet && cd darknet
make
```

Next we need to download the pre-trained weights

```bash
wget https://pjreddie.com/media/files/yolov3.weights
wget https://pjreddie.com/media/files/yolov3-tiny.weights
```

Or you can use the following bash script:
https://gist.github.com/ethand91/62ec891bf30ba38ab47553e4952057e8

Now we can try out the detector on the sample images provided in the repository.

```bash
./darknet detector test cfg/coco.data cfg/yolov3.cfg yolov3.weights data/horses.jpg
```

If all goes well you should see the predictions in the terminal, there will also be a file called "predictions.jpg" which when opened should look something like the below image:

![Sample](https://i.ibb.co/CwvbHdV/result.jpg)

---

## Making the detection faster with GPU

You can get the same results but with much faster time by enabling the GPU flag.
To do this just modify the Makefile.

```bash
GPU=1
```

Then rerun make

```bash
make
```

---

## Conclusion

In this tutorial I have shown how to setup Yolo with Darknet. 
I am currently interested in yolov4 👀

If you have any cool sample/projects please share. 😃

---

Like me work? I post about a variety of topics, if you would like to see more please like and follow me.
Also I love coffee. 

[![“Buy Me A Coffee”](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/ethand9999)
