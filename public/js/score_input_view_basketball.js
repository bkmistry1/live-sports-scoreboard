(($) => {
	const socket = io();

	const header = $("#basketballHeader");
	const basketballScore1 = $("#basketballScore1");
	const basketballScore2 = $("#basketballScore2");

	const basketballTeam1plus1 = $("#basketballTeam1plus1");
	const basketballTeam2plus1 = $("#basketballTeam2plus1");
	const basketballTeam1minus1 = $("#basketballTeam1minus1");
	const basketballTeam2minus1 = $("#basketballTeam2minus1");
	const reset = $("#resetScore");

	header.change(function updateHeader() {
		socket.emit("updateHeader", header.val(), header[0].id);
	});

	$(".teamName").change(function updateTeamName() {
		socket.emit("updateTeamName", $(this).val(), $(this)[0].id);
	});

	$(".teamScore").change(function updateTeamScore() {
		socket.emit("updateTeamScore", $(this).val(), $(this)[0].id);
	});

	$(":button").click(function (event) {
		event.preventDefault();

		const buttonId = $(this).attr("id");

		const scoreObj = {};

		switch (buttonId) {
			case reset.attr("id"): {
				basketballScore1.val("0");
				basketballScore2.val("0");

				scoreObj.basketballTeam1 = 0;
				scoreObj.basketballTeam2 = 0;
				break;
			}
			case basketballTeam1plus1.attr("id"): {
				let score = Number.parseInt(basketballScore1.val());
				score++;
				basketballScore1.val(score.toString());

				scoreObj.basketballTeam1 = basketballScore1.val();
				scoreObj.basketballTeam2 = basketballScore2.val();
				break;
			}
			case basketballTeam2plus1.attr("id"): {
				let score = Number.parseInt(basketballScore2.val());
				score++;
				basketballScore2.val(score.toString());

				scoreObj.basketballTeam1 = basketballScore1.val();
				scoreObj.basketballTeam2 = basketballScore2.val();
				break;
			}
			case basketballTeam1minus1.attr("id"): {
				let score = Number.parseInt(basketballScore1.val());
				score--;
				basketballScore1.val(score.toString());

				scoreObj.basketballTeam1 = basketballScore1.val();
				scoreObj.basketballTeam2 = basketballScore2.val();
				break;
			}
			case basketballTeam2minus1.attr("id"): {
				let score = Number.parseInt(basketballScore2.val());
				score--;
				basketballScore2.val(score.toString());

				scoreObj.basketballTeam1 = basketballScore1.val();
				scoreObj.basketballTeam2 = basketballScore2.val();
				break;
			}
		}

		socket.emit("scoreboard_basketball", scoreObj);
	});
})(window.jQuery);
