---
layout: note
title: 新电脑
categories: [macos]
description: 新电脑准备
keywords: 
---

## 浏览器

### Safari

系统自带，通过它来 [下载 Chrome 浏览器](https://www.google.com/intl/zh-CN/chrome/)

### Chrome

登录 Google 帐号，以便同步浏览器内容及设置 

## 系统初始化

### 整理程序坞

首先，将不常用的、系统自带的 App 全部移到一个文件夹里去，让世界变得清爽起来。

### 邮箱

登录邮箱，及时收取、查看邮件

### 字体

#### Source Code Pro

[下载](https://github.com/adobe-fonts/source-code-pro/releases) TTF 类型后，进行安装

### Terminal

#### Brew

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

此命令会同步安装 XCode Command Line Tools

#### OhMyZsh

```shell
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

安装后，`vim .zshrc` 找到 `plugins=(git)` 启用插件：`git z zsh-syntax-highlighting zsh-autosuggestions`

##### Plugins: zsh-autosuggestions

```shell
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

##### Plugins: zsh-completions

```shell
git clone https://github.com/zsh-users/zsh-completions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-completions
```

##### Plugins: zsh-syntax-highlighting

```shell
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting 

```

#### Alias: git

```shell
alias gs="git switch"
alias glog="git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```

### Git

从家庭网盘里下载以下文件，并放到桌面：

- gitconfig
- gitignore_global

执行以下命令：

```shell
mv ~/Desktop/gitconfig ~/.gitconfig
mv ~/Desktop/gitignore_global ~/.gitignore_global
```

### SSH

从家庭网盘里下载以下文件，并放到桌面：

- config
- id_rsa
- id_rsa.pub
- work_rsa
- work_rsa.pub
- private.gpg.asc
- public.gpg.asc

```shell
mv ~/Desktop/config ~/.ssh/
mv ~/Desktop/id_rsa ~/.ssh/
mv ~/Desktop/id_rsa.pub ~/.ssh/
mv ~/Desktop/work_rsa ~/.ssh/
mv ~/Desktop/work_rsa.pub ~/.ssh/
mv ~/Desktop/private.gpg.asc ~/.ssh/
mv ~/Desktop/public.gpg.asc ~/.ssh/
```

## 通讯软件

### 钉钉
### 飞书
### 企业微信
### 微信
### 腾讯会议

## 开发工具

### PHPStorm
### RustRover
### DataGrip
### VSCode
### TinyRDM
### Docker
### Wireshark
### Filezilla
### GIMP
### TunnelBlick

## 知识管理

### Obsidian
### WPS

## 娱乐

### 网易云音乐
### IINA