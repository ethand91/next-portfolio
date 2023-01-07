---
title: "Creating A Markdown Blog With Nextjs"
metaTitle: "Creating A Markdown Blog With Nextjs"
metaDesc: "Creating A Markdown Blog With Nextjs"
socialImage: assets/images/tailwind.png
date: "2023-01-07"
tags:
	- nextjs
---

## Introduction

Hello! 👋

In this tutorial I will show you how to create a blog that can display Markdown posts. 😃

---

## Creating and setting up the Nextjs project

First we need to actually create the project, fire up the terminal and enter the following command to create a new nextjs project:

```bash
yarn create markdown
```

After a couple of second your project will be created, cd into the project directory and we will now add a couple of dependencies:

```bash
yarn add -D autoprefixer postcss tailwindcss
```

If you also want to implement light/dark modes install the following:

```bash
yarn add next-themes
```

Next we will setup tailwindcss, run the following command to initialize the files needed:

```bash
yarn tailwindcss init -p
```

If you don't know what the files generated do please refer to my previous tutorial:

https://ethan-dev.com/post/create-nextjs-project-with-tailwind

First we will edit "tailwind.config.js", open it up and configure it to the following:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = { 
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*{js,jsx}'
  ],  
  darkMode: 'class',
  theme: {
    extend: {}, 
  },  
  plugins: [], 
}
```

Next we need to actually implement tailwind into the application, this can be done via the "pages/_app.js" file.

```javascript
import 'tailwindcss/tailwind.css';
import { ThemeProvider } from 'next-themes';

import Navbar from './../components/Navbar';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <div className="dark:bg-gray-900 bg-gray-50 w-full min-h-screen">
        <Navbar />
        <Component { ...pageProps } />
      </div>
    </ThemeProvider>
  );  
}

export default MyApp;
```

Next we will create a simple Topbar for the application, create a new directory called Navbar inside the components folder. Once the directory is created open up components/Navbar/index.js and fill it with the following:

```javascript
import Link from 'next/link';

function Navbar () {
  return (
    <>  
      <nav className="flex items-center flex-wrap bg-gray-900 p-3">
        <Link href="/">
          <span className="text-xl text-white font-bold uppercase tracking-wide">
            Markdown Blog
          </span>
        </Link>
      </nav>
    </> 
  );  
};

export default Navbar;
```

If you look at the page via the browser at "http://localhost:3000" you should now see the following page:

![Init](https://i.ibb.co/MGWbbP8/markdown-1.png)

Great! Next we will actually implement our Markdown blog! 😎

---

## Listing Our Markdown Blogs

Next we will write the code to display all of our Markdown Blogs.

First we need to install some additional dependencies to support and show Markdown, add the following dependencies:

```bash
yarn add gray-matter markdown-it
```

```bash
yarn add -D @tailwindcss/typography
```

Next we need to add the typography plugin to the tailwind.config.js file as so:

```javascript
plugins: [
	require('@tailwindcss/typography')
],
```

Done now clear the contents of pages/index.js and replace it with the following:

```javascript
import fs from 'fs';
import matter from 'gray-matter';
import Image from 'next/image';
import Link from 'next/link';

export async function getStaticProps() {
  try {
    const files = fs.readdirSync('public/posts');

    const posts = files.map((fileName) => {
      const slug = fileName.replace('.md', '');
      const readFile = fs.readFileSync(`public/posts/${fileName}`, 'utf-8');
      const { data: frontmatter } = matter(readFile);

      return {
        slug,
        frontmatter
      };  
    }); 

    return {
      props: { posts }
    };  
  } catch (error) {
    console.error(error);

    return {
      props: {}
    };  
  }
};

function Blog ({ posts }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg-grid-cols-4 md:p-0 mt-8">
      {   
        posts.map(({ slug, frontmatter }) => (
          <div key={ slug } className="border border-gray-200 m-2 rounded-xl shadow-lg overflow-hidden flex flex-col">
            <Link href={ `/post/${slug}` } legacyBehaviour>
              <a>
                <Image
                  width={ 650 }
                  height={ 340 }
                  alt={ frontmatter.title }
                  src={ `/${frontmatter.socialImage}` }
                />

                <h1 className="p-4">{ frontmatter.title }</h1>
              </a>
            </Link>
          </div>
        ))
      }
    </div>
  );
};

export default Blog;
```

Here we create a simple blog list page that uses the grid layout to display the posts dependending on the size of the devices screen. We also use "getStaticProps" to fetch all of the files in the "public/posts" directory, loop through and setup each post's information, the information is then available to the Blog component which then displays the blog posts. 

Please note using "getStaticProps" etc, can only be done via the pages directory.

Next we need to actually add some posts to display, create both the "public/posts" and "public/assets/images" directories, add a couple of Markdown pages to the public/posts directory and add their respective images to the public/assets/images directory. A sample Markdown will need to have the following at the top:

```
title: "WebRTC For Beginners - Part 1"
metaTitle: "WebRTC For Beginners"
metaDesc: "WebRTC For Beginners"
socialImage: assets/images/webrtc.jpg
date: "2022-01-12"
tags:
	- webrtc
```

This example is taken from my WebRTC Tutorial, in this example we will be using the title and the socialImage of the post to display the title and to show the image.

If all goes well you should get something that looks like the following:

![Blog list](https://i.ibb.co/P5pvV1X/markdown-2.png)

Almost done, next we just need to handle when the user clicks on the post. ☺️

---

## Displaying a Single Post

Finally we need to handle displaying a single post.

Create a new directory called "post" in the pages directory and create a new file called [slug].js, and then fill it with the following contents:

```javascript
import fs from 'fs';
import matter from 'gray-matter';
import md from 'markdown-it';

export async function getStaticPaths() {
  try {
    const files = fs.readdirSync('public/posts');

    const paths = files.map((fileName) => ({
      params: {
        slug: fileName.replace('.md', '') 
      }   
    }));

    return {
      paths,
      fallback: "blocking"
    };  
  } catch (error) {
    console.error(error);

    return {
      paths: [], 
      fallback: false
    };  
  }
};

export async function getStaticProps ({ params: { slug } }) {
  try {
    const fileName = fs.readFileSync(`public/posts/${slug}.md`, 'utf-8');
    const { data: frontmatter, content } = matter(fileName);

    return {
      props: {
        frontmatter,
        content
      }   
    };  
  } catch (error) {
    console.error(error);

    return {
      props: {}
    };  
  }
};

function Post ({ frontmatter, content }) {
  return (
    <div className="prose mx-auto mt-8">
      <h1>{ frontmatter.title }</h1>
      <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />
    </div>
  );
};

export default Post;
```

Here we read the contents of public/posts and set each file name to be a seperate url using getStaticPaths, we then set the props for the component via getStaticProps and then pass it to be used at the Post component.

If you try clicking on a blog post now it should be shown like the following:

![Individual Post](https://i.ibb.co/ZGsZRH9/markdown-3.png)

Here we have a simple Markdown blog you can see my implementation via:

https://ethan-dev.com/blog

Try adding features such as a filter or search. 😆

---

## Conclusion

Here I have shown how to create a simple Markdown Blog using Nextjs and Tailwind.

Personally I would like to also implement a filter and search features. I hope this has been of use to you and happy coding! 😎

You can find the source for this via:

https://github.com/ethand91/markdown-blog

---

Like me work? I post about a variety of topics, if you would like to see more please like and follow me.
Also I love coffee. 

[![“Buy Me A Coffee”](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/ethand9999)

