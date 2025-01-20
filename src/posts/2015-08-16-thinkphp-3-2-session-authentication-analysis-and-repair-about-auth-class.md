---
title: thinkphp3.2 中AUTH类关于session前缀、登录验证、认证配置项问题的分析与修复
description: thinkphp3.2 中AUTH类关于session前缀、登录验证、认证配置项问题的分析与修复
date: 2015-08-16
categories: [thinkphp, php]
---

最近在开发一套商城系统，开发到后台时，需要用到权限控制相关操作，于是就使用了 thinkphp 中的 Auth 类，使用过程中发现一些问题，在此记录下来，给其他遇到相同问题的童鞋给予一定的参考。

## 问题一：使用与默认类不同的数据表出现提示数据表不存在的问题

在开发过程中，大家一定会遇到自己使用的数据表和类中提供的默认的数据表表名不相同的情况。然后，大家会在 config.php 中设定自己的 AUTH 参数。像这样：

```php
/* auth认证 */
'AUTH_CONFIG' => array(
    'AUTH_GROUP'  => 'admin_group',        // 用户组与权限表
    'AUTH_GROUP_ACCESS' => 'admin_group_access', // 用户-用户组关系表
    'AUTH_RULE' => 'admin_rule',         // 权限规则表
    'AUTH_USER' => 'admin',             // 用户信息表
    'AUTH_TYPE' => 2, 
),
```

在 config.php 中 code 上相关代码后，却又发现系统给予提示，说数据表不存在。像这样：

![数据表不存在](/images/posts/2015-08-16-thinkphp-01.jpg)

其实，得到这个错误提示，经过分析应该就知道，这是因为没有带上数据表前缀的原因。然后查看AUTH的源码，证实了这个猜测。

```php
public function __construct() {
    $prefix = C('DB_PREFIX');
    $this->_config['AUTH_GROUP'] = $prefix.$this->_config['AUTH_GROUP'];
    $this->_config['AUTH_RULE'] = $prefix.$this->_config['AUTH_RULE'];
    $this->_config['AUTH_USER'] = $prefix.$this->_config['AUTH_USER'];
    $this->_config['AUTH_GROUP_ACCESS'] = $prefix.$this->_config['AUTH_GROUP_ACCESS'];
    if (C('AUTH_CONFIG')) {
        //可设置配置项 AUTH_CONFIG, 此配置项为数组。
        $this->_config = array_merge($this->_config, C('AUTH_CONFIG'));
    }
}
```

由源码我们可以知道，当我们再 CONFIG.PHP 中设置 AUTH 参数时，AUTH 类直接将 config 中的参数合并了，而我们 config 参数中又没有加上数据前缀，所以导致了这个错误。

### 解决办法：

1. 在 config 中的 AUTH 参数内加上数据表前缀；

2. 对于我这种患有代码强迫症的人来说，第一种方案并不满足我，于是更改 AUTH 类源码：

```php
public function __construct() {
    $prefix = C('DB_PREFIX');
    if (C('AUTH_CONFIG')) {
        //可设置配置项 AUTH_CONFIG, 此配置项为数组。
        $this->_config = array_merge($this->_config, C('AUTH_CONFIG'));
    }
    $this->_config['AUTH_GROUP'] = $prefix.$this->_config['AUTH_GROUP'];
    $this->_config['AUTH_RULE'] = $prefix.$this->_config['AUTH_RULE'];
    $this->_config['AUTH_USER'] = $prefix.$this->_config['AUTH_USER'];
    $this->_config['AUTH_GROUP_ACCESS'] = $prefix.$this->_config['AUTH_GROUP_ACCESS'];
}
```

   更改后，首先判断是否有AUTH参数，然后在将数据表前缀加上。这样可以自动加上数据表了。


## 问题二：session前缀对AUTH认证产生影响的问题

当我们开发包含独立的前后台功能的系统时，为了不影响前后台的用户登录，常常会将前后台的 session 设置不同的前缀，这样可以避免前后台登录交叉的情况。所以，再后台 config 中我们常常这样写：

```php
/* 后台cookie与session前缀，避免和前台冲突 */
'COOKIE_PREFIX' => 'admin',
'SESSION_PREFIX' =>  'admin',
```

但是当运行程序后，我们会发现我们的AUTH类并没有正常工作，而我们把session的prefix注释掉以后，又会发现AUTH正常了起来。于是从AUTH类原代码中找答案，果然，我发现问题就出现在源代码中的session部分：

`$_SESSION['_AUTH_LIST_'.$uid.$t];`

我们知道直接通过超全局变量操作session是不会自动加上设定的session前缀的。

### 所以这里我们有两种解决办法：

1. 在类中通过超全局变量操作session，并加上SESSION_PREFIX。

   `$_SESSION[C('SESSION_PREFIX')]['_AUTH_LIST_'.$uid.$t];`

   但我们知道这种方案显然不是最优方案。因为我们知道 TP 中有单独的操作 session 的函数。

2. 使用TP内置的session()函数

   `session('_AUTH_LIST_'.$uid.$t);`

   将 AUTH 类中所有的超全局变量 $_SESSION 更改为 session() 函数处理。


## 问题三：超级管理员权限设定问题

我们知道，超级管理员一定拥有系统中的所有权限。所以，一般为了方便，我们再数据库中往往把超级管理员的权限设定为 “all”，这样可以避免将所有管理权限都写上去的麻烦。

但是，TP 中的 AUTH 类的权限判断方法却没有关于超级管理员 “all” 权限的方案。只有将所有的权限名称在超级管理员组的权限列表上一一列出。这样，如果我们每增加一个权限，就要重新再数据库中为超级管理员增加一个相应的权限。这样很显然是非常麻烦的。

### 解决办法：

更改AUTH类。

首先，在 getAuthList 函数中，186 行左右增加如下代码：

```php
if ($ids[0] == 'all') {   //对超级管理员权限认定的补充
    session('_AUTH_LIST_'.$uid.$t, 'all');
    return 'all';
}
```

然后，在 check 函数中，105 行左右增加如下代码：

```php
if ($authList == 'all') { //对超级管理员权限补充
    return true;
}
```

这样，只需要在数据库中超级管理员组下权限写上‘all’就可以认定所有权限了。

完整代码已经提交至git：[https://gitee.com/yansongda/codes/dem7yr2jczxbslgfh638n](https://gitee.com/yansongda/codes/dem7yr2jczxbslgfh638n)