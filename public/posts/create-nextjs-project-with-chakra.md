---
title: "Creating a Next.js project with Chakra-UI integration"
metaTitle: "Creating a Next.js project with Chakra-UI integration"
metaDesc: "Creating a Next.js project with Chakra-UI integration"
socialImage: assets/images/chakra.webp
date: "2022-10-30"
tags:
	- nextjs
---

## Introduction

Hello, in this tutorial I will show you how to create a simple Next.js project with Chakra UI intergration. 👀

---

## What is Chakra-UI

Chakra-UI is an open source component library used for building modular, accessible and good looking user interfaces. 

The main advantages of Chakra-UI are as follows:

* Accessibility: Chakra-UI allows us to use pre-build components created by the Chakra-UI team.
* Themeable: The library ships with a default theme, which can be customized if needed.
* Light and dark mode: both are supported out of the box and can rely on the user's system settings. For example if the user sets their computer to dark mode by default, Chakra-UI will default to dark mode.
* Composibility: Components can be created from the Chakra-UI ones or if needed custom components can be created with ease.
* Typescript Support: Chakra-UI is written in TypeScript and provides class types for easy integration.

---

## What we will be making

In this tutorial we will use Chakra-UI to create a simple user list/profile page. 
We will also integrate a toggler to toggle between light and dark mode.

You will learn how to set up a basic Next.js application with Chakra-UI integration.

---

## Creating the Next.js application and installing the dependencies

First we need to create a new Next.js app and install the dependencies needed for the example.

The Next.js app can be created via the following command:

```bash
npx create-next-app@latest
```

This will set up the Next.js project automatically for you.

Next we need to install Chakra-ui which can be done via the following command:

```bash
yarn add @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^4 @chakra-ui/icons
```

---

## Creating fake Users

Next we will need some fake users to actually populate the page. 
Create a "data" folder in the root directory and create a "users.js" file and populate it with the following data: (feel free to use your own custom data but be careful of the parameter names):

https://github.com/ethand91/nextjs-chakra-sample/blob/main/data/users.js

---

## Creating the components

Next we need to create the components needed for the sample page, create a new folder called "components" and within that create a "TopBar" folder.
Within the TopBar folder create a new file called "index.js" and populate it with the following contents:

```javascript
import {
  Box,
  Button,
  useColorMode
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

function TopBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const ColorModeIcon = colorMode === 'light' ? SunIcon : MoonIcon;

  return (
    <Box width="100%" padding="1" backgroundColor="purple.700">
      <Box maxWidth="container.xl" margin="auto">
        <Button
          aria-label="ui theme"
          leftIcon={ <ColorModeIcon /> }
          onClick={ toggleColorMode }
          size="xs"
          marginRight="2"
          borderRadius="sm"
        >
          Toggle Theme
        </Button>
      </Box>
    </Box>
  );  
};

export default TopBar;
```

Here we create a simple top bar for the application, we give it a background color of purple and also provide a button that allows the user to toggle between light/dark mode using Chakra-UI.

Next we need a component to display the users, so create a new "UserCard" directory and within that directory create an "index.js" file and populate it with the following contents:

```javascript
import Link from 'next/link';
import {
  Box,
  Text,
  Avatar,
  Center,
  VStack,
  useColorModeValue
} from '@chakra-ui/react';

function UserCard(props) {
  return (
    <Link href={ `/users/${props.username}` } passHref>
      <VStack
        spacing="4"
        borderRadius="md"
        boxShadow="x1"
        padding="5"
        backgroundColor={
          useColorModeValue('gray.50', 'gray.700')
        }
      >   
        <Center>
          <Avatar size="lg" src={ props.avatar } />
        </Center>
        <Center>
          <Box textAlign="center">
            <Text fontWeight="bold" fontSize="xl">
              { props.first_name } { props.last_name }
            </Text>
            <Text fontSize="xs">{ props.job_title }</Text>
          </Box>
        </Center>
      </VStack>
    </Link>
  );  
};

export default UserCard;
```

This card will link to the user details page, using Chakra-UI we are easily able to center contents using "Center". We also use Avatar to easily display the user's profile picture.

Thats the components created.

---

## Creating the Pages

Next we need to start working on the pages.

We will be overriding the default Next.js document which can be done by creating a "_document.js" inside the pages directory. 
Create the file and populate it with the following:

```javascript
import { ColorModeScript } from '@chakra-ui/react';
import NextDocument, {
  Html,
  Head,
  Main,
  NextScript
} from 'next/document';
import { extendTheme } from '@chakra-ui/react';

const config = { 
  useSystemColorMode: true
};

const theme = extendTheme({ config }); 

export default class Document extends NextDocument {
  render () {
    return (
      <Html lang="en">
        <Head />
        <body>
          <ColorModeScript
            initialColorMode={ theme.config.initialColorMode }
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );  
  }
}
```

The reason for overriding the default layout is because we want to apply both light/dark theme to the entire page.

Next we need to apply Chara-UI to the application so open up pages/_app.js and change the contents to the following:

```javascript
import { ChakraProvider, Box } from '@chakra-ui/react';
import TopBar from './../components/TopBar';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <TopBar />
      <Box maxWidth="container.xl" margin="auto">
        <Component { ...pageProps} />
      </Box>
    </ChakraProvider>
  );  
}

export default MyApp
```

Here we bascially tell Next.js to use the Chara-UI provider and make sure everypage has our custom TopBar.

Next we need to edit the pages/index.js to contain the following contents:

```javascript
import {
  Box,
  Grid,
  Text,
  GridItem
} from '@chakra-ui/react';

import UserCard from './../components/UserCard';
import users from './../data/users';

export default function Home() {
  return (
    <Box>
      <Text
        fontSize="xxx-large"
        fontWeight="extrabold"
        textAlign="center"
        marginTop="9"
      >   
        Users
      </Text>
    
      <Grid
        gridTemplateColumns={ ['1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)'] }
        gridGap="10"
        padding="10"
      >   
        {
          users.map((user) => (
            <GridItem key={ user.id }>
              <UserCard { ...user } />
            </GridItem>
          ))
        }
      </Grid>
    </Box>
  );  
}
```

Here we basically list all the users using Chakra-UI's Grid component. The "gridTemplateColumns" allows us to set the sizes for small screens, medium screens and large screens. For example if you view the page on a large screen each row will have 3 users, however if you view it on a mobile device each row will only have one user.

Feel free to run the project using:

```
npm run dev
```

If you access the page (https://localhost:3000), you should see the following page:

![User List Dark](https://i.ibb.co/tpknWvn/user-list.png)

If you prefer light mode you should see the following:

![User List Light](https://i.ibb.co/54TD5GR/user-list-light.png" alt="user-list-light)

Feel free to play with the toggle button. If you try clicking on a user you will be greeted with a 404 not found response so let's create the user profile page!

Create a "users" folder inside the pages folder and create the "[username].js". (Note if you're using a terminal like me you may need to escape the brackets with a backslash).

Now fill the file with the following contents:

```javascript
mport Link from 'next/link';
import {
  Avatar,
  Box,
  Center,
  Text,
  Image,
  Button,
  Flex,
  useColorModeValue
} from '@chakra-ui/react';

import users from './../../data/users';

export function getStaticPaths() {
  const paths = users.map((user) => ({
    params: {
      username: user.username
    }   
  }));

  return {
    paths,
    fallback: false
  };  
}

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
    <Center
      marginTop={ ['0', '0', '8' ] }
      boxShadow="lg"
      minHeight="fit-content"
    >
      <Box>
        <Box position="relative">
          <Image src={user.cover_image} width="fit-content" height="250px" objectFit="cover" />

          <Flex
            alignItems="flex-end"
            position="absolute"
            top="0"
            left="0"
            backgroundColor={
              useColorModeValue('blackAlpha.400', 'blackAlpha.600')
            }
            width="100%"
            height="100%"
            padding="8"
            color="white"
          
            <Avatar size="lg" src={ user.avatar } />
            <Box marginLeft="6">
              <Text as="h1" fontSize="xx-large" fontWeight="bold">
                { user.first_name } { user.last_name }
              </Text>
              <Text as="p" fontSize="large" lineHeight="1.5">
                { user.job_title }
              </Text>
            </Box>
          </Flex>
        </Box>
        <Box
          maxW="container.xl"
          margin="auto"
          padding="8"
          backgroundColor={
            useColorModeValue('white', 'gray.700')
          }
        >
          <Text as="p">{ user.description }</Text>
          <Link href="/" passHref>
            <Button marginTop="8" colorScheme="whatsapp" as="a">
              Back to all users
            </Button>
          </Link>
        </Box>
      </Box>
    </Center>
  );
};

export default UserPage;
```

Phew! Here we use "getStaticPaths" to tell Next.js we need to render a new page for each user in the user's array.
We also tell Next.js to display the default 404 page if the requested user is not found.

Chakra-UI allows us to easily center the contents. This page basically displays the contents of the user and provides a button to go back using a Chakra-UI feature.

All done fire up the dev server and load up https://localhost:3000 in the browser. 
Once loading try clicking on a user you should see the following page:

![User Profile Dark](https://i.ibb.co/B4xR5sC/profile.png)

![User Profile Light](https://i.ibb.co/9Y2V44q/profile-light.png)

All done! 😎

---

## Conclusion

Here I have demonstrated how to use Next.js with Chakra-UI. Feel free to customize anyway you wish. 😉

I'm actually thinking of using Next.js for my next side project.

Hopefully you have learned something new, you can find the source code for this tutorial via:
https://github.com/ethand91/nextjs-chakra-sample

---

Like me work? I post about a variety of topics, if you would like to see more please like and follow me.
Also I love coffee. 

[![“Buy Me A Coffee”](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/ethand9999)
