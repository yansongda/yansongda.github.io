---
title: 可能是我用过的最优雅的 Alipay 和 WeChat 的 laravel 支付扩展包了
description: 可能是我用过的最优雅的 Alipay 和 WeChat 的 laravel 支付扩展包了
date: 2017-12-30
categories:
  - alipay
  - wechat
  - php
  - laravel
---

该文档为 v2.x 版本，如果您想找 v1.x 版本文档，请点击[https://github.com/yansongda/laravel-pay/tree/v1.0.3](https://github.com/yansongda/laravel-pay/tree/v1.0.3)

## 运行环境

- php >= 7.0
- composer
- laravel || lumen >= 5.1

## 安装

```shell
$ composer require yansongda/laravel-pay
```

### 添加 service provider（optional. if laravel < 5.5 || lumen）

```php
// laravel < 5.5
Yansongda\LaravelPay\PayServiceProvider::class,

// lumen
$app->register(Yansongda\LaravelPay\PayServiceProvider::class);
```

### 添加 alias（optional. if laravel < 5.5）

```php
'Pay' => Yansongda\LaravelPay\Facades\Pay::class,
```

### 配置文件

```shell
$ php artisan vendor:publish --provider="Yansongda\\LaravelPay\\PayServiceProvider" --tag=laravel-pay
```

**lumen 用户请手动复制**

随后，请在 `config` 文件夹中完善配置信息。 

## 使用方法

### 支付宝
```php
use Pay;

$order = [
    'out_trade_no' => time(),
    'total_amount' => '1',
    'subject' => 'test subject - 测试',
];

return Pay::alipay()->web($order);

// 下面这个方法也可以
// return Pay::web($order);
```

### 微信
```php
use Pay;

$order = [
    'out_trade_no' => time(),
    'body' => 'subject-测试',
    'total_fee'      => '1',
    'openid' => 'onkVf1FjWS5SBIixxxxxxxxx',
];

$result = Pay::wechat()->mp($order);

```

具体使用说明请传送至 [https://github.com/yansongda/pay](https://github.com/yansongda/pay)

## License

MIT