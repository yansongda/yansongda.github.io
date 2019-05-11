---
layout: wiki
title: Nginx 请求处理流程
categories: [cate1, cate2]
description: Nginx 请求处理流程
keywords: wiki, nginx
---

## Nginx 11 个处理阶段

### 1、NGX_HTTP_POST_READ_PHASE

接收到完整的HTTP头部后处理的阶段，它位于uri重写之前，实际上很少有模块会注册在该阶段，默认的情况下，该阶段被跳过。

### 2、NGX_HTTP_SERVER_REWRITE_PHASE

URI与location匹配前，修改URI的阶段，用于重定向，也就是该阶段执行处于server块内，location块外的重写指令，在读取请求头的过程中nginx会根据host及端口找到对应的虚拟主机配置。

### 3、NGX_HTTP_FIND_CONFIG_PHASE

根据URI寻找匹配的location块配置项阶段，该阶段使用重写之后的uri来查找对应的location，值得注意的是该阶段可能会被执行多次，因为也可能有location级别的重写指令。

### 4、NGX_HTTP_REWRITE_PHASE

上一阶段找到location块后再修改URI，location级别的uri重写阶段，该阶段执行location基本的重写指令，也可能会被执行多次。

### 5、NGX_HTTP_POST_REWRITE_PHASE

防止重写URL后导致的死循环，location级别重写的后一阶段，用来检查上阶段是否有uri重写，并根据结果跳转到合适的阶段。

### 6、NGX_HTTP_PREACCESS_PHASE

下一阶段之前的准备，访问权限控制的前一阶段，该阶段在权限控制阶段之前，一般也用于访问控制，比如限制访问频率，链接数等。

### 7、NGX_HTTP_ACCESS_PHASE

让HTTP模块判断是否允许这个请求进入Nginx服务器，访问权限控制阶段，比如基于ip黑白名单的权限控制，基于用户名密码的权限控制等。

### 8、NGX_HTTP_POST_ACCESS_PHASE

访问权限控制的后一阶段，该阶段根据权限控制阶段的执行结果进行相应处理，向用户发送拒绝服务的错误码，用来响应上一阶段的拒绝。

### 9、NGX_HTTP_TRY_FILES_PHASE

为访问静态文件资源而设置，try_files指令的处理阶段，如果没有配置try_files指令，则该阶段被跳过。

### 10、NGX_HTTP_CONTENT_PHASE

处理HTTP请求内容的阶段，大部分HTTP模块介入这个阶段，内容生成阶段，该阶段产生响应，并发送到客户端。

### 11、NGX_HTTP_LOG_PHASE

处理完请求后的日志记录阶段，该阶段记录访问日志。


以上 11 个阶段中，HTTP无法介入的阶段有 4 个：

- 3、NGX_HTTP_FIND_CONFIG_PHASE

- 5、NGX_HTTP_POST_REWRITE_PHASE

- 8、NGX_HTTP_POST_ACCESS_PHASE

- 9、NGX_HTTP_TRY_FILES_PHASE

剩余的7个阶段，HTTP模块均能介入，每个阶段可介入模块的个数也是没有限制的，多个HTTP模块可同时介入同一阶段并作用于同一请求。


## Nginx lua 处理阶段

### 1、init_by_lua

在nginx重新加载配置文件时，运行里面lua脚本，常用于全局变量的申请。（例如：lua_shared_dict共享内存的申请，只有当nginx重起后，共享内存数据才清空，这常用于统计。）

### 2、set_by_lua

流程分支处理判断变量初始化（设置一个变量，常用与计算一个逻辑，然后返回结果，该阶段不能运行Output API、Control API、Subrequest API、Cosocket API）

### 3、rewrite_by_lua

转发、重定向、缓存等功能 (例如特定请求代理到外网，在access阶段前运行，主要用于rewrite)

### 4、access_by_lua

IP准入、接口权限等情况集中处理(例如配合iptable完成简单防火墙，主要用于访问控制，能收集到大部分变量，类似status需要在log阶段才有。这条指令运行于nginx access阶段的末尾，因此总是在 allow 和 deny 这样的指令之后运行，虽然它们同属 access 阶段。）

### 5、content_by_lua

内容生成，阶段是所有请求处理阶段中最为重要的一个，运行在这个阶段的配置指令一般都肩负着生成内容（content）并输出HTTP响应。

### 6、header_filter_by_lua

应答HTTP过滤处理，一般只用于设置Cookie和Headers等，该阶段不能运行Output API、Control API、Subrequest API、Cosocket API(例如添加头部信息)。

### 7、body_filter_by_lua

应答BODY过滤处理(例如完成应答内容统一成大写)（一般会在一次请求中被调用多次, 因为这是实现基于 HTTP 1.1 chunked 编码的所谓“流式输出”的，该阶段不能运行Output API、Control API、Subrequest API、Cosocket API）

### 8、log_by_lua

会话完成后本地异步完成日志记录(日志可以记录在本地，还可以同步到其他机器)（该阶段总是运行在请求结束的时候，用于请求的后续操作，如在共享内存中进行统计数据,如果要高精确的数据统计，应该使用body_filter_by_lua，该阶段不能运行Output API、Control API、Subrequest API、Cosocket API）


##  lua 与 Nginx 运行阶段对应

### 1、init_by_lua

运行在 initialization Phase；

### 2、set_by_lua

运行在rewrite 阶段；

set 指令来自 ngx_rewrite 模块，运行于 rewrite 阶段；

### 3、rewrite_by_lua

指令来自 ngx_lua 模块，运行于 rewrite 阶段的末尾

### 4、access_by_lua

指令同样来自 ngx_lua 模块，运行于 access 阶段的末尾；

deny 指令来自 ngx_access 模块，运行于 access 阶段；

### 5、content_by_lua

指令来自 ngx_lua 模块，运行于 content 阶段；

不要将它和其它的内容处理指令在同一个location内使用如proxy_pass；

echo 指令则来自 ngx_echo 模块，运行在 content 阶段；

### 6、header_filter_by_lua

运行于 content 阶段，output-header-filter 一般用来设置cookie和headers；

### 7、body_filter_by_lua

运行于 content 阶段；

### 8、log_by_lua

运行在Log Phase 阶段；


---

来源：https://juejin.im/post/5bf671a4e51d4546d60a9bd1
