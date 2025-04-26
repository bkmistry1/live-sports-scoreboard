(($) => {
	const socket = io();
	const socketStringIdentifier = "scoreboard_volleyball";

	const reset = $("#resetScore");

	const score1 = $("#score1");
	const score2 = $("#score2");
	const team1 = $("#team1");
	const team2 = $("#team2");
	const set1 = $("#set1");
	const set2 = $("#set2");

	const baseUrl = window.location.origin;
	const socket1 = io(baseUrl);

	socket1.on("score_change", (companionObj) => {
		const scoreToChange = $("#"+companionObj.score)

		let scoreValue = parseInt(scoreToChange.val())
		scoreValue += parseInt(companionObj.value)
		
		if(scoreValue < 0) {
			scoreValue = 0;
		}

		scoreToChange.val(scoreValue)
	});

	$(".button_score").click(function (event) {
		event.preventDefault();

		buttonId = this.id;

		buttonSplit = buttonId.split("_");

		identifier = buttonSplit[2];

		teamScore = $(`#score${identifier}`);

		let score = Number.parseInt(teamScore.val());

		if (buttonSplit[1] === "plus") {
			score++;
		} else {
			score--;
		}

		score = checkIfNegativeNumber(score);

		teamScore.val(score.toString());

		const scoreObj = {};

		scoreObj.team1 = score1.val();
		scoreObj.team2 = score2.val();

		sendScoreToSocket();
	});

	$(".button_set").click(function (event) {
		event.preventDefault();

		buttonId = this.id;
		buttonSplit = buttonId.split("_");
		identifier = buttonSplit[2];
		teamSet = $(`#set${identifier}`);

		let set = Number.parseInt(teamSet.val());

		if (buttonSplit[1] === "plus") {
			set++;
		} else {
			set--;
		}

		set = checkIfNegativeNumber(set);

		teamSet.val(set.toString());

		const scoreObj = {};

		scoreObj.set1 = set1.val();
		scoreObj.set2 = set2.val();

		sendScoreToSocket();
	});

	reset.click((event) => {
		event.preventDefault();

		score1.val("0");
		score2.val("0");

		const scoreObj = {};

		scoreObj.team1 = 0;
		scoreObj.team2 = 0;

		sendScoreToSocket();
	});

	$(".scoreboard").change(function sendUpdate() {
		sendScoreToSocket();
	});

	function checkIfNegativeNumber(number) {
		if (number < 0) {
			return 0;
		}

		return number;
	}

	function sendScoreToSocket() {
		const scoreObj = {};

		scoreObj.team1 = score1.val();
		scoreObj.team2 = score2.val();

		scoreObj.teamName1 = team1.val();
		scoreObj.teamName2 = team2.val();

		scoreObj.set1 = set1.val();
		scoreObj.set2 = set2.val();

		socket.emit(socketStringIdentifier, scoreObj);
		updateScoreOnCompanion(scoreObj)
	}

	function updateScoreOnCompanion(scoreObj) {
		for(let key in scoreObj) {
			// console.log(key)
			// console.log(scoreObj[key])

			try {
				let req = {
					method: 'POST',
					url: 'http://127.0.0.1:8000/api/custom-variable/'+key+'/value?value=' + scoreObj[key].toString(),
					contentType: 'application/json',
					// data: JSON.stringify({
					//     team1: team1,
					// })
				};
				$.ajax(req).then(function (res) {
					
				});
			} 
			catch (e) {
				console.log(e)
			}				
		}			
	}
})(window.jQuery);
