---
layout: post
title: 自动化部署 deployer 的使用分享
categories: [php, laravel, thinking]
description: 自动化部署 deployer 的使用分享
keywords: deployer, php, 部署, 自动化
---

直到我遇到了「Deployer」，我的双手才彻底解放！

好东西不敢独享，七零八碎的时间抽出来写完这篇分享。


## Deployer 是什么？

简单来说，deployer 是一个用 PHP 写的自动化部署工具。


## 干什么用的？

我们写完代码，开发完程序，一定会放到线上服务器进行正式环境的部署与发布。这个时候，你是会选择通过 ftp 「左拖右拉」吗？还是说通过 git 进行拉代码，然后慢慢再配置重启各种服务，结果出问题后却手忙脚乱急于回退？

以上种种对于做开发的来说实在头疼，以前太年轻，都不知道以前 ftp 是怎么过来的，现在让我做当年时的做法，我真是做不过来。

直到我遇到了「Deployer」，真是「解放双手」啊！

## 有什么优势？

* 一条命令即可在本地开发的机器上部署项目到测试/正式/其他任何想部署的环境
* 进行部署的过程中，项目仍然能够正常访问，部署成功完成后才切到新的版本
* 一条命令回滚到上一个版本
* 丰富任务钩子和预置任务可灵活的组合完成各种任务，比如执行前端依赖的安装、构建等
* ...


## 使用条件？

* 使用 git 进行代码的版本控制
* 本地开发机器可以 ssh 到测试/正式/其他任何想部署的环境
* 部署的机器有拉取代码的权限（一般通过部署秘钥进行授权的咯）

是的，就只有以上3条，如果非要让我再写一条，我想说，那就是足够的耐心+细心+大胆！


## 怎么使用？

以我本人的例子做说明。

我本地开发环境是 Mac，所以 ssh 是天生就有的，同时，代码我从很久之前就一直用 git 托管，部署秘钥这个不用说，也很早之前就开始使用了。所以，上面的3个条件是满足的。

### 安装

`composer require deployer/deployer –dev`

如果有习惯全局安装的，可直接全局安装。当然，我个人是喜欢每个项目单独安装。

### 初始化

`vendor/bin/dep init`

这时候，会初始化部署的配置文件，配置文件的生成位置一般是项目根目录下的 deployer.php，deployer 内置了10种 PHP 项目类型，内置的配置文件，deployer 官方称之为「recipes」

大家按照项目类型去进行选择就好了，当然我一般使用 Laravel 所以，选 1 多一些。

### 配置

初始化后当然是不能直接使用的，至少连部署到哪台服务器都不知道，这里我共享下我们公司的一个项目的配置文件，当然，我写的这个配置文件可能不会完全符合大家的需求，大家按照各自需求更改就好了。已经替换掉了敏感信息。

```php
<?php
namespace Deployer;

require 'recipe/laravel.php';

// Project name
set('application', 'your_project');

// Project repository
set('repository', 'git@gitee.com:yansongda/your_project.git');

// [Optional] Allocate tty for git clone. Default value is false.
set('git_tty', true); 

// Shared files/dirs between deploys 
add('shared_files', []);
add('shared_dirs', []);

// Writable dirs by web server 
add('writable_dirs', []);

// Hosts
host('192.168.1.239')
    ->stage('debug')
    ->user('root')
    ->port(22)
    ->set('branch', 'dev')
    ->set('deploy_path', '/www/project')
    ->identityFile('/Users/yansongda/.ssh/work_rsa')
    ->forwardAgent(true)
    ->multiplexing(true)
    ->set('http_user', 'apache')
    ->addSshOption('UserKnownHostsFile', '/dev/null')
    ->addSshOption('StrictHostKeyChecking', 'no');
host('yansongda.cn')
    ->stage('prod')
    ->user('root')
    ->port(22)
    ->set('branch', 'master')
    ->set('deploy_path', '/www/project')
    ->identityFile('/Users/yansongda/.ssh/work_rsa')
    ->forwardAgent(true)
    ->multiplexing(true)
    ->set('http_user', 'apache')
    ->addSshOption('UserKnownHostsFile', '/dev/null')
    ->addSshOption('StrictHostKeyChecking', 'no');

// Tasks
task('supervisor:reload', function () {
    run('supervisorctl restart queue-project');
});
task('opcache_reset', function () {
    run('{{bin/php}} -r \'opcache_reset();\'');
});
task('php-fpm:restart', function () {
    run('systemctl restart php71-php-fpm');
});

// 注意，以下命令一定要在 deployer 链接新版本后进行，即一定要在  deploy:symlink 命令后
after('artisan:config:cache', 'artisan:route:cache');
after('deploy:symlink', 'opcache_reset');
after('deploy:symlink', 'supervisor:reload');
after('deploy:symlink', 'php-fpm:restart');

// [Optional] if deploy fails automatically unlock.
after('deploy:failed', 'deploy:unlock');

// Migrate database before symlink new release.
before('deploy:symlink', 'artisan:migrate');

```

大家看到 `shared_files`，`shared_dirs`，`writable_dirs` 为空可能有疑问，laravel 不是有 .env 文件是共享的，storage 文件夹是共享且可写的，cache 文件夹是可写的吗？为什么都没有配置呢？其实不是没有配置，而是 「recipes」已经帮我们配置好了！

如果没接触过 deployer，建议大家在进行实际部署时，先看透[官方文档](https://deployer.org/docs)，并把项目的「recipes」看明白！

同时，配置文件中有一些我们平常很少用的 ssh 命令，比如`multiplexing`，`StrictHostKeyChecking`等，建议大家也是 Google 之。

### 激动人心的部署

部署前请先记得 git push！

```shell
vendor/bin/dep deploy prod -vvv # 部署到正式环境
vendor/bin/dep deploy debug -vvv # 部署到测试环境
vendor/bin/dep deploy {{stage}} -vvv # 部署到XX环境
```

命令中的 prod/debug 这些就是你在配置文件中配置的 host 下的 stage。 -vvv 表示部署时显示详细信息，类似于 composer 的 -vvv

输入命令后，一口茶的功夫，所有部署工作已经完成！


## 有什么坑？