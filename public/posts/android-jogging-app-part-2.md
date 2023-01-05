---
title: "Android Jogging App - Part 2"
metaTitle: "Android Jogging App"
metaDesc: "Android Jogging App"
socialImage: assets/images/jogging.webp
date: "2022-02-17"
tags:
	- android
---

## Introduction

Hello and welcome to part 2 of my jogging application side project :)

This time I decided to start with getting the ACTIVITY_RECOGNITION permission and handle the buttons I created last time.

---

## Adding the new strings

Here are the strings I added for this part, text for the stop tracking alert dialog and for the recognition permission.

```xml
<!-- Alerts -->
<string name="alert_dialog_positive_text">OK</string>
<string name="alert_dialog_negative_text">Cancel</string>
<string name="stop_alert_dialog_text">Are you sure you want to stop tracking?</string>

<!-- Permissions -->
<string name="activity_recognition_permission_string">Please grant access for activity recogintion, this is need for showing your step counts etc.</string>
```

---

## Getting the map and handling the buttons

Next I had to handle get the components from the layout and then set each of the button's click listeners. 

Under onCreate:

```kotlin
val mapFragment = supportFragmentManager.findFragmentById(R.id.map) as SupportMapFragment
mapFragment.getMapAsync(this)

mStartButton = findViewById<Button>(R.id.startButton)
mStopButton = findViewById<Button>(R.id.stopButton)

mStartButton.setOnClickListener {
  handleStartButtonClicked()
}

mStopButton.setOnClickListener {
  handleStopButtonClicked()
}

updateButtonStatus()

if (isTracking) {
  startTracking()
}
```

Next I had to create the methods that will be called when each button is clicked:

```kotlin
private fun handleStartButtonClicked() {
  mMap.clear()

  isTracking = true
  updateButtonStatus()

  startTracking()
}

private fun handleStopButtonClicked() {
  AlertDialog.Builder(this)
    .setTitle(R.string.stop_alert_dialog_text)
    .setPositiveButton(R.string.alert_dialog_positive_text) {_, _ ->
      isTracking = false
      updateButtonStatus()
      stopTracking()
    }.setNegativeButton(R.string.alert_dialog_negative_text) {_, _ ->

    }
    .create()
    .show()
}
```

The start button basically just sets the tracking variable to true, updates the buttons and calls startTracking.

The stop button shows an alert dialog that asks the user if they really want to stop tracking. (gotta be sure).

Next is the method that updates the UIs buttons:

```kotlin
private fun updateButtonStatus() {
  mStartButton.isEnabled = !isTracking
  mStopButton.isEnabled = isTracking
}
```

Pretty simple, it just sets the enabled status of each of the two buttons based on the tracking variable.

Finally I had to set the Google Map variable which I did via the onMapReady callback:

```kotlin
mMap = googleMap
```

---

## Implementing EasyPermissions Library

I've worked on Android apps before and getting and handling the permissions was, let's just say a pain. 

So this time I decided to use the EasyPermissions library. 

[https://github.com/VMadalin/easypermissions-ktx]

I added the below to the module build.gradle file:

```gradle
implementation 'com.vmadalin:easypermissions-ktx:1.0.0'
```

---

## Requesting the ACTIVITY_RECOGNITION permission

First I had to add the uses-permission statement to the AndroidManifest.xml file:

```xml
<uses-permission android:name="android.permission.ACTIVITY_RECOGNITION"/>
```

With that done, I was able to implement the startTracking method:

```kotlin
private fun startTracking() {
  / ACTIVITY_RECOGNITION is only needed for version Q+
  val isActivityRecognitionPermissionNeeded = Build.VERSION.SDK_INT < Build.VERSION_CODES.Q
  val isActivityRecognitionPermissionGranted = EasyPermissions.hasPermissions(this, ACTIVITY_RECOGNITION)

  if (isActivityRecognitionPermissionNeeded || isActivityRecognitionPermissionGranted) {
    // Permission Granted
} else {
    // Permission needed
    EasyPermissions.requestPermissions(
      host = this,
      rationale = getString(R.string.activity_recognition_permission_string),
      requestCode = REQUEST_CODE_ACTIVITY_RECOGNITION,
      perms = arrayOf(ACTIVITY_RECOGNITION)
)
}
```

---

*phew*, with that I was able to run it on on an emulator and check it out:

![Image of android emulator permission request](https://i.ibb.co/ygTgR94/Screenshot-from-2022-02-17-14-34-05.png)

Awesome! 😎

---

## Conclusion

Though it's still early days, I am enjoying using Kotlin. 
Next I think I'm gonna take a small break from this as I'd like to continue with my WebRTC series. (sorry for the wait. 😖)

---

Like me work? Any support is appreciated. :)
[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/ethand9999)
