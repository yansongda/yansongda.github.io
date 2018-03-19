---
layout: post
title: php编译 Don’t know how to define struct flock on this system 解决办法
categories: [centos, php, linux]
description: php编译 Don’t know how to define struct flock on this system 解决办法
keywords: centos, php, compile
---

在对 php 进行编译安装的过程中出现如下错误：checking for known struct flock definition... configure: error: Don't know how to define struct flock on this system, set --enable-opcache=no

现将解决办法记录

## 报错信息

>checking for known struct flock definition... configure: error: Don't know how to define struct flock on this system, set --enable-opcache=no

## 平台介绍

```shell
OS Version: CentOS release 7.1
Nginx Version: nginx version: nginx/1.4.3
PHP Version: PHP 5.5.26(fpm-fcgi)
```

## 解决办法

```shell
vim /etc/ld.so.conf.d/local.conf # 编辑库文件

/usr/local/lib # 添加该行

:wq # 保存退出

ldconfig -v # 使之生效
```
