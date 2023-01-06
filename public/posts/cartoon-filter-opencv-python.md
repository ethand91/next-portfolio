---
title: "Cartoon Filter Using OpenCV and Python"
metaTitle: "Cartoon Filter Using OpenCV and Python"
metaDesc: "Cartoon Filter Using OpenCV and Python"
socialImage: assets/images/python.png
date: "2022-04-28"
tags:
	- python
---

## Introduction

Hello! In this tutorial I will show how to apply a simply cartoon filter on any image 😃

---

## Preparing the environment

First we need to initiate the python virtual environment which can be done via:

```bash
python3 -m venv env
source env/bin/activate
```

---

## Installing the dependencies

Create a requirements.txt file and add the following:

```bash
# requirements.txt
opencv-python
```

Then install via:

```bash
pip install -r requirements.txt
```

---

## Writing the source code

Importing the neccessary modules

```python
import argparse
import cv2
```

Writing the function to apply the cartoon effect

```python
def cartoonize (image):
  gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
  blurImage = cv2.medianBlur(image, 1)

  edges = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 9, 9)

  color = cv2.bilateralFilter(image, 9, 200, 200)

  cartoon = cv2.bitwise_and(color, color, mask = edges)

  return cartoon
```

This function basically takes an image and applies a cartoonish style filter to the image which is then returned.
Median blue is most effective when it comes to reducing the noise from the image.
Adaptive Thresholding is used to overcome false predictions and illumination problems with the image.
Bilateral filter is a edge preserving and smoothing filter for images.
Finally we apply the filter onto the image via bitwise_and.

Finally we need to write the main function

```python
if __name__ == "__main__":
  ap = argparse.ArgumentParser()
  ap.add_argument("-i", "--image", required = True, help = "Path to input file")
  args = vars(ap.parse_args())

  image = cv2.imread(args["image"])

  cartoonImage = cartoonize(image)

  cv2.imwrite("output.jpg", cartoonImage)
  cv2.imshow("output", cartoonImage)

  cv2.waitKey(0)
  cv2.destroyAllWindows()
```

What we do here is basically parse the image argument from the command line, apply the cartoon filter and then write the output to file and then show the output to the user. 
After that we listen for any key and then cleanup the window.

---

## Running the program

The program can be run via:

```bash
python main.py -i original.jpg
```

If all goes well you should see the following output:

![Sample](https://i.ibb.co/mcCmNjm/output.jpg)

The sample image was taken from my home town in the UK. 😎

---

## Conclusion

Here I have demonstrated how to apply a simple cartoon like filter to an image, feel free to experiment with your own images are even expand it to include more filters. 😀

Happy Coding!

---

Like me work? I post about a variety of topics, if you would like to see more please like and follow me.
Also I love coffee. 

[![“Buy Me A Coffee”](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/ethand9999)

