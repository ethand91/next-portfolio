---
title: "Android Compose DataStore Tutorial"
metaTitle: "Android Compose DataStore Tutorial"
metaDesc: "Android Compose DataStore Tutorial"
socialImage: assets/images/jetpack.webp
date: "2022-12-23"
tags:
	- android
---

## Introduction

Hello! 👋

In this tutorial I will be introducing DataStore and how you can implement it into your Android Compose application. 😎

---

## What is DataStore

DataStore is part Android Jetpack. 

DataStore is a data storage solution that allows you to store key-value pairs or typed objects with protocol buffers. DataStore uses Kotlin coroutines and Flow to store data asynchronously, consistently and transactionally. 

DataStore is ideal for small, simple datasets.

In simple terms it's the new SharedPreferences. 👀

There are currently two types of DataStores:

Preferences DataStore - Stores and accesses data using keys. The implementation does not require a predefined schema, and it does not provide type safety.

Proto DataStore - Stores data as instances of a custom data type. The implementation requires you to define a schema using protocol buffers, but it provides type safety.

In this tutorial I will be showing how to use Preferences DataStore. 

When using any DataStore it's important to remember the following:

1. Never create more than one instance of DataStore for a given file in the same process
2. The generic type of the DataStore must be immutable.
3. Never mix usages of SingleProcessDataStore and MultiProcessDataStore for the same file.

---

## Creating the Project

Next we will create new Android Studio project, make sure to create an "Empty Compose Project".

![New Project](https://i.ibb.co/HX2kgRS/new-project.png)

Next give it a name such as the following and then click "Finish"

![New Project](https://i.ibb.co/0CP2fPX/data-store.png)

---

## Implementing DataStore

Next we will be using DataStore to store the user's "token", DataStore is a great way to store the user's access token, so I will be using this as an example. First install the needed dependencies:

```gradle
implementation 'org.jetbrains.kotlinx:kotlinx-serialization-json:1.4.1'
implementation 'androidx.datastore:datastore-preferences-rxjava2:1.0.0'
implementation 'androidx.datastore:datastore-preferences-rxjava3:1.0.0'
```

Make sure to sync so that the libraries are installed.

Next create a new "data" package and create a new file called "UserStore.kt", we will now write the source, write or copy the following:

```kotlin
package com.example.datastore.data

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

class UserStore(private val context: Context) {
    companion object {
        private val Context.dataStore: DataStore<Preferences> by preferencesDataStore("userToken")
        private val USER_TOKEN_KEY = stringPreferencesKey("user_token")
    }

    val getAccessToken: Flow<String> = context.dataStore.data.map { preferences ->
        preferences[USER_TOKEN_KEY] ?: ""
    }

    suspend fun saveToken(token: String) {
        context.dataStore.edit { preferences ->
            preferences[USER_TOKEN_KEY] = token
        }
    }
}
```

Here we create a class to manage the DataStore, we make sure to wrap the private variables in a companion object so they are not initialized more than once.

If you have used SharedPreferences before this should be fimiliar to you we use the key "user_token" to store and get the value. 

Now that we have the DataStore implemented, next change MainActivity.kt to the following:

```kotlin
package com.example.datastore

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.material.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.ExperimentalComposeUiApi
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalSoftwareKeyboardController
import androidx.compose.ui.platform.SoftwareKeyboardController
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.TextFieldValue
import androidx.compose.ui.unit.dp
import com.example.datastore.data.UserStore
import com.example.datastore.ui.theme.DataStoreTheme
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class MainActivity : ComponentActivity() {
    @OptIn(ExperimentalComposeUiApi::class)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            DataStoreTheme {
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colors.background
                ) {
                    Main()
                }
            }
        }
    }
}

@OptIn(ExperimentalComposeUiApi::class)
@Composable
private fun Main() {
    val context = LocalContext.current
    val keyboardController = LocalSoftwareKeyboardController.current
    val tokenValue = remember {
        mutableStateOf(TextFieldValue())
    }
    val store = UserStore(context)
    val tokenText = store.getAccessToken.collectAsState(initial = "")

    Column(
        modifier = Modifier.clickable { keyboardController?.hide() },
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Spacer(modifier = Modifier.height(30.dp))

        Text(text = "DataStorage Example", fontWeight = FontWeight.Bold)

        Spacer(modifier = Modifier.height(15.dp))

        Text(text = tokenText.value)

        Spacer(modifier = Modifier.height(15.dp))

        TextField(
            value = tokenValue.value,
            onValueChange = { tokenValue.value = it },
        )

        Spacer(modifier = Modifier.height(30.dp))

        Button(
            onClick = {
                CoroutineScope(Dispatchers.IO).launch {
                    store.saveToken(tokenValue.value.text)
                }
            }
        ) {
            Text(text = "Update Token")
        }
    }
}
```

Here we basically create simple form that takes a text input and saves it into the DataStore. Please note that you can't save information to the DataStore on the Main Thread as it's an async function. 

Now if you fire up the project you should see the following:

![Initial](https://i.ibb.co/pWLX66W/data-initial.png)

Try and change the text and click "Update Token" and the data should change to the text entered. The value should persist even if you restart the emulator/device.

![With Input](https://i.ibb.co/hdt8yFB/data-input.png)

Done! ☺️

---

## Conclusion

In this tutorial I have shown how to implement Jetpack's Preferences DataStore to get/store a variable. 

I hope this tutorial has helped you, as always happy coding! 😎

You can find the source for this project via:
https://github.com/ethand91/android-compose-store

---

Like me work? I post about a variety of topics, if you would like to see more please like and follow me.
Also I love coffee. 

[![“Buy Me A Coffee”](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/ethand9999)
