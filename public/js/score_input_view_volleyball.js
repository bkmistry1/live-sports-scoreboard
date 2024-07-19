;(function ($) {
	const socket = io()
	const socketStringIdentifier = "scoreboard_volleyball"

	const reset = $('#resetScore')

	const score1 = $('#score1')
	const score2 = $('#score2')

	$(":button").click(function (event) {
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

		socket.emit(socketStringIdentifier, scoreObj)

	});	

	reset.click(function (event) {
		event.preventDefault()

		score1.val('0')
		score2.val('0')

		let scoreObj = {}

		scoreObj.team1 = 0
		scoreObj.team2 = 0

		socket.emit(socketStringIdentifier, scoreObj)
	})

})(window.jQuery)
