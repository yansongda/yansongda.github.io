---
title: php.ini 配置文件中文详解
description: php.ini 配置文件中文详解
date: 2013-08-09
categories:
  - php
  - wiki
---

;;;;;;;;;;;
; 警告 ;
;;;;;;;;;;;
; 此配置文件是对于新安装的PHP的默认设置.
;
; 此配置针对开发目的,并且*不是*针对生产环境
; 基于一些安全方面的考虑,在你的网站上线之前,请考虑使用php.ini-recommended
; 以及在线文档 http://php.net/manual/en/security.php.

;;;;;;;;;;;;;;;;;;;
; 关于 php.ini ? ;
;;;;;;;;;;;;;;;;;;;
; 此文件控制了PHP行为的很多方面. ?为了让PHP能够读取它
; 必须命名为 ‘php.ini’. ?PHP 在其当前工作目录,由PHPRC环境变量指定目录
; 以及由编译时指定的目录(按此顺序)查找此文件
; 在Windows环境下, 编译时目录是Windows目录.
; 在命令行模式下查找php.ini的目录可以被-c参数覆盖.
;
; 此文件的语法非常简单.
; 空行和由分号开始的行会被忽略(你可能已经猜到了).
; 段的开头(例如 [Foo]) 同样会被悄悄忽略
; 即使在将来他们可能会有其他作用.
;
; 使用以下语法来设定指令:
; directive = value
; 指令 = 值
; 指令名称是 *大小写敏感* – foo=bar 和 FOO=bar 是不同的.
;
; 值可以是字符串,数值,PHP常量 (例如 E_ALL 和 M_PI),
; INI 常量 (On, Off, True, False, Yes, No 和 None) 或者一个表达式
; (例如 E_ALL & ~E_NOTICE), 或者带引号的字串 (“foo”).
;
; 在INI文件中的表达式只能使用逻辑运算和圆括号:
; | ? ? ? ?逻辑或
; & ? ? ? 逻辑与
; ~ ? ? ? 逻辑非
; ! ? ? ? ?取反
;
; 逻辑标志可以使用1,On,True或者Yes来打开.
; 也可以使用0, Off, False 或者 No来关闭.
;
; 在等号后面不写任何内容代表了一个空字符串
; 或者使用 None 关键词:
;
; ?foo = ? ? ? ? ; 将foo设置成一个空字串
; ?foo = none ? ?; 将foo设置成一个空字串
; ?foo = “none” ?; 将foo设置成字串 ‘none’
;
; 如果你在值中使用了常量, 并且这个常量属于一个动态加载的扩展模块
; (不论是PHP扩展还是Zend扩展),
; 那你只能在加载这些扩展 *之后* 使用这些常量.
;
;
;;;;;;;;;;;;;;;;;;;
; 关于这个文件 ?;
;;;;;;;;;;;;;;;;;;;
; 在php.ini-dist 文件中所有的值都相当于内建的默认值
; (就是如果没有使用php.ini, 或者如果你删除了这些行,
; 就和内建的默认值一样).

;;;;;;;;;;;;;;;;;;;;
; 语言选项 ;
;;;;;;;;;;;;;;;;;;;;

; 打开在Apache下的PHP脚本语言引擎
engine = On

; 打开Zend Engine兼容模式(PHP 4.x)
zend.ze1_compatibility_mode = Off

; 允许 <? 标签. ?否则,只有 <?php 和 <script> 标签被认为是PHP脚本.
; 注意: 尽可能避免在开发可重新发布的程序或者库的时候使用简略标签,或者在不受你控制的服务器下发布
; 因为简略标签可能不被目标服务器支持.为了可移植性, 可重新发布的代码, 请不要使用简略标签
short_open_tag = On

; 使用ASP风格 <% %> 标签.
asp_tags = Off

; 浮点数中数值的有效位数(浮点数精度).
precision ? ?= ?12

; 强制2000年兼容 (可能引起不兼容浏览器的问题)
y2k_compliance = On

; 输出缓冲允许在你发送了body内容之后发送header(包括 cookies)
; 代价是稍稍减缓了PHP输出层
; 你可以在运行时调用 output buffering 函数来打开此功能
; 你也可以将此指令设置为On来对所有文件打开输出缓冲
; 如果你想将这个缓冲区限制到特定大小 – 你可以使用最大的字节数来代替’On’,来作为这个指令的参数 (例如 output_buffering=4096).
output_buffering = Off

; 你可以将所有你脚本输出的内容重定向到指定函数.
; 例如, 如果你设置 output_handler 到 “mb_output_handler”,
; 字符编码会被转换成为指定的编码..
; 设置任何的输出处理句柄会自动打开输出缓冲.
; 注意: 如果想编写可移植脚本就不要依赖此INI配置
; ? ? ? 取而代之的是, 明确的使用 ob_start() 来设置输出处理句柄.
; ? ? ? 使用此ini指令可能引起问题,除非你很清楚的理解脚本正在做什么.
; 注意: 你不能同时使用 “mb_output_handler” 和 “ob_iconv_handler”
; ? ? ? 并且你不能同时使用 “ob_gzhandler” 和 “zlib.output_compression”.
; 注意: 如果使用zlib.output_handler指令开启zlib输出压缩, 该指令必须为空.
;output_handler =

; 使用zlib库对输出进行压缩
; 对此选项的有效值是 ‘off’, ‘on’, 或者字节数 (用来压缩的缓冲大小 , 默认是 4KB)
; 注意: 结果的chunk大小可能由于压缩对象的大小而不同.
; ? ? ? PHP输出块的大小一般压缩之后每个大小时几百个字节.
; ? ? ? 如果你希望藉由一个大块的堆大小来获取更好的性能, 需要额外的打开 output_buffering 选项.
; 注意: 你必须使用 zlib.output_handler 来替代标准的
; ? ? ? output_handler, 否则输出可能会有问题.
zlib.output_compression = Off
;zlib.output_compression_level = -1

; 这里激活 zlib.output_compression 之后,你无法再指定额外的输出处理.
; 这个设置和 output_handler 一样,但是处理顺序不同.
;zlib.output_handler =

; 立即刷新告知 PHP 让输出层在每次输出块之后立刻自动刷新.
; 这和每次调用print()或者echo()函数以及任何一种HTML块后调用flush()一样.
; 打开此选项会严重导致性能下降,一般只有用于调试情况下才建议打开.
implicit_flush = Off

; 如果反序列器找到一个可以作为示例的未定义类.未序列化的回调函数会被调用(使用未定义的类名作为参数),
; 如果特定的函数未被定义或者如果此函数没有包含/实现丢失的类,则会发生一个警告.
; 如果只有你真想要实现类似的回调函数,才设定此入口.
unserialize_callback_func=

; 当浮点和双精度被序列化后,浮点号后由 serialize_precision 指定存储精确度的有效位数.
; 默认值是当浮点数被反序列解码后,数值仍旧相同.
serialize_precision = 100

; 是否打开强制通过引用传递参数给函数
; 此方法被反对并且很有可能在未来版本的PHP/Zend中不再被支持.
; 被孤立的指定的方法是参数应该在函数被声明的时候按照引用传入.
; 你被鼓励来尝试上述方法并关闭此选项来确保你脚本在今后的新版本中仍旧可以正常工作 ( 每次你使用此特性的时候会受到一个警告
; 并且参数会传值而不是传引用).
allow_call_time_pass_reference = On

;
; 安全模式
;
safe_mode = Off

; 默认情况下,安全模式在打开文件时,使用UID来比对检测.
; 如果你只想使用GID做宽松的比对,
; 打开 safe_mode_gid.
safe_mode_gid = Off

; 当 safe_mode 被打开, 此目录下包含的文件和子文件夹的UID/GID 检测会被绕过.
; (目录必须在 include_path 中存在或者必须在包含时使用全路径)
safe_mode_include_dir =

; 当 safe_mode 被打开, 只有在 safe_mode_exec_dir 中定义的可执行文件能够通过exec函数组打开执行.
safe_mode_exec_dir =

; 设定某些的环境变量可能成为潜在的安全隐患.
; 此指令包含一个逗号分隔的前导列表.
; 在安全模式中, 用户可能只能改变符合这里所给出前导字符的变量.
; 默认情况下,用户只能改变以PHP_开头的变量(例如. PHP_FOO=BAR).
;
; 注意: ?如果此指令为空, PHP会允许用户修改任何环境变量!
safe_mode_allowed_env_vars = PHP_

; 此指令包含了一个用逗号分隔的环境变量列表, 用户无法通过 putenv() 函数来修改列表中的环境变量.
; 这些变量即便已经在 safe_mode_allowed_env_vars 所设定的列表中,也会被被保护不允许修改.
safe_mode_protected_env_vars = LD_LIBRARY_PATH

; 如果设置了open_basedir, 将会限制文件操作只能是此指令下的目录和子目录.
; 此指令对于每目录或者每虚拟主机配置文件最有意义. 此指令* 不会 *受安全模式开或者关的影响.
;open_basedir =

; 此指令允许你为了安全原因关闭指定的函数.
; 它接受以逗号分隔的函数名的列表.
; 此指令* 不会 *受安全模式开或者关的影响.
disable_functions =

; 此指令允许你由于安全原因关闭指定的类.
; 它接受以逗号分隔的类名的列表.
; 此指令* 不会 *受安全模式开或者关的影响.
disable_classes =

; 语法高亮模式的色彩. 任何在 <span style=”color: ???????”> 中可接受的值都可以使用.
;highlight.string ?= #DD0000
;highlight.comment = #FF9900
;highlight.keyword = #007700
;highlight.bg ? ? ?= #FFFFFF
;highlight.default = #0000BB
;highlight.html ? ?= #000000

; 如果打开, 即便用户放弃了的请求也会被执行完成.
; 在执行可能被用户打断或者浏览器超时所中断的请求时打开此选项.
; ignore_user_abort = On

; 指定PHP使用的实际路径的缓冲. 对于PHP打开很多文件来处理很多文件操作的系统上,应该增加此值.
; realpath_cache_size=16k

; 对于给定文件或者目录的缓冲真实路径信息的缓冲保留秒数. 对于很少修改文件的系统可以考虑增加此值.
; realpath_cache_ttl=120

;
; 其他
;
; 考虑到PHP可能被其所安装的服务器上暴露的事实(例如. 被web服务器作为头部信息的签名).
; 任何情况下这虽然不是安全威胁, 仍有可能暴露在你的服务器上是否正在使用PHP.
expose_php = On

;;;;;;;;;;;;;;;;;;;
; 资源限制 ;
;;;;;;;;;;;;;;;;;;;

; 每个脚本最大执行秒数
max_execution_time = 30
; 每个脚本用来分析请求数据的最大时间
max_input_time = 60
; 最大输入变量的嵌套级别
;max_input_nesting_level = 64
; 每个脚本能够使用的最大内存数量 (128MB)
memory_limit = 128M

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
; 错误处理和记录 ;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

; 错误报告时一个位. 对每一个数值取或可以得到最终的报告级别
; E_ALL ? ? ? ? ? ? – 所有错误和警告 (不包含 E_STRICT)
; E_ERROR ? ? ? ? ? – 致命的运行时错误
; E_RECOVERABLE_ERROR ?- 几乎致命的运行时错误
; E_WARNING ? ? ? ? – 运行时警告 (非致命错误)
; E_PARSE ? ? ? ? ? – 编译时语法错误
; E_NOTICE ? ? ? ? ?- 运行时提醒 (这些警告常常由你代码中的bug导致, 但是也有可能是有意的行为 (例如, 使用一个未初始化的变量并依赖于其会被自动初始化成为一个空字符串的事实)
; E_STRICT ? ? ? ? ?- 运行时提醒, 打开后PHP会给出针对你代码的最易移植和最好向后兼容性的建议
; E_CORE_ERROR ? ? ?- PHP初始化启动时的致命错误
; E_CORE_WARNING ? ?- 在PHP初始化时发生的警告 (非致命错误)
; E_COMPILE_ERROR ? – 致命的编译时错误
; E_COMPILE_WARNING – 编译时警告 (非致命)
; E_USER_ERROR ? ? ?- 用户产生的错误信息
; E_USER_WARNING ? ?- 用户产生的警告信息
; E_USER_NOTICE ? ? – 用户产生的提示信息
;
;例子:
;
; ? – 显示所有错误, 除了提示以及代码标准警告以外
;
;error_reporting = E_ALL & ~E_NOTICE
;
; ? – 显示所有错误,除了提示以外
;
;error_reporting = E_ALL & ~E_NOTICE | E_STRICT
;
; ? – 只显示错误
;
;error_reporting = E_COMPILE_ERROR|E_RECOVERABLE_ERROR|E_ERROR|E_CORE_ERROR
;
; ? – 显示出了提示以及代码标准警告之外的错误
;
error_reporting ?= ?E_ALL & ~E_NOTICE

; 打印输出错误 (作为输出的一部分). ?对于生产环境的网站来说,
; 强烈建议你关闭此选项, 使用错误日志来替代 (详情参考下面内容).
; 在一个生产环境下的web站点打开display_errors可能泄漏安全信息给最终用户, 例如web服务器的文件路径,你数据库的结构或者其他信息.
;
; display_errors可用的值:
;
; Off ? ? ? ?- 不显示任何错误信息
; stderr ? ? – 将错误信息输出到STDERR (只有 CGI/CLI 格式下有效!)
;
;display_errors = “stderr”
;
; stdout (On) – 输出错误信息到STDOUT上
;
display_errors = On

; 即使 display_errors 打开后,PHP启动序列中发生的错误也不会显示.
; 强烈建议你保持 display_startup_errors 关闭状态, 除非在排错
display_startup_errors = Off

; 将错误输入到日志文件 (服务器指定的log,stderr或者error_log (以下指定))
; 和上面提到的一样, 强烈建议你在生产环境的web站点下使用错误日志来代替错误显示.
log_errors = Off

; 设定log_errors的最大长度. 在 error_log 关于源的信息也计算在内.
; 默认是1024, 设置为0可以不限制任何最大长度.
log_errors_max_len = 1024

; 不要记录重复的信息.必须出现在同样文件的相同行之中的才被认为是重复信息,除非 ignore_repeated_source 被设为 true.
ignore_repeated_errors = Off

; 当忽略重复消息时忽略消息的来源. 当此设置打开后,不再记录来自不同文件或者不同行的相同消息.
ignore_repeated_source = Off

; 如果此选项被设置为 Off, 那么内存泄漏不会被显示 (不论在stdout还是在日志中).
; 此项仅在debug编译模式下有效, 并且错误报告需要包含 E_WARNING
report_memleaks = On

;report_zend_debug = 0

; 在$php_errormsg中保存最后一次错误/警告消息 (逻辑值).
track_errors = Off

; 关闭在错误信息中所包含的HTML标签.
; 注意: 永远不要再生产环境中使用此特性.
;html_errors = Off

; 如果html_errors 设置为On, 则PHP产生可点击的错误信息,点击后会跳转到描述此错误或者引起此错误的函数具体信息的页面.
; 你可以从 http://www.php.net/docs.php 下载一份PHP手册的副本
; 并且将 docref_root指向你放置本地拷贝的以’/’开头的.
; 你同时必须指定文件文件的包含点的扩展名.
; 注意: 永远不要再生产环境中使用此特性.
;docref_root = “/phpmanual/”
;docref_ext = .html

; 在输出的错误信息前加上的字符串.
;error_prepend_string = “<font color=#ff0000>”

; 在输出的错误信息之后加上的字符串.
;error_append_string = “</font>”

; 将错误记录到指定文件.
;error_log = filename

; 将错误记录到 syslog (NT系统上的Event Log在Windows 95下不可用).
;error_log = syslog

;;;;;;;;;;;;;;;;;
; 文件处理 ;
;;;;;;;;;;;;;;;;;
;
; 注意 – track_vars 在PHP 4.0.3 中总是打开的

; 在PHP产生的URL中用来分隔参数的符号.
; 默认是 “&”.
;arg_separator.output = “&”

; PHP用来将URL分割输入到变量中的分隔符.
; 默认是 “&”.
; 注意: 所有包含在指令内的字符都会被认为是分隔符!
;arg_separator.input = “;&”

; 此指令描述了PHP注册GET, POST, Cookie, 环境 和 内置变量的顺序 ?(各自使用G, P, C, E 和 S , 一般使用 EGPCS 或 GPC). ?注册使用从左往右的顺序, 新的值会覆盖旧的值.
variables_order = “EGPCS”

; 是否将EGPCS变量注册成为全局变量.
; 如果你不希望由于用户数据而导致你脚本的全局变量变得凌乱,你需要关闭此选项
; 这个一般随着 track_vars 打开 – 在这种情况下你能够通过$HTTP_*_VARS[]存取所有的GPC变量.
;
; 你应该努力写好脚本这样就不必打开register_globals
; 如果代码不是经过详细的斟酌,那将变量作为全局使用可能很容易导致潜在的安全漏洞.
register_globals = Off

; 是否注册老形式的输入数组, HTTP_GET_VARS 和相关数组
; 如果你不使用他们,建议为了提高性能关闭他们.
register_long_arrays = On

; 此指令让PHP确认是否申明 argv&argc 变量 (这些变量会包含GET信息).
; 如果你不使用这些变量,为了提升性能应该关闭此选项.
register_argc_argv = On

; 当打开此项, SERVER 和 ENV 变量将在第一次被使用时而不是脚本一开始时创建(运行时)
; 如果这些变量在脚本中没有被使用过, 打开此项会增加一点性能.
; 为了使此指令有效,PHP指令 register_globals, register_long_arrays,
; 以及 register_argc_argv 必须被关闭.
auto_globals_jit = On

; PHP可以接受的最大的POST数据大小.
post_max_size = 8M

; Magic quotes
;

; 针对GET/POST/Cookie数据打开Magic quotes.
magic_quotes_gpc = On

; 针对实时产生的数据打开Magic quotes, 例如从SQL获取的数据, 从exec()返回的数据等等.
magic_quotes_runtime = Off

; 使用 Sybase 风格的 magic quotes (使用”来引导’替代’).
magic_quotes_sybase = Off

; 在任何PHP文档之前或之后自动增加文件.
auto_prepend_file =
auto_append_file =

; 和 4.0b4一样, PHP 总是使用默认在头 Content-type: 的编码输出字符.
; 将其设置为空可以禁用发送字符集.
;
; PHP内建默认为text/html
default_mimetype = “text/html”
;default_charset = “iso-8859-1”

; 总是填充 $HTTP_RAW_POST_DATA 变量.
;always_populate_raw_post_data = On

;;;;;;;;;;;;;;;;;;;;;;;;;
; 路径和目录 ;
;;;;;;;;;;;;;;;;;;;;;;;;;

; UNIX: “/path1:/path2”
;include_path = “.:/php/includes”
;
; Windows: “path1;path2”
;include_path = “.;c:phpincludes”

; PHP页面的根路径, 只有非空时有效.
; 如果PHP没有使用FORCE_REDIRECT来编译, 如果你将php作为CGI运行在任何web服务器下(除了IIS)的话,你必须设置doc_root
; 针对安全问题查看文档. ?一种替代方案是使用下面的cgi.force_redirect
doc_root =

; PHP使用/~username打开脚本的目录,非空时才有效.
user_dir =

; 可加载的扩展(模块)的目录位置.
extension_dir = “./”

; 是否启用 dl() 函数. ?dl() 函数无法正常的在多线程服务下运行, 例如IIS或者Zeus, 并在在这些服务软件下会自动禁用.
enable_dl = On

; 在绝大多数web服务器下,cgi.force_redirect 对于提供安全执行PHP作为CGI来说是很有必要的.
; 没有配置的情况下,PHP会默认打开此项.
; 你可以在这里关闭此项并且自己承担风险
; **你可以在IIS安全的关闭此项,事实上,你必须关闭此项.**
; cgi.force_redirect = 1

; 如果 cgi.nph 被打开,就会强制CGI在每个请求时发送Status: 200.
; cgi.nph = 1

; 如果cgi.force_redirect被打开,并且你没有在Apache或者Netscape(iPlanet) web服务器下运行,
; 你也许需要设置一个环境变量名让PHP来查找让其可以获取后继续执行. 设置此变量可能引起安全问题, 在设置之前请先了解可能引起的后果.
; cgi.redirect_status_env = ;

; cgi.fix_pathinfo 为CGI提供 *真实* PATH_INFO/PATH_TRANSLATED 支持.
; PHP的预处理行为是设置 PATH_TRANSLATED 到 SCRIPT_FILENAME, 并且不去猜测 PATH_INFO 是什么.
; 想获取关于 PATH_INFO 更多的信息, 查看 cgi 规范.
; 将此值设置为1会引起PHP CGI修正它的路径来符合规范.
; 设置为0会引起PHP类似前面的行为. 默认是1. 你应该修正你的脚本来使用 SCRIPT_FILENAME 而不是 PATH_TRANSLATED.
; cgi.fix_pathinfo=0

; 在IIS下的FastCGI (在基于 WINNT 的操作系统下) 支持莫让呼叫客户端的安全令牌的能力.
; 这使得IIS能够定义其下运行的安全上下文.
; 在Apache下的mod_fastcgi 目前不支持此特性 (03/17/2002)
; 如果运行在IIS下设置为1. 默认是0.
; fastcgi.impersonate = 1;

; 关闭通过 FastCGI 连接的日志
; fastcgi.logging = 0

; cgi.rfc2616_headers 配置选项告知 PHP 当发送HTTP响应代码时使用什么类型的头
; 如果设置为0,PHP发送被Apache支持的 Status: 头信息.
; 当设置为1, PHP会发送 RFC2616 兼容的头信息.
; 默认为0.
; cgi.rfc2616_headers = 0

;;;;;;;;;;;;;;;;
; 文件上传 ;
;;;;;;;;;;;;;;;;

; 是否允许HTTP文件上传.
file_uploads = On

; 对于HTTP上传文件的临时文件目录 (如果没有指定则会使用系统默认).
;upload_tmp_dir =

; 允许上传的最大文件大小.
upload_max_filesize = 2M

;;;;;;;;;;;;;;;;;;
; Fopen 包装 ;
;;;;;;;;;;;;;;;;;;

; 是否允许将URL作为文件 (例如 http:// 或者 ftp://) .
allow_url_fopen = On

; 是否允许 include/require 将URL作为文件 (例如 http:// 或者 ftp://) .
allow_url_include = Off

; 定义匿名ftp密码 (你的电子邮件地址)
;from=”john@doe.com”

; 定义 User-Agent 字符串
; user_agent=”PHP”

; 定义基于流的socket接口的超时时间 (秒)
default_socket_timeout = 60

; 如果你的脚本必须处理从 Macintosh 系统来的文件,
; 或者你运行在一台Mac并且需要从unix或者win32系统上处理文件,
; 设置此标志会引起PHP自动检测这些文件的EOL字符,这样fgets() 和 file() 就可以不用管文件的来源而直接处理了.
; auto_detect_line_endings = Off

;;;;;;;;;;;;;;;;;;;;;;
; 动态扩展 ;
;;;;;;;;;;;;;;;;;;;;;;
;
; 如果你希望扩展自动加载, 使用下列语法:
;
; ? extension=modulename.extension
;
; 例如,在Windows系统上:
;
; ? extension=msql.dll
;
; … 或者在 UNIX 下:
;
; ? extension=msql.so
;
; 注意: 这里应该只是模块的名字;
; 这里不需要模块的目录信息.
; 使用上面的 extension_dir 指令来指定扩展的位置.

; Windows Extensions
; 注意:已经内建了ODBC支持,所以不需要针对ODBC的dll.
; 注意:许多DLL文件位于 extensions/ (PHP 4) 或者 ext/ (PHP 5)目录中,和分割的PECL DLL下载在一起 (PHP 5).
; 确定设置了正确的 extension_dir 指令.

;extension=php_bz2.dll
;extension=php_curl.dll
;extension=php_dba.dll
;extension=php_dbase.dll
;extension=php_exif.dll
;extension=php_fdf.dll
;extension=php_gd2.dll
;extension=php_gettext.dll
;extension=php_gmp.dll
;extension=php_ifx.dll
;extension=php_imap.dll
;extension=php_interbase.dll
;extension=php_ldap.dll
;extension=php_mbstring.dll
;extension=php_mcrypt.dll
;extension=php_mhash.dll
;extension=php_mime_magic.dll
;extension=php_ming.dll
;extension=php_msql.dll
;extension=php_mssql.dll
;extension=php_mysql.dll
;extension=php_mysqli.dll
;extension=php_oci8.dll
;extension=php_openssl.dll
;extension=php_pdo.dll
;extension=php_pdo_firebird.dll
;extension=php_pdo_mssql.dll
;extension=php_pdo_mysql.dll
;extension=php_pdo_oci.dll
;extension=php_pdo_oci8.dll
;extension=php_pdo_odbc.dll
;extension=php_pdo_pgsql.dll
;extension=php_pdo_sqlite.dll
;extension=php_pgsql.dll
;extension=php_pspell.dll
;extension=php_shmop.dll
;extension=php_snmp.dll
;extension=php_soap.dll
;extension=php_sockets.dll
;extension=php_sqlite.dll
;extension=php_sybase_ct.dll
;extension=php_tidy.dll
;extension=php_xmlrpc.dll
;extension=php_xsl.dll
;extension=php_zip.dll

;;;;;;;;;;;;;;;;;;;
; 模块设置 ;
;;;;;;;;;;;;;;;;;;;

[Date]
; 定义date函数使用的默认时区
;date.timezone =

;date.default_latitude = 31.7667
;date.default_longitude = 35.2333

;date.sunrise_zenith = 90.583333
;date.sunset_zenith = 90.583333

[filter]
;filter.default = unsafe_raw
;filter.default_flags =

[iconv]
;iconv.input_encoding = ISO-8859-1
;iconv.internal_encoding = ISO-8859-1
;iconv.output_encoding = ISO-8859-1

[sqlite]
;sqlite.assoc_case = 0

[xmlrpc]
;xmlrpc_error_number = 0
;xmlrpc_errors = 0

[Pcre]
;PCRE 库反响追踪限制.
;pcre.backtrack_limit=100000

;PCRE 库递归限制.
;请注意如果你设置此项到一个很高的值, 你可能耗尽所有的可用的进程堆并且最终弄宕PHP(由于到达了操作系统强制的堆大小的限制).
;pcre.recursion_limit=100000

[Syslog]
; 是否定义不同的syslog变量 (例如. $LOG_PID,
; $LOG_CRON, 等等.). ?关闭此选项对性能有益.
; 在运行时, 你可以调用 define_syslog_variables() 函数来定义这些变量.
define_syslog_variables ?= Off

[mail function]
; 针对Win32.
SMTP = localhost
smtp_port = 25

; 针对Win32.
;sendmail_from = me@example.com

; 针对Unix. ?可以支持参数 (默认: “sendmail -t -i”).
;sendmail_path =

; 强制额外的指定的参数被作为扩展参数传送给sendmail执行文件.
; 这些参数总是替代mail()函数的第五个参数值, 甚至是在安全模式内.
;mail.force_extra_parameters =

[SQL]
sql.safe_mode = Off

[ODBC]
;odbc.default_db ? ?= ?目前无效
;odbc.default_user ?= ?目前无效
;odbc.default_pw ? ?= ?目前无效

; 允许或阻止持久连接.
odbc.allow_persistent = On

; 在重用前检查连接是否可用.
odbc.check_persistent = On

; 持久连接的最大数目. ?-1 意味着没有限制.
odbc.max_persistent = -1

; 最大连接数 (持久 + 非持久). ?-1 意味着没有限制.
odbc.max_links = -1

; 长字段处理. ?返回变量的字节数. ?0 意味着略过.
odbc.defaultlrl = 4096

; 二进制数据处理. 0 意味着略过, 1按照实际返回, 2 转换到字符.
; 查看 odbc_binmode 和 odbc_longreadlen 的文档来获取针对 uodbc.defaultlrl 和 uodbc.defaultbinmode的解释
odbc.defaultbinmode = 1

[MySQL]
; 允许或阻止持久连接.
mysql.allow_persistent = On

; 持久连接的最大数目. ?-1 意味着没有限制.
mysql.max_persistent = -1

; 最大连接数 (持久 + 非持久). ?-1 意味着没有限制.
mysql.max_links = -1

; mysql_connect()默认的端口号. ?如果没有设置, mysql_connect() 会使用 $MYSQL_TCP_PORT
; 或者 位于/etc/services的 mysql-tcp 入口或者编译时定义的MYSQL_PORT 值(按照此顺序查找).
; Win32 只会查找MYSQL_PORT值.
mysql.default_port =

; 对于本地MySQL连接的默认socket名称. 如果为空, 则使用MySQL内建默认值.
mysql.default_socket =

; mysql_connect() 的默认host值(在安全模式中不会生效).
mysql.default_host =

; mysql_connect() 的默认user值(在安全模式中不会生效).
mysql.default_user =

; mysql_connect() 的默认password值(在安全模式中不会生效).
; 注意在此文件中保存密码一般来说是 *糟糕* 的主义.
; *任何* 使用PHP的用户可以执行 ‘echo get_cfg_var(“mysql.default_password”)
; 并且获取到此密码! 而且理所当然, 任何有对此文件读权限的用户都可以获取到此密码.
mysql.default_password =

; 连接超时的最大时间 (秒) , -1 意味着没有限制.
mysql.connect_timeout = 60

; 追踪模式. 当 trace_mode 被打开 (=On), table/index 扫描的警告和SQL错误会被显示出来.
mysql.trace_mode = Off

[MySQLi]

; 最大连接数. ?-1 意味着没有限制.
mysqli.max_links = -1

; mysqli_connect()默认的端口号. ?如果没有设置, mysql_connect() 会使用 $MYSQL_TCP_PORT
; 或者 位于/etc/services的 mysql-tcp 入口或者编译时定义的MYSQL_PORT 值(按照此顺序查找).
; Win32 只会查找MYSQL_PORT值.
mysqli.default_port = 3306

; 对于本地MySQL连接的默认socket名称. 如果为空, 则使用MySQL内建默认值.
mysqli.default_socket =

; mysqli_connect() 的默认host值(在安全模式中不会生效).
mysqli.default_host =

; mysqli_connect() 的默认user值(在安全模式中不会生效).
mysqli.default_user =

; mysqli_connect() 的默认password值(在安全模式中不会生效).
; 注意在此文件中保存密码一般来说是 *糟糕* 的主义.
; *任何* 使用PHP的用户可以执行 ‘echo get_cfg_var(“mysqli.default_password”)
; 并且获取到此密码! 而且理所当然, 任何有对此文件读权限的用户都可以获取到此密码.
mysqli.default_pw =

; 允许或阻止持久连接.
mysqli.reconnect = Off

[mSQL]
; 允许或阻止持久连接.
msql.allow_persistent = On

; 持久连接的最大数目. ?-1 意味着没有限制.
msql.max_persistent = -1

; 最大连接数 (持久 + 非持久). ?-1 意味着没有限制.
msql.max_links = -1

[OCI8]
; 打开使用外部认证的授权连接 (OCI_SYSOPER, OCI_SYSDBA)
;oci8.privileged_connect = Off

; 连接: 每个进程的持久OCI8连接的最大数, -1 意味着没有限制.
;oci8.max_persistent = -1

; 连接: 一个进程允许保持一个空闲持久连接的最大秒数.
; -1意味着空闲持久连接会永远被保持.
;oci8.persistent_timeout = -1

; 连接: 当oci_pconnect() 检测一个连接是否有效时每次发起ping之间必须通过的秒数.
; 当设置为0后, 每个oci_pconnect() 会发起一个ping. Using -1 完全关闭ping.
;oci8.ping_interval = 60

; 调优: 此选项打开声明缓冲(statement cache), 并且指定缓冲多少声明. 使用0关闭声明缓冲.
;oci8.statement_cache_size = 20

; 调优: 打开声明预取(statement prefetch) 并且设置自动在声明执行后被取到行的数量.
;oci8.default_prefetch = 10

; 兼容性: 设置为On 意味着 oci_close() 不会关闭 oci_connect() 和 oci_new_connect() 的连接.
;oci8.old_oci_close_semantics = Off

[PostgresSQL]
; 允许或阻止持久连接.
pgsql.allow_persistent = On

; 总是在 pg_pconnect() 时检测断开的持久连接.
; 自动重置特性会引起一点开销.
pgsql.auto_reset_persistent = Off

; 持久连接的最大数目. ?-1 意味着没有限制.
pgsql.max_persistent = -1

; 最大连接数 (持久 + 非持久). ?-1 意味着没有限制.
pgsql.max_links = -1

; 是否忽略 PostgreSQL 后端通告消息.
; 通告消息记录会需要一点开销.
pgsql.ignore_notice = 0

; 是否记录 PostgreSQL 后端通告消息.
; 除非 pgsql.ignore_notice=0, 否则模块无法记录通告消息
pgsql.log_notice = 0

[Sybase]
; 允许或阻止持久连接.
sybase.allow_persistent = On

; 持久连接的最大数目. ?-1 意味着没有限制.
sybase.max_persistent = -1

; 最大连接数 (持久 + 非持久). ?-1 意味着没有限制.
sybase.max_links = -1

;sybase.interface_file = “/usr/sybase/interfaces”

; 显示出的消息最小严重程度.
sybase.min_error_severity = 10

; 显示出的消息最小严重程度.
sybase.min_message_severity = 10

; 兼容老版本PHP 3.0的模式.
; 如果设为 on, 会引起 PHP 自动绑定结果记录的类型到Sybase的类型,而不是将他们全部按照字符串处理.
; 此兼容模式可能不会永久存在, 所以最好尝试在你代码中需要的地方作出必要的修改, 然后关闭此选项.
sybase.compatability_mode = Off

[Sybase-CT]
; 允许或阻止持久连接.
sybct.allow_persistent = On

; 持久连接的最大数目. ?-1 意味着没有限制.
sybct.max_persistent = -1

; 最大连接数 (持久 + 非持久). ?-1 意味着没有限制.
sybct.max_links = -1

; 显示出的错误最小严重程度.
sybct.min_server_severity = 10

; 显示出的消息最小严重程度.
sybct.min_client_severity = 10

[bcmath]
; 所有bcmath函数的小数位数
bcmath.scale = 0

[browscap]
;browscap = extra/browscap.ini

[Informix]
; 对于 ifx_connect() 的默认host (不会在安全模式被应用).
ifx.default_host =

; 对于 ifx_connect() 的默认user (不会在安全模式被应用).
ifx.default_user =

; 对于 ifx_connect() 的默认password (不会在安全模式被应用).
ifx.default_password =

; 允许或阻止持久连接.
ifx.allow_persistent = On

; 持久连接的最大数目. ?-1 意味着没有限制.
ifx.max_persistent = -1

; 最大连接数 (持久 + 非持久). ?-1 意味着没有限制.
ifx.max_links = -1

; 如果设为 on, select 声明返回 text 段的内容而不是它的id.
ifx.textasvarchar = 0

; 如果设为 on, select 声明返回 byte 段的内容而不是它的id.
ifx.byteasvarchar = 0

; 固定长度字符列的尾部空格会被截去. ?可能对 Informix SE 用户有帮助.
ifx.charasvarchar = 0

; 如果设为 on, text 和 byte 段会被dump到一个文件而不是在内存中保留它们.
ifx.blobinfile = 0

; NULL会被作为一个空字符串返回, 除非被设为1. 如果设为1, NULL会被作为字符串’NULL’返回.
ifx.nullformat = 0

[Session]
; 用来存储/获取数据的处理方法.
session.save_handler = files

; 传送到save_handler的参数. ?在使用文件的情况下, 这里是数据文件被保存的路径.
; 注意: Windows 用户必须改变此值来使用PHP的会话函数.
;
; 和在 4.0.1一样, 你可以定义如下路径:
;
; ? ? session.save_path = “N;/path”
;
; 这里的 N 是一个整数. ?使用此参数会在目录内建立一个N层深度的子目录用来保存session文件,
; 而不是将所有session文件保存在同一个/path目录内.
; 这对你或当你的操作系统在一个目录内保存太多文件时出现问题很有帮助.
; 并且对于处理大量session的服务器提供更高的效率.
;
; 注意 1: PHP不会自动创建目录结构. 你可以使用在ext/session目录内的脚本来创建目录结构.
; 注意 2: 如果你选择使用子目录来保存session,请检查下面关于垃圾回收的配置段
;
; 文件存储模块默认使用600模式来创建文件,在使用中你可以改变此选项
;
; ? ? session.save_path = “N;MODE;/path”
;
; 这里的MODE由8进制来表示. 注意这里不会覆盖进程的umask.
;session.save_path = “/tmp”

; 是否使用cookie.
session.use_cookies = 1

;session.cookie_secure =

; 这个选项允许管理员去保护那些在URL中传送session id的用户免于被攻击
; 默认是 0.
; session.use_only_cookies = 1

; session的名称 (作为cookie名称来使用).
session.name = PHPSESSID

; 在请求开始的时候初始化session.
session.auto_start = 0

; cookie的生存秒数,或者如果为0就直到浏览器重启.
session.cookie_lifetime = 0

; cookie有效的路径.
session.cookie_path = /

; cookie有效的域名.
session.cookie_domain =

; 是否将httpOnly标志增加到cookie上, 增加后则cookie无法被浏览器的脚本语言(例如JavaScript)存取.
session.cookie_httponly =

; 用于序列化数据的处理器. php是标准的PHP序列化器.
session.serialize_handler = php

; 定义’垃圾回收’进程在每次session初始化时开始的比例.
; 比例由 gc_probability/gc_divisor来得出,
; 例如. 1/100 意味着在每次请求时有1%的机会启动’垃圾回收’进程.

session.gc_probability = 1
session.gc_divisor ? ? = 100

; 在经过以下秒数之后, 存储的数据会被认为是’垃圾’并且被垃圾回收进程清理掉.
session.gc_maxlifetime = 1440

; 注意: 如果你使用子目录选项来保存session文件
; ? ? ? (查看在上面的session.save_path), 那么垃圾回收就 *不会* 自动发生.
; ? ? ? 你需要通过一个shell脚本,cron或者其他方法来自行处理垃圾回收.
; ? ? ? 例如, 下面的脚本相当于将session.gc_maxlifetime设置为 1440 (1440 秒 = 24 分钟):
; ? ? ? ? ?cd /path/to/sessions; find -cmin +24 | xargs rm

; PHP 4.2 和更早版本有一个未公开的 特性/bug , 此特性允许你在全局初始化一个session变量,即便 register_globals 已经被关闭.
; 如果此特性被使用,PHP 4.3 和更早版本会警告你.
; 你可以关闭此特性并且隔离此警告. 这时候,如果打开bug_compat_42,那此警告只是被显示出来.

session.bug_compat_42 = 1
session.bug_compat_warn = 1

; 检查HTTP Referer来防止带有id的外部URL.
; HTTP_REFERER 必须包含从session来的这个字段才会被认为是合法的.
session.referer_check =

; 从此文件读取多少字节.
session.entropy_length = 0

; 在这里指定创建session id.
session.entropy_file =

;session.entropy_length = 16

;session.entropy_file = /dev/urandom

; 设置为 {nocache,private,public,} 来决定HTTP缓冲的类型
; 留空则防止发送 anti-caching 头.
session.cache_limiter = nocache

; 文档在n分钟之后过期.
session.cache_expire = 180

; trans sid 支持默认关闭.
; 使用 trans sid 可能让你的用户承担安全风险.
; 使用此项必须小心.
; – 用户也许通过email/irc/其他途径发送包含有效的session ID的URL给其他人.
; – 包含有效session ID的URL可能被存放在容易被公共存取的电脑上.
; – 用户可能通过在浏览器历史记录或者收藏夹里面的包含相同的session ID的URL来访问你的站点.
session.use_trans_sid = 0

; 选择hash方法
; 0: MD5 ? (128 bits)
; 1: SHA-1 (160 bits)
session.hash_function = 0

; 当转换二进制hash数据到可读形式时,每个字符保存时有几位.
;
; 4 bits: 0-9, a-f
; 5 bits: 0-9, a-v
; 6 bits: 0-9, a-z, A-Z, “-“, “,”
session.hash_bits_per_character = 4

; URL rewriter会在已经定义的一组HTML标签内查找URL.
; form/fieldset 是特殊字符; 如果你在这里包含他们, rewriter会增加一个包含信息的隐藏<input>字段否则就是在URL中附加信息.
; 如果你你想遵守XHTML, 删除form的入口.
; 注意 所有合法的入口都需要一个”=”符号, 甚至是没有任何值的.
url_rewriter.tags = “a=href,area=href,frame=src,input=src,form=,fieldset=”

[MSSQL]
; 允许或阻止持久连接.
mssql.allow_persistent = On

; 持久连接的最大数目. ?-1 意味着没有限制.
mssql.max_persistent = -1

; 最大连接数 (持久 + 非持久). ?-1 意味着没有限制.
mssql.max_links = -1

; 显示出的错误最小严重程度.
mssql.min_error_severity = 10

; 显示出的消息最小严重程度.
mssql.min_message_severity = 10

; PHP 3.0 老版本的兼容模式.
mssql.compatability_mode = Off

; 连接超时
;mssql.connect_timeout = 5

; 查询超时
;mssql.timeout = 60

; 有效范围 0 – 2147483647. ?默认 = 4096.
;mssql.textlimit = 4096

; 有效范围 0 – 2147483647. ?默认 = 4096.
;mssql.textsize = 4096

; 每批记录的数量限制. ?0 = 所有记录在一批内.
;mssql.batchsize = 0

; 指定 datetime 和 datetim4 栏如何返回
; On => 返回数据转换到SQL服务器设置的格式
; Off => 使用 YYYY-MM-DD hh:mm:ss 返回
;mssql.datetimeconvert = On

; 当连接到服务器时使用NT验证
mssql.secure_connection = Off

; 指定最大进程数. -1 = 库默认
; msdlib 默认 25
; FreeTDS 默认 4096
;mssql.max_procs = -1

; 指定客户端字符集.
; 如果为空或者没有指定,客户端字符集将会使用freetds.conf的配置
; 只有和FreeTDS编译时会被使用
;mssql.charset = “ISO-8859-1”

[Assertion]
; 断言(expr); 默认打开.
;assert.active = On

; 对于每个失败断言发起一个PHP警告.
;assert.warning = On

; 默认不要保释.
;assert.bail = Off

; 如果断言失败则调用用户自定义函数.
;assert.callback = 0

; 使用当前 error_reporting() Eval一个表达式. ?如果你想要在eval()附近error_reporting(0) ,那设置为true.
;assert.quiet_eval = 0

[COM]
; 包含GUID,IID或者TypeLibs的文件的文件名的文件的路径
;com.typelib_file =
; 允许 Distributed-COM 调用
;com.allow_dcom = true
; 自动注册位于com_load()函数的组件typlib的常量
;com.autoregister_typelib = true
; 注册常量大小写敏感
;com.autoregister_casesensitive = false
; 当有重复常量注册时显示警告
;com.autoregister_verbose = true

[mbstring]
; 内部字符表示的语言.
;mbstring.language = Japanese

; 内部/脚本编码.
; 部分编码无法作为内部编码使用.
; (例如. SJIS, BIG5, ISO-2022-*)
;mbstring.internal_encoding = EUC-JP

; http 输入编码.
;mbstring.http_input = auto

; http 输出编码. mb_output_handler 必须作为函数被注册为输出缓冲
;mbstring.http_output = SJIS

; 按照mbstring.internal_encoding的设置打开自动编码转换
; 当设置为On时,输入字符被转换为内部编码.
; 注意: 不要针对可移植库/应用使用自动编码转换.
;mbstring.encoding_translation = Off

; 自动编码检测序列
; 自动意味着
;mbstring.detect_order = auto

; 当无法将字符从一种转换到另一种时使用的置换符号
;mbstring.substitute_character = none;

; 使用mbstring函数 覆盖(替换) 单字节函数.
; mail(), ereg(), 等等都会被 mb_send_mail(), mb_ereg() 等等覆盖,
; 可以取的值是 0,1,2,4 或者他们的组合.
; 例如, 7 就是覆盖所有函数.
; 0: 不覆盖
; 1: 覆盖 mail() 函数
; 2: 覆盖 str*() 函数
; 4: 覆盖 ereg*() 函数
;mbstring.func_overload = 0

[FrontBase]
;fbsql.allow_persistent = On
;fbsql.autocommit = On
;fbsql.show_timestamp_decimals = Off
;fbsql.default_database =
;fbsql.default_database_password =
;fbsql.default_host =
;fbsql.default_password =
;fbsql.default_user = “_SYSTEM”
;fbsql.generate_warnings = Off
;fbsql.max_connections = 128
;fbsql.max_links = 128
;fbsql.max_persistent = -1
;fbsql.max_results = 128

[gd]
; 告知jpeg解码器libjpeg警告并且尝试创建一个gd图像. 此警告会被作为一个通告显示
; 默认为关闭
;gd.jpeg_ignore_warning = 0

[exif]
; Exif UNICODE 用户注释会被作为UCS-2BE/UCS-2LE 和 JIS 来进行 JIS处理.
; 当 mbstring.internal_encoding 设置为空,如果有 mbstring 支持,则会自动转换到给出的对应编码设置的编码.
; 对于解码设置你可以在motorola和intel字符序列上进行选择. 解码设置不能设置为空.
;exif.encode_unicode = ISO-8859-15
;exif.decode_unicode_motorola = UCS-2BE
;exif.decode_unicode_intel ? ?= UCS-2LE
;exif.encode_jis =
;exif.decode_jis_motorola = JIS
;exif.decode_jis_intel ? ?= JIS

[Tidy]
; 当调用tidy时,默认指向tidy配置文件的路径
;tidy.default_config = /usr/local/lib/php/default.tcfg

; tidy是否自动清除和修复输出?
; 警告: 不要在你产生非html内容时使用此项,例如产生动态图片时
tidy.clean_output = Off

[soap]
; 打开或关闭WSDL缓冲特性.
soap.wsdl_cache_enabled=1
; 设置SOAP扩展存放缓冲文件的目录.
soap.wsdl_cache_dir=”/tmp”
; (存活时间) 设置当缓冲文件被用来替换原有缓冲文件的秒数.
soap.wsdl_cache_ttl=86400

; Local Variables:
; tab-width: 4
; End:
