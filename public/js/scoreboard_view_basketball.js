;(function ($) {
	var baseUrl = window.location.origin

	const socket = io(baseUrl)

	socket.on('score', scoreObj => {
		let basketballScore1 = $('#basketballScore1')
		let basketballScore2 = $('#basketballScore2')

		basketballScore1.val(scoreObj.basketballTeam1)
		basketballScore2.val(scoreObj.basketballTeam2)
	})
})(window.jQuery)
