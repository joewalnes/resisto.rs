// Google Analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-35854979-1']);
_gaq.push(['_trackPageview']);
(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

// gaug.es
var _gauges = _gauges || [];
(function() {
  var t   = document.createElement('script');
  t.type  = 'text/javascript';
  t.async = true;
  t.id    = 'gauges-tracker';
  t.setAttribute('data-site-id', '508eb321613f5d54ab000023');
  t.src = '//secure.gaug.es/track.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(t, s);
})();

var GoSquared = {};
GoSquared.acct = "GSN-173586-T";
(function(w){
  function gs(){
    w._gstc_lt = +new Date;
    var d = document, g = d.createElement("script");
    g.type = "text/javascript";
    g.src = "//d1l6p2sc9645hc.cloudfront.net/tracker.js";
    var s = d.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(g, s);
  }
  w.addEventListener ?
    w.addEventListener("load", gs, false) :
    w.attachEvent("onload", gs);
})(window);
