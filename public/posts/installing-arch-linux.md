---
title: "Installing Arch Linux"
metaTitle: "Installing Arch Linux"
metaDesc: "Installing Arch Linux"
socialImage: assets/images/arch.webp
date: "2022-04-22"
tags:
	- linux
---

## Introduction

Hello, here I will share how I installed Arch Linux on a new PC I got. Obviously the installation varies on numerous factors but I will share my method and hopefully it helps you (and future me).

---

## Installation

First you need to download the Arch Linux ISO file which can be found here:
https://archlinux.org/download/

Next if your installing on a PC you will need to create a bootable media, if your using a virtual environment this is not necessary but the steps to do this can be found here:
https://dev.to/ethand91/how-to-create-a-bootable-usb-device-on-macos-3bke

### Setting the keyboard layout

The default layout is US, but if your like me and need to change the keyboard layout you can do so via the following commands:

```bash
# List the available layouts
ls /usr/share/kbd/keymaps/**/*.map.gz

# Set the keyboard layout
loadkeys jp106
```

### Connecting to the internet

This will vary depending on if your using a ethernet cable, in my case I'm using Wifi so I use the following to connect to the internet:

```bash
iwctl
[iwctl] device list
[iwctl] station wlan0 scan
[iwctl] station wlan0 get-networks
[iwctl] station wlan0 connect [network name]

# You can check if you're connected via:
ping google.com
```

### Updating the system clock

You can update the system clock via:

```bash
timedatectl set-ntp true
```

---

## Partitioning the disks

The devices can be found in /dev directory. 
Partitioning can be done via the fdisk command:

```bash
# List the devices
fdisk -l

# Create the EFI partition (NOTE: you do not need to do this if a EFI partition is already available)
[fdisk] n
[fdisk] ENTER
[fdisk] +300M
[fdisk] ENTER

# Create the swap partition
[fdisk] n
[fdisk] ENTER
[fdisk] +1G
[fdisk] ENTER

# Create the root partition, here we will use all the remaining space
[fdisk] n
[fdisk] ENTER
[fdisk] ENTER

# Finally save the partitions and exit fdisk via Ctrl-D
[fdisk] w
```

### Format the partitions

Now that the partitions have been created we need to format them:

```bash
# Format the EFI partition (NOTE: only do this if you created the partition in the above step)
mkfs.fat -F 32 [EFI]

# Initialize the swap partition
mkswap [swap]

# Create an Ext4 file system
mkfs.ext4 [root]
```

### Mount the file systems

Next we need to mount the root volume and enable the swap volume:

```bash
mount [root] /mnt
swapon [swap]
```

### Installing the required packages

Next we need to install the essential packages and some optional ones, I prefer vim but you can use any IDE you want.

```bash
pacstrap /mnt base linux-lts linux-lts-headers linux-firmware vim wget
```

### Configure the system

Next we need to generate an fstab file and change root into the new system.

```bash
genfstab -U /mnt >> /mnt/etc/fstab (NOTE: check the fstab file for errors)

arch-chroot /mnt
```

### Setting the timezone

The timezone can be configured via the following commands:

```bash
ln -sf /usr/share/zoneinfo/Japan /etc/localtime

hwclock --systohc
```

### Localization

Next we need to generate the locales and keymap.

```bash
# Uncomment any need locales from the following file:
vim /etc/locale.gen (LANG=ja_JP.UTF-8)

# Set the keyboard layout
vim /etc/vconsole.conf (KEYMAP=jp106)
```

### Network Configuration

Create the following file and give the machine a unique name.

```bash
vim /etc/hostname
```

### Setting the root password

The root password can be changed via the following simple command

```bash
passwd
```

### Installing and configuring the boot loader

Next we need to install and configure a bootloader, for this I will be using GRUB and machine has an Intel CPU you will need to enable the AMD microcode updates if you have an AMD CPU.

```bash
pacman -S intel-ucode
pacman -S grub efibootmgr

# Configure EFI
grub-install --target=x86_64-efi --efi-directory=/mnt/efi --bootloader-id=GRUB
grub-mkconfig -o /boot/grub/grub.cfg
```

### Creating the users

Next we need to create a user that will use the machine, we will also install sudo and add the user to the sudoers list.

```bash
useradd -m [user]
passwd [user]
usermod -aG wheel [user]

# Install and enable sudo
pacman -S sudo
vim /etc/sudoers (Uncomment wheel)
```

### Setting up the Graphical User Interface

Next we need to setup the Graphical User Interface.

```bash
pacman -S xorg xorg-server
pacman -S gnome gnome-tweaks

# Enable the service
systemctl enable gdm
```

### (Optional) Enabling Japanese Fonts

Since I'm using a Japanese keyboard etc the fonts also need to be installed and configured, if you do not need them please skip to the next step.

```bash
pacman -S adobe-source-han-sans-jp-fonts
pacman -S fcitx-im fcitx-configtool fcitx-mozc fcitx

vim /home/[user]/.xprofile
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export XMODIFIERS="@im=fcitx"
```

### Installing the Network Manager

Next we need to install and enable the network manager

```bash
pacman -S networkmanager
systemctl enable NetworkManager
```

### Installing misc packages
```bash
pacman -S networkmanager
systemctl enable NetworkManager

pacman -S nvidia-lts
pacman -S base-devel

pacman -S bluez
systemctl enable bluetooth
```
Now we can finally install any optional packages, since I have a Nvidia Graphics card I will also install the drivers.

```bash
# Graphic card drivers
pacman -S nvidia-lts

# Development packages
pacman -S base-devel

# Bluetooth
pacman -S bluez
systemctl enable bluetooth
```

Feel free to add any other packages you may need.

---

## Conclusion

Here I have shown how I install Arch Linux, feel free to use it as a reference and if you have any improvements please let me know. 😃

Also side note I'm still working on my WebRTC Android Tutorial, however the API has changed slightly and my schedule is hectic. Please wait a little longer if you are following my WebRTC tutorial. 🙏

---

Like me work? I post about a variety of topics, if you would like to see more please like and follow me.
Also I love coffee. 

[![“Buy Me A Coffee”](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/ethand9999)
