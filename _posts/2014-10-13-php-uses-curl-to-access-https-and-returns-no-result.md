---
layout: post
title: php 使用 curl 访问 https 返回无结果的问题
categories: [php, holes]
description: php使用curl访问https返回无结果的问题
keywords: php, curl
---

最近在开发一套自己的微信公众平台SDK ，目的就是为了让自己以后管理更方便。

但在创建菜单时却遇到了问题——使用curl返回无结果！以前的代码如下：

```php
$jsonmenu = urldecode(json_encode($menu));
$url = "https://api.weixin.qq.com/cgi-bin/menu/create?access_token=".$this->getToken();

$ch = curl_init();
curl_setopt($ch,CURLOPT_URL,$url);
curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
curl_setopt($ch,CURLOPT_POST,1);
curl_setopt($ch,CURLOPT_POSTFIELDS,$jsonmenu);
$resultj = curl_exec($ch);

curl_close($ch);
```

想来想去，感觉没有什么错的，于是网上查找问题，结果网上也很少有这方面的解答。最后还是回归到了PHP的开发手册。在手册上发现了这样一句话：

![php 开发手册 curl 部分](/images/posts/2014-10-13-curl.jpg)

在想是不是这个的原因呢？因为毕竟上面写了SSL认证是开启的。于是，更改之后代码变成了：

```php
$jsonmenu = urldecode(json_encode($menu));
$url = "https://api.weixin.qq.com/cgi-bin/menu/create?access_token=".$this->getToken();

$ch = curl_init();
curl_setopt($ch,CURLOPT_URL,$url);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); //不验证证书
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false); //不验证证书
curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
curl_setopt($ch,CURLOPT_POST,1);
curl_setopt($ch,CURLOPT_POSTFIELDS,$jsonmenu);
$resultj = curl_exec($ch);
```

随后，echo 出 $resultj，成功返回数据。

问题解决！

如果有遇到相同问题的朋友们，希望能帮到你们！
