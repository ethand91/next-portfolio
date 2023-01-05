---
title: "Python - Using a virtual environment."
metaTitle: "Python - Using a virtual environment."
metaDesc: "Python - Using a virtual environment."
socialImage: assets/images/python.png
date: "2022-03-10"
tags:
	- python
---

## Introduction - Why use a virtual environment?

Using a virtual environment allows you to avoid installing Python modules globally which could break system tools or other projects. 💥

---

## Installation

If you are using Python 3.3 or newer the "venv" module is the preferred way to create and manage virtual environments. 

You can check what version of Python you have via:

```bash
python --version
```

If the version is older than 3.3 you can install the "virtualenv" module:

```bash
pip install virtualenv
```

---

## Creating the virtual environment

Creating the virtual environment is easy and can be done via:

```bash
# venv
python3 -m venv env

# virtualenv
virtualenv env
```

---

## Activating the virtual environment

Before you can start installing modules etc, you need to activate the environment. Activating the virtual environment will put the environment specific "python" and "pip" executables into your shell's path.

```bash
source env/bin/activate
```

You can check if the path has been updated via echoing it.

```bash
echo $PATH
```

You should see the virtualenv directory being listed at the front. 😎

---

## Deactivating the virtual environment

Once you are done with the virtual environment you can simple deactivate it.

```bash
deactivate
```

Simples. 😎

---

## Should you commit the virtual environment directory?

I personally wouldn't recommend it. 

I'd recommend putting the modules you need in a "requirements.txt" file, creating the virtual environment on the deployment server and then installing the modules needed via:

```bash
pip install -r requirements.txt
```

Don't forget to add the virtual environment directory to your ".gitignore" file. 😃 

- - - -

Like me work? I post about a variety of topics, if you would like to see more please like and follow me.
Also I love coffee. 

[![“Buy Me A Coffee”](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/ethand9999)
