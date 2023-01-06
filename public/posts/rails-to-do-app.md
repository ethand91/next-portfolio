---
title: "Creating a simple To-Do app using Rails"
metaTitle: "Creating a simple To-Do app using Rails"
metaDesc: "Creating a simple To-Do app using Rails"
socialImage: assets/images/rails.webp
date: "2022-06-16"
tags:
	- rails
---

## Introduction

Hello! Just thought I'd show how to make a very simple todo app with Rails. 😃

---

## Installation

To start using Rails you will need to following installed:

* Ruby
* SQLite3

Installation will vary depending on the OS you're using so I recommend looking at the following guides:

Ruby: https://www.ruby-lang.org/en/documentation/installation/
SQLite3: https://www.sqlite.org/download.html

Then to install Rails you just need to run the following command:

```bash
gem install rails
```

---

## Creating the simple To-Do application

First we need to create the rails application, which can be done with the following command: (I've added some options because we don't need everything)

```bash
rails new todo --skip-action-mailer --skip-action-mailbox --skip-action-text --skip-active-storage --skip-action-cable
```

If all goes well you should see a "todo" directory in the current workspace.

```bash
cd todo
```

Next we will using generate to create the bolierplate code, which saves us having to write anything.
Using scaffold gives us a full set of model, database migration for that model, controller to manipulate it, views to view and manipulate the data and a test suite. In simple terms it does all the hard work for us. 😎

```bash
./bin/rails generate scaffold task content:text
```

The above command creates a resource called task with one property called content which is of type text.

Next we need to create a database for the application, which can easily be done via the following command:

```bash
./bin/rails db:create
```

Next we need to migrate the database which can be done via the following:

```bash
./bin/rails db:migrate
```

Finally we just need to run the rails server.

```bash
./bin rails s
```

Now if you navigate your browser to "http://localhost:3000/tasks", you should see the following page:

![Tasks Page](https://i.ibb.co/X3Ynn3L/ksnip-20220616-155628.png)

If you click on "New task" it should take you to the following page where you can create a new task.

![New Task](https://i.ibb.co/hFrWJk9/ksnip-20220616-155651.png)

Feel free to try putting some text in and then click on "Create task", if successfull you should see that the task was created successfully.

![New Task Created](https://i.ibb.co/XDvwsy7/ksnip-20220616-155711.png)

Finally if you go back to the tasks page you should see the newly created task.

![Tasks](https://i.ibb.co/2hMyv5x/ksnip-20220616-155729.png)

You can also Edit and Delete tasks etc. Pretty simple UI put this is how you can implement a very simple todo app with Rails, also no code required 😄

---

## Conclusion

Here I have shown how to create a very simple todo application with Rails with just the command line.
It's been a long time since I've used Rails, but hopefully this helps someone getting started with the Framework. 😀

---

Like me work? I post about a variety of topics, if you would like to see more please like and follow me.
Also I love coffee. 

[![“Buy Me A Coffee”](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/ethand9999)
