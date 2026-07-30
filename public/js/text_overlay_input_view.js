(($) => {
	const socket = io();
	const socketStringIdentifier = "text_overlay";

	const baseUrl = window.location.origin;
	const socket1 = io(baseUrl);

	$(".editable-text").change(function sendUpdate() {
		const textInput = $("#editable-text");
		const centered = $("#centered-content");
		socket.emit(socketStringIdentifier, textInput.val());		
		centered.text(textInput.val())
	});

})(window.jQuery);
