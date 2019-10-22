---
layout: home
title: Documentation
permalink: /documentation/
---
# Table of Contents
{:.no_toc}

* replace-me
{:toc}

## Documentation And Information Links

### The Cylc User Guide

Online copies of the documentation are available here:

* [Multi-Page version](/../doc/built-sphinx/index.html) (with word search box)
* [Single-Page version](/../doc/built-sphinx-single/index.html) - (search with browser Ctrl-F)

(Includes the formerly-separate Suite Design Guide).

### Presentations

Format HTML5 with embedded .webm videos (plays natively in Firefox or Chrome).
Hit the "Home" and "End" keys to skip to the beginning and end of the
presentation, and the 'o' key for a multi-slide summary. This is the
[dzslides](https://github.com/paulrouget/dzslides) framework by Paul Roget.

* [Cylc Keynote](/../cylc-keynote-lisbon-Sept2016/index.html) - from
  the IS-ENES2 Workshop on Workflow in Earth Systems Modeling, Lisbon,
  September 2016

* [Cylc High Level Introduction](/../BoM-Feb-2017/index.html) - Bureau of
  Meteorology, Melbourne, February 2017

### Publications, Citations, and References

Please cite Cylc in your publications if you used it to automate your workflows.

* [DOI: 10.1109/MCSE.2019.2906593](https://doi.org/10.1109/MCSE.2019.2906593) -
     A major peer-reviewed article in Computing in Science and Engineering.

> H. Oliver et al., "Workflow Automation for Cycling Systems: The Cylc Workflow Engine",
> Computing in Science & Engineering Vol 21, Issue 4, July/Aug 2019.
> DOI: 10.1109/MCSE.2019.2906593

* [![DOI](http://joss.theoj.org/papers/10.21105/joss.00737/status.svg)](https://doi.org/10.21105/joss.00737) -
   A short peer-reviewed article in the Journal of Open Source Software.

> Oliver et al., (2018). "Cylc: A Workflow Engine for Cycling Systems.",
> Journal of Open Source Software, 3(27), 737.
> [DOI: 10.21105/joss.00737](https://doi.org/10.21105/joss.00737)

* [![DOI](https://zenodo.org/badge/1836229.svg)](https://zenodo.org/badge/latestdoi/1836229) -
   Citable DOI for Cylc code releases.

#### Cylc Response to "Assessment Report on Autosubmit, Cylc and ecFlow"

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

...[CLICK HERE FOR THE FULL RESPONSE](/../doc/cylc-autosub-response.pdf) (PDF)

---

## A Cycling Workflow Example

The following example is intended to convey something of basic Cylc
functionality.  However, it barely scratches the surface; to understand more,
read the User Guide!

### Create A New Suite

    $ mkdir -p ~/suites/test/
    $ vim ~/suites/test/suite.rc

    # suite.rc:
    [meta]
      title = Test Suite One

    [cylc]
      cycle point format = %Y

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
      # ...

    [visualization]
      use node color for edges = True
      [[node attributes]]
        root = "style=filled", "fontcolor=white"
        prep =  "color=#00a778"
        stop =  "color=#bf9c00"
        model = "color=#0074cd"
        post =  "color=#af3936"

### Register

    $ cylc register test1 ~/suites/test
    REGISTER test1: /home/bob/suites/test

    $ cylc print test1
    test1 | A first test suite | ~/suites/test

    $ cylc edit test1  # Open the suite in your editor again.

    $ cylc help  # See other commands!

### Validate

    $ cylc validate test1
    Valid for cylc-7.8.1


### Visualize

    $ cylc graph test1 &

<img class="cylc-graph" src="/assets/img/cylc-graph.png" alt="Cylc Graph" />


### Run

    $ cylc run test1
        # OR
    $ gcylc test1 &  # (and run it from the GUI)

![img/gcylc-example.png](/assets/img/gcylc-example.png)

### View Task Job Output

    $ cylc log -m cat -f o test1 model.2021

    Suite    : test1
    Task Job : 2021/model/01 (try 1)
    User@Host: bob@hpc-1.niwa.co.nz

    my FOOD is icecream

    2017-03-20T19:37:49Z NORMAL - started
    2017-03-20T19:37:59Z NORMAL - succeeded