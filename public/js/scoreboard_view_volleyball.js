;(function ($) {
	var baseUrl = window.location.origin

	const socket = io(baseUrl)

	socket.on('score_volleyball', scoreObj => {
		let score1 = $('#score1')
		let score2 = $('#score2')

		score1.val(scoreObj.team1)
		score2.val(scoreObj.team2)
	})
})(window.jQuery)
