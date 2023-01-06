---
title: "I Created A Simple Tinder Like Clone"
metaTitle: "I Created A Simple Tinder Like Clone"
metaDesc: "I Created A Simple Tinder Like Clone"
socialImage: assets/images/rails.webp
date: "2022-08-15"
tags:
	- rails
---

## Introduction

Hello! Recently I've been learning Rails and have created a simple Tinder like clone so I thought I'd show it. 😀

---

## Home Page

The Home Page is pretty simple containing just a fullscreen background image, with the options to Login and to create a new account.

![Landing Page](https://i.ibb.co/3f3Tm1S/home.png)

---

## Creating A New Account

The create account page form takes an email address, name, password and gender. (Yes I know I should implement password confirmation). The tutorial I used was Japanese hence the Japanese text. 🎌

![Signup Page](https://i.ibb.co/0rXR4Qc/create-account.png)

---

## Login Page

The login page form is the same as your average login page it takes an email address and the user's password.

![Login Page](https://i.ibb.co/X4sb030/account-login.png)

---

## Users Page

Once the user has logged in they are greeted with a page that displays other users display pictures, the user can then drag the card right to "like" the user or left to "dislike" the user.
This process continues until there is no more cards left.

![Users Page](https://i.ibb.co/t26KnxL/users.png)

---

## Edit Profile Page

The edit profile page allows the user to change their profile information and or image. 

![Edit Profile Page](https://i.ibb.co/tbzmCn6/profile-edit.png)

---

## Matched Page

The matched page displays a list of users that have each "liked" each other. Clicking on a matched user navigates the page to the chat page.

![Matched Page](https://i.ibb.co/sFKhtNs/matched-users.png)

---

## Chat Page

The chat page is pretty much like your standard chat message application, received chats are displayed on the right and sent chats are displayed on the left.

![Chat Page](https://i.ibb.co/L6PLYmJ/chat.png)

---

## Conclusion

Thanks for reading my article! 😆

I know the application may be simple but I managed to learn the following things:

* Devise - Used for signup/login, highly recommended if you use rails and want authorization out of the box.
* Channels - Used for the chatroom, very easy to implement websocket. I'm thinking of using it again for other applications.

I'm thinking of making another Rails tutorial, so let me know what you think. 
Also I haven't forgot about my WebRTC series, it's just that I need to learn Rails for my new job, and I'm having a lot of fun learning it. 😎
