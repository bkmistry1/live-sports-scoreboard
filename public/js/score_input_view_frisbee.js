;(function ($) {
	const socket = io()

	const header = $('#frisbeeHeader')
	const frisbeeScore1 = $('#frisbeeScore1')
	const frisbeeScore2 = $('#frisbeeScore2')
	const frisbeeTeam1Name = $('#frisbeeTeam1')
	const frisbeeTeam2Name = $('#frisbeeTeam2')

	const frisbeeTeam1plus1 = $('#frisbeeTeam1plus1')
	const frisbeeTeam2plus1 = $('#frisbeeTeam2plus1')
	const frisbeeTeam1minus1 = $('#frisbeeTeam1minus1')
	const frisbeeTeam2minus1 = $('#frisbeeTeam2minus1')
	const reset = $('#resetScore')

	header.change(function updateHeader() {
		socket.emit("updateHeader", header.val(), header.id)
	})

	frisbeeTeam1Name.change(function updateTeamName() {
		socket.emit("updateFrisbeeTeamName", frisbeeTeam1Name.val(), frisbeeTeam1Name[0].id)
	})

	frisbeeTeam2Name.change(function updateTeamName() {
		socket.emit("updateFrisbeeTeamName", frisbeeTeam2Name.val(), frisbeeTeam2Name[0].id)
	})

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


function updateTeamName(input) {
	socket.emit("updateTeamName", input.value, input.id)
}