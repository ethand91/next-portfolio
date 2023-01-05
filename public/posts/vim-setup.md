---
title: "My basic vim setup"
metaTitle: "My basic vim setup"
metaDesc: "My basic vim setup"
socialImage: assets/images/vim.webp
date: "2022-02-04"
tags:
	- vim
---

## Introduction

Hello :)

Just thought I'd share my .vimrc settings from my recently installed Arch Linux machine.
I've never actually thought too deep about what each of the options do so I decided to look each of them up. 

---

### Very very basic .vimrc

Well then here's my very simple .vimrc file: 
I'll try to explain what each option does below.

```bash
set nocompatible
syntax on
set modelines=0
set number
set encoding=utf-8
set wrap

set tabstop=2
set shiftwidth=2
set softtabstop=2
set autoindent
set copyindent
set expandtab
set noshiftround

set hlsearch
set incsearch
set showmatch
set smartcase

set hidden
set ttyfast
set laststatus=2

set showcmd
set background=dark
```

---

### Very very basic explanation

nocompatable because I don't need "vi" compatability.

Enabling syntax makes it easy to read code via vim.

I don't need modelines so I have set it to 0

Enabling number allows me to see the line number of each line.

After that I have my tab spaces etc set up and search highlighting.

hidden causes unsaved files to be hidden instead of closed when opening a new file.

ttyfast improves smoothness when there is multiple windows. 

laststatus is set to 2 so that the last window will always have a status line.

showcmd shows the command ;) recommended to switch this off if your terminal is slow.

background is set to dark as I tend to like dark themes/backgrounds

Next I'm looking into installing some plugins. If you have any recommendations please let me know. :)
