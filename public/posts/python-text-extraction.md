---
title: "Simple Text Extraction Using Python And Tesseract OCR"
metaTitle: "Simple Text Extraction Using Python And Tesseract OCR"
metaDesc: "Simple Text Extraction Using Python And Tesseract OCR"
socialImage: assets/images/python.png
date: "2022-06-03"
tags:
	- python
---

## Introduction

Hello! In this quick tutorial I will show how to create a simple program using Python and Tesseract OCR that can extract text from image files. 😃

---

## What is Tesseract?

Tesseract is an open source OCR (Optical Character Recognition) engine that can recognize multiple languages. 

An OCR engine can save time by digitilizing documents rather than manually typing the content of the document.

---

## Installing Teesseract and the engine

Instalation method will vary on the Operating System you use. 

Instructions on how to download Tesseract can be found here:
https://tesseract-ocr.github.io/tessdoc/Downloads.html

You will also needed the trained data for the language you are dealing with, pre-trained data can be found via the link below are downloaded via the command line etc depending on the Operating System you are using.
https://github.com/tesseract-ocr/tessdata

---

## Initializing the Python Virtual Environment

Creating a virtual environment can be done via the following command:

```bash
python3 -m venv env
source env/bin/activate
```

---

## Coding the program

Next we need to actually write some Python!
Open up "main.py" in your preferred IDE and add the following:

Importing the modules and setting the Tesseract command.

Please note that the Tesseract command will again vary based on the Operating System you are using. (For the record I'm using linux)

```python
import argparse
import pytesseract
import cv2

# Path to the location of the Tesseract-OCR executable/command
pytesseract.pytesseract.tesseract_cmd = "/usr/bin/tesseract"
```

Next we need to create a method that reads text from an image file and saves it into a file called "results.txt".

```python
def read_text_from_image(image):
  """Reads text from an image file and outputs found text to text file"""
  # Convert the image to grayscale
  gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

  # Perform OTSU Threshold
  ret, thresh = cv2.threshold(gray_image, 0, 255, cv2.THRESH_OTSU | cv2.THRESH_BINARY_INV)

  rect_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (18, 18))

  dilation = cv2.dilate(thresh, rect_kernel, iterations = 1)

  contours, hierachy = cv2.findContours(dilation, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)

  image_copy = image.copy()

  for contour in contours:
    x, y, w, h = cv2.boundingRect(contour)

    cropped = image_copy[y : y + h, x : x + w]

    file = open("results.txt", "a")

    text = pytesseract.image_to_string(cropped)

    file.write(text)
    file.write("\n")

  file.close()
```

This method basically takes an image, converts it to grayscale, gets the text from the image and then for each found text appends it to the results file.

Finally we need to write the main method.

```python
if __name__ == "__main__":
  ap = argparse.ArgumentParser()
  ap.add_argument("-i", "--image", required = True, help = "Path to input file")
  args = vars(ap.parse_args())

  image = cv2.imread(args["image"])
  read_text_from_image(image)
```

Like my previous tutorials the main method basically just takes an image file as input and then passes it on to the text extraction method.

The program can then be run via the following command:

```bash
python main.py -i text.png
```

If all works well you should have a "results.txt" file in your working directory that contains the text from the image.

---

## Conclusion

Here I have shown how to create a simple program that extracts text from an image using Python and Tesseract OCR. 

If you have any improvement suggestions etc please let me know. 😎

The source code for this tutorial can be found here:
https://github.com/ethand91/python-text-extraction

---

## Side Note

If you are following me WebRTC Tutorial please wait just a little longer, I am currently in the process of switching jobs so I haven't had much time to dedicate to the project. 🙏

---

Like me work? I post about a variety of topics, if you would like to see more please like and follow me.
Also I love coffee. 

[![“Buy Me A Coffee”](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/ethand9999)
