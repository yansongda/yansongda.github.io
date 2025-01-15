---
layout: note
title: 新电脑/系统我的 Setup
categories: [macos]
description: 新电脑或系统的准备一系列设置工作，符合我自己的 setup
keywords: setup, new computer
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

选择自带 Pro 的 profile 为默认，并更改字体为 `Source Code Pro, 14`，同时放大 terminal 到合适的大小

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

#### History

https://github.com/atuinsh/atuin

```shell
bash <(curl https://raw.githubusercontent.com/atuinsh/atuin/main/install.sh)
```

#### Alias: git

```shell
alias gs="git switch"
alias glog="git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
alias glu="git pull upstream"
```

#### Doggo

```shell
curl -sS https://raw.githubusercontent.com/mr-karan/doggo/main/install.sh | sh
```

#### node

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
nvm install 22
corepack enable pnpm
```

### Git

从家庭存储里下载以下文件，并放到桌面：

- gitconfig
- gitignore_global

执行以下命令：

```shell
mv ~/Desktop/gitconfig ~/.gitconfig
mv ~/Desktop/gitignore_global ~/.gitignore_global
```

### SSH

从家庭存储里下载以下文件，并放到桌面：

- config
- id_rsa
- id_rsa.pub
- work_rsa
- work_rsa.pub
- private.gpg.asc
- public.gpg.asc

执行以下命令：

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

[https://page.dingtalk.com/wow/z/dingtalk/simple/ddhomedownload#/](https://page.dingtalk.com/wow/z/dingtalk/simple/ddhomedownload#/)

### 飞书

[https://www.feishu.cn/download](https://www.feishu.cn/download)

### 企业微信

[https://work.weixin.qq.com/#indexDownload](https://work.weixin.qq.com/#indexDownload)

### 微信

[https://weixin.qq.com/](https://weixin.qq.com/)

### 腾讯会议

[https://meeting.tencent.com/download/](https://meeting.tencent.com/download/)

## 开发工具

### Jetbrains

- PHPStorm(https://www.jetbrains.com/phpstorm/download/#section=mac)
- RustRover(https://www.jetbrains.com/rust/download/?section=mac)
- DataGrip(https://www.jetbrains.com/datagrip/download/#section=mac)，下载后，同步 github 数据源
- ...

### VSCode

[下载](https://code.visualstudio.com/) 后登录 Microsoft 帐号同步设置

### Docker

[https://docs.docker.com/desktop/install/mac-install/](https://docs.docker.com/desktop/install/mac-install/)

### Wireshark

[https://www.wireshark.org/download.html](https://www.wireshark.org/download.html)

### Filezilla

[https://filezilla-project.org/download.php?type=client](https://filezilla-project.org/download.php?type=client)

### TunnelBlick

[https://tunnelblick.net/downloads.html](https://tunnelblick.net/downloads.html)

## 知识管理

### Obsidian

[https://obsidian.md/](https://obsidian.md/)

### WPS

[https://platform.wps.cn/](https://platform.wps.cn/)

## 娱乐

### 网易云音乐

[https://music.163.com/](https://music.163.com/)

### IINA

[https://iina.io/](https://iina.io/)
