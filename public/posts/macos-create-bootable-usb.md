---
title: "How to create a bootable USB Device on MacOS"
metaTitle: "How to create a bootable USB Device on MacOS"
metaDesc: "How to create a bootable USB Device on MacOS"
socialImage: assets/images/mac.webp
date: "2022-03-30"
tags:
	- macos
---


## Introduction

Hello! Recently I had to create a bootable Arch Linux usb drive to fix an issue with my machine running Arch. However the only other PC I had access to was a Mac, so I'll show how to create a bootable external USB drive using only the command line. 

Hopefully it helps and I'm sure it will help me when I brick my Arch installation again. 😅

---

## Converting the ISO file to UDRW Format

First we need to convert the format of the ISO file to UDRW format so that the image can be written to the external USB device. This can be done via the following command:
Change the source_file to the name of the ISO image.

```bash
hdiutil convert -format UDRW -o output_file.img source_file.iso
```

---

## Formatting the external USB device

Next we need to format the external USB device, but first we need to get the device name.

```bash
diskutil list
```

This will list all the connected devices, make a note of the external device. (in my case /dev/disk4)

Next we need to format the device, this can be done via the following command:
Make sure to replace dev/disk4, you don't want to accidentely format an unrelated disk.

```bash
diskUtil partitionDisk /dev/disk4 1 "Free Space" "unused" "100%"
```

The above command creates 1 partition using 100% of the available space. 

---

## Copying the Image file to USB

Finally we can copy the UDRW format image to the USB device, this can be done via the following command: (This command needs root permission)

```bash
sudo dd if=output_file.img.dmg of=/dev/disk4 bs=1m
```

This command has no progress but it should finish after a while. 

Finally to be safe we eject the usb device.

```bash
diskutil eject /dev/disk4
```

Done! The USB device should now be bootable! 😃

---

Like me work? I post about a variety of topics, if you would like to see more please like and follow me.
Also I love coffee. 

[![“Buy Me A Coffee”](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/ethand9999)
