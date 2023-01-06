---
title: "Using Emailjs To Send Emails From The Frontend"
metaTitle: "Using Emailjs To Send Emails From The Frontend"
metaDesc: "Use Emailjs to send emails from the frontend"
socialImage: assets/images/emailjs.jpg
date: "2022-12-19"
tags:
	- js
---

## Introduction

Hello! 
In this tutorial I will show you how to send emails from the frontend, without needing to set up any mail servers or having to deal with the logic to send the emails. 👀

To do this I will show you how to use EmailJS in your application.

---

## Creating and Setting up an Account

First we need to create a EmailJS account, this can be done via the following URL:
https://dashboard.emailjs.com/sign-up

Once you have signed up to the service you should be able to use the same credentials to login.

You should then be greeted with a page similiar to the following:

![Emailjs main page](https://i.ibb.co/FYndKbC/services-main.png)

I have already connected a GMail service so you should not see any services at the moment.

So let's add one! Click on "Add New Service" and select the type of service you would look to connect to, I decided to choose GMail but feel free to experiment with other providers.

![GMail service](https://i.ibb.co/zShJ9NP/service-gmail.png)


Click on "Connect Account" to connect your GMail address to the service and once linked click on "Create Service".

Next we need to edit the default template so next click on "Email Templates", you should see a default template already provided, so lets edit it.

![Templates](https://i.ibb.co/N9SDhSs/templates.png)

Try editing the default template to how you like. Note that anything encased in {{}} can be used as a variable when coding the contact form.

![Simple Template](https://i.ibb.co/q7H9hBq/template.png)

Once you have finished creating your template click on the save button. Now we are ready to start coding. 💪

---

## Implementing the Contact Form

EmailJS provides libararies for frameworks such as React etc. But it can also be using with basic HTML. Since I am just showcasing the service I will using basic HTML.

Open up an "index.html" file and lets get coding!

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>EmailJS Example</title>

  </head>

  <body>
    <form id="contact-form" onSubmit="handleForm()">
      <label for="fullname">Fullname</label>
      <input type="text" name="from_name" />
      <br/><br/>

      <label for="email">Your Email</label>
      <input type="email" name="from_email"/>
      <br/><br/>

      <label for="subject">Message</label>
      <textarea name="message"></textarea>
      <br/><br/>

      <input type="submit" value="Send"/>
    </form>

    <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
    <script>
      (function () {
        emailjs.init('1PVVpqMraXzVXJuXv');
      })();
    </script>
    <script>
      const handleForm = async (e) => {
        try {
          await emailjs.sendForm('service_qz6zxh3', 'template_s6ll9hl', document.getElementById('contact-form'));
          alert('email sent!');
        } catch (error) {
          console.error(error);
          alert('Failed to send email');
        }
      };
    </script>
  </body>
</html>
```

As you can see nothing too complicated, first we initialize sendjs via the init function and then we create a very basic (and very ugly) contact form.

Please note that the input names need to match the variables you used when creating the emil template, if you get this wrong the value sent to your email will be blank.

Once the user clicks submit we use sendjs to send the contact form, the first variable is the email service id you set up in the first part of the tutorial. (You can find this at the dashboard's services page) The second argument is the email template ID which can also be found on the dashboard under "templates", the final argument is the contact form itself which we use getElementById to obtain.

Phew fire up the page under any HTTP server or if you're like me you can use the following one-liner:

```bash
python -m http.server 8000
```

Go check out the page and try filling out the contact form and clicking the send button!

If all goes well you should see the contents of the form sent to your email address! 😃

---

## Conclusion

Here I have shown how to use a service such as "emailjs" to create a simple contact form without the need of setting up any mail services are implementing the logic needed to send the email. 😆

Emailjs provides a number of emails for free each month so I definetely recommend checking it out! (Please note I am not sponsored to say this lol) 🥲

Hope you found this tutorial usefull and as always happy coding! 😎

Please feel free experiementing with the U.I of the form.

You can find the source for this example via:
https://gist.github.com/ethand91/38c7296bb4789dbf463d6b7883b9acaf

---

Like me work? I post about a variety of topics, if you would like to see more please like and follow me.
Also I love coffee. 

[![“Buy Me A Coffee”](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/ethand9999)
