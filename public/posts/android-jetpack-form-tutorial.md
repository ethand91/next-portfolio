---
title: "Android Jetpack Compose Form Tutorial"
metaTitle: "Android Jetpack Compose Form Tutorial"
metaDesc: "Android Jetpack Compose Form Tutorial"
socialImage: assets/images/jetpack.webp
date: "2022-10-02"
tags:
	- android
---

## Android Jetpack Compose Form Tutorial

Hello! 👋 
In this tutorial I will introduce Android Compose and how to create a simple signup/login form. 

---

## What is Android Jetpack Compose

Jetpack Compose is Android's modern toolkit for building native UI. It simplifies and accelerates UI development on Android. In order to develop with it you need to have an understanding of Kotlin.

Well then lets create a new Android Project.

---

## Creating a new Android Compose project

First open Android Studio and create a new project. Choose "Empty Compose Activity" and click Next.
![New Compose Project](https://i.ibb.co/ZXJr6dV/compose-project.png)

Next you will see the following screen, enter "FormSample" for the name and click Finish.

![New Project Image](https://i.ibb.co/GTDmJp9/form-sample.png)

---

## Adding the required packages

We will be using navigation-compose for this example, so open up the module build.gradle file and add the following implementation:

```gradle
implementation 'androidx.navigation:navigation-compose:2.5.2'
```

---

## Creating the MainActivity

Sync your project and open up MainActivity.kt.

Paste/Enter the following code:

```kotlin
package com.example.formsample

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Surface
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.navigation.NavGraphBuilder
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.formsample.pages.ForgotPassword
import com.example.formsample.pages.SignUp
import com.example.formsample.ui.theme.FormSampleTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            FormSampleTheme {
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colors.background
                ) {
                    ScreenMain()
                }
            }
        }
    }   
}

@Composable
fun ScreenMain() {
    val navController = rememberNavController()

    NavHost(navController = navController, startDestination = "login") {
        composable("login") { LoginPage(navController) }
        composable("signup") { SignUp(navController = navController)}
        composable("forgot-password") { ForgotPassword(navController = navController)}
    }
}

@Preview(showBackground = true)
@Composable
fun ScreenPreview() {
    FormSampleTheme {
       ScreenMain()
    }
}
```

Here we basically set up the main screen, the nav controller enables navigation between multiple pages. The root page being the login screen. Don't worry about any errors at this point as we will be creating the pages needed soon.

---

## Creating the Custom Top Bar

Next create a new "component" package and create the file "CustomTopAppBar.kt" and paste/enter the following code:

```kotlin
package com.example.formsample.component

import androidx.compose.material.Icon
import androidx.compose.material.IconButton
import androidx.compose.material.Text
import androidx.compose.material.TopAppBar
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.runtime.Composable
import androidx.navigation.NavController

@Composable
fun CustomTopAppBar(navController: NavController, title: String, showBackIcon: Boolean) {
    TopAppBar(
        title = { Text(text = title) },
        navigationIcon = if (showBackIcon && navController.previousBackStackEntry != null) {
            {
                IconButton(onClick = { navController.navigateUp() }) {
                   Icon(
                       imageVector = Icons.Filled.ArrowBack,
                       contentDescription = "Back"
                   )
                }
            }
        } else { null }
    )   
}
```

Here we basically set up the app top bar and set the title, if showBackIcon is enabled a back button is displayed and when pressed enables the user to go back to the previous screen.

---

## Creating the pages

Next create a new "pages" package. 

Create the "ForgotPassword.kt" file and paste/enter the following contents:

```kotlin
package com.example.formsample.pages

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.Button
import androidx.compose.material.Scaffold
import androidx.compose.material.Text
import androidx.compose.material.TextField
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.input.TextFieldValue
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.example.formsample.component.CustomTopAppBar

@Composable
fun ForgotPassword(navController: NavController) {
    Box(modifier = Modifier.fillMaxSize()) {
        Scaffold(
            topBar = { CustomTopAppBar(
                navController = navController,
                title = "Forgot Password",
                showBackIcon = true
            )},
            content = { 
                Column(
                    modifier = Modifier.padding(20.dp),
                    verticalArrangement = Arrangement.Center,
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    val username = remember {
                        mutableStateOf(TextFieldValue())
                    }
    
                    Text(
                        text = "Forgot Password",
                        style = TextStyle(fontSize = 40.sp, fontFamily = FontFamily.Cursive)
                    )

                    Spacer(modifier = Modifier.height(15.dp))

                    TextField(
                        label = { Text(text = "Username") },
                        value = username.value,
                        onValueChange = { username.value = it }
                    )

                    Spacer(modifier = Modifier.height(15.dp))

                    Box(modifier = Modifier.padding(40.dp, 0.dp, 40.dp, 0.dp)) {
                        Button(
                            onClick = {},
                            shape = RoundedCornerShape(50.dp),
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(50.dp)
                        ) {
                            Text(text = "Forgot Password")
                        }
                    }
                }
            }
        )
    }
}
```

Here we create a simple form using compose's ui elements. Using a fancy font, a text input for the user to enter their username and a clickable rounded button. 

Next we will create the Login form so create a new file called "Login.kt" and enter/paste the following code:

```kotlin
package com.example.formsample

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.ClickableText
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.Button
import androidx.compose.material.Text
import androidx.compose.material.TextField
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.TextFieldValue
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.example.formsample.ui.theme.Purple700

@Composable
fun LoginPage(navController: NavController) {
   Box(modifier = Modifier.fillMaxSize()) {
        ClickableText(
            text = AnnotatedString("Signup Here"),
            modifier = Modifier
                .align(Alignment.Center)
                .padding(20.dp),
            onClick = { navController.navigate("signup") },
            style = TextStyle(
                fontSize = 14.sp,
                fontFamily = FontFamily.Default,
                textDecoration = TextDecoration.Underline,
                color = Purple700
            )
        )
   }
    Column(
        modifier = Modifier.padding(20.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        val username = remember {
            mutableStateOf(TextFieldValue())
        }
        val password = remember {
            mutableStateOf(TextFieldValue())
        }

        Text(
            text = "Login",
            style = TextStyle(fontSize = 40.sp, fontFamily = FontFamily.Cursive)
        )

        Spacer(modifier = Modifier.height(15.dp))

        TextField(
            label = { Text(text = "Username") },
            value = username.value,
            onValueChange = { username.value = it }
        )

        Spacer(modifier = Modifier.height(15.dp))

        TextField(
            label = { Text(text = "Password") },
            value = password.value,
            onValueChange = { password.value = it },
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password)
        )

        Spacer(modifier = Modifier.height(15.dp))

        Box(modifier = Modifier.padding(40.dp, 0.dp, 40.dp, 0.dp)) {
            Button(
                onClick = {},
                shape = RoundedCornerShape(50.dp),
                modifier = Modifier
                    .fillMaxWidth()
                    .height(50.dp)
            ) {
               Text(text = "Login")
            }
        }

        Spacer(modifier = Modifier.height(15.dp))

        ClickableText(
            text = AnnotatedString("Forgot Password?"),
            onClick = { navController.navigate("forgot-password") },
            style = TextStyle(
                fontSize = 15.sp,
                fontFamily = FontFamily.Default
            )
        )
    }
}
```

This will give a basic Login form using compose's ui elements, it provides a link for the user to signup and another link if the user has forgotten their password.

Finally we will create the final form, create the "SignUp.kt" file and paste/enter the following code:

```kotlin
package com.example.formsample.pages

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.Button
import androidx.compose.material.Scaffold
import androidx.compose.material.Text
import androidx.compose.material.TextField
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.TextFieldValue
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.example.formsample.component.CustomTopAppBar

@Composable
fun SignUp(navController: NavController) {
    Scaffold(
        topBar = { CustomTopAppBar(
            navController = navController,
            title = "SignUp",
            showBackIcon = true
        )},
        content = {
            Column(
                modifier = Modifier.padding(20.dp),
                verticalArrangement = Arrangement.Center,
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                val username = remember {
                    mutableStateOf(TextFieldValue())
                }

                val password = remember {
                    mutableStateOf(TextFieldValue())
                }

                val passwordConfirm = remember {
                    mutableStateOf(TextFieldValue())
                }

                Text(
                    text = "SignUp",
                    style = TextStyle(fontSize = 40.sp, fontFamily = FontFamily.Cursive)
                )

                Spacer(modifier = Modifier.height(15.dp))

                TextField(
                    label = { Text(text = "Username") },
                    value = username.value,
                    onValueChange = { username.value = it }
                )

                Spacer(modifier = Modifier.height(15.dp))

                TextField(
                    label = { Text(text = "Password") },
                    value = password.value,
                    onValueChange = { password.value = it },
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password)
                )

                Spacer(modifier = Modifier.height(15.dp))

                TextField(
                    label = { Text(text = "Password Confirmation") },
                    value = passwordConfirm.value,
                    onValueChange = { passwordConfirm.value = it },
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password)
                )

                Spacer(modifier = Modifier.height(15.dp))

                Box(modifier = Modifier.padding(40.dp, 0.dp, 40.dp, 0.dp)) {
                    Button(
                        onClick = {},
                        shape = RoundedCornerShape(50.dp),
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(50.dp)
                    ) {
                       Text(text = "SignUp")
                    }
                }
            }
        }
    )
}
```

Again nothing too complicated this form contains fields for the username and password/password confirmations input texts.

Next we can finally check the ui and the navigations fire up an emulator/actual device and you should be able to see/navigate the following screens:

Forgot Password:

![Forgot Password Image](https://i.ibb.co/NKd8dnt/forgot-password.png)

Login:

![Login Image](https://i.ibb.co/nCS4DJB/login-2.png)

Sign Up:

![Signup](https://i.ibb.co/ZhYZPDp/signup.png)

Looking beautiful.

Feel free to play around and add your own backend. 😆

---

## Conclusion
Here I have shown how to create a simple signup login forms using Android Jetpack Compose. 

Hopefully this helps anyone wanting to try out Android Jetpack Compose. 
I found it really fun using it, although it's incredibly similar to React.

If you already know Kotlin and React you will find using this new technology a breeze. 😎

You can find the source code for this sample project via the following link:

https://github.com/ethand91/compose-form-sample

---

Like me work? I post about a variety of topics, if you would like to see more please like and follow me.
Also I love coffee. 

[![“Buy Me A Coffee”](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/ethand9999)
