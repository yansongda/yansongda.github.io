---
layout: post
title: MongoDB 分片集群搭建之分片选择分享
categories: [mongodb, linux, database, thinking]
description: MongoDB 分片集群搭建之分片选择分享
keywords: mongodb, linux, database, sharding, sharding key
---


一直想找时间把搭建公司 MongoDB 集群时分片的选择总结分享一波，总是忙加上再持续学习其他知识，今天有些时间，和大家一起分享下我关于 MongoDB 分片选择的一些经验，供大家参考。

分享可能有误，欢迎大家指正。

## 使用环境

**选择 Shard Key 一定要根据应用的使用环境来进行判断，否则将事倍功半！**

由于使用 MongoDB 数据库的应用是一个基于物联网的应用，因此数据库将存储大量现场 IOT 硬件发回的数据。在应用中有以下一个非常值得关注而且非常重要的的点：

* 查看数据时，会选择某个用户/硬件一段连续时间段内的所有数据去查询，不会选择具体某个时间点去查询数据

以上这个信息在整个 Shard Key 选择中是非常重要的参考依据。


## Shard Key 作用

关于 Shard Key 的介绍，可以查看[官方文档](https://docs.mongodb.com/manual/core/sharding-shard-key/)。

Shard Key 可以说是 MongoDB 分片的灵魂了，如果分片键没有选好，整个分片集群就没有起到集群本身的作用，所以，这个分片集群基本上就算废了。

* 


## 现有 Shard Key



## 利弊分析

## 总结

