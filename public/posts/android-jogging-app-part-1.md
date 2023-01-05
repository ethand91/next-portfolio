---
title: "Android Jogging App - Part 1"
metaTitle: "Android Jogging App"
metaDesc: "Android Jogging App"
socialImage: assets/images/jogging.webp
date: "2022-02-15"
tags:
	- android
---

## Introduction

Hello and welcome to part 1 of my jogging application side project!
Here I basically wrote what I did, why I did it and what I learned. 

Hopefully it provides motivation for both of us. 😎

### Creating the Google Cloud Application and getting the API Key

This part was pretty easy since I already has a developer acount. 
Here I created a new application and created a "Maps for android SDK" API key.

### Setting up the Android Application Project

The project was created with an Empty Activity as I didn't want any unnescassery code etc.
The first thing to do was to implement the "Maps for android SDK" library and API.

In the local.properties file I add my API key.

```
MAPS_API_KEY=API_KEY
```

Next in the Project build.gradle file I added:

```gradle
buildscript {
    dependencies {
        classpath "com.google.android.libraries.mapsplatform.secrets-gradle-plugin:secrets-gradle-plugin:2.0.1"
    }
}
```

Finally in AndroidManifest.xml under application I added:

```xml
<meta-data
            android:name="com.google.android.geo.API_KEY"
            android:value="${MAPS_API_KEY}" />
```

Next I could finally get on to designing the layout and coding!

### Creating the layout

Pretty basic linear layout:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="5dp"
        android:paddingHorizontal="20dp">

        <Button
            android:id="@+id/startButton"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:text="@string/start_button_text"/>

        <Button
            android:id="@+id/stopButton"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_marginStart="10dp"
            android:layout_weight="1"
            android:text="@string/stop_button_text" />

    </LinearLayout>

    <TextView
        android:id="@+id/numberStepsTextView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/number_steps_text"
        android:layout_marginTop="15dp"
        android:paddingStart="16dp"
        android:paddingEnd="16dp"
        android:textStyle="bold" />

    <TextView
        android:id="@+id/totalDistanceTextView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/total_distance_text"
        android:paddingStart="16dp"
        android:paddingEnd="16dp"
        android:textStyle="bold"/>

    <TextView
        android:id="@+id/averagePaceTextView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/average_pace_text"
        android:paddingStart="16dp"
        android:paddingEnd="16dp"
        android:textStyle="bold" />

    <fragment
        android:id="@+id/map"
        android:name="com.google.android.gms.maps.SupportMapFragment"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />
</LinearLayout>
```

All it contains is two buttons, one to start the tracking and one to stop.
Below that is three text views for number of steps, total distance and the average pace.

The strings are used are as follows:

```xml
<!-- Buttons -->
<string name="start_button_text">Start</string>
<string name="stop_button_text">Stop</string>

<!-- TextViews -->
<string name="number_steps_text">Number of Steps:</string>
<string name="total_distance_text">Total Distance:</string>
<string name="average_pace_text">Average Pace:</string>
```

### Creating the code

Now that the view was created I could finally start coding and learning Kotlin!

```kotlin
package com.example.joggingtracker

import android.content.Context
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.OnMapReadyCallback

class MainActivity : AppCompatActivity(), OnMapReadyCallback {
    private lateinit var mMap: GoogleMap

    companion object {
        private const val KEY_SHARED_PREFERENCES = "com.example.joggingtracker.sharedPreferences"
        private const val KEY_IS_TRACKING = "com.example.joggingTracking.isTracking"

        private const val REQUEST_CODE_FIND_LOCATION = 1
        private const val REQUEST_CODE_ACTIVITY_RECOGNITION = 2
    }

    private var isTracking: Boolean
        get() = this.getSharedPreferences(KEY_SHARED_PREFERENCES, Context.MODE_PRIVATE).getBoolean(
            KEY_IS_TRACKING, false)
        set(value) = this.getSharedPreferences(KEY_SHARED_PREFERENCES, Context.MODE_PRIVATE).edit().putBoolean(
            KEY_IS_TRACKING, value).apply()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }

    override fun onMapReady(p0: GoogleMap) {
        TODO("Not yet implemented")
    }
}
```

Very basic at the moment just setting some initial variables and listening for when the GoogleMap is ready.

### Conclusion

This is the first time I've tried to create an application in Kotlin so it's a fun challenge.
It would also be interesting to know if I start to prefer Kotlin over Java. 
Hoping to keep this up as it is a great learning experience. 😄

Do you prefer Kotlin over Java? Interested to know. 🧐

If your interested here is the github repo:
https://github.com/ethand91/Jogging-Tracker

### Things I learned

#### Kotlin

lateinit - Used for a variable that is not initialized in the constructor. ie it has a chance to be null. 
Accessing a lateinit variable before it is initialized will through a special type of exception.
isInitialized method can be used to check if the variable is initilized or not.

val - Read only property.

var - Mutable property, getter and setter can also be defined.

companion object - Members of companion objects can be called simply by using the class name as the qualifier. If imited the name Companion will be used.

---

Like me work? Any support is appreciated. :)
[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/ethand9999)
