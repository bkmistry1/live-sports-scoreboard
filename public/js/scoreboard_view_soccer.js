(($) => {
	const baseUrl = window.location.origin;

	const socket = io(baseUrl);

	socket.on("score_soccer", (scoreObj) => {
		const score1 = $("#score1");
		const score2 = $("#score2");

		const team1 = $("#team1");
		const team2 = $("#team2");

		const info = $("#info_banner");

		score1.val(scoreObj.team1);
		score2.val(scoreObj.team2);

		team1.val(scoreObj.teamName1);
		team2.val(scoreObj.teamName2);

		info.val(scoreObj.info);
	});
})(window.jQuery);
