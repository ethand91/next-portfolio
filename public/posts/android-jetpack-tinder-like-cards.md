---
title: "Creating Tinder like card feature with Android Compose"
metaTitle: "Creating Tinder like card feature with Android Compose"
metaDesc: "Creating Tinder like card feature with Android Compose"
socialImage: assets/images/jetpack.webp
date: "2022-11-25"
tags:
	- android
---

## Introduction

Hello! In this tutorial I will be showing you how to create the card swipe feature that apps like Tinder are using. 😎

The final product will be something like this: the user is able to either swipe via drag or press the like/dislike button to do the work for them.

<a href="https://ibb.co/QF5Pv82"><img src="https://i.ibb.co/wNvShJ9/swiping.gif" alt="swiping" border="0"></a>

---

## Importing the required libraries

First create an empty android compose project, if you don't know how please refer to my other tutorials.

Next we need to import a couple of extra libraries, open up your app's build.gradle file and add the following dependencies: 

```gradle
implementation "androidx.constraintlayout:constraintlayout-compose:1.0.1"  
implementation "io.coil-kt:coil-compose:2.2.2"
```

We will be using the ConstraintLayout and coil will be needed so we can use AsyncImage. 👀

---

## Creating the components

Next we will need two components, the CardStackController and the actual CardStack, create a new package called components and create a new CardStackController file. 

In the CardStackController file import the following:

```kotlin
import androidx.compose.animation.core.Animatable  
import androidx.compose.animation.core.AnimationSpec  
import androidx.compose.foundation.gestures.detectDragGestures  
import androidx.compose.material.ExperimentalMaterialApi  
import androidx.compose.material.SwipeableDefaults  
import androidx.compose.material.ThresholdConfig  
import androidx.compose.runtime.Composable  
import androidx.compose.runtime.remember  
import androidx.compose.runtime.rememberCoroutineScope  
import androidx.compose.ui.ExperimentalComposeUiApi  
import androidx.compose.ui.Modifier  
import androidx.compose.ui.composed  
import androidx.compose.ui.geometry.Offset  
import androidx.compose.ui.input.pointer.pointerInput  
import androidx.compose.ui.platform.LocalConfiguration  
import androidx.compose.ui.platform.LocalDensity  
import androidx.compose.ui.unit.Dp  
import androidx.compose.ui.unit.dp  
import kotlinx.coroutines.CoroutineScope  
import kotlinx.coroutines.launch  
import kotlin.math.abs  
import kotlin.math.sign
```

Next we need to create the CardStackController composable.

```kotlin
open class CardStackController(
    val scope: CoroutineScope,
    private val screenWidth: Float,
    internal val animationSpec: AnimationSpec<Float> = SwipeableDefaults.AnimationSpec
) {
    val right = Offset(screenWidth, 0f)
    val left = Offset(-screenWidth, 0f)
    val center = Offset(0f, 0f)

    var threshold = 0.0f

    val offsetX = Animatable(0f)
    val offsetY = Animatable(0f)
    val rotation = Animatable(0f)
    val scale = Animatable(0.8f)

    var onSwipeLeft: () -> Unit = {}
    var onSwipeRight: () -> Unit = {}

    fun swipeLeft() {
        scope.apply {
            launch {
                offsetX.animateTo(-screenWidth, animationSpec)

                onSwipeLeft()

                launch {
                    offsetX.snapTo(center.x)
                }

                launch {
                    offsetY.snapTo(0f)
                }

                launch {
                    rotation.snapTo(0f)
                }

                launch {
                    scale.snapTo(0.8f)
                }
            }

            launch {
                scale.animateTo(1f, animationSpec)
            }
        }
    }

    fun swipeRight() {
        scope.apply {
            launch {
                offsetX.animateTo(screenWidth, animationSpec)

                onSwipeRight()

                launch {
                    offsetX.snapTo(center.x)
                }

                launch {
                    offsetY.snapTo(0f)
                }

                launch {
                    scale.snapTo(0.8f)
                }

                launch {
                    rotation.snapTo(0f)
                }
            }

            launch {
                scale.animateTo(1f, animationSpec)
            }
        }
    }

    fun returnCenter() {
        scope.apply {
            launch {
                offsetX.animateTo(center.x, animationSpec)
            }

            launch {
                offsetY.animateTo(center.y, animationSpec)
            }

            launch {
                rotation.animateTo(0f, animationSpec)
            }

            launch {
                scale.animateTo(0.8f, animationSpec)
            }
        }
    }
}
```

This composable basically deals with the cards animation, we deal with when the user swipes right/left or returns to center. If left the card is thrown to the left, if right the card is thrown to the right. 

Next we need to create a function to remember the state of the controller so below the CardStackController composable add the following function:

```kotlin
@Composable
fun rememberCardStackController(
    animationSpec: AnimationSpec<Float> = SwipeableDefaults.AnimationSpec
): CardStackController {
    val scope = rememberCoroutineScope()
    val screenWidth = with(LocalDensity.current) {
        LocalConfiguration.current.screenWidthDp.dp.toPx()
    }

    return remember {
        CardStackController(
            scope = scope,
            screenWidth = screenWidth,
            animationSpec = animationSpec
        )
    }
}
```

After we need to create a draggable modifier extension so that we can actually drag the cards:

```kotlin
@OptIn(ExperimentalMaterialApi::class, ExperimentalComposeUiApi::class)
fun Modifier.draggableStack(
    controller: CardStackController,
    thresholdConfig: (Float, Float) -> ThresholdConfig,
    velocityThreshold: Dp = 125.dp
): Modifier = composed {
    val scope = rememberCoroutineScope()
    val density = LocalDensity.current

    val velocityThresholdPx = with(density) {
        velocityThreshold.toPx()
    }

    val thresholds = { a: Float, b: Float ->
        with(thresholdConfig(a, b)) {
            density.computeThreshold(a, b)
        }
    }

    controller.threshold = thresholds(controller.center.x, controller.right.x)

    Modifier.pointerInput(Unit) {
        detectDragGestures(
            onDragEnd = {
                if (controller.offsetX.value <= 0f) {
                    if (controller.offsetX.value > -controller.threshold) {
                        controller.returnCenter()
                    } else {
                        controller.swipeLeft()
                    }
                } else {
                    if (controller.offsetX.value < controller.threshold) {
                        controller.returnCenter()
                    } else {
                        controller.swipeRight()
                    }
                }
            },
            onDrag = { change, dragAmount ->
                controller.scope.apply {
                    launch {
                        controller.offsetX.snapTo(controller.offsetX.value + dragAmount.x)
                        controller.offsetY.snapTo(controller.offsetY.value + dragAmount.y)

                        val targetRotation = normalize(
                            controller.center.x,
                            controller.right.x,
                            abs(controller.offsetX.value),
                            0f,
                            10f
                        )

                        controller.rotation.snapTo(targetRotation * -controller.offsetX.value.sign)

                        controller.scale.snapTo(
                            normalize(
                                controller.center.x,
                                controller.right.x / 3,
                                abs(controller.offsetX.value),
                                0.8f
                            )
                        )
                    }
                }
                change.consume()
            }
        )
    }
}
```

Here we detect when the dragging starts and ends and animate/normalize accordinly.

Finally we need to create the function to normalize the card when it is being dragged:

```kotlin
private fun normalize(
    min: Float,
    max: Float,
    v: Float,
    startRange: Float = 0f,
    endRange: Float = 1f
): Float {
    require(startRange < endRange) {
        "Start range is greater than end range"
    }

    val value = v.coerceIn(min, max)

    return (value - min) / (max - min) * (endRange + startRange) + startRange
}
```

Phew! That's the first component created, next we need to create the component to actually show the cards. Next create a new file called CardStack and import the needed dependencies:

```kotlin
import androidx.compose.foundation.layout.*
import androidx.compose.material.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.FavoriteBorder
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.layout.layout
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.constraintlayout.compose.ConstraintLayout
import coil.compose.AsyncImage
import kotlin.math.roundToInt
```

First we will create the actually CardStack composible that will handle the stack of cards:

```kotlin
@OptIn(ExperimentalMaterialApi::class)
@Composable
fun CardStack(
    modifier: Modifier = Modifier,
    items: MutableList<Item>,
    thresholdConfig: (Float, Float) -> ThresholdConfig = { _, _ -> FractionalThreshold(0.2f)},
    velocityThreshold: Dp = 125.dp,
    onSwipeLeft: (item: Item) -> Unit = {},
    onSwipeRight: (item: Item) -> Unit = {},
    onEmptyStack: (lastItem: Item) -> Unit = {}
) {
    var i by remember {
        mutableStateOf(items.size - 1)
    }

    if (i == -1) {
        onEmptyStack(items.last())
    }

    val cardStackController = rememberCardStackController()

    cardStackController.onSwipeLeft = {
        onSwipeLeft(items[i])
        i--
    }

    cardStackController.onSwipeRight = {
        onSwipeRight(items[i])
        i--
    }

    ConstraintLayout(
        modifier = modifier
            .fillMaxSize()
            .padding(0.dp)
    ) {
        val stack = createRef()

        Box(
            modifier = modifier
                .constrainAs(stack) {
                    top.linkTo(parent.top)
                }
                .draggableStack(
                    controller = cardStackController,
                    thresholdConfig = thresholdConfig,
                    velocityThreshold = velocityThreshold
                )
                .fillMaxHeight()
        ) {
            items.asReversed().forEachIndexed { index, item ->
                Card(
                    modifier = Modifier.moveTo(
                        x = if (index == i) cardStackController.offsetX.value else 0f,
                        y = if (index == i) cardStackController.offsetY.value else 0f
                    )
                        .visible(visible = index == i || index == i -1)
                        .graphicsLayer(
                            rotationZ = if (index == i) cardStackController.rotation.value else 0f,
                            scaleX = if (index < i) cardStackController.scale.value else 1f,
                            scaleY = if (index < i) cardStackController.scale.value else 1f
                         ),
                    item,
                    cardStackController
                )
            }
        }
    }
}
```

Next we will create the actual card to show the image and the like/dislike buttons:

```kotlin
@Composable
fun Card(
    modifier: Modifier = Modifier,
    item: com.example.tinderclone.components.Item,
    cardStackController: CardStackController
) {
    Box(modifier = modifier) {
        if (item.url != null) {
            AsyncImage(
                model = item.url,
                contentDescription = "",
                contentScale = ContentScale.Crop,
                modifier = modifier.fillMaxSize()
            )
        }
        
        Column(
            modifier = modifier
                .align(Alignment.BottomStart)
                .padding(10.dp)
        ) {
            Text(text = item.text, color = Color.White, fontWeight = FontWeight.Bold, fontSize = 25.sp) 
            
            Text(text = item.subText, color = Color.White, fontSize = 20.sp)

            Row {
                IconButton(
                    modifier = modifier.padding(50.dp, 0.dp, 0.dp, 0.dp),
                    onClick = { cardStackController.swipeLeft() },
                ) {
                    Icon(
                        Icons.Default.Close, contentDescription = "", tint = Color.White, modifier =
                        modifier
                            .height(50.dp)
                            .width(50.dp)
                    )
                }

                Spacer(modifier = Modifier.weight(1f))

                IconButton(
                    modifier = modifier.padding(0.dp, 0.dp, 50.dp, 0.dp),
                    onClick = { cardStackController.swipeRight() }
                ) {
                    Icon(
                        Icons.Default.FavoriteBorder, contentDescription = "", tint = Color.White, modifier =
                        modifier.height(50.dp).width(50.dp)
                    )
                }
            }
        }
    }
}
```

Here we also use a spacle the make sure the dislike button is on the left and the like button is on the right.

Next we will create the data class to house the cards contents, I also include a title and a subtitle for a simple self introduction:

```kotlin
data class Item(
    val url: String? = null,
    val text: String = "",
    val subText: String = ""
)
```

Finally we will create two Modifier extensions to handle movement and card visibility:

```kotlin
fun Modifier.moveTo(
    x: Float,
    y: Float
) = this.then(Modifier.layout { measurable, constraints ->
    val placeable = measurable.measure(constraints)

    layout(placeable.width, placeable.height) {
        placeable.placeRelative(x.roundToInt(), y.roundToInt())
    }
})

fun Modifier.visible(
    visible: Boolean = true
) = this.then(Modifier.layout{ measurable, constraints ->
    val placeable = measurable.measure(constraints)

    if (visible) {
        layout(placeable.width, placeable.height) {
            placeable.placeRelative(0, 0)
        }
    } else {
        layout(0, 0) {}
    }
})
```

That's the hard work done now all we have to do is actually use our components!

---

## Implementing the CardStack

Finally all we have to do now is use our newly created components in the MainActivity, so remove Greeting and replace it with the following:

```kotlin
class MainActivity : ComponentActivity() {
    @OptIn(ExperimentalMaterialApi::class)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            TinderCloneTheme {
                val isEmpty = remember {
                    mutableStateOf(false)
                }
                
                Scaffold {
                    Column(
                        modifier = Modifier
                            .fillMaxSize()
                            .padding(it),
                        horizontalAlignment = Alignment.CenterHorizontally,
                        verticalArrangement = Arrangement.Center
                    ) {
                        if (!isEmpty.value) {
                            CardStack(
                                items = accounts,
                                onEmptyStack = {
                                    isEmpty.value = true
                                }
                            )
                        } else {
                            Text(text = "No more cards", fontWeight = FontWeight.Bold)
                        }
                    }
                }
            }
        }
    }
}

val accounts = mutableListOf<Item>(
    Item("https://images.unsplash.com/photo-1668069574922-bca50880fd70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80", "Musician", "Alice (25)"),
    Item("https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80", "Developer", "Chris (33)"),
    Item("https://images.unsplash.com/photo-1667935764607-73fca1a86555?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80", "Teacher", "Roze (22)")
)
```

Using the component is pretty easy, I extend the onEmptyStack function to show text if there is nomore cards left to be shown. 

I also use some dummy data, the images are coutesy of unsplash.

Finally if you fire up the emulator/or an actual device you should see the following:

Cool! 😆

---

## Conclusion

In this tutorail I have shown how to create a tinder like swipe app.
I hope you enjoyed the tutorial as much as I enjoyed making this. I'm still new to Compose so if you have anyways to improve it please let me know. 😃

The source for this project can be found via:


---

Like me work? I post about a variety of topics, if you would like to see more please like and follow me.
Also I love coffee. 

[![“Buy Me A Coffee”](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/ethand9999)
