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



	// socket1.on("score_change", (companionObj) => {
	// 	const scoreToChange = $("#"+companionObj.score)

	// 	let scoreValue = parseInt(scoreToChange.val())
	// 	scoreValue += parseInt(companionObj.value)
		
	// 	if(scoreValue < 0) {
	// 		scoreValue = 0;
	// 	}

	// 	scoreToChange.val(scoreValue)
	// });

})(window.jQuery);
