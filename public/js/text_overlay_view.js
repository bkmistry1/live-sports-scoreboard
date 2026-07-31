(($) => {
	const baseUrl = window.location.origin;

	const socket = io(baseUrl);

	socket.on("text_overlay_background", (textOverlayObj) => {
		const mainDiv = $("#centered-content");

		mainDiv.text(textOverlayObj);

	});

	socket.on("textLogoUpdate", (textLogoObj) => {
		const mainDiv = $("#centered-content");
		const handleDiv = $("#handles");
		const instagramLogo = $("#instagramLogo");
		const facebookLogo = $("#facebookLogo");
		const youtubeLogo = $("#youtubeLogo");

		const logoHandle = $(".logo-handle")
		console.log(logoHandle)

		logoHandle.toggle();		

		instagramLogo.css({
			top: textLogoObj["ig-top"] || "0px",
			left: textLogoObj["ig-left"] || "0px",
		})
		
		facebookLogo.css({
			top: textLogoObj["fb-top"] || "0px",
			left: textLogoObj["fb-left"] || "0px"
		})
		
		youtubeLogo.css({
			top: textLogoObj["yt-top"] || "0px",
			left: textLogoObj["yt-left"] || "0px"
		})		

		console.log(instagramLogo)

		handleDiv.text(textLogoObj["text"]);

	});	

})(window.jQuery);
