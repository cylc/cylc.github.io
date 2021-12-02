---
layout: home
title: Documentation
permalink: /documentation/
---
# Cylc Documentation
{:.no_toc}

* replace-me
{:toc}

## Cylc Online Documentation

* [stable release (Cylc 7)](https://cylc.github.io/cylc-doc/stable/html/index.html)
* [latest release (Cylc 8)](https://cylc.github.io/cylc-doc/latest/html/index.html)

## Publications

Please cite Cylc in your publications if you use it to automate your workflows.

* [DOI: 10.1109/MCSE.2019.2906593](https://doi.org/10.1109/MCSE.2019.2906593) 
> *H. Oliver et al., **Workflow Automation for Cycling Systems: The Cylc
> Workflow Engine**, Computing in Science & Engineering Vol 21, Issue 4,
> July/Aug 2019. DOI: 10.1109/MCSE.2019.2906593*

* [![DOI](http://joss.theoj.org/papers/10.21105/joss.00737/status.svg)](https://doi.org/10.21105/joss.00737)
> *Oliver et al., (2018). **Cylc: A Workflow Engine for Cycling Systems**,
> Journal of Open Source Software, 3(27), 737.
> DOI: 10.21105/joss.00737*

* [![DOI](https://zenodo.org/badge/1836229.svg)](https://zenodo.org/badge/latestdoi/1836229)
> Citable DOI for Cylc code releases.

**Response to "Assessment Report on Autosubmit, Cylc and ecFlow"**

*The Cylc developers would like to respond to a recent comparison paper,
__Assessment report on Autosubmit, Cylc and ecFlow__ (2016, Domingo Manubens-Gil
et. al.) and another that references it, __Seamless Management of Ensemble
Climate Prediction Experiments on HPC Platforms__ (2016, Domingo Manubens-Gil
et. al.).  Two of us are listed as contributors to the first paper but it should
be noted that the contribution was limited by time and workload constraints to
major corrections relating to Cylc (all of which were addressed by the lead
author).*

*The lead author of both papers is also the lead developer of Autosubmit.
Perhaps inevitably as the developers of Cylc we have a rather different view on
the strengths and weaknesses of the different systems.  In particular we would
like to address the following points.*

...[CLICK HERE FOR THE FULL RESPONSE]({{'/doc/cylc-autosub-response.pdf' | relative_url}}) (PDF)


## Screenshots

{% for item in site.data.screenshots %}
---
{% include figure.html title=item.title desc=item.desc url=item.url %}

{% endfor %}
