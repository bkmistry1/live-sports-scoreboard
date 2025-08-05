(($) => {
	const socket = io();

	const header = $("#frisbeeHeader");
	const frisbeeScore1 = $("#frisbeeScore1");
	const frisbeeScore2 = $("#frisbeeScore2");
	const frisbeeTeam1 = $("#frisbeeTeam1");
	const frisbeeTeam2 = $("#frisbeeTeam2");

	const frisbeeTeam1plus1 = $("#frisbeeTeam1plus1");
	const frisbeeTeam2plus1 = $("#frisbeeTeam2plus1");
	const frisbeeTeam1minus1 = $("#frisbeeTeam1minus1");
	const frisbeeTeam2minus1 = $("#frisbeeTeam2minus1");
	const reset = $("#resetScore");

	header.change(function updateHeader() {
		sendScoreToSocket();
	});

	$(".teamName").change(function updateTeamName() {
		sendScoreToSocket();
	});

	$(".teamScore").change(function updateTeamScore() {
		sendScoreToSocket();
	});

	$(":button").click(function (event) {
		event.preventDefault();

		const buttonId = $(this).attr("id");

		switch (buttonId) {
			case reset.attr("id"): {
				frisbeeScore1.val("0");
				frisbeeScore2.val("0");
				break;
			}
			case frisbeeTeam1plus1.attr("id"): {
				let score = Number.parseInt(frisbeeScore1.val());
				score++;
				frisbeeScore1.val(score.toString());
				break;
			}
			case frisbeeTeam2plus1.attr("id"): {
				let score = Number.parseInt(frisbeeScore2.val());
				score++;
				frisbeeScore2.val(score.toString());
				break;
			}
			case frisbeeTeam1minus1.attr("id"): {
				let score = Number.parseInt(frisbeeScore1.val());
				score--;
				frisbeeScore1.val(score.toString());
				break;
			}
			case frisbeeTeam2minus1.attr("id"): {
				let score = Number.parseInt(frisbeeScore2.val());
				score--;
				frisbeeScore2.val(score.toString());
				break;
			}
		}
		
		sendScoreToSocket();
	});

	function sendScoreToSocket() {
		const scoreObj = {};

		scoreObj.header = header.val();
		scoreObj.score1 = frisbeeScore1.val();
		scoreObj.score2 = frisbeeScore2.val();
		scoreObj.teamName1 = frisbeeTeam1.val();
		scoreObj.teamName2 = frisbeeTeam2.val();

		socket.emit("scoreboard_frisbee", scoreObj);
	}

})(window.jQuery);