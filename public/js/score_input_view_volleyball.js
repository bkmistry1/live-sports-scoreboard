;(function ($) {
	const socket = io()
	const socketStringIdentifier = "scoreboard_volleyball"

	const reset = $('#resetScore')

	const score1 = $('#score1')
	const score2 = $('#score2')
	const team1 = $('#team1')
	const team2 = $('#team2')
	const set1 = $('#set1')
	const set2 = $('#set2')


	$(".button_score").click(function (event) {
		event.preventDefault()

		buttonId = this.id

		buttonSplit = buttonId.split("_")

		identifier = buttonSplit[2]

		teamScore = $("#score" + identifier)

		let score = parseInt(teamScore.val())

		if(buttonSplit[1] == "plus") {
			score++
		}
		else {
			score--
		}

		teamScore.val(score.toString())

		let scoreObj = {}

		scoreObj.team1 = score1.val()
		scoreObj.team2 = score2.val()

		sendScoreToSocket()

	});	

	$(".button_set").click( function (event) {
		event.preventDefault()

		buttonId = this.id
		buttonSplit = buttonId.split("_")
		identifier = buttonSplit[2]
		teamSet = $("#set" + identifier)

		let set = parseInt(teamSet.val())

		if(buttonSplit[1] == "plus") {
			set++
		}
		else {
			set--
		}

		teamSet.val(set.toString())

		let scoreObj = {}

		scoreObj.set1 = set1.val()
		scoreObj.set2 = set2.val()

		sendScoreToSocket()
	})

	reset.click(function (event) {
		event.preventDefault()

		score1.val('0')
		score2.val('0')

		let scoreObj = {}

		scoreObj.team1 = 0
		scoreObj.team2 = 0

		sendScoreToSocket()
	})

	$(".scoreboard").change(function sendUpdate() {
		sendScoreToSocket()
	})
		

	function sendScoreToSocket() {
		let scoreObj = {}

		scoreObj.team1 = score1.val()
		scoreObj.team2 = score2.val()

		scoreObj.teamName1 = team1.val()
		scoreObj.teamName2 = team2.val()

		scoreObj.set1 = set1.val()
		scoreObj.set2 = set2.val()

		socket.emit(socketStringIdentifier, scoreObj)
	}

})(window.jQuery)
