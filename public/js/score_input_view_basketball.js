(($) => {
	const socket = io();

	const header = $("#basketballHeader");
	const basketballScore1 = $("#basketballScore1");
	const basketballScore2 = $("#basketballScore2");
	const basketballTeam1 = $("#basketballTeam1");
	const basketballTeam2 = $("#basketballTeam2");

	const basketballTeam1plus1 = $("#basketballTeam1plus1");
	const basketballTeam2plus1 = $("#basketballTeam2plus1");
	const basketballTeam1minus1 = $("#basketballTeam1minus1");
	const basketballTeam2minus1 = $("#basketballTeam2minus1");
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
				basketballScore1.val("0");
				basketballScore2.val("0");
				break;
			}
			case basketballTeam1plus1.attr("id"): {
				let score = Number.parseInt(basketballScore1.val());
				score++;
				basketballScore1.val(score.toString());
				break;
			}
			case basketballTeam2plus1.attr("id"): {
				let score = Number.parseInt(basketballScore2.val());
				score++;
				basketballScore2.val(score.toString());
				break;
			}
			case basketballTeam1minus1.attr("id"): {
				let score = Number.parseInt(basketballScore1.val());
				score--;
				basketballScore1.val(score.toString());
				break;
			}
			case basketballTeam2minus1.attr("id"): {
				let score = Number.parseInt(basketballScore2.val());
				score--;
				basketballScore2.val(score.toString());
				break;
			}
		}

		sendScoreToSocket();
	});

	function sendScoreToSocket() {
		const scoreObj = {};

		scoreObj.header = header.val();
		scoreObj.score1 = basketballScore1.val();
		scoreObj.score2 = basketballScore2.val();
		scoreObj.teamName1 = basketballTeam1.val();
		scoreObj.teamName2 = basketballTeam2.val();

		socket.emit("scoreboard_basketball", scoreObj);
	}

})(window.jQuery);
