---
layout: home
title: Screenshots
permalink: /screenshots/
---

# Screenshots

These show the current <b>Cylc 7</b> production system.

<b>Cylc 8</b> (coming soon) will feature a web UI.

{% for item in site.data.screenshots %}
---
{% include figure.html title=item.title desc=item.desc url=item.url %}

{% endfor %}
