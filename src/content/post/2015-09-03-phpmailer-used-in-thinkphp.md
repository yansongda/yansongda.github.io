---
layout: ../../layouts/post.astro
title: 最新 phpmailer 的使用与和 thinkphp 的整合
description: 最新 phpmailer 的使用与和 thinkphp 的整合
date: 2015-09-03
categories: [thinkphp, php]
---

## 一、说明

- 基于最新版phpmailer，现在版本为：5.2.10。最新版本请云传送至：http://sourceforge.net/projects/phpmailer/

- 最近开发项目管理系统时，研究而来。

- 写这篇博客的原因是因为发现网上关于phpmailer的文档要么很老，要么不能使用，要么copy，要么不精简。


## 二、单独使用

### 1、安装

首先去上面网址下载phpmailer，下载完成后，解压，拷贝class.phpmailer.php 和 class.smtp.php 两个文件出来。

### 2、整合

将两个文件放入网站根目录下，并新建一个php文件，其代码如下：

```php
<?php

header("Content-type: text/html;charset=utf-8");

require 'class.phpmailer.php';
require 'class.smtp.php';

$body = "<b>哈哈哈哈测试发送成功a </b>";
 
$mail = new PHPMailer();

$mail->Charset = 'utf-8';
$mail->isSMTP(); //开启smtp
$mail->Host = 'smtp.exmail.qq.com'; //设置smtp地址
$mail->Port = '465'; //设置smtp端口
$mail->SMTPSecure = 'ssl'; //加密
$mail->SMTPAuth = true;  //smtp认证开启
$mail->Username = 'system@yanda.net.cn';  //发送者邮件地址
$mail->Password = '123456798'; //密码
$mail->isHTML(); //邮件正文使用html
$mail->addAddress('admin@yanda.net.cn'); //添加接受者
$mail->addAttachment('D:\myweb\www\resume.html', '简历.zip'); //如果没有附件需求，删除该行即可
$mail->setFrom('system@yanda.net.cn');  //设置发送者，一般和username相同
$mail->Subject = '测试phpmailer发邮件';  //邮件主题
$mail->Body = $body; //邮件正文

if(!$mail->Send()) {
    echo "Mailer Error: " . $mail->ErrorInfo;
} else {
    echo "Message has been sent";
}
```

以上代码是最精简的 phpmailer 使用代码。每行代码已经在后面进行了相应的注释，同学们可以直接进行查看其作用。如果还是不知道的话，可以直接留言。

### 3、本地测试如下

发送成功

![](/images/posts/2015-09-03-phpmailer-used-in-thinkphp-01.jpg)

## 三、与thinkphp的整合

我们知道thinkphp3.2.3版本是带有命名空间的，所以，与TP的整合如下：

1. 为了命名统一规范，我们先将class.phpmailer.php 和 class.smtp.php重命名为PHPMailer.class.php 和 SMPT.class.php。

2. 将这两个文件放入 Application\Common\Lib\Mail 中。

同时在phpmailer.class.php的最上方增加以下代码：

```php

namespace Common\Lib\Mail;

use Common\Lib\Mail\SMTP;
use \Exception;
```

文件看起来像这样：

```php
<?php

namespace Common\Lib\Mail;

use Common\Lib\Mail\SMTP;
use \Exception;
 
……
```

再在 SMPT.class.php 文件的上方加入下面的代码

```php

namespace Common\Lib\Mail;

use \Exception;

```

以上代码的作用是定义文件类的命名空间。加入

`use \Exception;`

是因为两个类中均使用了 php 的自带的 Exception。网上有些代码不能使用的原因就是因为这个。

3. 以上两个文件处理完成之后，我们重新在Mail目录下新建一个文件 mail.class.php 整合整个 phpmailer 类，使其当做 mail 入口类：

```php
<?php

namespace Common\Lib\Mail; 

use Common\Lib\Mail\PHPMailer;

class mail { 

    public function send($to, $subject, $body) {
        $mail = new PHPMailer();

        $mail->isSMTP();
        $mail->Host = C('MAIL_HOST');
        $mail->Port = C('MAIL_PORT');
        $mail->SMTPSecure = 'ssl';
        $mail->SMTPAuth = true;
        $mail->Username = C('MAIL_USERNAME');
        $mail->Password = C('MAIL_PASSWORD');
            $mail->isHTML();
        $mail->addAddress($to);
        $mail->setFrom(C('MAIL_USERNAME'), 'noreply');
        $mail->Subject = $subject;
        $mail->Body = $body;

        if(!$mail->Send()) {
            return array('code'=>0,'msg'=>$mail->ErrorInfo);
        } else {
            return array('code'=>1);
        }
    }
}
```

其中的C函数我想大家不会陌生吧，所以在此就不多说啦。

4. 使用

接下来，我们就可以直接在 Controller 中使用了：

```php
<?php 

namespace Home\Controller;

use Think\Controller;
use Common\Lib\Mail\mail;
 
class ReminderController extends Controller
{
    public function mail(){
        $mail = new mail();
        $body = '<h1>提醒日程</h1>';
        $m = $mail->send('admin@yanda.net.cn', '今日日程', $body);
        if ( $m['code'] == 1 ) {
            echo "success";
        } else {
            echo $m['msg'];
        }
    }
}
```

当然，我们也可以在function.php中写成一个全局函数，具体的实现方法大家可以自己实现哦。当然，如果有什么不明白的还是可以留言的。