---
layout: post
title: template page
categories: [cate1, cate2]
description: some word here
keywords: keyword1, keyword2
---

与大多数流行的 Web 服务如 twitter 通过开放 API 来提供数据一样，它总是能够知道如何解析 API 数据的各种传送格式，包括 JSON，XML 等等。

PHP解析JSON数据

```php
$json_string = '{"id":1,"name":"foo","email":"foo@foobar.com","interest":["wordpress","php"]} ';

$obj=json_decode($json_string);

echo $obj->name; //prints foo
echo $obj->interest[1]; //prints php
```

PHP解析XML 数据

```php
$xml_string = "<?xml?version='1.0'?><users><user id='398'><name>Foo</name><email>foo@bar.com</name></user><user id='867'><name>Foobar</name><email>foobar@foo.com</name></user></users>";

//load the xml string using simplexml
$xml = simplexml_load_string($xml_string);
 
//loop through the each node of user
foreach ($xml->users as $user)
{
    //access attribute
    echo $user['id'];

    //subnodes are accessed by -> operator
    echo $user->name;
    echo $user->email;
}
```

