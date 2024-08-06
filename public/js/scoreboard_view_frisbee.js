(($) => {
	const socket = io();

	socket.on("score_frisbee", (scoreObj) => {
		const frisbeeScore1 = $("#frisbeeScore1");
		const frisbeeScore2 = $("#frisbeeScore2");

		frisbeeScore1.val(scoreObj.frisbeeTeam1);
		frisbeeScore2.val(scoreObj.frisbeeTeam2);
	});

	socket.on("teamNameUpdate", (data) => {
		const frisTeam = $(`#${data.id}`);

		frisTeam.val(data.value);
	});

	socket.on("updateHeader", (data) => {
		const frisbeeHeader = $(`#${data.id}`);

		frisbeeHeader.val(data.value);
	});

	socket.on("teamScoreUpdate", (data) => {
		const frisbeeScore = $(`#${data.id}`);

		frisbeeScore.val(data.value);
	});
})(window.jQuery);
