---
layout: page
title: Wiki
description: 人越学越觉得自己无知
keywords: 维基, Wiki, 百科
comments: false
menu: 百科
permalink: /wiki/
---

> 每天巩固才能让自己成为百科

<ul class="listing">
{% for post in site.wiki %}
    {% if post.title != "Wiki Template" %}
    <li class="listing-item"><a href="{{ site.url }}{{ post.url }}">{{ post.title }}</a></li>
    {% endif %}
{% endfor %}
</ul>
