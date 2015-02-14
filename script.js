var appConsts = {
  productname: "myWord",
  productnameForDisplay: "myword.io",
  domain: "myword.io",
  version: "0.47"
}
var defaultImageUrl = "http://scripting.com/2015/02/12/beatles.png";

function everySecond () {
}
function initGoogleAnalytics () {
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-39531990-1', appConsts.domain);
  ga('send', 'pageview');
}
function startup () {
  var urlparam = decodeURIComponent (getURLParameter ("url")), urlEssay = "essay.json", jstruct, imgurl = defaultImageUrl;;
  var markdown = new Markdown.Converter (), now = new Date (), flmarkdown;
  console.log ("startup");
  $("#idVersionNumber").html ("<a href=\"https://github.com/scripting/myWord\" target=\"_blank\">v" + appConsts.version + "</a>");
  initGoogleAnalytics ();
  if (urlparam != "null") {
    urlEssay = urlparam;
  }
  readHttpFile (urlEssay, function (s) {
    try {
      jstruct = JSON.parse (s);
    }
    catch (err) {
      alertDialog (err + ". Try using <a href=\"http://jsonlint.com/\" target=\"_blank\">jsonlint</a> to find the error in the JSON file.");
      return;
    }

    flmarkdown = getBoolean (jstruct.flMarkdown); //2/13/15 by DW

    //image
    if (jstruct.img != undefined) {
      imgurl = jstruct.img;
    }
    $("#idBackgroundImage").css ("background-image", "url(" + imgurl + ")");
    //title
    if (jstruct.title != undefined) {
      $("#idPageTitle").html (jstruct.title);
      document.title = appConsts.productnameForDisplay + ": " + jstruct.title;
    }
    //fonts
    if (jstruct.titlefont != undefined) {
      $("#idPageTopText").css ("font-family", jstruct.titlefont);
    }
    if (jstruct.bodyfont != undefined) {
      $("#idEssayText").css ("font-family", jstruct.bodyfont);
    }

    //byline
    if (jstruct.authorname != undefined) {
      var author = jstruct.authorname, byline;
      if (jstruct.authorwebsite != undefined) {
        author = "<a href=\"" + jstruct.authorwebsite + "\">" + author + "</a>";
      }
      byline = "By " + author;
      if (jstruct.when != undefined) {
        var whenstring;
        if (sameDay (new Date (jstruct.when), now)) {
          whenstring = " at ";
        }
        else {
          whenstring = " on ";
        }
        byline += whenstring + viewDate (jstruct.when);
      }
      $("#idPageByline").html (byline + ".");
    }
    //description
    if (jstruct.description != undefined) {
      $("#idPageDescription").html (jstruct.description);
    }
    //essay text
    var essaytext = "";
    function dolist (thelist) {
      for (var i = 0; i < thelist.length; i++) {
        var sub = thelist [i];
        if (typeof sub == "string") {
          if (flmarkdown) {
            essaytext += sub + "\n\n";
          }
          else {
            essaytext += "<p>" +  sub + "</p>";
          }
        }
        else {
          if (sub.title != undefined) {
            essaytext += "<div class=\"divSubhead\">" + sub.title + "</div>";
          }
          if (sub.subs != undefined) {
            dolist (sub.subs);
          }
        }
      }
    }
    dolist (jstruct.subs);

    if (flmarkdown) {
      console.log ("startup: essay text before Markdown processing == " + essaytext);
      essaytext = "<div class=\"divMarkdownText\">" + markdown.makeHtml (essaytext) + "</div>";
    }

    $("#idEssayText").html (essaytext);
  });
  self.setInterval (function () {everySecond ()}, 1000);
}

$(document).ready (function () {
  startup ();
});
