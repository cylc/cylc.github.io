---
layout: home
title: Frequently Asked Questions
---

# Frequently Asked Questions

(This FAQ is still new and will be added to in time).

## What are the major capabilities and features of Cylc?

See the [front page of this website]({{'/' | relative_url}})

## Does Cylc automatically manage task data?

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

## Does Cylc have built-in Cloud and Container "integration"?

No, because our historical home base is production weather forecasting, and
related systems, which is still almost entirely done on in-house HPC systems.
Cloud and containers are definitely coming soon to this world too, but for the
moment you'll have to "roll your own" use of Cylc with them. That is easy
enough to do though because Cylc runs on any Linux VM and the jobs that it
manages can do anything you want.

## Does Cylc support the Common Workflow Language?

No, Cylc doesn't support CWL at this stage because CWL does not understand
cycling workflows (see for example the eWaterCycle Case Study in the [Cylc
CiSE paper](#publications)).



