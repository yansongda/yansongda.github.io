---
title: 如何写出一份好的PRD（产品需求文档）
description: 如何写出一份好的PRD（产品需求文档）
date: 2014-02-04
categories:
  - wiki
  - reading
---

PRD（Product Requirement Document，产品需求文档），顾名思义是阐述产品需求的一种文档，其核心是将需求描述清楚。
通过PRD可以看出一个产品经理对产品理解的逻辑思维，产品经理在相关领域的认知和专业的深度以及对产品全局的认识。如何才能写出好的PRD，让产品研发团队成员，开发、测试、运营同学了解产品需求，让其他人能从该文档中看到产品的价值和意义，估计很多人都思考过，如何让PRD不被其他人挑战，如何获得他们的认可估计是产品经理经常考虑的问题。也有人可能认为PRD只要中心思想不变，阐明需求就已经足够，交给下游的同学他们理解了就完事了，但是这个文档是否被叫好，是否有用，是否有价值可能从没考虑过。

![码农是如何炼成的](/images/posts/2014-02-04-prd.jpg)

在此将从PRD的用户侧分析好的PRD应该具备的要素或必要条件。

首先，先了解清楚PRD的阅读对象，使用者。

PRD的模版中一般有如下信息：

**PRD预期的读者包括：产品、开发、测试人员及相应的负责人和用户方代表。产品、开发、测试人员会从中了解到本次需求的背景和详细要求，以及每个需求点未来的优化方向或对用户的价值。而用户方代表则可以通过该文档了解PRD中所描述内容是否是自己期望中的需求，是否符合以及是否都覆盖到了自己的预期。因此PRD也是产品经理同相关角色确认开发任务的重要依据。当所有角色认可了PRD中的内容后，这份PRD将作为后续开发、测试、需求验证的依据。**

其次，一个完整的PRD还应该具备的要素有

## 文档的命名和编号

文档的编号和命名很关键，每个产品都是经过若干个迭代才完成的，而每个迭代所完成的产品功能或者升级的需求都可能是不一样的，因此需要定义清楚该文件属于产品的哪个迭代，修改了几个版本。文件命名的方法一般是通过版本号定义，比如简单的方法是，XX产品V1.0PRD_V2,前面的V1.0是产品迭代的编号，后面的V2 PRD的版本号。稍微详细点可以定义成，XX产品XXXX需求PRD_V2,即对本次迭代的需求任务做命名，这样更便于阅读和记忆。

## 文档的版本历史

包括，编号、文档版本、章节、修改原因、日期、修改人。编号只是为了记录修改的顺序，文档版本显示的当前修改的内容属于文档的第几个版本（或第几次修改，一次修改一般为一个版本），章节是具体到修改内容属于的功能模块，以便阅读人及时找到修改后的内容，修改原因说明为什么要修改该需求，让阅读者直观的了解原因。日期是指需求文档修改的时间，修改人是指需求内容的修改者。

## 目录

不需要自己新建，文档完成后直接更新模版中的目录即可,目录是用来了解文档结构的.

## 引言

这部分的内容有：产品概述及目标、产品roadmap、预期读者、成功的定义标准和判断、参考资料、名词说明

**产品概述：** 解释说明该产品研发的背景以及核心功能。

**产品roadmap：** 为产品规划的蓝图，每个关键阶段完成的核心任务。产品研发是个不断迭代的过程，需要经过若干个版本的迭代，，对一个功能点做了N个迭代后最终又回归到了第一个迭代是很常见。产品经理需要做好心理准备。产品roadmap并不需要全部规划好所有的阶段目标，但是对产品未来发展趋势的一种预估，要达到目标，需要更多的更新和迭代。清晰的呈现产品的roadmap可以帮助产品经理把握产品的全貌，更好的控制研发过程。

**预期读者：** 文档的使用对象

**成功的定义和判断标准：** 旨在说明产品的目标

**参考资料：** PRD的参考资料

**名词说明：** 名称、说明。名称就是对文档中会出现的比较新的名称，说明则是对这些名称进行解释。

## 需求概述

需求概述通常包括需求概览、用户类与特征、运行环境、设计和实现上的限制、项目计划、产品风险等等

**需求概览：** 分两部分，一是业务流程图，对产品整个业务流程的发生过程做图形化的展示，是对产品整体功能流程的阐释。二是需求清单，对本次要开发的需求任务做分类，给出简明扼要的需求描述并标注优先级。

**用户类与特征：** 产品的最终用户，确定产品的最终使用者，并对使用者的角色和操作行为做出说明。

**运行环境：** 该产品上线后的使用环境，比如支持的浏览器及其版本，操作系统、数据库的要求等等，测试人员在看到环境要求后会在测试时重点测试，而最终上线产品时需要把最佳的运营环境告知给用户。

**设计和实现上的限制：** 比如控件的开发环境、接口的调用方式等等

**项目计划：** 对于prd中要开发的内容，给出关键里程碑，比如需求评审通过的时间、开发的完成时间、上线时间等等

**产品风险：** 描述产品可能存在的风险，比如性能瓶颈，没有解决的问题，用户不当使用的风险等等。

## 功能需求

功能需求一般是由功能详情和主流程说明两大部分。功能详情是所有的产品功能的描述和规划。功能详情包括以下内容：

**简要说明：** 介绍此功能的用途，包括其来源或背景，能够解决哪些问题。

**场景描述：** 产品在哪种情况下会被用户使用，就是用户场景模拟。这也是产品经理讲“好”故事的必备条件。

**业务规则：** 每上产品在开发时都有相应的业务规则，将这些规则清晰的描述出来，让开发、测试人员能够直观的明白该规则，且没有产生歧义。业务规则必需是完整的、准确的、易懂的。业务规则的描述上如果涉及到页面交互或者页面的修改，建议给出页面的草图或者页面截图在图上说明要修改的内容。另外也建议对页面的输入框、下拉框的内容格式、长度、控件之间的关联性做出说明，什么时候可见，不可见，灰掉或点亮的条件在文档中都给出说明。方便阅读者理解业务规则。

**界面原型：** 如前所述，涉及到页面交互的部分，产品经理需要设计页面原型。原型设计通常需要产品经理和UI设计师一起来完成。建议的做法是，产品经理可设计一个页面框架，将该页面要呈现的字段及其特征以及页面要使用的场景向交互设计师解释清楚。之后交互和视觉设计师完成产品的原型设计。

**使用者说明：** 对产品使用者做出说明，可融入简要说明中。

**前置条件：** 该需求实现依赖的前提条件。比如，上传照片时，需要存有图像文件。

**后置条件：** 操作后引发的后续处理。

**主流程：** 把主流放在最后是有道理的，结合上面所说的，做出主流程说明，对每个功能流程走向分点说明（这是非常重要的）。

看过很多的PRD，文档中对既没有前提条件，也没有后置条件，只对主流程做了说明，但是在描述主流程时却没有描写主流程中每个功能流程的各种走向，只有一个主走向，让人感觉prd成了操作手册。事实上，对分支的介绍是非常重要的，开发和测试中提出的各类问题均与对分支的定义不明有关。一个合格的PRD不仅要描述主流程，同时对分支流程所出现的各类问题都要做详细阐述并给出解决办法。PRD的特征一定是明确的、全面的阐述需求及各类异常情况的处理而不是等到开发和测试阶段发现问题后再给以答案（虽然PRD不可能百分之百的覆盖所有的可能，但是最大化的思考所有的业务问题是编制PRD时必须遵守的原则）。另外，在描写功能需求时给出的办法中不能出现“可能”、“或者”等词，一定是明确的，唯一的描述。如果有别的方案，建议写入“可选方案”，在产品构建的早期可选方案可以为功能实现提供更多的选择，当方案确定后可在文档中注明本次使用了哪种方案。

**推荐一个方法：“用例”，在面向对象的软件设计模型中，用例是一个被阐述的内容，用例是对功能使用场景的解释。用例很条理的介绍了每个功能的前置、后置条件，主流程介绍，帮助开发、测试等角色快速的了解产品功能。**

## 可选方案

列出所有可以选择的达到该产品目标的方案要点（主要思路），给各方案适当的评价，并推荐最优方案（在功能需求中描述的）。你在做这个产品规划时一定有很多的备选方案，别放弃这些方案，永远没有过时的idea，只有最适合时机的idea。所以可以写出几个可选方案，或许是你下期产品改版一个方向。记住，多思考方案是永不为过的

## 效益成本分析

通过这一点上能看出产品经理必须是个全才，不仅要具备行业知识，还需要有财务知识。一个产品的成本衡量一般包括三个方面：效益预测、产品技术成本和其他成本支出。

效益预测是指所提供的功能在未来能产生的效益，可通过对比以往的产品或者竞争对手的产品来做预估，效益预测的指标，如每个功能点的潜在用户数、使用频率，吸引到的新的用户特征及数量。产品技术成本是指研发设计以及上线后的运营需要的资源需求，包括人力，软硬件（带宽、服务器、机房）支出。当有项目经理时可以由项目经理来协调这部分需求，如果没有项目经理，产品经理得挑头了，召集开发经理去找运维等部门落实此事。其他的成本还包括支持成本，比如上线后的运营资源投入、市场推广投入以及客服服务投入等。

此处建议产品经理们都去学习一门课《非财务人员的财务管理》体验下财务的过程管理，如果能亲历沙盘训练，记录财务明细账目，核算资产负债、现金流量、利润率的计算，对成本和利益的核算非常有帮助，而且财务上要求的一丝不苟、精益求精也是每个产品经理需要长期坚持和遵守的。

## 整合需求

产品整合能力是产品经理很重要的一个能力，业务合作通常是不可避免的，将隶属于两个不同来源的业务功能做整合也是常见需求，比如系统登陆使用公司的域用户登陆，或者付款使用财付通、支付宝付款，解决好整合需求也是体现产品经理核心竞争力的一大重要表现。

## BETA测试需求

很多产品在正式上线前都有BETA版本或者内测版本，或者叫灰度版本，目的是在测试产品的一些核心功能或者性能。这部份内容不是必须的，但如果需要，需要给出在此阶段要实现的目标或测试、衡量标准。

## 非功能性需求

一般情况下非功能性需求包括以下几个部分：产品营销需求、运营需求、财务需求、法务需求、使用帮助、问题反馈等。这些信息构成了产品上线的完整内容，也很好的体现了产品经理的综合素质。

## 运营计划

产品上线后如何运营，目标受众是什么，建议的推广策略、问题反馈途径、风险监控、亮点宣传等等，以及与运营人员的协作方式。作为产品的设计人员不是开发完产品就能画句号的，让产品用起来、用得好，有口碑更为重要，所以非常建议运营计划的制定上有产品设计人员的参与。

再次，说下需求变更需求不是一成不变的，在产品研发过程中需求变更是正常的，产品团队成员需正确的看待需求变更，并要控制好变更。这里的建议是在做需求分析时，尽可能把每个问题都考虑透彻，提前做好需求变更的预估及应对方案，必要的情况下和团队成员提前沟通存在变更的内容。

在与团队沟通变更时，需要以一种开放的心态，从团队成员的角度、产品未来的发展趋势、市场格局的变化正确的提出变更需求，始终保持产品方向的正确和团队成员目标的一致。

## 总结
PRD的能力映射出的是一个产品经理的产品能力，这种能力分基础和高级两类，毋庸置疑，PRD应该是一种基础能力，产品经理必备的一种技能，PRD的能力反映的就是产品经理对用户需求的理解能力，这种能力其实是建立在对行业的专业知识（表现在对业务的理解力）基础上，再加之良好的沟通能力，一个优秀的产品经理写出的PRD必然是准确度高，开发出来的产品扩展性好，同时受用户欢迎。因此产品经理在日常必须深入学习行业知识，了解用户的操作规则，多与用户沟通，多倾听问题，从而发现问题，解决问题，随着对行业和用户的理解及把控的逐步深刻，PRD阐述的内容将越来越全面，越来越有深度，这份PRD将成为其他人的学习资料，会产生深远的影响。都说产品经理引领着产品的发展方向，是产品的“爸爸”或“妈妈”，衷心的希望每个产品经理都能做个称职的父母亲。

---

>作者：Cherry，2007年进入腾讯公司，一直从事互联网广告产品管理工作，目前在SNG/效果广告平台部从事效果广告的产品运营工作。
