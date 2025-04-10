---
title: 新电脑/系统我的 Setup
description: 新电脑或系统的准备一系列设置工作，符合我自己的 setup
date: 2024-02-24
categories: 
  - macos
  - setup
---

## 浏览器：Safari

系统自带，通过它来 [下载 Chrome 浏览器](https://www.google.com/intl/zh-CN/chrome/)

## 浏览器：Chrome

登录 Google 帐号，以便同步浏览器内容及设置 

## 整理程序坞

首先，将不常用的、系统自带的 App 全部移到一个文件夹里去，让世界变得清爽起来。

## 邮箱

登录邮箱，及时收取、查看邮件

## Source Code Pro

[下载](https://github.com/adobe-fonts/source-code-pro/releases) TTF 类型后，进行安装

## Terminal

选择自带 Pro 的 profile 为默认

### 配置

- 字体：`Source Code Pro, 常规，14`，同时放大 terminal 到合适的大小
- 文本：平滑文本
- 文本：「褐色」文本
- 文本：「蓝色」粗体文本
- 光标：竖条
- 光标：闪动光标

### OhMyZsh

```shell
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

执行此命令后，会先自动安装 develop tools，完毕后，再次执行上述命令，随后，`vim .zshrc` 找到 `plugins=(git)` 启用插件：`git z zsh-syntax-highlighting zsh-autosuggestions`

#### Plugins: zsh-autosuggestions

```shell
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

#### Plugins: zsh-completions

```shell
git clone https://github.com/zsh-users/zsh-completions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-completions
```

#### Plugins: zsh-syntax-highlighting

```shell
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting 
```

### Alias: git

```shell
alias gs="git switch"
alias glog="git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
alias glu="git pull upstream"
```

### History

https://github.com/atuinsh/atuin

```shell
bash <(curl https://raw.githubusercontent.com/atuinsh/atuin/main/install.sh)
```

### Doggo

https://github.com/mr-karan/doggo

```shell
sudo mkdir -p /usr/local/bin/
curl -sS https://raw.githubusercontent.com/mr-karan/doggo/main/install.sh | sh
```

### node

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
nvm install 22
corepack enable pnpm
```

### Rust

```shell
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

## Git

从家庭存储里下载以下文件，并放到桌面：

- gitconfig.bak
- gitignore_global.bak

执行以下命令：

```shell
mv ~/Desktop/gitconfig.bak ~/.gitconfig
mv ~/Desktop/gitignore_global.bak ~/.gitignore_global
```

## SSH

从家庭存储里下载以下文件，并放到桌面：

- config.bak
- id_rsa.bak
- id_rsa.pub
- work_rsa.bak
- work_rsa.pub
- private.gpg.asc
- public.gpg.asc

执行以下命令：

```shell
mkdir -p ~/.ssh/
mv ~/Desktop/config.bak ~/.ssh/config
mv ~/Desktop/id_rsa.bak ~/.ssh/id_rsa
mv ~/Desktop/id_rsa.pub ~/.ssh/
mv ~/Desktop/work_rsa.bak ~/.ssh/work_rsa
mv ~/Desktop/work_rsa.pub ~/.ssh/
mv ~/Desktop/private.gpg.asc ~/.ssh/
mv ~/Desktop/public.gpg.asc ~/.ssh/
chmod 600 ~/.ssh/id_rsa
chmod 600 ~/.ssh/work_rsa
```

## 通讯软件

- [钉钉](https://page.dingtalk.com/wow/z/dingtalk/simple/ddhomedownload#/)
- [飞书](https://www.feishu.cn/download)
- [企业微信](https://work.weixin.qq.com/#indexDownload)
- [微信](https://weixin.qq.com/)
- [腾讯会议](https://meeting.tencent.com/download/)

## 开发工具

- [PHPStorm](https://www.jetbrains.com/phpstorm/download/#section=mac)
  - 字体：SourceCodePro, 16, 1.2 
- [RustRover](https://www.jetbrains.com/rust/download/?section=mac)
  - 字体：SourceCodePro, 16, 1.2 
- [DataGrip](https://www.jetbrains.com/datagrip/download/#section=mac) 同步 github 数据源
  - 字体：SourceCodePro, 16, 1.2 
- [VSCode](https://code.visualstudio.com/) 登录 Microsoft 帐号同步设置
- [Docker](https://docs.docker.com/desktop/install/mac-install/)
- [Wireshark](https://www.wireshark.org/download.html)
- [Filezilla](https://filezilla-project.org/download.php?type=client)
- [TunnelBlick](https://tunnelblick.net/downloads.html)

## 知识管理

- [Obsidian](https://obsidian.md/) 同步 github
- [WPS](https://platform.wps.cn/)

## 娱乐

- [网易云音乐](https://music.163.com/)
- [IINA](https://iina.io/) / [VLC](https://www.videolan.org/)
