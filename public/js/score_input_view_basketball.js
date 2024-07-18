;(function ($) {
	const socket = io()

	const basketballTeam1plus1 = $('#basketballTeam1plus1')
	const basketballTeam2plus1 = $('#basketballTeam2plus1')
	const basketballTeam1minus1 = $('#basketballTeam1minus1')
	const basketballTeam2minus1 = $('#basketballTeam2minus1')
	const reset = $('#resetScore')

	const basketballScore1 = $('#basketballScore1')
	const basketballScore2 = $('#basketballScore2')

	reset.click(function (event) {
		event.preventDefault()

		basketballbasketballScore1.val('0')
		basketballScore2.val('0')

		let scoreObj = {}

		scoreObj.basketballTeam1 = 0
		scoreObj.basketballTeam2 = 0

		socket.emit('scoreboard', scoreObj)
	})

	basketballTeam1plus1.click(function (event) {
		event.preventDefault()

		let score = parseInt(basketballScore1.val())
		score++
		basketballScore1.val(score.toString())

		let scoreObj = {}

		scoreObj.basketballTeam1 = basketballScore1.val()
		scoreObj.basketballTeam2 = basketballScore2.val()

		socket.emit('scoreboard', scoreObj)
	})

	basketballTeam1minus1.click(function (event) {
		event.preventDefault()

		let score = parseInt(basketballScore1.val())
		score--
		basketballScore1.val(score.toString())

		let scoreObj = {}

		scoreObj.basketballTeam1 = basketballScore1.val()
		scoreObj.basketballTeam2 = basketballScore2.val()

		socket.emit('scoreboard', scoreObj)
	})

	basketballTeam2plus1.click(function (event) {
		event.preventDefault()

		let score = parseInt(basketballScore2.val())
		score++
		basketballScore2.val(score.toString())

		let scoreObj = {}

		scoreObj.basketballTeam1 = basketballScore1.val()
		scoreObj.basketballTeam2 = basketballScore2.val()

		socket.emit('scoreboard', scoreObj)
	})

	basketballTeam2minus1.click(function (event) {
		event.preventDefault()

		let score = parseInt(basketballScore2.val())
		score--
		basketballScore2.val(score.toString())

		let scoreObj = {}

		scoreObj.basketballTeam1 = basketballScore1.val()
		scoreObj.basketballTeam2 = basketballScore2.val()

		socket.emit('scoreboard', scoreObj)
	})
})(window.jQuery)
