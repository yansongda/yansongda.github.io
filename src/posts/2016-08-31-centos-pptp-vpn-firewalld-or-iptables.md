---
title: Centos 7 搭建 PPTP VPN 服务器（firewalld + iptables 方案）
description: Centos 7 搭建 PPTP VPN 服务器 firewalld + iptables 方案
date: 2016-08-31
categories: [centos, vpn, linux]
---

工作原因，好长时间没写博客了。

最近买了台国外的服务器。。此处省略原因。

发个文记录下遇到的坑。

## 一、系统信息

```shell
[root@server etc]# uname -a
Linux server 3.10.0-327.28.3.el7.x86_64 #1 SMP Thu Aug 18 19:05:49 UTC 2016 x86_64 x86_64 x86_64 GNU/Linux
```

## 二、安装 ppp pptpd 服务

`yum -y install ppp pptpd`

如果提示 pptpd 没有安装包。那么请

`wget http://dl.fedoraproject.org/pub/epel/7/x86_64/p/pptpd-1.4.0-2.el7.x86_64.rpm &amp;&amp; yum localinstall pptpd-1.4.0-2.el7.x86_64.rpm`

## 三、配置 ppp 配置文件

这一步主要是修改为 Google 的 DNS 方便翻过去

### 1、编辑 options.pptpd 文件
`vim /etc/ppp/options.pptpd`

### 2、找到 ms-dns

```shell
# ms-dns 10.0.0.1
# ms-dns 10.0.0.2
```

### 3、修改 ms-dns

```shell
ms-dns 8.8.8.8
ms-dns 8.8.6.6
```

## 四、配置 ppp 账号文件

### 1、编辑 chap-secrets 文件

`vim /etc/ppp/chap-secrets`

### 2、设置 VPN账号 + 服务类型 + VPN密码 + IP

`yansongda pptpd 123456 *`

以上含义为：

- vpn 账号：yansongda
- vpn 类型：pptpd
- vpn 密码：123456

可连接此 vpn 账号的 IP 地址：*（所有IP）

## 五、配置 pptpd

### 1、编辑 pptpd.conf 文件

`vim /etc/pptpd.conf`

### 2、找到 localip

```shell
# (Recommended)
#localip 192.168.0.1
#remoteip 192.168.0.234-238，192.168.0.245
# or
#localip 192.168.0.234-238，192.168.0.245
#remoteip 192.168.1.234-238，192.168.1.245
```

### 3、修改 localip

```shell
# (Recommended)
localip 192.168.0.1
remoteip 192.168.0.234-238，192.168.0.245
# or
#localip 192.168.0.234-238，192.168.0.245
#remoteip 192.168.1.234-238，192.168.1.245
```

此处请注意，如果您现有局域网的 IP 地址是 192.168.0.1 网段的，请膝盖 localip 和 remoteip 的网段。比如修改为：

```shell
# (Recommended)
localip 192.168.8.1
remoteip 192.168.8.234-238，192.168.8.245
# or
#localip 192.168.0.234-238，192.168.0.245
#remoteip 192.168.1.234-238，192.168.1.245
```

## 六、配置内核转发

### 1、编辑 sysctl.conf 文件

`vim /etc/sysctl.conf`

### 2、修改里面的内容为：

`net.ipv4.ip_forward=1`

### 3、生效

`sysctl -p`

## 七、配置防火墙

### 1、firewalld 防火墙

```shell
firewall-cmd --add-interface=eth0 #此处请将 eth0 更换为服务器外网网卡号
firewall-cmd --add-port=1723/tcp --permanent
firewall-cmd --add-masquerade --permanent
firewall-cmd --reload
 
systemctl restart firewalld
```

### 2、iptables 防火墙

```shell
iptables -P INPUT ACCEPT     # 改成 ACCEPT 标示接收一切请求
iptables -F                     # 清空默认所有规则
iptables -X                     # 清空自定义所有规则
iptables -Z                     # 计数器置0
 
iptables -A INPUT -i lo -j ACCEPT                                 # 允许127.0.0.1访问本地服务
iptables -A INPUT -m state --state ESTABLISHED -j ACCEPT         # 允许访问外部服务
iptables -A INPUT -p icmp -m icmp --icmp-type 8 -j ACCEPT         # 允许 ping
iptables -A INPUT -p tcp --dport 22 -j ACCEPT  
iptables -A INPUT -p tcp --dport 1723 -j ACCEPT
iptables -t nat -A POSTROUTING -s 192.168.0.0/24 -o eth0 -j MASQUERADE #此处请将 eth0 更换为服务器外网网卡号
 
service iptables save
systemctl restart  iptables
```

### 3、坑（ firewall 防火墙）

**如果客户端连接出现 619 或者 “GRE” 之类的错误，但是将 firewalld 防火墙禁用掉后，又可以正常连接，那么请尝试**

```shell
firewall-cmd --permanent --direct --add-rule ipv4 filter INPUT 0 -p gre -j ACCEPT
firewall-cmd --reload
```

## 八、启动所有服务

```shell
systemctl restart firewalld #systemctl restart  iptables
systemctl restart pptpd
```

### 九、在客户端使用账号密码连接 VPN 服务

至此，基于 xl2tpd 的 VPN 服务搭建完毕。
