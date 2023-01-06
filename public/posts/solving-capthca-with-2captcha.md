---
title: "Solving CAPTCHA Using 2Captcha"
metaTitle: "Solving CAPTCHA Using 2Captcha"
metaDesc: "Solving CAPTCHA Using 2Captcha"
socialImage: assets/images/2cap.webp
date: "2022-06-21"
tags:
	- javascript
---

## Introduction

Hello! In this tutorial I will be showing how to bypass the captcha recognition process using a service called 2Captcha.

---

## What is 2Captcha?

2Captcha is a service created to automate the captcha recognition process. 

All captchas are recognized by humans which means that 2Captcha can recognise all humanly readable types of captchas. 

If you're like me and sometimes have trouble reading reading the letters etc in a captcha, then you may also benefit from trying the service out. 

I was surprised to know it even handles reCAPTCHA v2. 😎

---

## Getting the 2Captcha API Key

In order to start using the service we will need an API Key. 

First you will need to register an account at:
https://2captcha.com/auth/register

![Account Registration](https://i.ibb.co/NyXRBK7/account-registration.png)

Once you have created an account simply navigate your browser to following URL and make a note of your API Key.
https://2captcha.com/setting

---

## Setting up the project

For this example I will be using nodejs.

First we need to create the project.

```bash
npm i -y
```

Then the need to install the 2captcha module, this can be done via:

```bash
npm i 2captcha
```

Next we need to create a config file that holds the 2Captcha API key:

```bash
mkdir src
```

Open "src/config.js" and add the following, make sure to replace the API key with your own, the API key can be accessed at:
https://2captcha.com/setting

```javascript
const API_KEY = 'secret';

module.exports = { 
  API_KEY
}
```

---

## Using 2Captcha to solve a simple Captcha

Normal captcha is an image that contains distorted but human-readable text. Though sometimes I can't make sense of some of the letters used. 😅

So let's try using 2Captcha to solve it.

For this example I will use the following normal captcha image:

![Normal Captcha](https://i.ibb.co/FnW8hBZ/captcha-image.png)

First create the "src/normal.js" file and add the following:

```javascript
const { Solver } = require('2captcha');
const { readFileSync } = require('fs');

const { API_KEY } = require('./config');

const solver = new Solver(API_KEY);

(async () => {
  try {
    const imageBase64File = await readFileSync('./captcha-image.png', 'base64');
    const response = await solver.imageCaptcha(imageBase64File);

    console.log(response);
  } catch (error) {
    console.error(error);
  }
})();
```

The source itself is pretty simple, we import the 2Captcha module, read the image file as Base64 data and then pass the data to the 2Captcha module to solve it.

Next we can try running it via:

```bash
node src/normal.js
```

![Normal data](https://i.ibb.co/bWDPBtx/normal-data.png)

Amazing! 😃 Feel free to try the sample with a variety of images. 

---

## Using 2Captcha to solve reCAPTCHA

Next we can try using 2Captcha to solve the more advanced reCAPTCHA. 👀
Personally I always have issues with this type of captcha as I always seem to be wrong. 😅

For this example I will be using the following site:
https://recaptcha-demo.appspot.com/recaptcha-v2-checkbox.php

In order to solve this captcha we will need to get the sitekey variable, this can be found by opening the "Developer Console" and simply filtering the word "sitekey" like the following:

![Sitekey](https://i.ibb.co/pjSzC16/sitekey.png)

Make a note of this variable as we will be needing it.

Next create the "src/recaptcha.js" file and add the following:

```javascript
const { Solver } = require('2captcha');

const { API_KEY } = require('./config');

const solver = new Solver(API_KEY);

(async () => {
  try {
    const response = await solver.recaptcha(
      '6LfW6wATAAAAAHLqO2pb8bDBahxlMxNdo9g947u9',
      'https://recaptcha-demo.appspot.com/recaptcha-v2-checkbox.php'
    );  

    console.log(response);
  } catch (error) {
    console.error(error);
  }
})();
```

Again the source is very simple, this time instead of an image we just pass the sitekey and the url of the page to the 2Captcha module. 

reCAPTCHA is obviously harder than a simple image file so the request my take some time.
If all goes well you should see the following output:

![reCaptcha image](https://i.ibb.co/Y7dmWbx/recaptcha-data.png)

Amazing. 😎

---

## Conclusion

Here I have shown how to use the 2Captcha service to solve simple and hard captchas, I was amazed at how it can be done so simply. 👀

Since it's better at solving them better than me I sometimes use it for personal reasons. 😅

I can definetely see something like this being used for automation purposes etc. 😀

The source can be found here: 
https://github.com/ethand91/2captcha-sample

---

Like me work? I post about a variety of topics, if you would like to see more please like and follow me.
Also I love coffee. 

[![“Buy Me A Coffee”](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/ethand9999)
