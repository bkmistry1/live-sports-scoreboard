(($) => {
	const socket = io();

	const header = $("#frisbeeHeader");
	const frisbeeScore1 = $("#frisbeeScore1");
	const frisbeeScore2 = $("#frisbeeScore2");

	const frisbeeTeam1plus1 = $("#frisbeeTeam1plus1");
	const frisbeeTeam2plus1 = $("#frisbeeTeam2plus1");
	const frisbeeTeam1minus1 = $("#frisbeeTeam1minus1");
	const frisbeeTeam2minus1 = $("#frisbeeTeam2minus1");
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
				frisbeeScore1.val("0");
				frisbeeScore2.val("0");

				scoreObj.frisbeeTeam1 = 0;
				scoreObj.frisbeeTeam2 = 0;
				break;
			}
			case frisbeeTeam1plus1.attr("id"): {
				let score = Number.parseInt(frisbeeScore1.val());
				score++;
				frisbeeScore1.val(score.toString());

				scoreObj.frisbeeTeam1 = frisbeeScore1.val();
				scoreObj.frisbeeTeam2 = frisbeeScore2.val();
				break;
			}
			case frisbeeTeam2plus1.attr("id"): {
				let score = Number.parseInt(frisbeeScore2.val());
				score++;
				frisbeeScore2.val(score.toString());

				scoreObj.frisbeeTeam1 = frisbeeScore1.val();
				scoreObj.frisbeeTeam2 = frisbeeScore2.val();
				break;
			}
			case frisbeeTeam1minus1.attr("id"): {
				let score = Number.parseInt(frisbeeScore1.val());
				score--;
				frisbeeScore1.val(score.toString());

				scoreObj.frisbeeTeam1 = frisbeeScore1.val();
				scoreObj.frisbeeTeam2 = frisbeeScore2.val();
				break;
			}
			case frisbeeTeam2minus1.attr("id"): {
				let score = Number.parseInt(frisbeeScore2.val());
				score--;
				frisbeeScore2.val(score.toString());

				scoreObj.frisbeeTeam1 = frisbeeScore1.val();
				scoreObj.frisbeeTeam2 = frisbeeScore2.val();
				break;
			}
		}

		socket.emit("scoreboard_frisbee", scoreObj);
	});
})(window.jQuery);