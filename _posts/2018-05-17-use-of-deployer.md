---
layout: post
title: 自动化部署 deployer 的使用总结分享
categories: [php, laravel, thinking, holes]
description: 自动化部署 deployer 的使用总结分享
keywords: deployer, php, 部署, 自动化
---

直到我遇到了「Deployer」，我的双手才彻底解放！

好东西不敢独享，抽出来七零八碎的时间写完这篇分享。


## Deployer 是什么？

简单来说，deployer 是一个用 PHP 写的自动化部署工具。


## 干什么用的？

我们写完代码，开发完程序，一定会放到线上服务器进行正式环境的部署与发布。这个时候，你是会选择通过 ftp 「左拖右拉」吗？还是说通过 git 进行拉代码，然后慢慢再配置重启各种服务，结果出问题后却手忙脚乱急于回退？

以上种种对于做开发的来说实在头疼，以前太年轻，都不知道以前 ftp 时代是怎么过来的，现在让我做当年时的做法，我真是做不过来。

直到我遇到了「Deployer」，已经不知帮我解放了多少次双手了！

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

是的，就只有以上3条，如果非要让我再写一条，我想说，那就是

**足够的耐心+细心+大胆！**


## 怎么使用？

以我本人的例子做说明。

我本地开发环境是 Mac，所以 ssh 是天生就有的，同时，代码我一直用 git 托管，部署秘钥这个不用说，也很早之前就开始使用了。所以，上面的3个条件是满足的。

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

大家看到 `shared_files`，`shared_dirs`，`writable_dirs` 为空可能有疑问，laravel 不是有 .env 文件是共享的，storage 文件夹是共享且可写的，cache 文件夹是可写的吗？为什么都没有配置呢？其实不是没有配置，而是 「recipes」已经帮我们配置好了，大家可以从配置文件开头的 `require 'recipe/laravel.php';` 看出！

我写的配置文件中，debug stage 下拉取 Dev 分支的代码，prod 环境中，拉取的 master 分支的代码，其实主要目的是先在开发测试分支下测试，如果没问题，再合并到 master 分支供正式环境下使用，尽可能减少出错几率。

如果没接触过 deployer，建议大家在进行实际部署时，先看透 [官方文档](https://deployer.org/docs)，并把项目的「recipes」看明白！

同时，配置文件中有一些我们平常很少用的 ssh 命令，比如`multiplexing`，`StrictHostKeyChecking`等，建议大家也 Google 之。

### 激动人心的部署

终于到了部署的步骤了，部署前请先记得 git push！

```shell
vendor/bin/dep deploy prod -vvv # 部署到正式环境
vendor/bin/dep deploy debug -vvv # 部署到测试环境
vendor/bin/dep deploy {{stage}} -vvv # 部署到XX环境
```

命令中的 prod/debug 这些就是你在配置文件中配置的 host 下的 stage。 -vvv 表示部署时显示详细信息，类似于 composer 的 -vvv，即 debug 模式，可看到更多信息。

输入命令后，一口茶的功夫，所有部署工作已经完成！


附我一次部署时的输出显示，当然，敏感信息已替换。

```shell
➜  default git:(master) vendor/bin/dep deploy prod -vvv
✈︎ Deploying master on yansongda.cn
• done on [yansongda.cn]
➤ Executing task deploy:prepare
[yansongda.cn] > echo $0
[yansongda.cn] < ssh multiplexing initialization
[yansongda.cn] < bash
[yansongda.cn] > if [ ! -d /www/yansongda ]; then mkdir -p /www/yansongda; fi
[yansongda.cn] > if [ ! -L /www/yansongda/current ] && [ -d /www/yansongda/current ]; then echo 'true'; fi
[yansongda.cn] > cd /www/yansongda && if [ ! -d .dep ]; then mkdir .dep; fi
[yansongda.cn] > cd /www/yansongda && if [ ! -d releases ]; then mkdir releases; fi
[yansongda.cn] > cd /www/yansongda && if [ ! -d shared ]; then mkdir shared; fi
• done on [yansongda.cn]
✔ Ok [853ms]
➤ Executing task deploy:lock
[yansongda.cn] > if [ -f /www/yansongda/.dep/deploy.lock ]; then echo 'true'; fi
[yansongda.cn] > touch /www/yansongda/.dep/deploy.lock
• done on [yansongda.cn]
✔ Ok [169ms]
➤ Executing task deploy:release
[yansongda.cn] > cd /www/yansongda && (if [ -h release ]; then echo 'true'; fi)
[yansongda.cn] > cd /www/yansongda && (if [ -d releases ] && [ "$(ls -A releases)" ]; then echo 'true'; fi)
[yansongda.cn] < true
[yansongda.cn] > cd /www/yansongda && (cd releases && ls -t -1 -d */)
[yansongda.cn] < 2/
[yansongda.cn] < 1/
[yansongda.cn] > cd /www/yansongda && (if [ -f .dep/releases ]; then echo 'true'; fi)
[yansongda.cn] < true
[yansongda.cn] > cd /www/yansongda && (tail -n 15 .dep/releases)
[yansongda.cn] < 20180514103954,1
[yansongda.cn] < 20180516175417,2
[yansongda.cn] > cd /www/yansongda && (if [ -d /www/yansongda/releases/3 ]; then echo 'true'; fi)
[yansongda.cn] > cd /www/yansongda && (date +"%Y%m%d%H%M%S")
[yansongda.cn] < 20180516191751
[yansongda.cn] > cd /www/yansongda && (echo '20180516191751,3' >> .dep/releases)
[yansongda.cn] > cd /www/yansongda && (mkdir /www/yansongda/releases/3)
[yansongda.cn] > cd /www/yansongda && (if [[ $(man ln 2>&1 || ln -h 2>&1 || ln --help 2>&1) =~ '--relative' ]]; then echo 'true'; fi)
[yansongda.cn] < true
[yansongda.cn] > cd /www/yansongda && (ln -nfs --relative /www/yansongda/releases/3 /www/yansongda/release)
• done on [yansongda.cn]
✔ Ok [945ms]
➤ Executing task deploy:update_code
[yansongda.cn] > if hash command 2>/dev/null; then echo 'true'; fi
[yansongda.cn] < true
[yansongda.cn] > command -v 'git'
[yansongda.cn] < /usr/bin/git
[yansongda.cn] > /usr/bin/git version
[yansongda.cn] < git version 1.8.3.1
[yansongda.cn] > cd /www/yansongda && (if [ -h /www/yansongda/release ]; then echo 'true'; fi)
[yansongda.cn] < true
[yansongda.cn] > cd /www/yansongda && (readlink /www/yansongda/release)
[yansongda.cn] < releases/3
[yansongda.cn] > cd /www/yansongda && (/usr/bin/git clone -b master --depth 1 --recursive -q git@gitee.com:yansongda/jiatongda_yansongda.git /www/yansongda/releases/3 2>&1)
Warning: Permanently added '[yansongda.cn]:1822,[8.8.8.8]:1822' (ECDSA) to the list of known hosts.
Connection to yansongda.cn closed.
• done on [yansongda.cn]
✔ Ok [4s 511ms]
➤ Executing task deploy:shared
[yansongda.cn] > if [ -d /www/yansongda/shared/storage ]; then echo 'true'; fi
[yansongda.cn] < true
[yansongda.cn] > rm -rf /www/yansongda/releases/3/storage
[yansongda.cn] > mkdir -p `dirname /www/yansongda/releases/3/storage`
[yansongda.cn] > ln -nfs --relative /www/yansongda/shared/storage /www/yansongda/releases/3/storage
[yansongda.cn] > mkdir -p /www/yansongda/shared/.
[yansongda.cn] > if [ -f /www/yansongda/shared/.env ]; then echo 'true'; fi
[yansongda.cn] < true
[yansongda.cn] > if [ -f $(echo /www/yansongda/releases/3/.env) ]; then rm -rf /www/yansongda/releases/3/.env; fi
[yansongda.cn] > if [ ! -d $(echo /www/yansongda/releases/3/.) ]; then mkdir -p /www/yansongda/releases/3/.;fi
[yansongda.cn] > touch /www/yansongda/shared/.env
[yansongda.cn] > ln -nfs --relative /www/yansongda/shared/.env /www/yansongda/releases/3/.env
• done on [yansongda.cn]
✔ Ok [823ms]
➤ Executing task deploy:vendors
[yansongda.cn] > if hash unzip 2>/dev/null; then echo 'true'; fi
To speed up composer installation setup "unzip" command with PHP zip extension https://goo.gl/sxzFcD
[yansongda.cn] > if hash composer 2>/dev/null; then echo 'true'; fi
[yansongda.cn] < true
[yansongda.cn] > if hash command 2>/dev/null; then echo 'true'; fi
[yansongda.cn] < true
[yansongda.cn] > command -v 'composer'
[yansongda.cn] < /usr/local/bin/composer
[yansongda.cn] > if hash command 2>/dev/null; then echo 'true'; fi
[yansongda.cn] < true
[yansongda.cn] > command -v 'php'
[yansongda.cn] < /usr/local/bin/php
[yansongda.cn] > cd /www/yansongda/releases/3 && /usr/local/bin/php /usr/local/bin/composer install --verbose --prefer-dist --no-progress --no-interaction --no-dev --optimize-autoloader
[yansongda.cn] < Loading composer repositories with package information
[yansongda.cn] < Installing dependencies from lock file
[yansongda.cn] < Dependency resolution completed in 0.000 seconds
[yansongda.cn] < Analyzed 112 packages to resolve dependencies
[yansongda.cn] < Analyzed 226 rules to resolve dependencies
[yansongda.cn] < Package operations: 49 installs, 0 updates, 0 removals
[yansongda.cn] < Installs: symfony/process:v3.4.9, psr/log:1.0.2, knplabs/knp-snappy:v1.0.4, ......  psy/psysh:v0.9.3, laravel/tinker:v1.0.6, predis/predis:v1.1.1, guzzlehttp/guzzle:6.3.3, yansongda/supports:v1.4.5, yansongda/laravel-notification-wechat:v1.0.2
[yansongda.cn] <   - Installing symfony/process (v3.4.9): Loading from cache
[yansongda.cn] <  Extracting archive
[yansongda.cn] <   - Installing psr/log (1.0.2): Loading from cache
[yansongda.cn] <  Extracting archive
[yansongda.cn] <   - Installing knplabs/knp-snappy (v1.0.4): Loading from cache
[yansongda.cn] <  Extracting archive
[yansongda.cn] <   - Installing laravel/framework (v5.5.40): Loading from cache
[yansongda.cn] <  Extracting archive
...此处省略...
[yansongda.cn] <   - Installing laravel/tinker (v1.0.6):
[yansongda.cn] < Loading from cache
[yansongda.cn] <  Extracting archive
[yansongda.cn] <   - Installing predis/predis (v1.1.1): Loading from cache
[yansongda.cn] <  Extracting archive
[yansongda.cn] <   - Installing guzzlehttp/guzzle (6.3.3): Loading from cache
[yansongda.cn] <  Extracting archive
[yansongda.cn] <   - Installing yansongda/supports (v1.4.5): Loading from cache
[yansongda.cn] <  Extracting archive
[yansongda.cn] <   - Installing yansongda/laravel-notification-wechat (v1.0.2): Loading from cache
[yansongda.cn] <  Extracting archive
[yansongda.cn] < Generating optimized autoload files
[yansongda.cn] < > post-autoload-dump: Illuminate\Foundation\ComposerScripts::postAutoloadDump
[yansongda.cn] < > post-autoload-dump: @php artisan package:discover
[yansongda.cn] < Discovered Package: fideloper/proxy
[yansongda.cn] < Discovered Package: laravel/tinker
[yansongda.cn] < Discovered Package: yansongda/laravel-notification-wechat
[yansongda.cn] < Package manifest generated successfully.
• done on [yansongda.cn]
✔ Ok [6s 247ms]
➤ Executing task deploy:writable
[yansongda.cn] > cd /www/yansongda/releases/3 && (mkdir -p bootstrap/cache storage storage/app storage/app/public storage/framework storage/framework/cache storage/framework/sessions storage/framework/views storage/logs)
[yansongda.cn] > cd /www/yansongda/releases/3 && (chmod 2>&1; true)
[yansongda.cn] < chmod: 缺少操作数
[yansongda.cn] < Try 'chmod --help' for more information.
[yansongda.cn] > cd /www/yansongda/releases/3 && (if hash setfacl 2>/dev/null; then echo 'true'; fi)
[yansongda.cn] < true
[yansongda.cn] > cd /www/yansongda/releases/3 && (getfacl -p bootstrap/cache | grep "^user:apache:.*w" | wc -l)
[yansongda.cn] > cd /www/yansongda/releases/3 && (setfacl -RL -m u:"apache":rwX -m u:`whoami`:rwX bootstrap/cache)
[yansongda.cn] > cd /www/yansongda/releases/3 && (setfacl -dRL -m u:"apache":rwX -m u:`whoami`:rwX bootstrap/cache)
[yansongda.cn] > cd /www/yansongda/releases/3 && (getfacl -p storage | grep "^user:apache:.*w" | wc -l)
[yansongda.cn] < 4
[yansongda.cn] > cd /www/yansongda/releases/3 && (getfacl -p storage/app | grep "^user:apache:.*w" | wc -l)
[yansongda.cn] < 1
[yansongda.cn] > cd /www/yansongda/releases/3 && (getfacl -p storage/app/public | grep "^user:apache:.*w" | wc -l)
[yansongda.cn] < 1
[yansongda.cn] > cd /www/yansongda/releases/3 && (getfacl -p storage/framework | grep "^user:apache:.*w" | wc -l)
[yansongda.cn] < 1
[yansongda.cn] > cd /www/yansongda/releases/3 && (getfacl -p storage/framework/cache | grep "^user:apache:.*w" | wc -l)
[yansongda.cn] < 1
[yansongda.cn] > cd /www/yansongda/releases/3 && (getfacl -p storage/framework/sessions | grep "^user:apache:.*w" | wc -l)
[yansongda.cn] < 1
[yansongda.cn] > cd /www/yansongda/releases/3 && (getfacl -p storage/framework/views | grep "^user:apache:.*w" | wc -l)
[yansongda.cn] < 1
[yansongda.cn] > cd /www/yansongda/releases/3 && (getfacl -p storage/logs | grep "^user:apache:.*w" | wc -l)
[yansongda.cn] < 1
• done on [yansongda.cn]
✔ Ok [1s 168ms]
➤ Executing task artisan:storage:link
[yansongda.cn] > /usr/local/bin/php /www/yansongda/releases/3/artisan --version
[yansongda.cn] < Laravel Framework 5.5.40
[yansongda.cn] > /usr/local/bin/php /www/yansongda/releases/3/artisan storage:link
[yansongda.cn] < The [public/storage] directory has been linked.
• done on [yansongda.cn]
✔ Ok [484ms]
➤ Executing task artisan:view:clear
[yansongda.cn] > /usr/local/bin/php /www/yansongda/releases/3/artisan view:clear
[yansongda.cn] < Compiled views cleared!
• done on [yansongda.cn]
✔ Ok [385ms]
➤ Executing task artisan:cache:clear
[yansongda.cn] > /usr/local/bin/php /www/yansongda/releases/3/artisan cache:clear
[yansongda.cn] < Cache cleared successfully.
• done on [yansongda.cn]
✔ Ok [244ms]
➤ Executing task artisan:config:cache
[yansongda.cn] > /usr/local/bin/php /www/yansongda/releases/3/artisan config:cache
[yansongda.cn] < Configuration cache cleared!
[yansongda.cn] < Configuration cached successfully!
• done on [yansongda.cn]
✔ Ok [224ms]
➤ Executing task artisan:route:cache
[yansongda.cn] > /usr/local/bin/php /www/yansongda/releases/3/artisan route:cache
[yansongda.cn] < Route cache cleared!
[yansongda.cn] < Routes cached successfully!
• done on [yansongda.cn]
✔ Ok [243ms]
➤ Executing task artisan:optimize
• done on [yansongda.cn]
✔ Ok [0ms]
➤ Executing task deploy:symlink
[yansongda.cn] > if [[ $(man mv 2>&1 || mv -h 2>&1 || mv --help 2>&1) =~ '--no-target-directory' ]]; then echo 'true'; fi
[yansongda.cn] < true
[yansongda.cn] > mv -T /www/yansongda/release /www/yansongda/current
• done on [yansongda.cn]
✔ Ok [183ms]
➤ Executing task opcache_reset
[yansongda.cn] > /usr/local/bin/php -r 'opcache_reset();'
• done on [yansongda.cn]
✔ Ok [122ms]
➤ Executing task supervisor:reload
[yansongda.cn] > supervisorctl restart queue-yansongda
[yansongda.cn] < queue-yansongda: stopped
[yansongda.cn] < queue-yansongda: started
• done on [yansongda.cn]
✔ Ok [2s 260ms]
➤ Executing task php-fpm:restart
[yansongda.cn] > systemctl restart php71-php-fpm
• done on [yansongda.cn]
✔ Ok [179ms]
➤ Executing task deploy:unlock
[yansongda.cn] > rm -f /www/yansongda/.dep/deploy.lock
• done on [yansongda.cn]
✔ Ok [78ms]
➤ Executing task cleanup
[yansongda.cn] > cd /www/yansongda && if [ -e release ]; then  rm release; fi
[yansongda.cn] > cd /www/yansongda && if [ -h release ]; then  rm release; fi
• done on [yansongda.cn]
✔ Ok [156ms]
Successfully deployed!
```


如果此版本遇到问题，可使用 `vendor/bin/dep rollback` 命令，一键回退。

## 部署后的文件结构

```shell
[root@yansongda www]# tree -aL 3 yansongda
yansongda
├── current -> releases/1
├── .dep
│   └── releases
├── releases
│   └── 1
│       ├── app
│       ├── artisan
│       ├── bootstrap
│       ├── composer.json
│       ├── composer.lock
│       ├── config
│       ├── database
│       ├── deploy.php
│       ├── .env -> ../../shared/.env
│       ├── .env.example
│       ├── .git
│       ├── .gitattributes
│       ├── .gitignore
│       ├── package.json
│       ├── phpunit.xml
│       ├── public
│       ├── readme.md
│       ├── resources
│       ├── routes
│       ├── server.php
│       ├── storage -> ../../shared/storage
│       ├── tests
│       ├── update.md
│       ├── vendor
│       ├── webpack.mix.js
│       └── yarn.lock
└── shared
    ├── .env
    └── storage
        ├── app
        ├── framework
        └── logs
```

从显示可以看出，deployer 帮我们建立了 4 个文件夹: 

* releases

    文件夹下 1，2，3... 文件夹下即为每次部署时的真实版本，这里一般只保留了最近的5次部署版本，如果想保留更多，需要在配置文件中修改

* current

    代表项目当前的部署版本，其软连接到 releases/{{num}} 文件夹，当每一次部署完毕时，就会自动更改到最新的部署版本，这也是某些命令必须在 `deploy:symlink` 后执行的原因

* shared

    文件夹即为项目共享文件了，这个不用多说，大家应该能看明白

* .dep

    这个目录下面的 releases 文件里包含了每次部署的时间及版本号


## 有什么坑？

### 当前版本的路径

每一次的最新版本的真实路径为 `/path/to/project/current` ，当然您也可以手动调整到 releases/{{num}} 文件夹，但是，这样毕竟不可取。

### 关于第一次部署

第一次部署时，nginx，supervisor 等服务还是免不了需要手动登录服务器去配置的，同时，如果您使用 Laravel 项目，您还需要手动修改增加 `shared/.env` 文件。

注意，nginx / supervisor 的路径需要填 `/path/to/project/current`。

### 生产服务器 PHP 禁用某些函数

如果生产服务器中的 PHP 环境禁用掉了 deployer 所使用的函数，将会报错，这时根据提示需要解除禁用即可。

### 找不到某些命令

如果部署时，提示 `command -v 'xxx' failed` 一般都是所使用的命令找不到所导致的，可能的原因有：

* 自定义任务命令打错了

* 使用集成的 PHP 环境等，导致。这种情况在 /usr/local/bin 中加个软连接即可

这里也建议，不在正式环境中使用集成环境。

### 缓存清理的问题

如果您使用 laravel 项目，会在部署时清除服务器的缓存。

* 如果您的项目强依赖缓存

    就需要注意了，建议自己重写 deploy 部署命令。

* 如果您使用 Redis 并且缓存和其它项目使用同一个 Redis 数据库

    建议更改缓存到独立数据库。不然一旦清除，其它队列，广播等所有都可能会一起清除了。

### 想在部署时使用普通用户？

如果您想在部署时不使用 root 用户，而是使用普通的用户，这当然是可以的，不过，极有可能会遇到权限问题，先不说依赖 systemctl 的命令，单是配置 `writable_dirs` 这一条上，就有可能。因为这里是通过 setfacl 命令去设置文件/文件夹的 acl 权限的。

所以，如果使用普通用户，记得 sudo 。
