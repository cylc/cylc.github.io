"use strict";

(function() {
  // --- Progress

  /**
   * Get the next release from a set of milestones.
   * The next release is the milestone with the earliest due date.
   *
   * @param milestones: array of milestone objects
   * @return the milestone with the earliest due date, or null if milestones empty
   */
  function getNextRelease(milestones) {
    // Sort the milestones by due date
    if (!milestones) {
      console.error("Invalid milestones value")
      return null
    }
    if (milestones instanceof Object) {
      // GitHub API returns {documentation_url: "", message: ""} messages for rate limiting
      // see https://developer.github.com/v3/#rate-limiting
      // and https://github.com/cylc/cylc.github.io/issues/15
      if (Object.prototype.hasOwnProperty.call(milestones, 'message')) {
        console.error(milestones.message)
      }
    }
    milestones.sort((a, b) => a.due_on < b.due_on ? -1 : a.due_on > b.due_on ? 1 : 0)
    return milestones[0]
  }
  /**
   * Populate progress elements in the DOM.
   *
   * @param openIssues: integer with the number of open issues
   * @param closedIssues: integer with the number of closed issues
   * @param title: the title of the next release
   * @param link: URL link to the next release
   */
  function populateProgress(openIssues, closedIssues, title, link) {
    var workProgress = closedIssues * 100 / (openIssues + closedIssues);

    var milestoneVersion = document.getElementById("milestone-version");
    milestoneVersion.innerHTML = title;

    var milestoneURL = document.getElementById("milestone-url");
    milestoneURL.setAttribute('href', link);

    var progressBarInner = document.getElementById("progress-bar-inner");
    progressBarInner.style.width = workProgress + "%";

    var progress = document.getElementById("progress");
    progress.innerHTML = Math.floor(workProgress) + "%";

    var milestoneContainer = document.getElementById("milestone-container");
    milestoneContainer.style.opacity = "1";
    milestoneContainer.style.transition = ".7s ease-in";
  }
  /**
   * Retrieve the progress of the project.
   *
   * @param url: GitHub API project milestones URL
   * @return a Promise object that populates DOM elements, or returns the status text on error
   */
  function retrieveProgress(url) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url);

      xhr.onload = function () {
        var milestones = JSON.parse(this.response);
        var nextRelease = getNextRelease(milestones);

        if (nextRelease) {
          var openIssues = nextRelease.open_issues;
          var closedIssues = nextRelease.closed_issues;
          var title = nextRelease.title;
          var link = nextRelease.html_url.replace('s/next%20release', '/' + nextRelease.number);
          populateProgress(openIssues, closedIssues, title, link);
        }
      };

      xhr.onerror = reject(xhr.statusText);
      xhr.send();
    });
  }

// --- Releases

  /**
   * Truncate text at desired limit of max words. The text is split by
   * white spaces. If the number of tokens produced is less than the
   * given limit, we use the lowest value to truncate. Will append
   * ellipsis if the text was truncated (i.e. words were discarded).
   *
   * @param text: text to be truncated
   * @param maxWords: integer defining the maximum number of words to be returned
   * @return truncated text, with ellipsis if words were discarded
   */
  function truncate(text, maxWords) {
    var tokens = text.trim().split(" ");
    var limit = Math.min(tokens.length, maxWords) - 1;
    var truncated = tokens.slice(0, limit);
    if (limit < tokens.length) {
      truncated.push("...");
    }
    return truncated.join(" ");
  }

  /**
   * Create release HTML element to be added to the DOM.
   *
   * @param name: name of the release
   * @param link: link for the GitHub release
   * @param publishedAt: raw text date as returned from the API
   * @param body: the description of the release
   * @return a div HTML element with other elements within
   */
  function createReleaseElement(name, link, publishedAt, body) {
    var div = document.createElement("div");

    var linkElement = document.createElement("a");
    linkElement.setAttribute("href", link);
    linkElement.innerHTML = name;

    var paragraph = document.createElement("p");
    paragraph.appendChild(linkElement);
    var d = new Date(publishedAt),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    var formattedDate = [year, month, day].join('-');
    paragraph.insertAdjacentHTML("beforeend", ", " + formattedDate);
    div.appendChild(paragraph);

    var small = document.createElement("small");
    small.innerHTML = truncate(body, 15);
    div.appendChild(small);

    return div;
  }

  /**
   * Populate HTML elements with information about the latest release.
   *
   * @param name: name of the release
   * @param publishedAt: raw text date as returned from the API
   */
  function populateLatestReleaseInformation(name, publishedAt) {

    var latestReleaseName = document.getElementById("latest-release-name");
    latestReleaseName.innerHTML = name;

    var latestReleaseDateTime = document.getElementById("latest-release-pubdate-time");
    latestReleaseDateTime.setAttribute("datetime", publishedAt);

    var latestReleaseDateText = document.getElementById("latest-release-pubdate-text");
    latestReleaseDateText.innerHTML = publishedAt;
  }

  /**
   * Retrieve the releases of the project.
   *
   * @param url: GitHub API project releases URL
   * @param linkBaseUrl: Base URL to create links to releases
   * @return a Promise object that populates and creates DOM elements, or returns the status text on error
   */
  function retrieveReleases(url, linkBaseUrl) {
    var releasesContainer = document.getElementById("repository-releases");
    return new Promise(function(resolve, reject) {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.onload = function() {
        const releases = JSON.parse(this.response);
        // we only want to iterate over 4 releases...
        var min = Math.min(releases.length, 4);
        releasesContainer.innerHTML = "";
        for (var i = 0; i < min; ++i) {
          var release = releases[i];
          var name = release.name;
          var publishedAt = release.published_at;
          var body = release.body;
          var link = linkBaseUrl + release.tag_name;
          var releaseElement = createReleaseElement(name, link, publishedAt, body);
          releasesContainer.appendChild(releaseElement);

          // we also display the latest release metadata
          if (i === 0) {
            populateLatestReleaseInformation(name, publishedAt);
          }
        }
      };
      xhr.onerror = reject(xhr.statusText);
      xhr.send();
    });
  }

  // --- window.onload

  /**
   * Called when the browser loads the page. It will execute two promises asynchronously,
   * one to retrieve the progress, and the other to retrieve the releases.
   * If an error occurs, it will print the error to the browser console.
   */
  var milestonesUrl = "https://api.github.com/repos/cylc/cylc/milestones";
  var releasesUrl = "https://api.github.com/repos/cylc/cylc/releases";
  var releasesLinkBaseUrl = "https://github.com/cylc/cylc/releases/tag/";
  Promise.all([
    retrieveProgress(milestonesUrl),
    retrieveReleases(releasesUrl, releasesLinkBaseUrl)
  ])
    .then(function() {
      // all good here!
    })
    .catch(function(error) {
      console.log(error);
    });
})();
