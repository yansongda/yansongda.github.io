---
title: 基于 access_token 的多用户多应用 API 认证 laravel 开发包
description: 基于 access_token 的多用户多应用 API 认证 laravel 开发包
date: 2018-04-07
categories:
  - php
  - laravel
---


当看到 Laravel-API 时，您可能在想：「不是有官方的 Passport 吗，干嘛又重复造轮子？」是的，对于中大型，且需要有 `OAuth` 授权的应用来说， Passport 的确是一个很好的选择。

**但是，对于我们经常开发的中小型应用呢？我们大部分时候可能只是需要提供一个对外服务的 API 接口而已，像是类似于微信开发、支付宝开发那样，给一组 APPID/appsecret 就开始提供纯粹的 API 服务，所以像 Passport 这样的重量级选手，可能就不是更好的选择了。**

您可能又会说：「我可以使用 Passport 的 密码授权令牌 啊！」是的，您可以使用，但是，看到 `client_id`/`client_secret`/`username`/`password` 您作何感想？

您可能又又会说：「我可以使用 Passport 的 `客户端凭据授权令牌`啊！」是的，您也可以使用，但是：

- `client_id` 是有序整数
- 还需要通过额外的 `$request` 信息，再去重新相关获取授权信息
- ...

这些您能忍？

反正我是不能忍，所以，弄了这个轮子。

Github: [https://github.com/yansongda/laravel-api](https://github.com/yansongda/laravel-api)

## 运行环境

- php >= 5.6
- composer
- laravel >= 5.1

## 特点

- 简答、易懂、快速
- 专门为 laravel 打造
- 使用自带的认证驱动模式
- 多用户多应用 access_token 模式（类似支付宝/微信公众平台认证模式）

## 安装

```shell
$ composer require yansongda/laravel-api
```

### 添加 ServiceProvider（optional. if laravel < 5.5）

```php
// laravel < 5.5
Yansongda\LaravelApi\ApiServiceProvider::class,
```


## 使用方法

1. 更改认证驱动

    在 config/auth.php 中，更改 `guards.api.driver` 为 **api**

2. 在 UserModel 中添加 trait
    
    在 `config(auth.provider.xx.model)` 的类中，添加 `use Yansongda\LaravelApi\Models\Traits\HasApiApps`

3. 运行数据迁移

    `php artian migrate`

4. 开始使用吧


### 添加 App 与 accessToken

```php
use Yansongda\LaravelApi\Api;

$app = Api::createApp(User::find(1), '备注可选');

$access_token = Api::generateAccessToken($app);
```

### 客户端使用

#### 获取 access_token

```shell
curl --data "app_id=f748864cb16db706be1e408cb49771a3&app_secret=ce57ec31a9f4f37dfbf810c2e4ea79f0" "http://api.dev/api/token"
# {"code":0,"message":"success","data":{"user_id":1,"app_id":"f748864cb16db706be1e408cb49771a3","access_token":"3857d7d56f4ffe1ab57b8a8f292b85fa","expired_in":7200}}
```

#### 使用

有两种方式可以使用

- url 带上 `access_token` 参数进行认证.
    
    例如： `https://api.dev/?access_token=3857d7d56f4ffe1ab57b8a8f292b85fa`

- header 上进行认证

    例如：`Authorization: Bearer 3857d7d56f4ffe1ab57b8a8f292b85fa`


### 服务端认证

只需要在增加 `'auth:api'` 的 middleware 即可，增加后，`$request->user()/$request->user` 即为认证用户，`$request->app` 即为认证的 app_id

```php
use Illuminate\Http\Request;

Route::middleware('auth:api')->get('user', function(Request $request) {
    dd($request->user());
    // $request->user 获取 user_id
});
Route::middleware('auth:api')->get('app', function(Request $request) {
    dd($request->app); // 获取 app_id
});
```


## 其它

### access_token 有效时间

access_token 有效时间默认为 `7200` 秒，当然，您可以自由设置该值：

```php
// 在 AppServiceProvider 的 register 方法中增加

use Yansongda\LaravelApi\Api;

Api::$ttl = 7200;
// Api::setTtl(7200);
```

### 授权 token 路由

默认情况下，token 的授权通过自带的 `'api/token'` 路由进行 `post` 授权的，如果您想重写 token 的授权方式，您需要首先：

```php
// 在 AppServiceProvider 的 register 方法中增加

use Yansongda\LaravelApi\Api;

Api::$enableRoute = false;
// Api::enableRoute(false);
```

### 授权 token 路由前缀

默认情况下，自带的路由前缀为 `api`，如果您想更换为其它，请：

```php
// 在 AppServiceProvider 的 register 方法中增加

use Yansongda\LaravelApi\Api;

Api::$routePrefix = 'api';
// Api::setRoutePrefix(’api‘);
```

### 授权 token 路由其它

- 命名为: api.token
- middleware: api

## 异常

- AccessTokenNotProvidedException
    
    当客户端没有提供 access_token 时，抛出 `AccessTokenNotProvidedException` 异常，如果不进行任何额外的操作，默认将返回 `{"code":1,"message":"AccessToken Is Not Provided"}`

- InvalidAccessTokenException
    
    当客户端提供了无效的 access_token 时，抛出 `InvalidAccessTokenException` 异常，如果不进行任何额外的操作，默认将返回 `{"code":2,"message":"AccessToken Is Invalid"}`

- AccessTokenExpiredException

    当客户端提供的 access_token 已过期时，抛出 `AccessTokenExpiredException` 异常，如果不进行任何额外的操作，默认将返回 `{"code":3,"message":"AccessToken Is Expired"}`

- GenerateAccessTokenException

    当服务端生成 access_token 失败时，抛出 `GenerateAccessTokenException` 异常，如果不进行任何额外的操作，默认将返回 `{"code":4,"message":"xxxx"}`

- InvalidAppException

    当客户端提供了错误的 app_id 或 app_secret 时，抛出 `InvalidAppException` 异常，如果不进行任何额外的操作，默认将返回 `{"code":5,"message":"Invalid App Info"}`

- CreateAppException

    当服务端生成 app 失败时，抛出 `CreateAppException` 异常，如果不进行任何额外的操作，默认将返回 `{"code":6,"message":"xxxx"}`


_以上异常如果不想使用默认的信息，均可自行捕获更改相关信息_

## License

MIT
