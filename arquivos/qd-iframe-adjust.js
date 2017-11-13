(function () {
	if (window.parent === window)
		location.href = location.href.replace("qd-araujo-cdn.github.io", "www.araujo.com.br");
})();

(function ($) {
	"use strict";

	function resetIframeSize(useBody) {
		window.parent.postMessage("qd-iframe-cdn|" + ($(useBody ? document.body : document).height() + 5), "*");
	};

	$(function () { resetIframeSize(false); });
	$(window).load(function () { resetIframeSize(false); });
	$(window).scroll(function () { resetIframeSize(false); });
	$(window).on('QD_manualIframeAdjust', function (e, useBody) { resetIframeSize(useBody || false); });
	$(document).ajaxComplete(function () { resetIframeSize(false); });
	$(document).ajaxStart(function () { resetIframeSize(false); });

	var lastWindowSize = $(window).width();
	var timeout = 0;
	$(window).resize(function () {
		clearTimeout(timeout);
		timeout = setTimeout(function () {
			if (lastWindowSize != $(window).width()) {
				resetIframeSize(true);
				lastWindowSize = $(window).width();
			}
		}, 20);
	});
})(jQuery);

(function ($) {
	$(function () {
		$("a[href^=#]").click(function () {
			window.parent.postMessage("qd-iframe-scroll|" + ($($(this).attr("href")).first().offset() || { top: 0 }).top, "*");
		});
	});
})(jQuery);