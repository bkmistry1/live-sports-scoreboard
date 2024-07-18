;(function ($) {
	const socket = io()

	const frisbeeTeam1plus1 = $('#frisbeeTeam1plus1')
	const frisbeeTeam2plus1 = $('#frisbeeTeam2plus1')
	const frisbeeTeam1minus1 = $('#frisbeeTeam1minus1')
	const frisbeeTeam2minus1 = $('#frisbeeTeam2minus1')
	const reset = $('#resetScore')

	const frisbeeScore1 = $('#frisbeeScore1')
	const frisbeeScore2 = $('#frisbeeScore2')

	reset.click(function (event) {
		event.preventDefault()

		frisbeeScore1.val('0')
		frisbeeScore2.val('0')

		let scoreObj = {}

		scoreObj.frisbeeTeam1 = 0
		scoreObj.frisbeeTeam2 = 0

		socket.emit('scoreboard_frisbee', scoreObj)
	})

	frisbeeTeam1plus1.click(function (event) {
		event.preventDefault()

		let score = parseInt(frisbeeScore1.val())
		score++
		frisbeeScore1.val(score.toString())

		let scoreObj = {}

		scoreObj.frisbeeTeam1 = frisbeeScore1.val()
		scoreObj.frisbeeTeam2 = frisbeeScore2.val()

		socket.emit('scoreboard_frisbee', scoreObj)
	})

	frisbeeTeam1minus1.click(function (event) {
		event.preventDefault()

		let score = parseInt(frisbeeScore1.val())
		score--
		frisbeeScore1.val(score.toString())

		let scoreObj = {}

		scoreObj.frisbeeTeam1 = frisbeeScore1.val()
		scoreObj.frisbeeTeam2 = frisbeeScore2.val()

		socket.emit('scoreboard_frisbee', scoreObj)
	})

	frisbeeTeam2plus1.click(function (event) {
		event.preventDefault()

		let score = parseInt(frisbeeScore2.val())
		score++
		frisbeeScore2.val(score.toString())

		let scoreObj = {}

		scoreObj.frisbeeTeam1 = frisbeeScore1.val()
		scoreObj.frisbeeTeam2 = frisbeeScore2.val()

		socket.emit('scoreboard_frisbee', scoreObj)
	})

	frisbeeTeam2minus1.click(function (event) {
		event.preventDefault()

		let score = parseInt(frisbeeScore2.val())
		score--
		frisbeeScore2.val(score.toString())

		let scoreObj = {}

		scoreObj.frisbeeTeam1 = frisbeeScore1.val()
		scoreObj.frisbeeTeam2 = frisbeeScore2.val()

		socket.emit('scoreboard_frisbee', scoreObj)
	})
})(window.jQuery)
