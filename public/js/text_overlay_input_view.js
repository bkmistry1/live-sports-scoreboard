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

	$("#logoHandlesBtn").on('click', function() {
		console.log("Clicked");
		const textInput = $("#editable-text");
		const centered = $("#centered-content");
		const logoHandlesBtn = $("#logoHandlesBtn");

		text = "bcsfusa\nBCSFUSA\nblessedcultureandsportsfes8608"

		textLogoObj = {
			"text": text,
			"ig-top": 885,
			"ig-left": 650,
			"fb-top": 945,
			"fb-left": 650,
			"yt-top": 1015,
			"yt-left": 650,						
		}

		socket.emit("text_and_logos", textLogoObj);
		centered.text(text)
		if(logoHandlesBtn.text().includes("Show")){
			logoHandlesBtn.text("Hide Logo and Handles")
		}
		else {
			logoHandlesBtn.text("Show Logo and Handles")
		}
		
	})


	$("#commentaryBottomBoxBtn").on('click', function() {
		console.log("Clicked");
		const textInput = $("#editable-text");
		const centered = $("#centered-content");

		text = textInput.val()

		commentaryBoxObj = {
			"text": text,
			"top": 885,
			"left": 100,				
		}

		socket.emit("commentaryBox_update", commentaryBoxObj);
		centered.text(text)
		
	})	

	$("#commentaryBCSFBottomBoxBtn").on('click', function() {
		console.log("Clicked");
		const centered = $("#centered-content");

		const text = "bcsfusa.com/donate"
		
		commentaryBoxObj = {
			"text": text,
			"top": 885,
			"left": 100,				
		}

		socket.emit("commentaryBox_update", commentaryBoxObj);
		centered.text(text)
		
	})	
		
	

})(window.jQuery);
