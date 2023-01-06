---
title: "Creating more filters with OpenCV and Python"
metaTitle: "Creating more filters with OpenCV and Python"
metaDesc: "Creating more filters with OpenCV and Python"
socialImage: assets/images/python.png
date: "2022-11-20"
tags:
	- python
---

## Introduction

Hello! 😀

In this tutorial I will be showcasing some more filters using OpenCV and Python!
This is a continuation of my previous example which can be found here:
https://dev.to/ethand91/creating-various-filters-with-opencvpython-3077

I've already discussed how to create the virtual environment in previous tutorials so I will skip that part. 

Well lets get started creating some more filters! 🥳

---

## Vignette Filter

First we will create the vignette filter. The vignette filter is achieved by creating a broad 2D Gaussian kernel.

```python
def vignette(image, level = 2): 
    height, width = image.shape[:2]

    x_resultant_kernel = cv2.getGaussianKernel(width, width/level)
    y_resultant_kernel = cv2.getGaussianKernel(height, height/level)

    kernel = y_resultant_kernel * x_resultant_kernel.T
    mask = kernel / kernel.max()

    image_vignette = np.copy(image)

    for i in range(3):
        image_vignette[:,:,i] = image_vignette[:,:,i] * mask

    return image_vignette
```

Here we generate the vignette mask using Gaussian kernels, we then generate the result matrix and then apply the mask to each of the image's color channels.

![Vignette Filter](https://i.ibb.co/fCW34Fw/vignette.jpg)

---

## Embossed Filter

The next filter is the embossed filter:

```python
def embossed_edges(image):

    kernel = np.array([[0, -3, -3], [3, 0, -3], [3, 3, 0]])

    image_emboss = cv2.filter2D(image, -1, kernel = kernel)

    return image_emboss
```

Here we create an array for each of the channels and then apply it to the image via filter2D.

![Embossed Filter](https://i.ibb.co/zFwHybP/embossed.jpg)

---

## Outline Filter

The next filter is the outline filter:

```python
def outline(image, k = 9): 
    k = max(k, 9)
    kernel = np.array([[-1, -1, -1], [-1, k, -1], [-1, -1, -1]])

    image_outline = cv2.filter2D(image, ddepth = -1, kernel = kernel)

    return image_outline
```

Similar to the embossed filter but this time we increase the quality of the outlines.

![Outline Filter](https://i.ibb.co/8z78pMF/outline.jpg)

---

## Style Filter

The final filter is one of my personal favorites, the style filter.

```python
def style(image):
    image_blur = cv2.GaussianBlur(image, (5, 5), 0, 0)
    image_style = cv2.stylization(image_blur, sigma_s = 40, sigma_r = 0.1)

    return image_style
```

This filter is really cool IMO.
Before calling stylization it's best to blur the image a bit for better results.

![Style Filter](https://i.ibb.co/PQwRbg0/style.jpg)

---

## Conclusion

Here I have shown how to create more various filters with opencv/python. I hope this tutorial was useful to you.

If you have any cool filters please share them. 😎

The source code and the original image can be found via:
https://github.com/ethand91/python-opencv-filters

---

Like me work? I post about a variety of topics, if you would like to see more please like and follow me.
Also I love coffee. 

[![“Buy Me A Coffee”](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/ethand9999)
