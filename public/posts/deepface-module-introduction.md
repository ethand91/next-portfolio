---
title: "Introduction to the DeepFace Module"
metaTitle: "Introduction to the DeepFace Module"
metaDesc: "Introduction to the DeepFace Module"
socialImage: assets/images/python.png
date: "2022-06-29"
tags:
	- python
---

## Introduction

Hello! In this article I will be introducing the deepface module. 

---

## What is the DeepFace module?

DeepFace is a lightweight face recognition and facial attribute analysis (age, gender, emotion and race) framework for python.

In simple terms deepface can analyse a variety of features without the need to train your own models etc.

---

## Preparing the environment

First we need to initialize the virtual environment that we will be using for this example, this can be done via:

```bash
python3 -m venv env
source env/bin/activate
```

---

## Installing the dependencies

Create a requirements.txt file and add the following:

```bash
# requirements.txt
deepface
```

Then install via:

```bash
pip install -r requirements.txt
```

---

## Writing the source code

Create a main.py file and import the following modules:

```python
import argparse
from deepface import DeepFace
```

Next we need to create the main function:

```python
if __name__ == "__main__":
  ap = argparse.ArgumentParser()
  ap.add_argument("-i", "--image", required = True, help = "Path to input image")
  args = vars(ap.parse_args())

  img_path = args["image"]

  face_analysis = DeepFace.analyze(img_path = img_path)

  print ("gender:", face_analysis["gender"])
  print ("age:", face_analysis["age"])
  print ("dominant_race:", face_analysis["dominant_race"])
  print ("dominant_emotion", face_analysis["dominant_emotion"])
```

The above code accepts an image file and then passes the image file to the DeepFace module for analysis. 

The code can then be run via:

```bash
python main.py -i lena.jpg
```

Please note that the first time you run this script the models will need to be downloaded which will take some time.

If you were to print all of face_analysis you will get the following output:

```bash
{'emotion': {'angry': 0.09911301312968135, 'disgust': 1.032224883346089e-06, 'fear': 2.6556044816970825, 'happy': 0.01839055767050013, 'sad': 65.46446681022644, 'surprise': 0.0007067909336910816, 'neutral': 31.761714816093445}, 'dominant_emotion': 'sad', 'region': {'x': 177, 'y': 77, 'w': 68, 'h': 68}, 'age': 31, 'gender': 'Woman', 'race': {'asian': 0.18712843253856495, 'indian': 0.08294145721779508, 'black': 0.007420518965146703, 'white': 90.12329519529911, 'middle eastern': 3.5380205385697208, 'latino hispanic': 6.061198178601156}, 'dominant_race': 'white'}
```

If you were to print the output of gender/age/race/emotion you will get the following output: 

```bash
gender: Woman
age: 31
dominant_race: white
dominant_emotion sad
```

Feel free to try the example with a variety of your own images. 😎

---

## Conclusion

Here I have introduced the DeepFace module. I've had experience training my own models etc. But I thought this module was very helpful and can be used with just a few lines of code and without the need to train your own models etc. 

Feel free to try it out and let me know if there are any other useful modules etc. 👀

The code can be found at: https://github.com/ethand91/simple_deepface_example

Happy Coding!

---

Like me work? I post about a variety of topics, if you would like to see more please like and follow me.
Also I love coffee. 

[![“Buy Me A Coffee”](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/ethand9999)
