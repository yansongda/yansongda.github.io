---
title: Ubuntu 常用命令大全
description: Ubuntu常用命令大全
date: 2013-12-20
categories:
  - wiki
  - linux
  - ubuntu
---

最近搞了一台VPS，用起来很爽啊。受益匪浅！

## 软件

查看软件xxx安装内容

`dpkg -L xxx`

查找软件

`apt-cache search 正则表达式`

查找文件属于哪个包

`dpkg -S filename apt-file search filename`

查询软件xxx依赖哪些包

`apt-cache depends xxx`

查询软件xxx被哪些包依赖

`apt-cache rdepends xxx`

增加一个光盘源

`sudo apt-cdrom add`

系统升级

`sudo apt-get update`
`sudo apt-get upgrade`
`sudo apt-get dist-upgrade`

清除所以删除包的残余配置文件

`dpkg -l |grep ^rc|awk ‘{print $2}’ |tr [””n”] [” “]|sudo xargs dpkg -P –`

编译时缺少h文件的自动处理

`sudo auto-apt run ./configure`

查看安装软件时下载包的临时存放目录

`ls /var/cache/apt/archives`

备份当前系统安装的所有包的列表

`dpkg –get-selections | grep -v deinstall > ~/somefile`

从上面备份的安装包的列表文件恢复所有包

`dpkg –set-selections < ~/somefile sudo dselect`

清理旧版本的软件缓存

`sudo apt-get autoclean`

清理所有软件缓存

`sudo apt-get clean`

删除系统不再使用的孤立软件

`sudo apt-get autoremove`

查看包在服务器上面的地址

`apt-get -qq –print-uris install ssh | cut -d”’ -f2`


## 系统

查看内核

`uname -a`

查看Ubuntu版本

`cat /etc/issue`

查看内核加载的模块

`lsmod`

查看PCI设备

`lspci`

查看USB设备

`lsusb`

查看网卡状态

`sudo ethtool eth0`

查看CPU信息

`cat /proc/cpuinfo`

显示当前硬件信息

`lshw`


## 硬盘

查看硬盘的分区

`sudo fdisk -l`

查看IDE硬盘信息

`sudo hdparm -i /dev/hda`

查看STAT硬盘信息

`sudo hdparm -I /dev/sda`

`sudo apt-get install blktool`
`sudo blktool /dev/sda id`

查看硬盘剩余空间

`df -h`
`df -H`

查看目录占用空间

`du -hs 目录名`

优盘没法卸载

`sync fuser -km /media/usbdisk`


## 内存

查看当前的内存使用情况

`free -m`


## 进程

查看当前有哪些进程

`ps -A`

中止一个进程

`kill 进程号(就是ps -A中的第一列的数字) `

`killall 进程名`

强制中止一个进程(在上面进程中止不成功的时候使用)

`kill -9 进程号`
`killall -9 进程名`

查看当前进程的实时状况

`top`

查看进程打开的文件

`lsof -p`

ADSL 配置 ADSL

`sudo pppoeconf`

ADSL手工拨号

`sudo pon dsl-provider`

激活 ADSL

`sudo /etc/ppp/pppoe_on_boot`

断开 ADSL

`sudo poff`

查看拨号日志

`sudo plog`


## 网络

根据IP查网卡地址

`arping IP地址`

查看当前IP地址

`ifconfig eth0 |awk '/inet/ {split($2,x,":");print x[2]}'`

查看当前监听80端口的程序

`lsof -i :80`

查看当前网卡的物理地址

`arp -a | awk '{print $4}' ifconfig eth0 | head -1 | awk '{print $5}'`

立即让网络支持nat

`sudo echo 1 > /proc/sys/net/ipv4/ip_forward`
`sudo iptables -t nat -I POSTROUTING -j MASQUERADE`

查看路由信息

`netstat -rn sudo route -n`

手工增加删除一条路由

`sudo route add -net 192.168.0.0 netmask 255.255.255.0 gw 172.16.0.1`
`sudo route del -net 192.168.0.0 netmask 255.255.255.0 gw 172.16.0.1`

修改网卡MAC地址的方法

`sudo ifconfig eth0 down #关闭网卡`
`sudo ifconfig eth0 hw ether 00:AA:BB:CC:DD:EE #然后改地址`
`sudo ifconfig eth0 up #然后启动网卡`

统计当前IP连接的个数

`netstat -na|grep ESTABLISHED|awk '{print $5}'|awk -F: '{print $1}'|sort|uniq -c|sort -r -n`

`netstat -na|grep SYN|awk '{print $5}'|awk -F: '{print $1}'|sort|uniq -c|sort -r -n`


## 服务

添加一个服务

`sudo update-rc.d 服务名 defaults 99`

删除一个服务

`sudo update-rc.d 服务名 remove`

临时重启一个服务

`/etc/init.d/服务名 restart`

临时关闭一个服务

`/etc/init.d/服务名 stop`

临时启动一个服务

`/etc/init.d/服务名 start`


## 设置

配置默认Java使用哪个

`sudo update-alternatives –config java`

修改用户资料

`sudo chfn userid`

给apt设置代理

`export http_proxy=http://xx.xx.xx.xx:xxx`

修改系统登录信息

`sudo vim /etc/motd`


## 中文

转换文件名由GBK为UTF8

`sudo apt-get install convmv convmv -r -f cp936 -t utf8 –notest –nosmart *`

批量转换src目录下的所有文件内容由GBK到UTF8

`find src -type d -exec mkdir -p utf8/{} “; find src -type f -exec iconv -f GBK -t UTF-8 {} -o utf8/{} “; mv utf8/* src rm -fr utf8`

转换文件内容由GBK到UTF8

`iconv -f gbk -t utf8 $i > newfile`


控制台下显示中文

`sudo apt-get install zhcon 使用时，输入zhcon即可`


## 文件

快速查找某个文件

`whereis filename`
`find 目录 -name 文件名`

查看文件类型

`file filename`

显示xxx文件倒数6行的内容

`tail -n 6 xxx`

让tail不停地读地最新的内容

`tail -n 10 -f /var/log/apache2/access.log`

查看文件中间的第五行（含）到第10行（含）的内容

`sed -n '5,10p' /var/log/apache2/access.log`

查找包含xxx字符串的文件

`grep -l -r xxx .`

查找关于xxx的命令

`apropos xxx man -k xxx`

将本地文件拷贝到服务器上

`scp -rp /path/filenameusername@remoteIP:/path`

将远程文件从服务器下载到本地

`scp -rp username@remoteIP:/path/filename/path`

查看某个文件被哪些应用程序读写

`lsof 文件名`

把所有文件的后辍由rm改为rmvb

`rename 's/.rm$/.rmvb/' *`

把所有文件名中的大写改为小写

`rename 'tr/A-Z/a-z/' *`

统计当前文件个数

`ls /usr/bin|wc -w`

统计当前目录个数

`ls -l /usr/bin|grep ^d|wc -l`

显示当前目录下2006-01-01的文件名

`ls -l |grep 2006-01-01 |awk `{print $8}``


## 压缩与解压缩

解压缩 xxx.tar.gz

`tar -zxvf xxx.tar.gz`

解压缩 xxx.tar.bz2

`tar -jxvf xxx.tar.bz2`

压缩aaa bbb目录为xxx.tar.gz

`tar -zcvf xxx.tar.gz aaa bbb`

压缩aaa bbb目录为xxx.tar.bz2

`tar -jcvf xxx.tar.bz2 aaa bbb`

解压缩 RAR 文件

```shell
sudo apt-get install rar unrar
sudo ln -f /usr/bin/rar /usr/bin/unrar
unrar x aaaa.rar
```

解压缩 ZIP 文件

```shell
sudo apt-get install zip unzip
sudo ln -f /usr/bin/zip /usr/bin/unzip
unzip x aaaa.zip
```


## 日期和时间

设置日期

`date -s mm/dd/yy`

设置时间

`date -s HH:MM`

将时间写入CMOS

`hwclock –systohc`

读取CMOS时间

`hwclock –hctosys`

从服务器上同步时间

`sudo ntpdate time.nist.gov`

`sudo ntpdate time.windows.com`


## 数据库

mysql的数据库存放在地方

`/var/lib/mysql`

从mysql中导出和导入数据

`mysqldump 数据库名 > 文件名 #导出数据库`

```shell
mysqladmin create 数据库名 #建立数据库
mysql 数据库名 < 文件名 #导入数据库
```