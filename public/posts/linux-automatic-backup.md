---
title: "Formatting an external drive and Implementing Automatic Backup"
metaTitle: "Formatting an external drive and Implementing Automatic Backup"
metaDesc: "Formatting an external drive and Implementing Automatic Backup"
socialImage: assets/images/linux.webp
date: "2022-03-28"
tags:
	- linux
---

## Introduction

Hello! Today I decided to finally start backing up my files to a remote external drive, just in case something went wrong and it's important to periodically backup your data.  😀

The OS I'm currently using is Arch Linux but it should work on almost any flavor of Linux.

---

## Formatting the external drive

Before we can format the device we need to actually locate it.

```bash
sudo fdisk -l
```

This command will list all the devices that are connected to your machine and they will all be located under /dev (dev being short for device). The location should be noted as it will be used in the next commands. (in my case /dev/sda).

Next we need to make sure the device is not mounted before any formatting takes places, this can be done via:

```bash
sudo umount /dev/sda
```

The device may not have been mounted but it's best to make sure.
Now we can safe-fully format the device, giving the option ext4 as I'm using Linux.

```bash
sudo mkfs -t ext4 /dev/sda
```

You can check to see if it's been formatted correctly via:

```bash
lsblk -f
```

Finally we need to mount the backup device by creating a mount point and then mounting the device to that location.

```bash
sudo mkdir /mnt/backup
sudo mount /dev/sda /mnt/backup
```

---

## Creating the backup script

```bash
#!/bin/bash
# Script to backup directories to external disk

backup_files="/home /etc /root /boot /opt"
backup_location="/mnt/backup"

# Create the filename
day=$(date +%A)
file_name="backup-$day.tgz"

tar -Pczf $backup_location/$file_name $backup_files
```

What this script basically does is backup a number of directories to an external device (the one that was mounted in the previous step).

Finally make it executable. 😎

```bash
chmod +x backup.sh
```

The script can also be found below:

https://gist.github.com/ethand91/d164602f1c298178cfb2b51894045a61

Feel free to add any other directories etc that you want to backup. 😉

---

## Automating the backup process

Backups should be taken periodically, crontab can be used to make sure the script is run daily.

Make sure cron is installed on the system, after which you just need to add the task.
Caution: if you already use cron make sure not to mistake -e with -r. (I learned the hard way) 🥲 

```bash
sudo crontab -e

# Add the following one liner
0 13 * * * bash /root/backup.sh
```

Here I set it up so that the script runs daily at 13:00, which is my lunch break. 🤓

Feel free to change the backup time/script location.

---

Like me work? I post about a variety of topics, if you would like to see more please like and follow me.
Also I love coffee. 

[![“Buy Me A Coffee”](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/ethand9999)
