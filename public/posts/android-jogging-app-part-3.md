---
title: "Android Jogging App - Part 3"
metaTitle: "Android Jogging App"
metaDesc: "Android Jogging App"
socialImage: assets/images/jogging.webp
date: "2022-02-27"
tags:
	- android
---

## Introduction

Hello :) and welcome to part 3 of my jogging application side project. 

This time I decided to implement the sensor event listener.

---

## Setting up the sensor event listener

First for logging purposes I added a TAG variable to MainActivity.

```kotlin
private val TAG = "MainActivity"
```

Once the Activity Recognition permission is granted/not needed I then call the following method:

```kotlin
initializeStepCounterListener()
```

This method bascially initializes the listener for the step counter:

```kotlin
 private fun initializeStepCounterListener() {
    val sensorManager = getSystemService(Context.SENSOR_SERVICE) as SensorManager
    val stepCounterSensor = sensorManager.getDefaultSensor(Sensor.TYPE_STEP_COUNTER)

    stepCounterSensor ?: return


    sensorManager.registerListener(this@MainActivity, stepCounterSensor, SensorManager.SENSOR_DELAY_FASTEST,)
}
```

The above basically gets the manager and the sensor, then if the sensor is not null the listener is registered. Because I want it as close to real time as possible I use "SNSOR_DELAY_FASTEST" to get data as fast as possible.

Next I needed to add the listener to the MainActivity:

```kotlin
class MainActivity : AppCompatActivity(), OnMapReadyCallback, SensorEventListener {
```

Then I had to implement the events which are "onAccuracyChanged" and "onSensorChanged":

```kotlin
 override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {
    Log.d(TAG, "onAccuracyChanged: sensor: $sensor; accuracy: $accuracy")
 }
```

onAccuracyChanged is called when the accuracy of the registered sensor has changed.
Here I just log the event.

```kotlin
override fun onSensorChanged(event: SensorEvent?) {
    event ?: return

    event.values.firstOrNull()?.let {
        Log.d(TAG, "Steps: $it")
    }
}
```

onSensorChanged is called when there is a new sensor event. 
Here I check if there is actually an event and then loop the values and log the output.

---

## Conclusion

Short and sweet, still a newb when it comes to Kotlin but it's fun learning as I go along.

---

## Things learnt

### Kotlin

?: - Checks to make sure the variable is not null

firstOrNull - Returns the first element, or null if the array is empty.

---

Like me work? I post about a variety of topics, if you would like to see more please like and follow me.
Also I love coffee. 

[![“Buy Me A Coffee”](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/ethand9999)

