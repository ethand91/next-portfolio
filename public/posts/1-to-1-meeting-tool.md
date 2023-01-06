---
title: "I Created A Simple 1 To 1 Meeting Tool"
metaTitle: "I Created A Simple 1 To 1 Meeting Tool"
metaDesc: "I Created A Simple 1 To 1 Meeting Tool"
socialImage: assets/images/webrtc.jpeg
date: "2022-07-31"
tags:
	- react
---

## Introduction

Hello! I recently heard about the PlanetScale X Hashnode hackathon, so I thought I'd give it a try. 
Please note that this is my first Hackathon so any advice etc. is very appreciated. 😀

---

## The Project

I decided to create a simple 1 to 1 meeting tool using WebRTC. 
The current market is mostly dominated by Google Meets/Zoom but I didn't need all the fancy features they possess, I just wanted something simple so I thought this hackathon would be a great chance to just build it. 😎

---

## Tech Stack

The tech that was used to create the project is as follows:

* React - To build the frontend
* Nodejs - To build the backend
* Express - To handle API requests
* Socket.io - To handle WebSocket chat/signalling
* PlanetScale - The database
* Material-ui - For the design
* Heroku - To host the app

---

## The Finished Project

The page that the user is first greeted with when loading the app is the create room page:

![Landing Page](https://i.ibb.co/kxZWQ5y/Screenshot-22.png)

Yes, I know it's very simple. 😅

The user can then create a new room by clicking on the "Create Room" button, this sends a request to the server which then creates a new room and stores the room key inside the planetscale database.

Once the room is created the following popup appears:

![Popup](https://i.ibb.co/thrZB49/Screenshot-24.png)

The popup informs the user that the new room is created and gives the options to copy the room url and a link which redirects the user to the created room.

The following screenshot shows what the page looks like when two users enter the room: 

![Room Page](https://i.ibb.co/1Qmm3nK/Screenshot-35.png)

The top left video is the local user's video whilst the video that takes up most of the screen is the remote user's video. 

There is also a chat window to the right that allows both the user's to send chat messages to each other.

---

## Project Uses

The application can be used for the following scenarios:

* 1 to 1 chat
* Meetings
* Mentoring
* Simple Appointments

---

## Main Issues

The main issues I had with the project where:

* I suck at UI
* React's useEffect hook is useful, but if you use it incorrectly it can occur an infinite loop
* Couple of issues regarding ports when uploading to Heroku (you can't use multiple ports)
* At first it would be okay to delete the room after use but I decided not to so the user can use the room they created without having to re-create everytime

---

## Future Plans

My future plans for the project are as follows:

* Implement Screen Share
* Implement Recording
* Ability to mute video/audio
* Saving the chat messages to PlanetScale.

---

## Thoughts on PlanetScale

Since this is the first time I've ever used PlanetScale, I thought I'd share my experience with using it.
Creating a database is as simple as clicking a button, the quick start guides and the sample nodejs app they provide allowed me to easily get started without any issues at all. 😃

Also it gets rid of the hassle of hosting your own database, which can be a bit of a pain.

If you have a little bit of mySQL knowledge, you won't have any problem getting started with it.
Hopefully I will have the chance to implement it in future projects. ☺️

---

## Links

Finished Project: https://pacific-lowlands-02656.herokuapp.com/
Github: https://github.com/ethand91/simple-meeting

---

## Conclusion

Thank you for reading my article. 😀
I learned a lot when building this project, especially React, which I'm still new to. 
This was also the first time I've ever deployed an actual app to Heroku. (Which did waste quite a few hours).

I hope you enjoyed reading my first Hackathon article. It was a really thing learning experience and give me a chance to actually build something. I hope to participate in future Hackathons too. 👀

