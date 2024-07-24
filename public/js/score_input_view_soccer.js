;(function ($) {
	const socket = io()
	const socketStringIdentifier = "scoreboard_soccer"

	const reset = $('#resetScore')

	const score1 = $('#score1')
	const score2 = $('#score2')
	const team1 = $('#team1')
	const team2 = $('#team2')
	const info = $('#info_banner')


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

		score = checkIfNegativeNumber(score)
		
		teamScore.val(score.toString())

		let scoreObj = {}

		scoreObj.team1 = score1.val()
		scoreObj.team2 = score2.val()

		sendScoreToSocket()

	});	

	info.change(function (event) {
		event.preventDefault()
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
		

	function checkIfNegativeNumber(number) {

		if(number < 0) {
			return 0
		} 
		else {
			return number
		}		
	}

	function sendScoreToSocket() {
		let scoreObj = {}

		scoreObj.team1 = score1.val()
		scoreObj.team2 = score2.val()

		scoreObj.teamName1 = team1.val()
		scoreObj.teamName2 = team2.val()

		scoreObj.info = info.val()

		socket.emit(socketStringIdentifier, scoreObj)
	}

})(window.jQuery)
