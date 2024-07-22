;(function ($) {
	const socket = io()

	const header = $('#basketballHeader')
	const basketballScore1 = $('#basketballScore1')
	const basketballScore2 = $('#basketballScore2')
	const basketballTeam1Name = $('#basketballTeam1')
	const basketballTeam2Name = $('#basketballTeam2')

	const basketballTeam1plus1 = $('#basketballTeam1plus1')
	const basketballTeam2plus1 = $('#basketballTeam2plus1')
	const basketballTeam1minus1 = $('#basketballTeam1minus1')
	const basketballTeam2minus1 = $('#basketballTeam2minus1')
	const reset = $('#resetScore')

	header.change(function updateHeader() {
		socket.emit("updateHeader", header.val(), header.id)
	})

	$('.teamName').change(function updateTeamName() {
		socket.emit("updateTeamName", $(this).val(), $(this)[0].id)
	})

	reset.click(function (event) {
		event.preventDefault()

		basketballScore1.val('0')
		basketballScore2.val('0')

		let scoreObj = {}

		scoreObj.basketballTeam1 = '0'
		scoreObj.basketballTeam2 = '0'

		socket.emit('scoreboard_basketball', scoreObj)
	})

	basketballTeam1plus1.click(function (event) {
		event.preventDefault()

		let score = parseInt(basketballScore1.val())
		score++
		basketballScore1.val(score.toString())

		let scoreObj = {}

		scoreObj.basketballTeam1 = basketballScore1.val()
		scoreObj.basketballTeam2 = basketballScore2.val()

		socket.emit('scoreboard_basketball', scoreObj)
	})

	basketballTeam1minus1.click(function (event) {
		event.preventDefault()

		let score = parseInt(basketballScore1.val())
		score--
		basketballScore1.val(score.toString())

		let scoreObj = {}

		scoreObj.basketballTeam1 = basketballScore1.val()
		scoreObj.basketballTeam2 = basketballScore2.val()

		socket.emit('scoreboard_basketball', scoreObj)
	})

	basketballTeam2plus1.click(function (event) {
		event.preventDefault()

		let score = parseInt(basketballScore2.val())
		score++
		basketballScore2.val(score.toString())

		let scoreObj = {}

		scoreObj.basketballTeam1 = basketballScore1.val()
		scoreObj.basketballTeam2 = basketballScore2.val()

		socket.emit('scoreboard_basketball', scoreObj)
	})

	basketballTeam2minus1.click(function (event) {
		event.preventDefault()

		let score = parseInt(basketballScore2.val())
		score--
		basketballScore2.val(score.toString())

		let scoreObj = {}

		scoreObj.basketballTeam1 = basketballScore1.val()
		scoreObj.basketballTeam2 = basketballScore2.val()

		socket.emit('scoreboard_basketball', scoreObj)
	})
})(window.jQuery)
