---
layout: post
title: MongoDB 分片集群搭建之分片选择分享
categories: [mongodb, linux, database, thinking]
description: MongoDB 分片集群搭建之分片选择分享
keywords: mongodb, linux, database, sharding, sharding key
---


一直想找时间把搭建公司 MongoDB 集群时分片的选择总结分享一波，总是忙加上再持续学习其他知识，这篇分享一直断断续续的写，今天终于把整篇完成了，和大家一起分享下我关于 MongoDB 分片选择的一些经验，供大家参考。

分享可能有误，欢迎大家指正。

## 使用环境

**选择 Shard Key 一定要根据应用的使用环境来进行判断，否则将事倍功半！**

由于使用 MongoDB 数据库的应用是一个基于物联网的应用，因此数据库将存储大量现场 IOT 硬件发回的数据。在应用中有以下一个非常值得关注而且非常重要的的点：

* 查看数据时，会选择某个用户/硬件一段连续时间段内的所有数据去查询，不会选择具体某个时间点去查询数据

以上信息在整个 Shard Key 选择中是非常重要的参考依据。


## Shard Key 特点

关于 Shard Key 的介绍，可以查看[官方文档](https://docs.mongodb.com/manual/core/sharding-shard-key/)。

Shard Key 可以说是 MongoDB 分片的灵魂了，如果分片键没有选好，整个分片集群就没有起到集群本身的作用，所以，这个分片集群基本上就算废了。

shard key 在分片中的主要特点：

* 数据索引

    作为 shard key 首先作用就是作为数据索引，因为建立 shard key 之前的必要条件就是必须是数据索引

* 不可更改

    shard key 是固定的，一旦确定后，将不可进行更改

* 随机性

    shard key 一定要具有一定的随机性。如果没有选择好 shard key，造成顺序性，则数据会落在某个特定的节点中，造成某节点数据过多，而其他节点却没有数据的情况。

一个好的 shard key 应该具备的特点：

* key 分布足够离散 （sufficient cardinality）

    足够分散才能带来性能上的增加

* 写请求均匀分布 （evenly distributed write）

    数据应该均匀分布在所有的数据节点上

* 尽量避免 scatter-gather 查询 （targeted read）

    避免大范围的扫描查询


## 现有 Shard Key 类型

MongoDB 支持2种分片方式：

* 范围分片

    通常能很好的支持基于 shard key 的范围查询

* Hash 分片

    通常能将写入均衡分布到各个 shard，不过对范围查询支持不好

* 


## 利弊分析

## 总结

