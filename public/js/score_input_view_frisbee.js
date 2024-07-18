;(function ($) {
	const socket = io()

	const team1plus1 = $('#team1plus1')
	const team2plus1 = $('#team2plus1')
	const team1minus1 = $('#team1minus1')
	const team2minus1 = $('#team2minus1')
	const reset = $('#resetScore')

	const score1 = $('#score1')
	const score2 = $('#score2')

	reset.click(function (event) {
		event.preventDefault()

		score1.val('0')
		score2.val('0')

		let scoreObj = {}

		scoreObj.team1 = 0
		scoreObj.team2 = 0

		socket.emit('scoreboard', scoreObj)
	})

	team1plus1.click(function (event) {
		event.preventDefault()

		let score = parseInt(score1.val())
		score++
		score1.val(score.toString())

		let scoreObj = {}

		scoreObj.team1 = score1.val()
		scoreObj.team2 = score2.val()

		socket.emit('scoreboard', scoreObj)
	})

	team1minus1.click(function (event) {
		event.preventDefault()

		let score = parseInt(score1.val())
		score--
		score1.val(score.toString())

		let scoreObj = {}

		scoreObj.team1 = score1.val()
		scoreObj.team2 = score2.val()

		socket.emit('scoreboard', scoreObj)
	})

	team2plus1.click(function (event) {
		event.preventDefault()

		let score = parseInt(score2.val())
		score++
		score2.val(score.toString())

		let scoreObj = {}

		scoreObj.team1 = score1.val()
		scoreObj.team2 = score2.val()

		socket.emit('scoreboard', scoreObj)
	})

	team2minus1.click(function (event) {
		event.preventDefault()

		let score = parseInt(score2.val())
		score--
		score2.val(score.toString())

		let scoreObj = {}

		scoreObj.team1 = score1.val()
		scoreObj.team2 = score2.val()

		socket.emit('scoreboard', scoreObj)
	})
})(window.jQuery)
