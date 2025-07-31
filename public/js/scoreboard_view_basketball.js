(($) => {
	const baseUrl = window.location.origin;

	const socket = io(baseUrl);

	socket.on("score_basketball", (scoreObj) => {
		const basketballScore1 = $("#basketballScore1");
		const basketballScore2 = $("#basketballScore2");
		const basketballTeam1 = $("#basketballTeam1");
		const basketballTeam2 = $("#basketballTeam2");

		updateHeader(scoreObj.header);
		basketballScore1.val(scoreObj.score1);
		basketballScore2.val(scoreObj.score2);
		basketballTeam1.val(scoreObj.teamName1);
		basketballTeam2.val(scoreObj.teamName2);
	});

	function updateHeader(headerValue) {
		const basketballHeaders = $(".basketballHeader");
		basketballHeaders.each(function() {
			const $header = $(this);
			$header.text(headerValue);

			// Adjust marquee animation-duration based on text length
			const textLength = headerValue.length;
			const baseDuration = 4; 
			const perCharDuration = 0.15; 
			const duration = Math.max(baseDuration, textLength * perCharDuration);
			$header.css('animation-duration', `${duration}s`);
		});
	}
})(window.jQuery);
