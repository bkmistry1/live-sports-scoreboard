(($) => {
	const baseUrl = window.location.origin;

	const socket = io(baseUrl);

	socket.on("score_volleyball", (scoreObj) => {
		const score1 = $("#score1");
		const score2 = $("#score2");

		const team1 = $("#team1");
		const team2 = $("#team2");

		const set1 = $("#set1");
		const set2 = $("#set2");

		score1.val(scoreObj.team1);
		score2.val(scoreObj.team2);

		team1.val(scoreObj.teamName1);
		team2.val(scoreObj.teamName2);

		set1.val(scoreObj.set1);
		set2.val(scoreObj.set2);
	});
})(window.jQuery);
