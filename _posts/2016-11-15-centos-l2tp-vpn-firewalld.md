---
layout: post
title: Centos 7 搭建 L2TP VPN 服务器（firewalld 方案）
categories: [centos, vpn, linux]
description: centos 搭建 L2TP VPN 服务器 firewalld 方案
keywords: centos, vpn， l2tp, firewalld
---

最近 mac os 更新，导致 PPTP 科学上网方案不可行了。于是……

## 一、系统信息

```shell
[root@server etc]# uname -a
Linux server 3.10.0-327.28.3.el7.x86_64 #1 SMP Thu Aug 18 19:05:49 UTC 2016 x86_64 x86_64 x86_64 GNU/Linux
```

## 二、安装 ppp libreswan xl2tpd 服务

```shell
yum -y install ppp libreswan xl2tpd
```

## 三、配置 IPSEC 配置文件

### 1、编辑 ipsec 下的 xl2tpd.conf 文件（如果没有则新建）
`vim /etc/ipsec.d/xl2tpd.conf`

输入以下信息

```shell
conn L2TP-PSK-NAT
    rightsubnet=vhost:%priv
    also=L2TP-PSK-noNAT
conn L2TP-PSK-noNAT
    authby=secret
    pfs=no
    auto=add
    keyingtries=3
    rekey=no
    ikelifetime=8h
    keylife=1h
    type=transport
    left=192.168.1.231 #（此处输入本机可访问外网的网卡上的IP，如果内网IP就写内网IP）
    leftid=192.168.1.231 #（此处输入本机可访问外网的网卡上的IP，如果内网IP就写内网IP）
    leftprotoport=17/1701
    right=%any
    rightprotoport=17/%any
    dpddelay=40
    dpdtimeout=130
    dpdaction=clear
```

### 2、编辑 ipsec 下的ipsec.secrets 文件

在最后输入以下信息

`: PSK "fuckgfw" #（此处是 ipsec 密钥，可自行更改）`
 
## 四、配置 xl2tp 

### 1、编辑 xl2tpd.conf 文件

`vim /etc/xl2tpd/xl2tpd.conf`

将 ip range 和 local ip 字段更改为何本机IP不冲突的内网 IP，如下我配置的可做参考。

```shell
;
; This is a minimal sample xl2tpd configuration file for use
; with L2TP over IPsec.
;
; The idea is to provide an L2TP daemon to which remote Windows L2TP/IPsec
; clients connect. In this example, the internal (protected) network
; is 192.168.1.0/24.  A special IP range within this network is reserved
; for the remote clients: 192.168.1.128/25
; (i.e. 192.168.1.128 ... 192.168.1.254)
;
; The listen-addr parameter can be used if you want to bind the L2TP daemon
; to a specific IP address instead of to all interfaces. For instance,
; you could bind it to the interface of the internal LAN (e.g. 192.168.1.98
; in the example below). Yet another IP address (local ip, e.g. 192.168.1.99)
; will be used by xl2tpd as its address on pppX interfaces.

[global]
; listen-addr = 192.168.1.231
;
; requires openswan-2.5.18 or higher - Also does not yet work in combination
; with kernel mode l2tp as present in linux 2.6.23+
; ipsec saref = yes
; Use refinfo of 22 if using an SAref kernel patch based on openswan 2.6.35 or
;  when using any of the SAref kernel patches for kernels up to 2.6.35.
; saref refinfo = 30
;
; force userspace = yes
;
; debug tunnel = yes

[lns default]
ip range = 192.168.8.128-192.168.8.254
local ip = 192.168.8.99
require chap = yes
refuse pap = yes
require authentication = yes
name = LinuxVPNserver
ppp debug = yes
pppoptfile = /etc/ppp/options.xl2tpd
length bit = yes
```


## 五、配置 ppp 账号文件

### 1、配置 ppp 中的 options.xl2tpd

`vim /etc/ppp/options.xl2tpd`

此文件需要修改 ms-dns 字段，其它一般保持默认即可。

```shell
ipcp-accept-local
ipcp-accept-remote
ms-dns  8.8.8.8
ms-dns  8.8.6.6
# ms-wins 192.168.1.2
# ms-wins 192.168.1.4
noccp
auth
idle 1800
mtu 1410
mru 1410
nodefaultroute
debug
proxyarp
connect-delay 5000
# To allow authentication against a Windows domain EXAMPLE, and require the
# user to be in a group "VPN Users". Requires the samba-winbind package
# require-mschap-v2
# plugin winbind.so
# ntlm_auth-helper '/usr/bin/ntlm_auth --helper-protocol=ntlm-server-1 --require-membership-of="EXAMPLE\\VPN Users"' 
# You need to join the domain on the server, for example using samba:
# http://rootmanager.com/ubuntu-ipsec-l2tp-windows-domain-auth/setting-up-openswan-xl2tpd-with-native-windows-clients-lucid.html
```

### 2、编辑 chap-secrets 文件设置 VPN 连接用户名及密码

`vim /etc/ppp/chap-secrets`

内容如下：

`yansongda * 123456 *`

以上含义为：
- vpn 账号：yansongda
- vpn 类型：所有类型（包含 pptp l2tp）
- vpn 密码：123456

可连接此 vpn 账号的 IP 地址：* （所有IP）

## 六、配置内核转发

### 1、编辑 sysctl.conf 文件

`vim /etc/sysctl.conf`

### 2、修改里面的内容为：

`net.ipv4.ip_forward=1`

### 3、生效

`sysctl -p`

## 七、配置防火墙

```shell
firewall-cmd --add-service=ipsec --permanent
firewall-cmd --add-port=4500/udp --permanent
firewall-cmd --add-port=1701/udp --permanent
firewall-cmd --add-masquerade --permanent
firewall-cmd --reload
```

## 八、启动所有服务

`systemctl restart firewalld ipsec xl2tpd`

### 九、在客户端使用账号密码连接 VPN 服务

至此，基于 xl2tpd 的 VPN 服务搭建完毕。请享受科学上网带来的乐趣吧。
