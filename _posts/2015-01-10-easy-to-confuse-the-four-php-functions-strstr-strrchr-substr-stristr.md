---
layout: post
title: 容易混淆的四个php函数 strstr strrchr substr stristr
categories: [php, wiki, Thinking]
description: 容易混淆的四个php函数 strstr strrchr substr stristr
keywords: strstr, strrchr, substr, stristr
---

`strstr`,`strrchr`,`substr`,`stristr` 这四个字符串操作函数特别让人容易混淆，我经常用的是`substr`,`strstr`，基本上能满足我对字符串的操作。

下面举一些例子，做个笔记，以后不要弄混了。

## strstr 和 strcchr 的区别

`strstr` 显示第一次找到的要查找的字符串，以及后面的字符串。

`strrchr` 显示最后一次找到的要查找的字符串，以及后面的字符串。

```php

$email = 'yansongda@yanda.net.cn@test.com';
 
$domain = strstr($email, '@');
echo "strstr 测试结果 $domain"; // @yanda.net.cn@test.com
 
$domain = strrchr($email, '@');
echo "strrchr 测试结果 $domain"; // @test.com

```

## strstr 和 stristr 的区别

`strstr` 是大小写敏感的。

`stristr` 是大小写不敏感的。

```php

$email = 'yansongDa@yanda.net.cn';
 
$domain = strstr($email, 'd');
echo "strstr 测试结果 $domain"; // da.net.cn
 
$domain = stristr($email, 'd');
echo "stristr 测试结果 $domain"; // Da@yanda.net.cn
```


## strstr 和 substr 的区别

`strstr` 是匹配后截取。

`substr` 是不匹配，根据起始位置，进行截取。

```php
$email = 'yansongDa@yanda.net.cn';
 
$domain = strstr($email, 'd');
echo "strstr 测试结果 $domain"; // da.net.cn
 
$domain = substr($email,-7);
echo "substr 测试结果 $domain";// .net.cn
```


**把这个几个字符串截取函数搞明白了，在开发时可以省不少事。**

---
摘自：互联网
