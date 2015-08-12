(function(){
	if(window.parent === window)
		location.href = location.href.replace("qd-araujo-cdn.github.io", "www.araujo.com.br");
})();

(function(){
	$(function() {
		resetIframeSize();
		window.parent.postMessage("qd-iframe-cdn|" + ($(document).height() + 5), "*");
	});
	$(window).load(resetIframeSize);
	$(document).ajaxComplete(resetIframeSize);
	$(document).ajaxStart(resetIframeSize);
	
	var lastWindowSize = $(window).width();
	var timeout = 0;
	$(window).resize(function() {
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			if(lastWindowSize != $(window).width()){
				resetIframeSize();
				lastWindowSize = $(window).width();
			}
		}, 20);
	});
	
	function resetIframeSize() {
		window.parent.postMessage("qd-iframe-cdn|" + ($(document.body).height() + 5), "*");
	};
})();

$(function() {
	$("a[href^=#]").click(function() {
		window.parent.postMessage("qd-iframe-scroll|" + ($($(this).attr("href")).first().offset() || {top: 0}).top, "*");
	});
});