;(function ($) {
	const socket = io()
	const socketStringIdentifier = "scoreboard_volleyball"

	const team1plus1 = $('#team1plus1')
	const team2plus1 = $('#team2plus1')
	const team1minus1 = $('#team1minus1')
	const team2minus1 = $('#team2minus1')
	const reset = $('#resetScore')

	const score1 = $('#score1')
	const score2 = $('#score2')

	$(":button").click(function (event) {
		event.preventDefault()

		console.log("clicked")

		buttonId = this.id
		buttonLength = buttonId.length
		identifier = buttonId.charAt(buttonLength-1).toString()

		teamScore = $("#score" + identifier)

		let score = parseInt(teamScore.val())
		score++
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

	// team1plus1.click(function (event) {
	// 	event.preventDefault()

	// 	let score = parseInt(score1.val())
	// 	score++
	// 	score1.val(score.toString())

	// 	let scoreObj = {}

	// 	scoreObj.team1 = score1.val()
	// 	scoreObj.team2 = score2.val()

	// 	socket.emit(socketStringIdentifier, scoreObj)
	// })

	// team1minus1.click(function (event) {
	// 	event.preventDefault()

	// 	let score = parseInt(score1.val())
	// 	score--
	// 	score1.val(score.toString())

	// 	let scoreObj = {}

	// 	scoreObj.team1 = score1.val()
	// 	scoreObj.team2 = score2.val()

	// 	socket.emit(socketStringIdentifier, scoreObj)
	// })

	// team2plus1.click(function (event) {
	// 	event.preventDefault()

	// 	let score = parseInt(score2.val())
	// 	score++
	// 	score2.val(score.toString())

	// 	let scoreObj = {}

	// 	scoreObj.team1 = score1.val()
	// 	scoreObj.team2 = score2.val()

	// 	socket.emit(socketStringIdentifier, scoreObj)
	// })

	// team2minus1.click(function (event) {
	// 	event.preventDefault()

	// 	let score = parseInt(score2.val())
	// 	score--
	// 	score2.val(score.toString())

	// 	let scoreObj = {}

	// 	scoreObj.team1 = score1.val()
	// 	scoreObj.team2 = score2.val()

	// 	socket.emit(socketStringIdentifier, scoreObj)
	// })
})(window.jQuery)
