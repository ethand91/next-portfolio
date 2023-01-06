---
title: "Deleting multiple directories with Nodejs/Javascript"
metaTitle: "Deleting multiple directories with Nodejs/Javascript"
metaDesc: "Deleting multiple directories with Nodejs/Javascript"
socialImage: assets/images/nodejs.webp
date: "2022-03-18"
tags:
	- nodejs
---

Hello! I had to delete all directories that were in a directory called "files", just thought I'd share the solution. 😃

```javascript
const { rmSync, promises: { readdir } } = require('fs');

(async () => {
  try {
    const fileNames = await readdir('./files');

    for (const fileName of fileNames) {
      console.log(`deleting file with name ${fileName}`);
      rmSync(`./files/${fileName}`, { recursive: true }); 
    }   
  } catch (error) {
    console.error('failed to delete directories', error);
  }
})();
```

Short and sweet. 😎 

What this basically does is read all the directories under the directory called "files" and puts them into an array of file names using the readdir function.

Then it loops through the names of the directories and deletes them using rmSync.

Also it's very important to handle errors with nodejs as an unexpected error may kill the application. 🥲

If you have a better, cleaner solution then please share. This is how I handled it. 🙂

---

Like me work? I post about a variety of topics, if you would like to see more please like and follow me.
Also I love coffee. 

[![“Buy Me A Coffee”](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/ethand9999)
