---
title: "Android Jetpack Compose API Tutorial"
metaTitle: "Android Jetpack Compose API Tutorial"
metaDesc: "Android Jetpack Compose API Tutorial"
socialImage: assets/images/jetpack.webp
date: "2022-10-12"
tags:
	- android
---

## Introduction

Hello.

In this tutorial I will be showing how to use Android Jetpack Compose to send a request to an API and displaying the received data. 😄

---

## Preparing The API

First we need to actually create a simple API to retrieve data from.

For this tutorial I will be using "JSON Server":
https://github.com/typicode/json-server

Installation is pretty straightforward you just need to open up your terminal and run the following command:

```bash
npm install -g json-server
```

Next we need to create a "data.json" file and input some information. Feel free to change the values to whatever you want.

```json
{
  "users": [
    {   
      "id": 1,
      "profile": {
        "age": 20, 
        "name": "Ethan",
        "email": "example@email.com"
      }   
    }   
  ]
}
```

Finally you can start the server via the following command: 

```
json-server --host [Your Network IP] data.json
```

Make sure to change the host to your local network, the network needs to be defined so it can be accessed by an emulator/actual device.

If you access http://ip:3000/users you should see the following data printed in your browser. 

![JSON Data](https://i.ibb.co/rG1JCDm/url.png)

---

## Creating The Project

Next we need to open Android Studio and create the new project that will be used for this tutorial.

When prompted for the type of project to create choose "Empty Compose Activity"

![New Compose Project](https://i.ibb.co/ZXJr6dV/compose-project.png)

Next give it a name for example "ApiExample" and click finish. 
This is an image I took after creating the project so my save location would normally be "ApiExample".

![New Project Compose](https://i.ibb.co/nswpJM3/new-project.png)

---

## Editing The Manifests File

First we need to edit the manifests file as we will need the internet position so add the following above the "application" section:

```xml
<uses-permission android:name="android.permission.INTERNET"/>
```

Also we will not be using a secure protocol so if your not using https add the following to application:

```xml
android:usesCleartextTraffic="true"
```

Make sure to turn the above off for production.

---

## Installing The Dependencies

Next we need to install the dependencies that will be used for this project. 

Open up the module "build.gradle" and add the following implementations:

```gradle
dependencies {
	implementation 'com.squareup.retrofit2:retrofit:2.9.0'
	implementation 'com.squareup.retrofit2:converter-gson:2.5.0'
}
```

Sync the project to install the dependencies.

---

## Creating The User API
Next we need to create file to handle the API call, create a new "api" package and then create a file called "UserApi.kt" and then fill it with the following contents:

```kotlin
package com.example.apiexample.api  
  
import com.example.apiexample.ProfileModel  
import com.example.apiexample.UserModel  
import okhttp3.ResponseBody  
import retrofit2.Call  
import retrofit2.Response  
import retrofit2.Retrofit  
import retrofit2.http.Body  
import retrofit2.http.GET  
import retrofit2.http.Headers  
import retrofit2.http.Path  
  
public interface UserApi {  
    @Headers(  
        "Accept: application/json"  
    )  
    @GET("users/{id}")  
    abstract fun getUserById(@Path("id") id: String): Call<UserModel?>?  
}
```

Don't worry about any errors for the amount as they will be fixed later.
This call takes a user id and retrieves that user's profile.

---

## Editing The MainActivity
Next we need to edit the MainActivity.kt file, first we will defined the imports:

```kotlin
package com.example.apiexample  
  
import android.content.Context  
import android.os.Bundle  
import android.util.Log  
import android.view.View  
import android.widget.Toast  
import androidx.activity.ComponentActivity  
import androidx.activity.compose.setContent  
import androidx.compose.foundation.layout.*  
import androidx.compose.material.*  
import androidx.compose.runtime.Composable  
import androidx.compose.runtime.MutableState  
import androidx.compose.runtime.mutableStateOf  
import androidx.compose.runtime.remember  
import androidx.compose.ui.Alignment  
import androidx.compose.ui.Modifier  
import androidx.compose.ui.graphics.Color  
import androidx.compose.ui.text.TextStyle  
import androidx.compose.ui.text.font.FontFamily  
import androidx.compose.ui.text.input.TextFieldValue  
import androidx.compose.ui.text.style.TextAlign  
import androidx.compose.ui.tooling.preview.Preview  
import androidx.compose.ui.unit.dp  
import androidx.compose.ui.unit.sp  
import com.example.apiexample.api.UserApi  
import com.example.apiexample.ui.theme.ApiExampleTheme  
import com.example.apiexample.ui.theme.Purple700  
import retrofit2.*  
import retrofit2.converter.gson.GsonConverterFactory
```

Next we need to change MainActivity class to the following:

```kotlin
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            ApiExampleTheme {
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
```

Nothing too complicating yet. 

Next we need to create the data classes with the same variables as the JSON data file we created previously.

```kotlin
data class ProfileModel(
    var age: String,
    var name: String,
    var email: String,
)

data class UserModel(
    var profile: ProfileModel
)
```

Next we need to create the MainScreen Composable, if your not too familiar with the UI feel free to check out my tutorial on Compose forms available here:
https://dev.to/ethand91/android-jetpack-compose-form-tutorial-279a

```kotlin
@Composable
fun MainScreen() {
   Scaffold(
       topBar = {
           TopAppBar(
               backgroundColor = Purple700,
               title = {
                   Text(
                       text = "Simple API Request",
                       modifier = Modifier.fillMaxWidth(),
                       textAlign = TextAlign.Center,
                       color = Color.White
                   )
               }
           )
       },
       content = {
          Column(
              modifier = Modifier.fillMaxWidth(),
              verticalArrangement = Arrangement.Center,
              horizontalAlignment = Alignment.CenterHorizontally
          ) {
              val id = remember {
                  mutableStateOf(TextFieldValue())
              }

              val profile = remember {
                  mutableStateOf(ProfileModel(
                      age = "",
                      name = "",
                      email = ""
                  ))
              }

              Text(
                  text="API Sample",
                  style= TextStyle(
                      fontSize = 40.sp,
                      fontFamily = FontFamily.Cursive
                  )
              )

              Spacer(modifier = Modifier.height(15.dp))

              TextField(
                  label = { Text(text = "User ID")},
                  value = id.value,
                  onValueChange = { id.value = it }
              )

              Spacer(modifier = Modifier.height(15.dp))

              Box(modifier = Modifier.padding(40.dp, 0.dp, 40.dp, 0.dp)) {
                  Button(
                      onClick = {
                          val data = sendRequest(
                              id = id.value.text,
                              profileState = profile
                          )

                          Log.d("Main Activity", profile.toString())
                      }
                  ) {
                      Text(text = "Get Data")
                  }
              }
              
              Spacer(modifier = Modifier.height(15.dp))
              
              Text(text = profile.component1().toString(), fontSize = 40.sp)
          }
       }
   )
}
```

This will create a simple form containing a title, text input and a button. Finally we need to create a function that will actually call the API, get the data and show it to the user. Make sure to replace the IP address with your own.

```kotlin
fun sendRequest(
    id: String,
    profileState: MutableState<ProfileModel>
) {
    val retrofit = Retrofit.Builder()
        .baseUrl("http://192.168.0.109:3000")
        .addConverterFactory(GsonConverterFactory.create())
        .build()

    val api = retrofit.create(UserApi::class.java)

    val call: Call<UserModel?>? = api.getUserById(id);

    call!!.enqueue(object: Callback<UserModel?> {
        override fun onResponse(call: Call<UserModel?>, response: Response<UserModel?>) {
            if(response.isSuccessful) {
                Log.d("Main", "success!" + response.body().toString())
                profileState.value = response.body()!!.profile
            }
        }

        override fun onFailure(call: Call<UserModel?>, t: Throwable) {
            Log.e("Main", "Failed mate " + t.message.toString())
        }
    })
}
```

All done! Now we can finally try it out!

---

## Running The App
Finally we can run the sample app on an emulator/actual device, once the app is fired up you should see the following screen:

![Emulator Initial State](https://i.ibb.co/nQCfrgZ/initial-state.png)

Next enter the user who's profile you want to obtain by entering their id into the input text. Since I only have one user I enter 1.

Once done click on the "Get Data" button and bottom text should be displayed with the user's profile information.

![Emulator Data Received](https://i.ibb.co/yptxR8m/button-clicked.png)

All done!

---

## Conclusion

In this tutorial I have shown how to call a simple API to retrieve and display information using Android Jetpack Compose. 

I hope it was of help to you, feel free trying to experiment with it using a real API and or changing the UI etc. 😎

The full source code for the project can be found here:
https://github.com/ethand91/compose-api-tutorial


---

Like me work? I post about a variety of topics, if you would like to see more please like and follow me.
Also I love coffee. 

[![“Buy Me A Coffee”](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/ethand9999)

