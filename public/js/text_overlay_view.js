(($) => {
	const baseUrl = window.location.origin;

	const socket = io(baseUrl);

	socket.on("text_overlay_background", (textOverlayObj) => {
		const mainDiv = $("#centered-content");

		mainDiv.text(textOverlayObj);

	});

})(window.jQuery);
