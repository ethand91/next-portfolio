---
title: "Photo Gallery Using Android Compose"
metaTitle: "Photo Gallery Using Android Compose"
metaDesc: "Photo Gallery Using Android Compose"
socialImage: assets/images/jetpack.webp
date: "2022-10-22"
tags:
	- android
---

## Introduction

Hello! 👋
In this tutorial I will show you how to create a simple image gallery application using Android Compose. 😎

---

## Creating the Project

First fire up Android Studio and create a new "Empty Compose Activity".

![New Compose Project](https://i.ibb.co/ZXJr6dV/compose-project.png)

Next give the project a name here I called mine "PhotoGalleryExample", next click Finish.

![Project](https://i.ibb.co/3pzVhDm/project.png)

Done! Next we will create the components needed.

---

## Creating the components

Next create a package called "components" and in that package add a new Kotlin file called "PhotoGrid". 

Next add the following source code:

```kotlin
package com.example.photogalleryexample.components

import androidx.compose.foundation.ExperimentalFoundationApi
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.lazy.GridCells
import androidx.compose.foundation.lazy.LazyVerticalGrid
import androidx.compose.material.Card
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp

@OptIn(ExperimentalFoundationApi::class)
@Composable
fun PhotoGrid(photos: List<Int>) {
    LazyVerticalGrid(
        cells = GridCells.Fixed(1),
        content = {
            items(photos.size) { index ->
                Card(modifier = Modifier.height(300.dp)) {

                    Image(
                        painter = painterResource(id = photos.get(index)),
                        contentDescription = "Photo",
                        contentScale = ContentScale.FillBounds
                    )
                }
            }
        }
    )
}
```

Since LazyVerticalGrid is still experimental you will need to add the OptIn above the Composable annotation.

Since the images I'm using are pretty large I've given a grid cell size of 1 but feel free to experiment with this number.

Lazy is used to prevent performance issues, I highly recommend you use this if you are planning to show a large amount of images.

I've also set the photo to fill the bounds of the card.

It's no use creating a Component without using it so next let's edit the MainActivity.kt.

---

## Editing the MainActivity file

To actually show the photo grid to the user we need to actually use it. 

Change the contents of MainActivity so that it resembles the following:

```kotlin
package com.example.photogalleryexample

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Scaffold
import androidx.compose.material.Surface
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.example.photogalleryexample.ui.theme.PhotoGalleryExampleTheme
import com.example.photogalleryexample.components.PhotoGrid

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            PhotoGalleryExampleTheme {
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colors.background
                ) {
                    MainScreen()
                }
            }
        }
    }
}

@Composable
fun MainScreen() {
    val photos = listOf<Int>(
        R.drawable.pexels_photo_12284667,
        R.drawable.pexels_photo_13046458,
        R.drawable.pexels_photo_13366951,
        R.drawable.pexels_photo_13624924,
        R.drawable.pexels_photo_13675780,
        R.drawable.pexels_photo_9969158,
        R.drawable.pexels_photo_5422596,
        R.drawable.pexels_photo_13850240,
    )

    Scaffold() {
        Column(modifier = Modifier.padding(20.dp)) {
            PhotoGrid(photos = photos)
        }
    }
}
```

Obviously you will need to replace the list of photos with your own drawables. I used a couple of sample images from the following site:

https://www.pexels.com/

Feel free to get some images from the site or even better use your own.

Now fire the app up on an emulator or an actual device and you should see the following:

![Gallery](https://i.ibb.co/DKHYYDk/emulator-gallery.png)

You should also be able to scroll through the images.

Well done! Feel free to experiment with the grid etc.

---

## Conclusion

Here I have shown how to implement a simple gallery app using Android Compose.

I was actually amazed at how something like this could be implemented with very little code. 🤯

You can find the source for this tutorial at Github:
https://github.com/ethand91/PhotoGridExample

Personally I'm having a lot of fun learning Android Compose. 🙂

---

Like me work? I post about a variety of topics, if you would like to see more please like and follow me.
Also I love coffee. 

[![“Buy Me A Coffee”](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/ethand9999)
