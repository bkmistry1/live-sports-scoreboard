(($) => {
	const socket = io();

	socket.on("score_frisbee", (scoreObj) => {
		const frisbeeScore1 = $("#frisbeeScore1");
		const frisbeeScore2 = $("#frisbeeScore2");
		const frisbeeTeam1 = $("#frisbeeTeam1");
		const frisbeeTeam2 = $("#frisbeeTeam2");
		const frisbeeHeader = $("#frisbeeHeader");

		frisbeeScore1.val(scoreObj.score1);
		frisbeeScore2.val(scoreObj.score2);
		frisbeeTeam1.val(scoreObj.teamName1);
		frisbeeTeam2.val(scoreObj.teamName2);
		frisbeeHeader.val(scoreObj.header);
	});

})(window.jQuery);
