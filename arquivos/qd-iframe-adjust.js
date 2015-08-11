(function(){
	// window.parent.postMessage("qd-iframe-cdn|" + ($(window).height() + 5), "*");
	$(setIframeSize);

	function setIframeSize() {
		var max = $(document).height();
		var temp = $(window).height();
		if(temp > max)
			max = temp;
		temp = $(document.body).height();
		if(temp > max)
			max = temp;

		window.parent.postMessage("qd-iframe-cdn|" + (max + 5), "*");
	};
})();