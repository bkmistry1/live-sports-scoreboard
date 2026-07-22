(($) => {
	const baseUrl = window.location.origin;

	const socket = io(baseUrl);

	socket.on("score_soccer", (scoreObj) => {
		const score1 = $(".scoreboard-view-soccer #score1");
		const score2 = $(".scoreboard-view-soccer #score2");

		const team1 = $(".scoreboard-view-soccer #team1");
		const team2 = $(".scoreboard-view-soccer #team2");

		const info = $(".scoreboard-view-soccer #info_banner");

		score1.val(scoreObj.team1);
		score2.val(scoreObj.team2);

		team1.val(scoreObj.teamName1);
		team2.val(scoreObj.teamName2);

		info.val(scoreObj.info);
	});
})(window.jQuery);
