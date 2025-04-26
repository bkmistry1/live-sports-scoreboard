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

	socket.on("score_change", (companionObj) => {
		const scoreToChange = $("#"+companionObj.score)

		let scoreValue = parseInt(scoreToChange.val())
		scoreValue += parseInt(companionObj.value)
		
		if(scoreValue < 0) {
			scoreValue = 0;
		}

		scoreToChange.val(scoreValue)

		const scoreObj = {};

		const score1 = $("#score1");
		const score2 = $("#score2");

		const team1 = $("#team1");
		const team2 = $("#team2");

		const set1 = $("#set1");
		const set2 = $("#set2");		

		scoreObj.team1 = score1.val();
		scoreObj.team2 = score2.val();

		scoreObj.teamName1 = team1.val();
		scoreObj.teamName2 = team2.val();

		scoreObj.set1 = set1.val();
		scoreObj.set2 = set2.val();

		updateScoreOnCompanion(scoreObj);
	})

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
