---
layout: home
title: Documentation
permalink: /documentation/
---
# Cylc Documentation
{:.no_toc}

First read the [front page of this website]({{'/' | relative_url}}), then:

* replace-me
{:toc}

Note that **SUITE** is just another word for **WORKFLOW** in Cylc docs
(this is numerical weather prediction terminology that dates back a long way).

## The Cylc User Guide

* [User Guide]({{ '/doc/build/7.8.7/html/index.html' | relative_url}})

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

---

## A Cycling Workflow Example

The following example is intended to convey something of basic Cylc
functionality. However, it barely scratches the surface; to understand more,
read the User Guide!

{% assign foo='# suite.rc:
[scheduling]
  initial cycle point = 2021
  final cycle point = 2023
  [[dependencies]]
    [[[R1]]]  # Initial cycle point.
      graph = prep => model
    [[[R//P1Y]]]  # Yearly cycling.
      graph = model[-P1Y] => model => post
    [[[R1/P0Y]]]  # Final cycle point.
      graph = post => stop

[runtime]
  [[root]]  # Inherited by all tasks.
    script = sleep 10
  [[model]]
    script = echo "my FOOD is $FOOD"; sleep 10
    [[[environment]]]
      FOOD = icecream
  [[prep]]
    # ...
  # ...'%}

**Create A New workflow**
{% include figure2.html title='' url='/assets/img/suiterc.png' desc=foo %}


{% assign bar='$ cylc register test1 ~/suites/test/suite.rc
REGISTER test1: /home/bob/suites/test

$ cylc print test1
test1 | A first test suite | ~/suites/test

$ cylc edit test1  # Open the workflow in your editor again.

$ cylc help  # See other commands!

$ cylc validate test1
Valid for cylc-7.8.1

$ cylc graph test1 &' %}

**Register, Validate, and Visualize**
{% include figure2.html title='' desc=bar url='/assets/img/cylc-graph.png' %}

{% assign baz='$ cylc run test1
    # OR
$ gcylc test1 &  # (and run it from the GUI)' %}

**Run**
{% include figure2.html title='' desc=bar url='/assets/img/gcylc-example.png' %}

**View Task Job Output**

    $ cylc log -m cat -f o test1 model.2021

    Suite    : test1
    Task Job : 2021/model/01 (try 1)
    User@Host: bob@hpc-1.niwa.co.nz

    my FOOD is icecream

    2017-03-20T19:37:49Z NORMAL - started
    2017-03-20T19:37:59Z NORMAL - succeeded


## Frequently Asked Questions

(This FAQ is still new and will be added to in time).

#### What are the major capabilities and features of Cylc?

See the [front page of this website]({{'/' | relative_url}})

#### Does Cylc automatically manage task data?

No. For maximum flexibility and generality, Cylc is a pure orchestration engine
that manages task execution according to *abstract dependencies*. It is left to
the workflow designer to make sure that the tasks use shared data areas or move
data around as needed, by whatever means is appropriate to your data types and
platforms. (Cylc does provide easy access to a self-contained shared data area
for each workflow). This is easy to do, and it avoids the risk of restrictive
assumptions or unnecessary data movement.

We do note however that there are good use cases for a "data modeling" approach
whereby the workflow structure self-assembles from explicit *data
dependencies*, and the workflow engine may automatically manage the data too.
Cylc actually uses a self-assembling workflow model internally, and we are
considering exposing this again as an option in the future.

#### Does Cylc have built-in Cloud and Container "integration"?

No, because our historical home base is production weather forecasting, and
related systems, which is still almost entirely done on in-house HPC systems.
Cloud and containers are definitely coming soon to this world too, but for the
moment you'll have to "roll your own" use of Cylc with them. That is easy
enough to do though because Cylc runs on any Linux VM and the jobs that it
manages can do anything you want.

#### Does Cylc support the Common Workflow Language?

No, Cylc doesn't support CWL at this stage because CWL does not understand
cycling workflows (see for example the eWaterCycle Case Study in the [Cylc
CiSE paper](#publications)).


## Screenshots

{% for item in site.data.screenshots %}
---
{% include figure.html title=item.title desc=item.desc url=item.url %}

{% endfor %}
