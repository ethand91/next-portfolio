---
title: "Creating a React App with Typescript + Tailwind Support"
metaTitle: "Creating a React App with Typescript + Tailwind Support"
metaDesc: "Creating a React App with Typescript + Tailwind Support"
socialImage: assets/images/tailwind.png
date: "2022-03-20"
tags:
	- react
---


## Introduction

Hello! Here I will try to explain how to set up a React app with both Typescript and Tailwind.

---

## Creating the React app with Typescript

This part is really simple, all you need to do is add the template option to create-react-app command.
Feel free to reaplace "app" with anything else.

Once installed simple cd into the directory.

```bash
npx create-react-app app --template typescript

cd app
```

---

## Adding Tailwind

Finally we need to add tailwind. First we need to install the needed modules

```bash
npm install -D tailwindcss postcss autoprefixer 
```

Next we need to create the config files which can easily be done via the following command:

```bash
npx tailwindcss init -p
```

Next open up the created "tailwind.config.js" file and add the following to "content":

```javascript
content: [
	'./src/**/*.{js,jsx,ts,tsx}',
],
```

Next we need to add the Tailwind directives to the "src/index.css" file, add the following to the top of the file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## Checking that it works

Now that we have set up Typescript and Tailwind we need to check to see if it works.
Open up "src/App.tsx" and change it to the following: 

```typescript
import React from 'react';
import './App.css';

function App() {
  return (
    <h1 className="text-3xl font-bold underline text-red-600">
      Simple React Typescript Tailwind Sample
    </h1>
  );  
}

export default App;
```

Done, now let's start the application.

```bash
npm start
```

The browser should automatically open and display the index page. If all is okay the header should be bold, underlined and red. 😀

The source for this example can be found here:
https://github.com/ethand91/react-typescript-tailwind


---

Like me work? I post about a variety of topics, if you would like to see more please like and follow me.
Also I love coffee. 

[![“Buy Me A Coffee”](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/ethand9999)
