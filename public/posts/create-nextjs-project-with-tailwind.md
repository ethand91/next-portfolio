---
title: "Creating a Next.js project with Tailwind Integration"
metaTitle: "Creating a Next.js project with Tailwind Integration"
metaDesc: "Creating a Next.js project with Tailwind Integration"
socialImage: assets/images/tailwind.png
date: "2022-11-06"
tags:
	- nextjs
---

## Introduction

Hello, in my last tutorial I showed how to create a simple project using Next.js and Chakra UI integration. In this tutorial I will show how to create a simple project using TailwindCSS. 😃

---

## What is Tailwind

Tailwind is a utility-first CSS framework that allows you to build any user interface using pre-made CSS class that map CSS rules in a straightforward way.

Unlike Chakra UI, Tailwind only provides CSS rules. It does not provide and JavaScript scrips or React components.

The main advantages of Tailwind are as follows:

- Since Tailwind is just a set of CSS rules it can be used in any project.
- You can customize all the Tailwind variables to make them match your design.
- Dark and light theme support, which can easily be enabled/disabled by modifying a specific CSS class from the html element
- It is highly optimized: Tailwind is formed of many CSS classes, but its able to prune the unused ones at build time, reducing the final bundle size, as unused CSS classes get removed.
- You can use specific CSS classes prefixes to apply certain rules to mobile, desktop and tablet screens only.

---

## What we will be making

In this tutorial we will be using Tailwind to create the same page as I did in the Chakra UI tutorial. This way it is easier to examine the differences between the two.

You will learn how to set up a basic Next.js application with Tailwind intergration. 🙂

---

## Creating the Next.js application and installing the dependencies

First we need to create a new Next.js app and install the dependencies needed for the example. 

The nextjs app can be created via the following command:

```bash
yarn create next-app
```

Next we need to install the dependencies needed by the project, this can be done via the following command:

```bash
yarn add -D autoprefixer postcss tailwindcss
```

Next we need to install the dependencies needed for the light/dark theme:

```bash
yarn add next-themes
```

---

## Configuring Tailwind

Now that the dependencies have been installed next we need to configure Tailwind.
A simple config file can be created via the following command:

```bash
yarn tailwindcss init -p
```

This will create the following two configuration files:

- tailwind.config.js: This file will help configure the Tailwind theme, unused CSS purge and dark mode, plugins etc.
- postcss.config.js: Tailwind uses PostCSS under the hood and ships with a preconfigured file, this can be edited if needed.

First we need to configure Tailwind to purge unused CSS from the final build which will reduce the size of a production build. Open up tailwind.config.js and change it to the following:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = { 
  content: [], 
  purge: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}'
  ],  
  darkMode: 'class',
  theme: {
    extend: {}, 
  },  
  plugins: [], 
}
```

This will remove all unused CSS from the "pages" and "components" directories.
We also need to set the darkMode variable to class so that the framework will look at the html class element to determine whether or not to render the components in Light mode or Dark mode.

In this application we will using images from an outside source, so we will need to whitelist the domains used, open up next.config.js and change it to the following contents:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = { 
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {   
        protocol: 'https',
        hostname: 'robohash.org',
      },  
      {   
        protocol: 'https',
        hostname: 'picsum.photos'
      }   
    ]   
  }
}

module.exports = nextConfig
```

---

## Implementing Tailwind

The next step is to actual include Tailwind into our application open up "pages/_app.js" and add this one-liner to the top of the file:

```javascript
import 'tailwindcss/tailwind.css';
```

Now we can atually start to use Tailwind classes in our application. 
We will be using ThemeProvider to help us manage the dark/light theme state, in the same file add the following contents:

```javascript
import 'tailwindcss/tailwind.css';
import { ThemeProvider } from 'next-themes';

import TopBar from './../components/TopBar';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <div className="dark:bg-gray-900 bg-gray-50 w-full min-h-screen">
        <TopBar/>
        <Component { ...pageProps } />
      </div>
    </ThemeProvider>
  );  
}

export default MyApp;
```

As you can see in the div four css classes are used:
- dark:bg-gray-900: When the theme is set to dark mode, the background color for this div will be set to bg-gray-900.
- bg-gray-50: When in default/light mode the background color for this div will be set to bg-gray-50.
- w-full: This means full width (100%).
- min-h-screen: This CSS class stands for set the min-height property to the whole screen height (100vh). 

---

## Creating the TopBar

Next we need to create the top bar, create a new "components" folder in the root directory and then create a "TopBar" folder. Inside that folder create an index.js file and add the following contents:

```javascript
import ThemeSwitch from './../ThemeSwitch';

function TopBar() {
  return (
    <div className="w-full p-2 bg-purple-500">
      <div className="w-10/12 m-auto">
        <ThemeSwitch />
      </div>
    </div>
  );  
}

export default TopBar;
```

The top bar component allows us to toggle the dark/light theme.

---

## Creating the User Card Component

Next we will create a component to display the User, create a "UserCard" folder in the components directory and then create a index.js inside the UserCard directory, fill it with the following contents:

```javascript
import Link from 'next/link';
import Image from 'next/image';

function UserCard(props) {
  return (
    <Link href={ `/user/${props.username}` } passHref>
      <div className="dark:bg-gray-800 bg-gray-100 cursor-pointer dark:text-white p-4 rounded-md text-center shadow-xl">
        <Image
          src={ props.avatar }
          alt={ props.username }
          className="w-16 bg-gray-400 rounded-full m-auto"
          width={ 350 }
          height={ 350 }
        />
        <div className="mt-2 font-bold">
          { props.first_name } { props.last_name }
        </div>
        <div className="font-light">{ props.job_title }</div>
      </div>
    </Link>
  );  
}

export default UserCard;
```

Here we use the Image component for image optimizing to display the user's avatar, we also display the user's information.
We are now ready to create the home page to display all of the users.

---

## Creating the Homepage

Next we will create the home page to display all of the users and their information.
Open up the index.js file and add the following contents:

```javascript
import UserCard from './../components/UserCard';
import users from './../data/users';

export default function Home() {
  return (
    <div className="sm:w-9/12 sm:m-auto pt-16 pb-16">
      <h1 className="dark:text-white text-5x1 font-bold text-center">
        Users
      </h1>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-3 mt-14 ml-8 mr-8 sm:mr-0 sm:ml-0">
        {
          users.map((user) => (
            <div key={ user.id }>
              <UserCard { ...user }/> 
            </div>
          ))
        }
      </div>
    </div>
  );  
};
```

Here we start to use some responsive directives(sm). By default, Tailwind classes are mobile first and if we want to apply a specific class to wider screens, we will need to prefix: sm: (640px), md: (768px), lg: (1024px), xl: (1280px) and 2x1: (1536px).

Finally we need to create the user's profile page.

---

## Creating the User's Profile Page

Finally we will create the page that shows the user's profile. Create a "user" directory inside pages and then create a [username].js file inside the user directory. (Please note you may need to escape the brackets if your using a terminal). 
Then fill it with the following contents:

```javascript
import Link from 'next/link';
import Image from 'next/image';

import users from './../../data/users';

export function getStaticPaths() {
  const paths = users.map((user) => ({
    params: {
      username: user.username
    }   
  }));

  return {
    paths, fallback: false
  };  
};

export function getStaticProps({ params }) {
  const { username } = params;

  return {
    props: {
      user: users.find((user) => user.username === username)
    }   
  };  
};

function UserPage({ user }) {
  return (
    <div className="pt-0 sm:pt-16">
      <div className="dark:bg-gray-800 text-white w-12/12 shadow-lg sm:w-9/12 sm:m-auto">
        <div className="relative sm:w-full">
          <Image
            src={ user.cover_image }
            alt={ user.username }
            width={ 500 }
            height={ 500 }
            className="w-full h-96 object-cover object-center"
          />  

          <div className="bg-gray-800 bg-opacity-50 absolute flex items-end w-full h-full top-0 left-0 p-8">
            <Image
              src={ user.avatar }
              alt={ user.username }
              width={ 350 }
              height={ 350 }
              className="bg-gray-300 w-20 rounded-full mr-4"
            />
            <div>
              <h1 className="font-bold text-3x1">
                { user.first_name } { user.last_name }
              </h1>
              <p>{ user.job_title }</p>
            </div>
          </div>
        </div>
        <div className="p-8">
          <p className="text-black dark:text-white">
            { user.description }
          </p>
          <Link href="/" passHref>
            <button className="dark:bg-green-400 dark:text-gray-800 bg-green-400 text-white font-semibold p-2 rounded-md mt-6">
              Back to all Users.
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
```

Here we use getStaticPaths to get the username from the http parameters and the getStaticProps to get the user that has that username. 

After that we just display the user's information. 
All done.

---

## Running the Development Server

Now that the pages have been created we can finally check it out! 

To do that run the following command in the terminal:

```bash
npm run dev
```

Then direct your browser to http://localhost:3000 and you should see the following page:

Dark Mode:

![Users Dark](https://i.ibb.co/R38k6kg/users-dark.png)

Light Mode: 

![Users Light](https://i.ibb.co/9nqwmjW/users-light.png)

Try clicking on any of the users and you should be redirected to their profile page:

Dark Mode:

![User Dark](https://i.ibb.co/c8ZW5JN/user-dark.png)

Light Mode:

![User Light](https://i.ibb.co/7vvD916/user-light.png)

---

## Conclusion

In this tutorial I have shown how to create a simple Next.js project with Tailwind implementation. 

I keep the contents the same as my previous tutorial for comparison purposes. 
Personally I like Tailwinds flexibility and the fact it can be used pretty much anywhere regardless of Framework etc.

I hope you found this tutorial helpful, you can find the repo for this project at:
https://github.com/ethand91/nextjs-tailwind-example

You can also find the Chakra UI implementation tutorial at:
<https://dev.to/ethand91/creating-a-nextjs-project-with-chakra-ui-integration-469l>

Happy Coding! 😎

---

Like me work? I post about a variety of topics, if you would like to see more please like and follow me.
Also I love coffee. 

[![“Buy Me A Coffee”](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/ethand9999)
